import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  findAll(query: PaginationQueryDto) {
    const { offset = 0, limit = 20 } = query;
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return coffee;
  }

  async create(CreateCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      CreateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeRepository.create({
      ...CreateCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, coffee: UpdateCoffeeDto) {
    const flavors =
      coffee.flavors &&
      (await Promise.all(
        coffee.flavors.map((name) => this.preloadFlavorByName(name)),
      ));
    const existingCoffee = await this.coffeeRepository.preload({
      id,
      ...coffee,
      flavors,
    });
    if (!existingCoffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return this.coffeeRepository.save(existingCoffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string) {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}

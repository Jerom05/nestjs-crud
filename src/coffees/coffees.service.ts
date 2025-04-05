import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Arabica',
      brand: 'Brand A',
      flavors: ['chocolate', 'vanilla'],
    },
    {
      id: 2,
      name: 'Robusta',
      brand: 'Brand B',
      flavors: ['spicy', 'nutty'],
    },
  ];

  findAll(query: any) {
    const { offset = 0, limit = 20 } = query;
    return this.coffees.slice(offset, offset + limit);
  }

  findOne(id: number) {
    const coffee = this.coffees.find((coffee) => coffee.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return coffee;
  }

  create(coffee: CreateCoffeeDto) {
    this.coffees.push({
      ...coffee,
      id: this.coffees.length + 1,
    });
    return coffee
  }

  update(id: number, coffee: UpdateCoffeeDto) {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === id);
    if (coffeeIndex > -1) {
      this.coffees[coffeeIndex] = { ...this.coffees[coffeeIndex], ...coffee };
    }
  }

  remove(id: number) {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === id);
    if (coffeeIndex > -1) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Public()
  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.coffeesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const coffeeId = parseInt(id, 10);
    return this.coffeesService.findOne(coffeeId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() CreateCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(CreateCoffeeDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Body() UpdateCoffeeDto: UpdateCoffeeDto, @Param('id') id: string) {
    const coffeeId = parseInt(id, 10);
    return this.coffeesService.update(coffeeId, UpdateCoffeeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    const coffeeId = parseInt(id, 10);
    return this.coffeesService.remove(coffeeId);
  }
}

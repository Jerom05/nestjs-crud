import { Controller, Get, Post, Body, Param } from '@nestjs/common';

const coffees = [
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

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return coffees;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const coffeeId = parseInt(id, 10);
    return coffees.find((coffee) => coffee.id === coffeeId);
  }

  @Post()
  create(@Body() body: any) {
    coffees.push({
      id: coffees.length + 1,
      name: body.name,
      brand: body.brand,
      ...body,
    });
    return coffees;
  }
}

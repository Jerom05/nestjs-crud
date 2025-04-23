import { Inject, Injectable, Module } from '@nestjs/common';

import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity/event.entity';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandFactory {
  create() {
    return ['Buddy Brew', 'Blue Bottle', 'Drip'];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandFactory,
    {
      provide: 'COFFEE_BRANDS',
      useValue: ['Buddy Brew', 'Blue Bottle', 'Drip'],
    },
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
    {
      provide: 'COFFEE_BRAND_FACTORY',
      useFactory: (coffeeBrandFactory: CoffeeBrandFactory) => {
        return coffeeBrandFactory.create();
      },
      inject: [CoffeeBrandFactory],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}

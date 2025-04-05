import { IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;
  
  @IsArray()
  @Type(() => String)
  @IsString({ each: true })
  readonly flavors: string[];
}

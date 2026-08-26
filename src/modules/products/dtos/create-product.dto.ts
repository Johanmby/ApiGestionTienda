import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Teclado Mecánico',
    description: 'Nombre del producto',
  })
  @IsString()
  @MinLength(3)
  name!: string;

  @ApiProperty({
    example: 'Teclado RGB con switches azules',
    description: 'Descripción detallada',
  })
  @IsString()
  @MinLength(10)
  description!: string;

  @ApiProperty({ example: 89.99, description: 'Precio del producto' })
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty({ example: 15, description: 'Cantidad disponible en stock' })
  @IsNumber()
  @IsPositive()
  stock!: number;

  @ApiProperty({ example: true, required: false, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

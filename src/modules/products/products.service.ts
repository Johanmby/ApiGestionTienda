import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  create(createProductDto: CreateProductDto): Product {
    const newProduct: Product = {
      id: Date.now().toString(),
      isActive: true,
      ...createProductDto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, updateProductDto: UpdateProductDto): Product {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductDto,
    };

    return this.products[productIndex];
  }

  remove(id: string): { message: string } {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    this.products.splice(productIndex, 1);
    return { message: `Producto con ID ${id} eliminado correctamente` };
  }
}

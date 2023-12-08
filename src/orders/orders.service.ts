import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { asset_id, price } = createOrderDto;
    const order = await this.prismaService.order.create({
      data: {
        asset_id,
        price,
      },
      include: { asset: true },
    });
    return order;
  }

  async findAll() {
    const orders = await this.prismaService.order.findMany({
      include: { asset: true },
    });
    return orders;
  }

  async findOne(id: string) {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      include: { asset: true },
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const { asset_id, price } = updateOrderDto;
    return await this.prismaService.order.update({
      where: { id },
      data: {
        asset: {
          connect: {
            id: asset_id,
          },
        },
        price,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.order.delete({
      where: { id },
    });
  }
}

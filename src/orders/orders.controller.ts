import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Order } from '@prisma/client';
import { BaseResponseHateoas } from 'src/lib/base-response-hateoas';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<BaseResponseHateoas<Partial<Order>>> {
    const order = await this.ordersService.create(createOrderDto);
    return new BaseResponseHateoas(
      {
        data: {
          _id: order.id,
          asset_id: order.asset_id,
          price: order.price,
          _links: {
            self: {
              href: `/orders/${order.id}`,
            },
            update: {
              href: `/orders/${order.id}`,
              description: 'Update an existing order',
              method: 'PATCH',
            },
            delete: {
              href: `/orders/${order.id}`,
              description: 'Delete an existing order',
              method: 'DELETE',
            },
          },
        },
      },
      {
        self: {
          href: '/orders',
        },
        create: {
          href: `/orders`,
          description: 'Create a new order',
          method: 'POST',
        },
      },
    );
  }

  @Get()
  async findAll(): Promise<BaseResponseHateoas<Partial<Order>>> {
    const orders = await this.ordersService.findAll();
    return new BaseResponseHateoas(
      {
        data: orders.map((order) => ({
          _id: order.id,
          asset_id: order.asset_id,
          price: order.price,
          _links: {
            self: {
              href: `/orders/${order.id}`,
            },
            update: {
              href: `/orders/${order.id}`,
              description: 'Update an existing order',
              method: 'PATCH',
            },
            delete: {
              href: `/orders/${order.id}`,
              description: 'Delete an existing order',
              method: 'DELETE',
            },
          },
        })),
      },
      {
        self: {
          href: '/orders',
        },
        create: {
          href: `/orders`,
          description: 'Create a new order',
          method: 'POST',
        },
      },
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<BaseResponseHateoas<Partial<Order>>> {
    const order = await this.ordersService.findOne(id);
    return new BaseResponseHateoas(
      {
        data: {
          _id: order.id,
          asset_id: order.asset_id,
          price: order.price,
          _links: {
            self: {
              href: `/orders/${order.id}`,
            },
            update: {
              href: `/orders/${order.id}`,
              description: 'Update an existing order',
              method: 'PATCH',
            },
            delete: {
              href: `/orders/${order.id}`,
              description: 'Delete an existing order',
              method: 'DELETE',
            },
          },
        },
      },
      {
        self: {
          href: '/orders',
        },
        create: {
          href: `/orders`,
          description: 'Create a new order',
          method: 'POST',
        },
      },
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<BaseResponseHateoas<Partial<Order>>> {
    const order = await this.ordersService.update(id, updateOrderDto);
    return new BaseResponseHateoas(
      {
        data: {
          _id: order.id,
          asset_id: order.asset_id,
          price: order.price,
          _links: {
            self: {
              href: `/orders/${order.id}`,
            },
            update: {
              href: `/orders/${order.id}`,
              description: 'Update an existing order',
              method: 'PATCH',
            },
            delete: {
              href: `/orders/${order.id}`,
              description: 'Delete an existing order',
              method: 'DELETE',
            },
          },
        },
      },
      {
        self: {
          href: '/orders',
        },
        create: {
          href: `/orders`,
          description: 'Create a new order',
          method: 'POST',
        },
      },
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<BaseResponseHateoas<Partial<Order>>> {
    const deletedOrder = await this.ordersService.remove(id);
    return new BaseResponseHateoas(
      {
        data: {
          _id: deletedOrder.id,
          asset_id: deletedOrder.asset_id,
          price: deletedOrder.price,
        },
      },
      {
        self: {
          href: '/orders',
        },
        create: {
          href: `/orders`,
          description: 'Create a new order',
          method: 'POST',
        },
      },
    );
  }
}

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
  ): Promise<BaseResponseHateoas<Order>> {
    const order = await this.ordersService.create(createOrderDto);
    return new BaseResponseHateoas(
      {
        data: {
          ...order,
          _links: {
            self: {
              href: `api/orders/${order.id}`,
            },
            update: {
              href: `api/orders/${order.id}`,
              description: 'Update an existing order',
              method: 'PATCH',
            },
            delete: {
              href: `api/orders/${order.id}`,
              description: 'Delete an existing order',
              method: 'DELETE',
            },
          },
        },
      },
      {
        self: {
          href: 'api/orders',
        },
        create: {
          href: `api/orders`,
          description: 'Create a new order',
          method: 'POST',
        },
      },
    );
  }

  @Get()
  async findAll(): Promise<BaseResponseHateoas<Order>> {
    const orders = await this.ordersService.findAll();
    return new BaseResponseHateoas(
      {
        data: orders.map((order) => ({
          ...order,
          _links: {
            self: {
              href: `api/orders/${order.id}`,
            },
            update: {
              href: `api/orders/${order.id}`,
              description: 'Update an existing order',
              method: 'PATCH',
            },
            delete: {
              href: `api/orders/${order.id}`,
              description: 'Delete an existing order',
              method: 'DELETE',
            },
          },
        })),
      },
      {
        self: {
          href: 'api/orders',
        },
        create: {
          href: `api/orders`,
          description: 'Create a new order',
          method: 'POST',
        },
      },
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BaseResponseHateoas<Order>> {
    const order = await this.ordersService.findOne(id);
    return new BaseResponseHateoas(
      {
        data: {
          ...order,
          _links: {
            self: {
              href: `api/orders/${order.id}`,
            },
            update: {
              href: `api/orders/${order.id}`,
              description: 'Update an existing order',
              method: 'PATCH',
            },
            delete: {
              href: `api/orders/${order.id}`,
              description: 'Delete an existing order',
              method: 'DELETE',
            },
          },
        },
      },
      {
        self: {
          href: 'api/orders',
        },
        create: {
          href: `api/orders`,
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
  ): Promise<BaseResponseHateoas<Order>> {
    const order = await this.ordersService.update(id, updateOrderDto);
    return new BaseResponseHateoas(
      {
        data: {
          ...order,
          _links: {
            self: {
              href: `api/orders/${order.id}`,
            },
            update: {
              href: `api/orders/${order.id}`,
              description: 'Update an existing order',
              method: 'PATCH',
            },
            delete: {
              href: `api/orders/${order.id}`,
              description: 'Delete an existing order',
              method: 'DELETE',
            },
          },
        },
      },
      {
        self: {
          href: 'api/orders',
        },
        create: {
          href: `api/orders`,
          description: 'Create a new order',
          method: 'POST',
        },
      },
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<BaseResponseHateoas<Order>> {
    const deletedOrder = await this.ordersService.remove(id);
    return new BaseResponseHateoas(
      {
        data: {
          ...deletedOrder,
        },
      },
      {
        self: {
          href: 'api/orders',
        },
        create: {
          href: `api/orders`,
          description: 'Create a new order',
          method: 'POST',
        },
      },
    );
  }
}

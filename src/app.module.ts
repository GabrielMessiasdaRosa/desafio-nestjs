import { Module } from '@nestjs/common';
import { AssetsModule } from './assets/assets.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AssetsModule, OrdersModule, PrismaModule],
})
export class AppModule {}

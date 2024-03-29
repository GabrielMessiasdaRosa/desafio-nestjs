import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app) {
    const beforeExit: string = 'beforeExit';
    this.$on(beforeExit as never, async () => {
      await app.close();
    });
  }
}

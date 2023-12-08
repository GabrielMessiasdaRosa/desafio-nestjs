import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Asset } from '@prisma/client';
import { BaseResponseHateoas } from 'src/lib/base-response-hateoas';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  async create(
    @Body() createAssetDto: CreateAssetDto,
  ): Promise<BaseResponseHateoas<Partial<Asset>>> {
    const asset = await this.assetsService.create(createAssetDto);
    return new BaseResponseHateoas(
      {
        data: {
          _id: asset.id,
          symbol: asset.symbol,
          _links: {
            self: {
              href: `/assets/${asset.id}`,
            },
            update: {
              href: `/assets/${asset.id}`,
              description: 'Update an existing asset',
              method: 'PATCH',
            },
            delete: {
              href: `/assets/${asset.id}`,
              description: 'Delete an existing asset',
              method: 'DELETE',
            },
          },
        },
      },
      {
        self: {
          href: '/assets',
        },
        create: {
          href: `/assets`,
          description: 'Create a new asset',
          method: 'POST',
        },
      },
    );
  }

  @Get()
  async findAll(): Promise<BaseResponseHateoas<Partial<Asset>>> {
    const assets = await this.assetsService.findAll();

    return new BaseResponseHateoas(
      {
        data: assets.map((asset) => ({
          _id: asset.id,
          symbol: asset.symbol,
            orders: (asset as Asset & { orders: any }).orders,
          _links: {
            self: {
              href: `/assets/${asset.id}`,
            },
            update: {
              href: `/assets/${asset.id}`,
              description: 'Update an existing asset',
              method: 'PATCH',
              warning: 'Always use PATCH to update this resource !',
            },
            delete: {
              href: `/assets/${asset.id}`,
              description: 'Delete an existing asset',
              method: 'DELETE',
            },
          },
        })),
      },
      {
        self: {
          href: '/assets',
        },
        create: {
          href: `/assets`,
          description: 'Create a new asset',
          method: 'POST',
        },
      },
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<BaseResponseHateoas<Partial<Asset>>> {
    const asset = await this.assetsService.findOne(id);

    return new BaseResponseHateoas({
      data: {
        _id: asset.id,
        symbol: asset.symbol,
        _links: {
          self: {
            href: `/assets/${id}`,
          },
          update: {
            href: `/assets/${id}`,
            description: 'Update an existing asset',
            method: 'PATCH',
            warning: 'Always use PATCH to update this resource !',
          },
          delete: {
            href: `/assets/${id}`,
            description: 'Delete an existing asset',
            method: 'DELETE',
          },
        },
      },
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ): Promise<BaseResponseHateoas<Partial<Asset>>> {
    const updatedAsset = await this.assetsService.update(id, updateAssetDto);
    return new BaseResponseHateoas({
      data: {
        _id: updatedAsset.id,
        symbol: updatedAsset.symbol,
        _links: {
          self: {
            href: `/assets/${id}`,
          },
          update: {
            href: `/assets/${id}`,
            description: 'Update an existing asset',
            method: 'PATCH',
            warning: 'Always use PATCH to update this resource !',
          },
          delete: {
            href: `/assets/${id}`,
            description: 'Delete an existing asset',
            method: 'DELETE',
          },
        },
      },
      message: 'Asset updated successfully',
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<BaseResponseHateoas<Partial<Asset>>> {
    const deletedAsset = await this.assetsService.remove(id);
    return new BaseResponseHateoas(
      {
        data: {
          _id: deletedAsset.id,
          symbol: deletedAsset.symbol,
        },
      },
      {
        create: {
          href: `/assets`,
          description: 'Create a new asset',
          method: 'POST',
        },
      },
    );
  }
}

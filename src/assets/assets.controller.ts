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
  ): Promise<BaseResponseHateoas<Asset>> {
    const asset = await this.assetsService.create(createAssetDto);
    return new BaseResponseHateoas(
      {
        data: {
          ...asset,
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
  async findAll(): Promise<BaseResponseHateoas<Asset>> {
    const assets = await this.assetsService.findAll();
    console.log(assets);
    return new BaseResponseHateoas(
      {
        data: assets.map((asset) => ({
          ...asset,
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
  async findOne(@Param('id') id: string): Promise<BaseResponseHateoas<Asset>> {
    const asset = await this.assetsService.findOne(id);

    return new BaseResponseHateoas({
      data: {
        ...asset,
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
  ): Promise<BaseResponseHateoas<Asset>> {
    const updatedAsset = await this.assetsService.update(id, updateAssetDto);
    return new BaseResponseHateoas({
      data: {
        ...updatedAsset,
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

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<BaseResponseHateoas<Asset>> {
    const deletedAsset = await this.assetsService.remove(id);
    return new BaseResponseHateoas(
      {
        data: {
          ...deletedAsset,
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

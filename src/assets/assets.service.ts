import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Asset } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetsService {
  constructor(private prismaService: PrismaService) {}

  async create(createAssetDto: CreateAssetDto) {
    const existingAsset = await this.prismaService.asset.findFirst({
      where: {
        OR: [{ id: createAssetDto.id }, { symbol: createAssetDto.symbol }],
      },
      include: { orders: true },
    });

    if (existingAsset) {
      throw new ConflictException(`Asset already exists`);
    }

    return this.prismaService.asset.create({
      data: createAssetDto,
    });
  }

  async findAll() {
    const assets: Asset[] = await this.prismaService.asset.findMany({
      include: { orders: true },
    });
    if (!assets) {
      throw new NotFoundException(`No Assets not found`);
    }
    return assets;
  }

  async findOne(id: string): Promise<Asset> {
    const asset = await this.prismaService.asset.findUnique({
      where: { id },
    });
    if (!asset) {
      throw new NotFoundException(`Asset #${id} not found`);
    }
    return asset;
  }

  async update(id: string, updateAssetDto: UpdateAssetDto) {
    const asset = await this.findOne(id);

    return this.prismaService.asset.update({
      where: { id: asset.id },
      data: updateAssetDto,
    });
  }

  async remove(id: string) {
    const asset = await this.findOne(id);
    return this.prismaService.asset.delete({
      where: { id: asset.id },
    });
  }
}

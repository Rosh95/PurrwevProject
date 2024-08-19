import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { ColumnRepository } from './columns.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService, ColumnRepository, PrismaService],
})
export class ColumnsModule {}

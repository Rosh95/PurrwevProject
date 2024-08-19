import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ColumnRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, data: { title: string }) {
    return this.prisma.column.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.column.findMany({
      where: { userId },
    });
  }

  async findOne(id: number) {
    const result = await this.prisma.column.findUnique({
      where: {
        id: id,
      },
    });
    console.log(result);
    return result;
  }

  async update(id: number, data: { title: string }) {
    return this.prisma.column.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.column.delete({ where: { id } });
  }
}

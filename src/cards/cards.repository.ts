import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number,
    columnId: number,
    data: { title: string; description: string },
  ) {
    return this.prisma.card.create({
      data: {
        ...data,
        columnId: columnId,
        userId: userId,
      },
    });
  }

  async findAll(columnId: number) {
    return this.prisma.card.findMany({
      where: { columnId },
    });
  }

  async findOne(id: number) {
    return this.prisma.card.findUnique({ where: { id } });
  }

  async update(id: number, data: { title: string; description: string }) {
    return this.prisma.card.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.card.delete({ where: { id } });
  }
}

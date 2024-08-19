import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, cardId: number, content: string) {
    return this.prisma.comment.create({
      data: {
        content,
        card: { connect: { id: cardId } },
        user: { connect: { id: userId } },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.comment.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return this.prisma.comment.delete({ where: { id } });
  }
}

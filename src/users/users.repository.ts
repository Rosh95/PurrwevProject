import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { email: string; passwordHash: string }) {
    return this.prisma.user.create({ data });
  }
  async createUser(newUser: Prisma.UserCreateInput): Promise<number | null> {
    const createdUser = await this.prisma.user.create({
      data: newUser,
    });
    if (createdUser.id) {
      return createdUser.id;
    }
    return null;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, data: { email?: string; password?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}

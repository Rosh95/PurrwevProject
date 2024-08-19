import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: { email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.userRepository.create({
      ...data,
      passwordHash: hashedPassword,
    });
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findUserById(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async update(
    userId: number,
    id: number,
    data: { email?: string; password?: string },
  ) {
    const currentUser = await this.userRepository.findUserById(id);
    if (currentUser.id !== userId) {
      throw new ForbiddenException('You do not own this user');
    }
    return this.userRepository.update(id, data);
  }

  async remove(userId: number, id: number) {
    const currentUser = await this.userRepository.findUserById(id);
    if (currentUser.id !== userId) {
      throw new ForbiddenException('You do not own this user');
    }
    return this.userRepository.remove(id);
  }
}

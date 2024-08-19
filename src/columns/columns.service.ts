import { Injectable } from '@nestjs/common';
import { ColumnRepository } from './columns.repository';

@Injectable()
export class ColumnsService {
  constructor(private readonly columnRepository: ColumnRepository) {}

  create(userId: number, data: { title: string }) {
    return this.columnRepository.create(userId, data);
  }

  findAll(userId: number) {
    return this.columnRepository.findAll(userId);
  }

  findById(id: number) {
    return this.columnRepository.findOne(id);
  }

  update(userId: number, id: number, data: { title: string }) {
    return this.columnRepository.update(id, data);
  }

  remove(userId: number, id: number) {
    return this.columnRepository.remove(id);
  }
}

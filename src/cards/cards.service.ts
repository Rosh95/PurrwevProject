import { Injectable } from '@nestjs/common';
import { CardRepository } from './cards.repository';

@Injectable()
export class CardsService {
  constructor(private readonly cardRepository: CardRepository) {}

  create(
    userId: number,
    columnId: number,
    data: { title: string; description: string },
  ) {
    return this.cardRepository.create(userId, columnId, data);
  }

  findAll(userId: number, columnId: number) {
    return this.cardRepository.findAll(columnId);
  }

  findById(id: number) {
    return this.cardRepository.findOne(id);
  }

  update(
    userId: number,
    id: number,
    data: { title: string; description: string },
  ) {
    return this.cardRepository.update(id, data);
  }

  remove(userId: number, id: number) {
    return this.cardRepository.remove(id);
  }
}

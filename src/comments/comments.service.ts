import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentRepository) {}

  create(userId: number, cardId: number, content: string) {
    return this.commentRepository.create(userId, cardId, content);
  }

  findById(id: number) {
    return this.commentRepository.findOne(id);
  }

  remove(userId: number, id: number) {
    return this.commentRepository.remove(id);
  }
}

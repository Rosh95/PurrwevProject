import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/users.service';
import { ColumnsService } from '../../columns/columns.service';
import { CardsService } from '../../cards/cards.service';
import { CommentsService } from '../../comments/comments.service';
import { CustomRequest } from '../custom-request.interface';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
    private columnsService: ColumnsService,
    private cardsService: CardsService,
    private commentsService: CommentsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: CustomRequest = context.switchToHttp().getRequest();
    const user = request.user;

    const columnId = request.params.columnId;
    const cardId = request.params.cardId;
    const commentId = request.params.commentId;

    if (columnId) {
      const column = await this.columnsService.findById(Number(columnId));
      if (!column || column.userId !== user.userId) {
        throw new ForbiddenException(
          'You do not have permission to modify this column',
        );
      }
    }

    if (cardId) {
      const card = await this.cardsService.findById(Number(cardId));
      if (!card || card.userId !== user.userId) {
        throw new ForbiddenException(
          'You do not have permission to modify this card',
        );
      }
    }

    if (commentId) {
      const comment = await this.commentsService.findById(Number(commentId));
      if (!comment || comment.userId !== user.userId) {
        throw new ForbiddenException(
          'You do not have permission to modify this comment',
        );
      }
    }

    return true;
  }
}

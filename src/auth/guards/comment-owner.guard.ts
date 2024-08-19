import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { CommentsService } from '../../comments/comments.service';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(private readonly commentsService: CommentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const commentId = request.params.id;

    const comment = await this.commentsService.findById(+commentId);
    if (!comment || comment.userId !== userId) {
      throw new ForbiddenException('You do not own this comment');
    }

    return true;
  }
}

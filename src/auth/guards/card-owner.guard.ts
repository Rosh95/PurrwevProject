import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { CardsService } from '../../cards/cards.service';

@Injectable()
export class CardOwnerGuard implements CanActivate {
  constructor(private readonly cardsService: CardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const cardId = request.params.id;

    const card = await this.cardsService.findById(+cardId);
    if (!card || card.userId !== userId) {
      throw new ForbiddenException('You do not own this card');
    }

    return true;
  }
}

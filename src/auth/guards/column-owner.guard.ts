import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { ColumnsService } from '../../columns/columns.service';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
  constructor(private readonly columnsService: ColumnsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const columnId = request.params.id;

    const column = await this.columnsService.findById(+columnId);
    if (!column || column.userId !== userId) {
      throw new ForbiddenException('You do not own this column');
    }

    return true;
  }
}

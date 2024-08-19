import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CardRepository } from './cards.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import { ColumnsService } from '../columns/columns.service';
import { ColumnRepository } from '../columns/columns.repository';
import { CommentsService } from '../comments/comments.service';
import { CommentRepository } from '../comments/comments.repository';

@Module({
  controllers: [CardsController],
  providers: [
    CardsService,
    CardRepository,
    UsersService,
    UserRepository,
    ColumnsService,
    ColumnRepository,
    CommentsService,
    CommentRepository,
    PrismaService,
  ],
})
export class CardsModule {}

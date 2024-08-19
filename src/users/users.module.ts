import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './users.repository';
import { PrismaService } from '../prisma/prisma.service';
import Configuration from '../config/Configuration';
import { ColumnsService } from '../columns/columns.service';
import { ColumnRepository } from '../columns/columns.repository';
import { CardsService } from '../cards/cards.service';
import { CardRepository } from '../cards/cards.repository';
import { CommentsService } from '../comments/comments.service';
import { CommentRepository } from '../comments/comments.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: Configuration.getConfiguration().JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    PrismaService,
    ColumnsService,
    ColumnRepository,
    CardsService,
    CardRepository,
    CommentsService,
    CommentRepository,
    AuthService,
  ],
})
export class UsersModule {}

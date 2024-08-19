import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentRepository } from './comments.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentRepository, PrismaService],
})
export class CommentsModule {}

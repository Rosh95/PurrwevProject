import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCommentDto } from './comments.dto';
import { CustomRequest } from '../auth/custom-request.interface';
import { CommentOwnerGuard } from '../auth/guards/comment-owner.guard';

@ApiTags('comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Create comment' })
  @Post()
  create(
    @Req() req: CustomRequest,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(
      req.user.userId,
      createCommentDto.cardId,
      createCommentDto.content,
    );
  }

  @ApiOperation({ summary: 'Get comment by ID' })
  @Get(':id')
  findOne(@Req() req: CustomRequest, @Param('id') id: string) {
    return this.commentsService.findById(+id);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard, CommentOwnerGuard)
  remove(@Req() req: CustomRequest, @Param('id') id: string) {
    return this.commentsService.remove(req.user.userId, +id);
  }
}

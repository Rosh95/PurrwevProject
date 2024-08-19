import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCardDto } from './cards.dto';
import { CustomRequest } from '../auth/custom-request.interface';
import { UpdateCardDto } from './update-card.dto';
import { CardOwnerGuard } from '../auth/guards/card-owner.guard';

@ApiTags('cards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiOperation({ summary: 'Create card' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: CustomRequest, @Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(
      req.user.userId,
      createCardDto.columnId,
      createCardDto,
    );
  }

  @ApiOperation({ summary: 'Get card by ID' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Req() req: CustomRequest, @Param('id') id: string) {
    return this.cardsService.findById(+id);
  }

  @ApiOperation({ summary: 'Update card' })
  @UseGuards(JwtAuthGuard, CardOwnerGuard)
  @Put(':id')
  update(
    @Req() req: CustomRequest,
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.update(req.user.userId, +id, updateCardDto);
  }

  @ApiOperation({ summary: 'Delete card' })
  @UseGuards(JwtAuthGuard, CardOwnerGuard)
  @Delete(':id')
  remove(@Req() req: CustomRequest, @Param('id') id: string) {
    return this.cardsService.remove(req.user.userId, +id);
  }
}

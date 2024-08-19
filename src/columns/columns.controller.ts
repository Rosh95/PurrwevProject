import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateColumnDto } from './columns.dto';
import { CustomRequest } from '../auth/custom-request.interface';
import { ColumnOwnerGuard } from '../auth/guards/column-owner.guard';

@ApiTags('columns')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'Create column' })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: CustomRequest, @Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(req.user.userId, createColumnDto);
  }

  @ApiOperation({ summary: 'Get all columns for user' })
  @Get()
  findAll(@Req() req: CustomRequest) {
    return this.columnsService.findAll(req.user.userId);
  }

  @ApiOperation({ summary: 'Get column by ID' })
  @Get(':id')
  findOne(@Req() req: CustomRequest, @Param('id') id: string) {
    return this.columnsService.findById(+id);
  }

  @ApiOperation({ summary: 'Update column' })
  @Put(':id')
  @UseGuards(JwtAuthGuard, ColumnOwnerGuard)
  update(
    @Req() req: CustomRequest,
    @Param('id') id: string,
    @Body() updateColumnDto: { title: string },
  ) {
    return this.columnsService.update(req.user.userId, +id, updateColumnDto);
  }

  @ApiOperation({ summary: 'Delete column' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard, ColumnOwnerGuard)
  remove(@Req() req: CustomRequest, @Param('id') id: string) {
    return this.columnsService.remove(req.user.userId, +id);
  }
}

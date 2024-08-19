import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/users.dto';

export function RegistrationEndpoint() {
  return applyDecorators(
    ApiOperation({ summary: 'registration user' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'success registration  user',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'error on registration user',
    }),
    ApiBody({ type: CreateUserDto }),
  );
}

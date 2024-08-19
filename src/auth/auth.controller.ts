import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dtos/login.dto';
import { Response } from 'express';
import { CreateUserDto } from '../users/users.dto';
import { mappingErrorStatus } from '../helpers/helpersType';
import { UserRepository } from '../users/users.repository';
import { RegistrationEndpoint } from './swagger/RegistrationEndpoint';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.createTokens(loginDto.email);
    res
      .cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
      })
      .header('accessToken', tokens.accessToken);
    return {
      accessToken: tokens.accessToken,
    };
  }

  @RegistrationEndpoint()
  @Post('registration')
  async register(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.authService.register(createUserDto);
    if (newUser.data === null) return mappingErrorStatus(newUser);
    return await this.userRepository.findUserById(Number(newUser.data));
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from '../users/users.dto';
import { UserRepository } from '../users/users.repository';
import { ResultObject } from '../helpers/helpersType';
import Configuration from '../config/Configuration';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(createUserDto: CreateUserDto): Promise<number> {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (!user) {
      return null;
    }
    const isItCorrectPassword = await this.checkCredential(createUserDto);
    console.log(isItCorrectPassword);
    if (isItCorrectPassword) {
      return user.id;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async createTokens(email: string) {
    const currentUser = await this.userRepository.findByEmail(email);
    const accessToken = jwt.sign(
      { userId: currentUser.id, email: email },
      Configuration.getConfiguration().JWT_SECRET,
      {
        expiresIn: Configuration.getConfiguration().ACCESS_JWT_LIFETIME,
      },
    );
    const refreshToken = jwt.sign(
      { userId: currentUser.id, email: email },
      Configuration.getConfiguration().JWT_SECRET,
      {
        expiresIn: Configuration.getConfiguration().REFRESH_JWT_LIFETIME,
      },
    );

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<ResultObject<number>> {
    const isEmailExist = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (isEmailExist) {
      return {
        resultCode: HttpStatus.BAD_REQUEST,
        field: 'email',
        message: ' User with this email is already registered',
        data: null,
      };
    }

    const passwordHash = await this._generateHash(createUserDto.password);
    const dataForUser: Prisma.UserCreateInput = {
      email: createUserDto.email,
      passwordHash: passwordHash,
    };
    const createdUserId: number =
      await this.userRepository.createUser(dataForUser);

    if (!createdUserId) {
      return {
        data: null,
        resultCode: HttpStatus.BAD_REQUEST,
        message: 'couldn`t create user',
      };
    }

    return {
      data: createdUserId,
      resultCode: HttpStatus.NO_CONTENT,
    };
  }

  private async _generateHash(password: string) {
    const passwordSaltNumber = Configuration.getConfiguration().PASSWORD_SALT;
    const passwordSalt = await bcrypt.genSalt(Number(passwordSaltNumber));
    return await bcrypt.hash(password, passwordSalt);
  }

  private async checkCredential(
    createUserDto: CreateUserDto,
  ): Promise<boolean> {
    const user = await this.userRepository.findByEmail(createUserDto.email);
    if (!user) return false;

    return await bcrypt.compare(createUserDto.password, user.passwordHash);
  }
}

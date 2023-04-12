import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LogInDto } from './dto/log-in.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/modules/users/entities/user.entity';
import { ResponseLogInDto } from './dto/response-log-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(logInDto: LogInDto): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(logInDto.email);
    if (user && bcrypt.compareSync(logInDto.password, user.passwordHash)) {
      user.passwordHash = undefined;
      return user;
    }
    return null;
  }

  async logIn(logInDto: LogInDto): Promise<ResponseLogInDto> {
    const user = await this.validateUser(logInDto);
    if (user) {
      return {
        token: this.jwtService.sign({
          _id: user._id,
        }),
        user,
      };
    }
    throw new UnauthorizedException();
  }

  async authenticate(token: string): Promise<User | null> {
    if (token) {
      try {
        const payload = await this.jwtService.verify(token);
        const user = await this.usersService.findOne(payload._id);
        if (user) {
          return user;
        }
      } catch {
        return null;
      }
    }
    return null;
  }
}

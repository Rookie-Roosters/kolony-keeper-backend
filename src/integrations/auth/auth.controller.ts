import { Controller, Body, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ResponseLogInDto } from './dto/response-log-in.dto';
import { LogInDto } from './dto/log-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('log-in')
  @ApiOperation({
    summary: 'Log in',
    description: 'Log in a user based on the provided credentials',
  })
  @ApiBody({ type: LogInDto })
  @ApiCreatedResponse({ type: ResponseLogInDto })
  async logIn(@Body() logInDto: LogInDto): Promise<ResponseLogInDto> {
    return await this.authService.logIn(logInDto);
  }
}

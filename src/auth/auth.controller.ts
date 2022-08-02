import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetJwtPayload } from './decorators/jwt-payload.decorator';
import { Public } from './decorators/public.decorator';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthDto } from './dto/auth.dto';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
import {
  IJwtPayload,
  IJwtPayloadWithRefresToken,
} from './interface/jwt-payload.interface';

@Controller('petlove/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post('register')
  register(@Body() body: AuthRegisterDto) {
    return this.authService.register(body);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetJwtPayload() payload: IJwtPayload) {
    return this.authService.logout(payload.id);
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@GetJwtPayload() payload: IJwtPayloadWithRefresToken) {
    return this.authService.refreshToken(payload.id, payload.refreshToken);
  }
}

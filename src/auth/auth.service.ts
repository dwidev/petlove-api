import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { toCompare, toHash } from 'src/utils/functions/bcrypt.function';
import { ITokenResponse } from './interface/token.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { IJwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UsersService,
    private jwtServices: JwtService,
  ) {}

  async checkPassword(user: User, password: string): Promise<boolean> {
    return await toCompare(password, user.password);
  }

  /**
   * Function for handle login of user request
   * @param data is params of login
   * @returns token like accessToken and refreshToken
   */
  async login(data: AuthDto) {
    const { username, password } = data;

    const user = await this.userServices.getUserByUsername(username);

    if (!user) {
      throw new BadRequestException('not valid account!!');
    }

    const validPass = await this.checkPassword(user, password);

    if (!validPass) {
      throw new BadRequestException('wrong password!!');
    }

    const requestToken = await this.requestToken(user);
    await this.updateRefreshToken(user.id, requestToken.accessToken);

    return requestToken;
  }

  /**
   * Function for handle register of user request
   * @param data is AuthRegisterDto
   * @returns token like accessToken and refreshToken
   */
  async register(data: AuthRegisterDto): Promise<ITokenResponse> {
    const userDto = new CreateUserDto();
    userDto.username = data.username;
    userDto.password = data.password;
    userDto.email = data.email;
    const user = await this.userServices.create(userDto);

    const token = await this.requestToken(user);
    await this.updateRefreshToken(user.id, token.refreshToken);
    return token;
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const data = new UpdateUserDto();
    data.id = userId;
    data.refresh_token = await toHash(refreshToken);
    await this.userServices.update(data);
  }

  /**
   * Private function for get accessToken and refresh token
   * @param user params for set payload token with uuid of user
   * @returns token
   */
  private async requestToken(user: User): Promise<ITokenResponse> {
    const tokenPayload: IJwtPayload = {
      id: user.id,
      uuid: user.uuid,
    };
    const [accessToken, refreshToken] = await Promise.all<string>([
      this.jwtServices.signAsync(tokenPayload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '60h',
      }),
      this.jwtServices.signAsync(tokenPayload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(
    id: number,
    refreshToken: string,
  ): Promise<ITokenResponse> {
    const user = await this.userServices.userRepository.findOneBy({
      id,
    });

    if (!user) throw new ForbiddenException();

    const compare = await toCompare(refreshToken, user.refresh_token ?? '');

    if (!compare) throw new ForbiddenException();

    const token = await this.requestToken(user);
    await this.updateRefreshToken(user.id, token.refreshToken);
    return token;
  }

  async logout(id: number): Promise<Object> {
    const updateDto = new UpdateUserDto();
    updateDto.id = id;
    updateDto.refresh_token = null;
    await this.userServices.update(updateDto);
    return { message: 'logout is success' };
  }
}

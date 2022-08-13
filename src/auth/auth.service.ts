import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { toCompare, toHash } from 'src/utils/functions/bcrypt.function';
import { ITokenResponse } from './interface/token.interface';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { IJwtPayload } from './interface/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account) readonly accountRepo: Repository<Account>,
    private jwtServices: JwtService,
  ) {}

  async checkPassword(account: Account, password: string): Promise<boolean> {
    return await toCompare(password, account.password);
  }

  /**
   * Function for handle login of user request
   * @param data is params of login
   * @returns token like accessToken and refreshToken
   */
  async login(data: AuthDto) {
    const { username, password } = data;
    const whereQuery = { username };
    const account = await this.accountRepo.findOneBy(whereQuery);

    if (!account) {
      throw new BadRequestException('not valid account!!');
    }

    const validPass = await this.checkPassword(account, password);

    if (!validPass) {
      throw new BadRequestException('wrong password!!');
    }

    const requestToken = await this.requestToken(account);
    this.updateRefreshTokenOnAccount(account.uuid, requestToken.accessToken);
    return requestToken;
  }

  /**
   * Function for handle register of user request
   * @param authRegisterDto is AuthRegisterDto
   * @returns token like accessToken and refreshToken
   */
  async register(authRegisterDto: AuthRegisterDto): Promise<ITokenResponse> {
    authRegisterDto.password = await toHash(authRegisterDto.password);
    const account = await this.accountRepo.save(authRegisterDto);

    const token = await this.requestToken(account);
    this.updateRefreshTokenOnAccount(account.uuid, token.refreshToken);
    return token;
  }

  private async updateRefreshTokenOnAccount(
    uuid: string,
    refreshToken: string,
  ) {
    const tokenHash = await toHash(refreshToken);
    await this.accountRepo.update(uuid, {
      refresh_token: tokenHash,
    });
  }

  /**
   * Private function for get accessToken and refresh token
   * @param user params for set payload token with uuid of user
   * @returns token
   */
  private async requestToken(account: Account): Promise<ITokenResponse> {
    const tokenPayload: IJwtPayload = {
      uuid: account.uuid,
      username: account.username,
    };
    const [accessToken, refreshToken] = await Promise.all<string>([
      this.jwtServices.signAsync(tokenPayload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '1h',
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
    uuid: string,
    refreshToken: string,
  ): Promise<ITokenResponse> {
    const account = await this.accountRepo.findOneBy({
      uuid,
    });

    if (!account) throw new ForbiddenException();

    const compare = await toCompare(refreshToken, account.refresh_token ?? '');

    if (!compare) throw new ForbiddenException();

    const token = await this.requestToken(account);
    this.updateRefreshTokenOnAccount(account.uuid, token.refreshToken);
    return token;
  }

  async logout(uuid: string): Promise<Object> {
    await this.accountRepo.update(uuid, { refresh_token: null });
    return { message: 'logout is success' };
  }
}

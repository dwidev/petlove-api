import { IsDefined, IsNotEmpty, isNotEmpty } from 'class-validator';

export class AuthDto {
  @IsDefined()
  @IsNotEmpty()
  username: string;

  @IsDefined()
  @IsNotEmpty()
  password: string;
}

export class AccountUuidDto {
  uuid: string;
}

export class AccountDto extends AccountUuidDto {
  username: string;
  email: string;
  password: string;
}

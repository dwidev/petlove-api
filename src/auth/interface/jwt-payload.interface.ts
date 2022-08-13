export interface IJwtPayload {
  uuid: string;
  username: string;
}

export interface IJwtPayloadWithRefresToken extends IJwtPayload {
  refreshToken: string;
}

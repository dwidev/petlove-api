export interface IJwtPayload {
  id: number;
  uuid: string;
}

export interface IJwtPayloadWithRefresToken extends IJwtPayload {
  refreshToken: string;
}

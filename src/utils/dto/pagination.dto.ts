import { IsDefined, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class PaginationParamsDto {
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsNumber()
  @Max(100)
  @Min(1)
  perPage: number = 10;
}

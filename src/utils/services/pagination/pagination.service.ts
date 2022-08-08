import { PaginationParamsDto } from 'src/utils/dto/pagination.dto';
import { FindManyOptions, Repository } from 'typeorm';

export interface IPageResponse<T> {
  total_data: number;
  total_page: number;
  next_page: number;
  data: T[];
}

export abstract class PaginationService {
  async generatePage<T>(
    params: PaginationParamsDto,
    repo: Repository<T>,
    options: FindManyOptions<T> = {},
  ): Promise<IPageResponse<T>> {
    options.take = params.perPage;
    options.skip = (params.page - 1) * params.perPage;

    const [totalData, data] = await Promise.all([
      repo.count(),
      repo.find(options),
    ]);

    const totalPage = Math.ceil(totalData / params.perPage);

    return {
      total_data: totalData,
      total_page: totalPage,
      next_page: params.page + 1,
      data: data,
    };
  }
}

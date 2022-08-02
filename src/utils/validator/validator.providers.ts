import { Provider } from '@nestjs/common';
import { UniqueDataValidator } from './unique-data.validator';

export const listValidatorProvider: Provider[] = [UniqueDataValidator];

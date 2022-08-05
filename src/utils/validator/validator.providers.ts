import { Provider } from '@nestjs/common';
import {
  CheckExistData,
  CheckExistDataValidator,
} from './exist-data.validator';
import { UniqueDataValidator } from './unique-data.validator';

export const listValidatorProvider: Provider[] = [
  UniqueDataValidator,
  CheckExistDataValidator,
];

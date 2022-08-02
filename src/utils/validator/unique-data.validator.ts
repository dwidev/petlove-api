import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
} from 'class-validator';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueDataValidator implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private readonly connection: DataSource) {}

  async validate(value: any, args?: ValidationArguments) {
    let find = {
      where: {
        [args.constraints[1]]: args.value,
      },
    };

    const isExist = await this.connection
      .getRepository(args.constraints[0])
      .count(find);

    if (isExist == 1) return false;

    return true;
  }

  defaultMessage?(args?: ValidationArguments): string {
    return args.property + ' ' + args.value + ' sudah digunakan';
  }
}

export function IsUnique(option: any[], validationOption?: ValidatorOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: option,
      options: validationOption,
      validator: UniqueDataValidator,
      async: true,
    });
  };
}

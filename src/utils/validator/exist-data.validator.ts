import { createParamDecorator, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';

interface ICheckExistData {
  entity: EntityTarget<any>;
  property: string;
}

@ValidatorConstraint({ async: true })
@Injectable()
export class CheckExistDataValidator implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private readonly connection: DataSource) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const constraint: ICheckExistData = args.constraints[0];
    const column = constraint.property;

    if (value != undefined) {
      const check = await this.connection
        .getRepository(constraint.entity)
        .count({ where: { [column]: value } });

      return check == 1;
    }

    return true;
  }

  defaultMessage?(args?: ValidationArguments): string {
    return `${args.property}: ${args.value} tidak temukan`;
  }
}

export function CheckExistData(
  options: ICheckExistData[],
  validationOption?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'CheckExistData',
      target: object.constructor,
      constraints: options,
      propertyName: propertyName,
      options: validationOption,
      validator: CheckExistDataValidator,
      async: true,
    });
  };
}

import { ArgumentInvalidExeception } from 'src/shared/exceptions/argument-invalid.exception';
import { v4 as uuidV4, validate as uuidValidate } from 'uuid';
import { DomainPrimitive } from '../base-classes/value-object.base';
import { ID } from './id.value-object';

export class UUID extends ID {
  static generate() {
    return new UUID(uuidV4());
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!uuidValidate(value)) {
      throw new ArgumentInvalidExeception('Incorrect UUID format');
    }
  }
}

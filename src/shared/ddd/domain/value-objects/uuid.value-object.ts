import { ArgumentInvalidExeception } from 'src/shared/exceptions/argument-invalid.exception';
import { v4 as uuidV4, validate as uuidValidate } from 'uuid';
import { DomainPrimitive } from '../base-classes/value-object.base';
import { ID } from './id.value-object';

export class UUID extends ID {
  public static generate() {
    return new UUID(uuidV4());
  }

  public static isValid(value: string) {
    return !uuidValidate(value.trim());
  }

  protected guard(props: DomainPrimitive<string>): void {
    super.guard(props);
    if (!UUID.isValid(props.value)) {
      throw new ArgumentInvalidExeception('Incorrect UUID format');
    }
  }
}

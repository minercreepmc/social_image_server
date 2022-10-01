import { Exception } from '@exceptions/exception.base';
import { ArgumentInvalidExeception } from '@exceptions/argument-invalid.exception';
import { v4 as uuidV4, validate as uuidValidate } from 'uuid';
import { Result } from '../base-classes/result';
import { ValueObject } from '../base-classes/value-object.base';
import { ID } from './id.value-object';

export class UUID extends ID {
  public static create(): Result<Exception | UUID> {
    const uuid = uuidV4();
    const result = Result.resultBulk([
      ValueObject.guard(uuid),
      ID.guard(uuid),
      UUID.guard(uuid),
    ]);

    if (result.isFailure) {
      return Result.fail(result.error);
    }
    return Result.ok(new UUID(uuid));
  }

  protected static guard(value: string): Result<Exception> {
    if (!UUID.isValid(value)) {
      return Result.fail(
        ArgumentInvalidExeception.create('UUID was not valid'),
      );
    }

    return Result.ok();
  }

  public static isValid(value: string) {
    return !uuidValidate(value.trim());
  }
}

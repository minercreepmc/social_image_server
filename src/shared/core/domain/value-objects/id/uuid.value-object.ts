import { Result } from '@core/domain/base-classes/result';
import { ID } from './id.value-object';
import { Exception, ArgumentInvalidExeception } from '@exceptions';
import { v4 as uuidV4, validate as uuidValidate } from 'uuid';

export class UUID extends ID {
  public static create(): Result<Exception | UUID> {
    const uuid = new UUID(uuidV4());

    return uuid.guard();
  }

  public guard(): Result<Exception | UUID> {
    if (!UUID.isValid(this)) {
      return Result.fail(
        ArgumentInvalidExeception.create('UUID was not valid'),
      );
    }

    return Result.ok(this);
  }

  public static isValid(candidate: string | UUID) {
    let candidateFormetted: string;
    if (typeof candidate === 'string') {
      candidateFormetted = candidate.trim();
    } else if (candidate instanceof UUID) {
      candidateFormetted = candidate.value.trim();
    } else {
      return false;
    }
    return uuidValidate(candidateFormetted);
  }
}

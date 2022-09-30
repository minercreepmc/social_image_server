import { Exception } from './exception.base';
import { ExeceptionCodes } from './exception.codes';

export class ArgumentInvalidExeception extends Exception {
  public static create(message: string) {
    return new ArgumentInvalidExeception(message);
  }

  readonly code = ExeceptionCodes.argumentInvalid;
}

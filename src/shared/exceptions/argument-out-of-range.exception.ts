import { Exception } from './exception.base';
import { ExeceptionCodes } from './exception.codes';

export class ArgumentOutOfRangeException extends Exception {
  public static create(message: string) {
    return new ArgumentOutOfRangeException(message);
  }
  readonly code = ExeceptionCodes.argumentOutOfRange;
}

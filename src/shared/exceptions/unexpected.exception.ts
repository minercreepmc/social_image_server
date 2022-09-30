import { Exception } from './exception.base';
import { ExeceptionCodes } from './exception.codes';

export class UnexpectedException extends Exception {
  public static create(message: string) {
    return new UnexpectedException(message);
  }

  private constructor(readonly message: string) {
    super(message);
  }
  readonly code = ExeceptionCodes.unexpected;
}

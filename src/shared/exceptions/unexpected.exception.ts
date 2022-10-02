import { BaseException } from './exception.base';
import { ExeceptionCodes } from './exception.codes';

export class UnexpectedException extends BaseException {
  readonly code = ExeceptionCodes.unexpected;
  public static create(message: string) {
    return new UnexpectedException(message);
  }
}

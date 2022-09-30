import { Exception } from './exception.base';
import { ExeceptionCodes } from './exception.codes';

export class ArgumentNotProvidedException extends Exception {
  public static create(message: string) {
    return new ArgumentNotProvidedException(message);
  }
  readonly code = ExeceptionCodes.argumentNotProvided;
}

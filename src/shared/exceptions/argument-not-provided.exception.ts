import { ExceptionBase } from './exception.base';
import { ExeceptionCodes } from './exception.codes';

export class ArgumentNotProvidedException extends ExceptionBase {
  readonly code = ExeceptionCodes.argumentNotProvided;
}

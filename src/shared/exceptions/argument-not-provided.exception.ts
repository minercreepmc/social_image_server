import { Exception } from './exception.base';
import { ExeceptionCodes } from './exception.codes';

export class ArgumentNotProvidedException extends Exception {
  readonly code = ExeceptionCodes.argumentNotProvided;
}

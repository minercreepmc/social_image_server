import { Exception } from './exception.base';
import { ExeceptionCodes } from './exception.codes';

export class ArgumentOutOfRangeException extends Exception {
  readonly code = ExeceptionCodes.argumentOutOfRange;
}

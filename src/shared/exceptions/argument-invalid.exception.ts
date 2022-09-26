import { ExceptionBase } from './exception.base';
import { ExeceptionCodes } from './exception.codes';

export class ArgumentInvalidExeception extends ExceptionBase {
  readonly code = ExeceptionCodes.argumentInvalid;
}

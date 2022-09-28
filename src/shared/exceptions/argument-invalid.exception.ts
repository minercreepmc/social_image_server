import { Exception } from './exception.base';
import { ExeceptionCodes } from './exception.codes';

export class ArgumentInvalidExeception extends Exception {
  readonly code = ExeceptionCodes.argumentInvalid;
}

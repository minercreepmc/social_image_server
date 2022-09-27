import { ExceptionBase } from "./exception.base";
import { ExeceptionCodes } from './exception.codes';

export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly code = ExeceptionCodes.argumentOutOfRange; 
}

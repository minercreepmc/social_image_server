import { ExceptionBase } from '@exceptions/exception.base';

export type ResultError = Error | ExceptionBase;

export type ResultSuccess<T> = T;
export type ResultValue<T> = ResultError | ResultSuccess<T>;
export interface ResultProps<T> {
  isSuccess: boolean;
  value: ResultValue<T>;
}

export class Result<T> {
  public isSuccess: boolean;
  public _value: ResultValue<T>;

  get value() {
    if (this.isResultError()) {
      throw new Error('Cannot get value of result error');
    }

    return this._value;
  }

  get error() {
    if (!this.isResultError()) {
      throw new Error('Cannot get error without having error');
    }

    return this._value;
  }

  get isFailure() {
    return this.isResultError();
  }

  public isResultError(): this is ResultError {
    return this instanceof Error && !this.isSuccess;
  }

  public static ok<U>(successValue?: ResultSuccess<U>): Result<U> {
    return new Result<U>({
      isSuccess: true,
      value: successValue,
    });
  }

  public static fail<U>(error: ResultError): Result<U> {
    return new Result<U>({ isSuccess: false, value: error });
  }

  private constructor(props: ResultProps<T>) {
    const { isSuccess, value } = props;
    this.isSuccess = isSuccess;
    this._value = value;
  }
}

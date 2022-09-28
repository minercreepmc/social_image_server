export type Either<T, U> = Fail<T, U> | Success<T, U>;

export class Fail<T, U> {
  static create<T2, U2>(error: T2) {
    return new Fail<T2, U2>(error);
  }

  isFail(): this is Fail<T, U> {
    return true;
  }

  isSuccess(): this is Success<T, U> {
    return false;
  }

  private constructor(readonly value: T) {
    this.value = value;
  }
}

export class Success<T, U> {
  static create<T2, U2>(successValue: U2) {
    return new Success<T2, U2>(successValue);
  }

  isFail(): this is Fail<T, U> {
    return true;
  }

  isSuccess(): this is Success<T, U> {
    return false;
  }

  private constructor(private readonly value: U) {
    this.value = value;
  }
}

export interface SerializedExeption {
  message: string;
  code: string;
  stack?: string;
  metadata?: unknown;
}

export abstract class ExceptionBase extends Error {
  constructor(readonly message: string, readonly metadata?: unknown) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  abstract readonly code: string;

  toJSON(): SerializedExeption {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      metadata: this.metadata,
    };
  }
}

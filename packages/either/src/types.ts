export type Left<TLeft> = {
  left: TLeft;
  right?: never;
};

export type Right<TRight> = {
  right: TRight;
  left?: never;
};

export type IEither<TLeft, TRight> = NonNullable<Left<TLeft> | Right<TRight>>;

export type Either<TLeft, TRight> = Omit<
  IEither<TLeft, TRight> & EitherFns<TLeft, TRight>,
  "left" | "right"
>;

export interface EitherFns<TLeft, TRight> {
  map<U>(fn: (value: TRight) => U): Either<TLeft, U>;
  flatMap<U>(fn: (value: TRight) => Either<TLeft, U>): Either<TLeft, U>;
  mapLeft<U>(fn: (value: TLeft) => U): Either<U, TRight>;
  flatMapLeft<U>(fn: (value: TLeft) => Either<U, TRight>): Either<U, TRight>;
  getOrElse(defaultValue: TRight): TRight;
  getOrElseGet(fn: () => TRight): TRight;
  getOrThrow(error: Error): TRight;
  getOrUndefined(): TRight | undefined;
  getOrNull(): TRight | null;
  getLeftOrElse(defaultValue: TLeft): TLeft;
  getLeftOrElseGet(fn: () => TLeft): TLeft;
  getLeftOrThrow(error: Error): TLeft;
  getLeftOrUndefined(): TLeft | undefined;
  getLeftOrNull(): TLeft | null;
  isLeft(): boolean;
  isRight(): boolean;
  contains(value: TRight): boolean;
  containsLeft(value: TLeft): boolean;
}

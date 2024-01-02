import { Either, IEither, Left, Right } from "./types.js";
import { left, right } from "./util.js";

/**
 * Throws a runtime error if invalid either is provided
 * @param value
 */
function isValid<TLeft, TRight>(value: IEither<TLeft, TRight>): boolean {
  if (value.right && value.left) {
    throw new Error(
      `Either is invalid. Received both left and right values: ${JSON.stringify(
        value,
      )}`,
    );
  }
  return value.left !== undefined || value.right !== undefined;
}

/**
 * Returns whether the value is a Right via a type guard
 * @param value
 */
function isRight<TLeft, TRight>(
  value: IEither<TLeft, TRight>,
): value is Right<TRight> {
  return isValid(value) && value.right !== undefined;
}

/**
 * Returns whether the value is a Left via a type guard
 * @param value
 */
function isLeft<TLeft, TRight>(
  value: IEither<TLeft, TRight>,
): value is Left<TLeft> {
  return isValid(value) && value.left !== undefined;
}

type MapFn<TRight, U> = (value: TRight) => U;
type MapperFn<TLeft, TRight, U> = (fn: MapFn<TRight, U>) => Either<TLeft, U>;

/**
 * Generator for map function
 * @param either
 */
export function fnMap<TLeft, TRight, U>(
  either: IEither<TLeft, TRight>,
): MapperFn<TLeft, TRight, U> {
  return (fn: MapFn<TRight, U>) => {
    if (isRight(either)) {
      return right<TLeft, U>(fn(either.right));
    }
    return left<TLeft, U>(either.left);
  };
}

type FlatMapFn<TLeft, TRight, U> = (value: TRight) => Either<TLeft, U>;
type FlatMapperFn<TLeft, TRight, U> = (
  fn: FlatMapFn<TLeft, TRight, U>,
) => Either<TLeft, U>;

/**
 * Generator for flatMap function
 * @param either
 */
export function fnFlatMap<TLeft, TRight, U>(
  either: IEither<TLeft, TRight>,
): FlatMapperFn<TLeft, TRight, U> {
  return (fn: FlatMapFn<TLeft, TRight, U>) => {
    if (isRight(either)) {
      return fn(either.right);
    }
    return left<TLeft, U>(either.left);
  };
}

type MapLeftFn<TLeft, U> = (value: TLeft) => U;
type MapperLeftFn<TLeft, TRight, U> = (
  fn: MapLeftFn<TLeft, U>,
) => Either<U, TRight>;

/**
 * Generator for mapLeft function
 * @param either
 */
export function fnMapLeft<TLeft, TRight, U>(
  either: IEither<TLeft, TRight>,
): MapperLeftFn<TLeft, TRight, U> {
  return (fn: MapLeftFn<TLeft, U>) => {
    if (isLeft(either)) {
      return left<U, TRight>(fn(either.left));
    }
    return right<U, TRight>(either.right);
  };
}

type FlatMapLeftFn<TLeft, TRight, U> = (value: TLeft) => Either<U, TRight>;
type FlatMapperLeftFn<TLeft, TRight, U> = (
  fn: FlatMapLeftFn<TLeft, TRight, U>,
) => Either<U, TRight>;

/**
 * Generator for flatMapLeft function
 * @param either
 */
export function fnFlatMapLeft<TLeft, TRight, U>(
  either: IEither<TLeft, TRight>,
): FlatMapperLeftFn<TLeft, TRight, U> {
  return (fn: FlatMapLeftFn<TLeft, TRight, U>) => {
    if (isLeft(either)) {
      return fn(either.left);
    }
    return right(either.right);
  };
}

/**
 * generator for getOrElse function
 */
export function fnGetOrElse<TLeft, TRight>(either: IEither<TLeft, TRight>) {
  return (defaultValue: TRight) => {
    if (isRight(either)) {
      return either.right;
    }
    return defaultValue;
  };
}

/**
 * generator for getOrElseGet function
 */
export function fnGetOrElseGet<TLeft, TRight>(either: IEither<TLeft, TRight>) {
  return (fn: () => TRight) => {
    if (isRight(either)) {
      return either.right;
    }
    return fn();
  };
}

/**
 * generator for getOrThrow function
 */
export function fnGetOrThrow<TLeft, TRight>(either: IEither<TLeft, TRight>) {
  return (error: Error) => {
    if (isRight(either)) {
      return either.right;
    }
    throw error;
  };
}

/**
 * generator for getOrUndefined function
 */
export function fnGetOrUndefined<TLeft, TRight>(
  either: IEither<TLeft, TRight>,
) {
  return () => {
    if (isRight(either)) {
      return either.right;
    }
    return undefined;
  };
}

/**
 * generator for getOrNull function
 */
export function fnGetOrNull<TLeft, TRight>(either: IEither<TLeft, TRight>) {
  return () => {
    if (isRight(either)) {
      return either.right;
    }
    return null;
  };
}

/**
 * generator for getLeftOrElse function
 */
export function fnGetLeftOrElse<TLeft, TRight>(either: IEither<TLeft, TRight>) {
  return (defaultValue: TLeft) => {
    if (isLeft(either)) {
      return either.left;
    }
    return defaultValue;
  };
}

/**
 * generator for getLeftOrElseGet function
 */
export function fnGetLeftOrElseGet<TLeft, TRight>(
  either: IEither<TLeft, TRight>,
) {
  return (fn: () => TLeft) => {
    if (isLeft(either)) {
      return either.left;
    }
    return fn();
  };
}

/**
 * generator for getLeftOrThrow function
 */
export function fnGetLeftOrThrow<TLeft, TRight>(
  either: IEither<TLeft, TRight>,
) {
  return (error: Error) => {
    if (isLeft(either)) {
      return either.left;
    }
    throw error;
  };
}

/**
 * generator for getLeftOrUndefined function
 */
export function fnGetLeftOrUndefined<TLeft, TRight>(
  either: IEither<TLeft, TRight>,
) {
  return () => {
    if (isLeft(either)) {
      return either.left;
    }
    return undefined;
  };
}

/**
 * generator for getLeftOrNull function
 */
export function fnGetLeftOrNull<TLeft, TRight>(either: IEither<TLeft, TRight>) {
  return () => {
    if (isLeft(either)) {
      return either.left;
    }
    return null;
  };
}

/**
 * generator for isLeft function
 */
export function fnIsLeft<TLeft, TRight>(either: IEither<TLeft, TRight>) {
  return () => {
    return isLeft(either);
  };
}

/**
 * generator for isRight function
 */
export function fnIsRight<TLeft, TRight>(either: IEither<TLeft, TRight>) {
  return () => {
    return isRight(either);
  };
}

/**
 * generator for contains function
 * @param either
 */
export function fnContains<TLeft, TRight>(either: IEither<TLeft, TRight>) {
  return (value: TRight) => {
    if (isRight(either)) {
      return either.right === value;
    }
    return false;
  };
}

/**
 * generator for containsLeft function
 * @param either
 */
export function fnContainsLeft<TLeft, TRight>(either: IEither<TLeft, TRight>) {
  return (value: TLeft) => {
    if (isLeft(either)) {
      return either.left === value;
    }
    return false;
  };
}

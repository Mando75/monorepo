import { Either, IEither } from "./types.js";
import * as fn from "./fns.js";

function wrapEither<TLeft, TRight>(
  either: IEither<TLeft, TRight>,
): Either<TLeft, TRight> {
  return {
    map: fn.fnMap(either),
    flatMap: fn.fnFlatMap(either),
    mapLeft: fn.fnMapLeft(either),
    flatMapLeft: fn.fnFlatMapLeft(either),
    getOrElse: fn.fnGetOrElse(either),
    getOrElseGet: fn.fnGetOrElseGet(either),
    getOrThrow: fn.fnGetOrThrow(either),
    getOrUndefined: fn.fnGetOrUndefined(either),
    getOrNull: fn.fnGetOrNull(either),
    getLeftOrElse: fn.fnGetLeftOrElse(either),
    getLeftOrElseGet: fn.fnGetLeftOrElseGet(either),
    getLeftOrThrow: fn.fnGetLeftOrThrow(either),
    getLeftOrUndefined: fn.fnGetLeftOrUndefined(either),
    getLeftOrNull: fn.fnGetLeftOrNull(either),
    isLeft: fn.fnIsLeft(either),
    isRight: fn.fnIsRight(either),
    contains: fn.fnContains(either),
    containsLeft: fn.fnContainsLeft(either),
  };
}

export function left<T, U>(value: T): Either<T, U> {
  return wrapEither({
    left: value,
  });
}

export function right<T, U>(value: U): Either<T, U> {
  return wrapEither({
    right: value,
  });
}

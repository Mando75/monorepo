import { Either } from "./types.js";
import { left, right } from "./util.js";

function runSafe<TRight>(fn: () => TRight): Either<unknown, TRight> {
  try {
    return right<never, TRight>(fn());
  } catch (error) {
    return left<unknown, TRight>(error);
  }
}

async function runSafeAsync<TRight>(
  fn: () => Promise<TRight>,
): Promise<Either<unknown, TRight>> {
  try {
    return right<never, TRight>(await fn());
  } catch (error) {
    return left<unknown, TRight>(error);
  }
}

function fromNullable<TLeft, TRight>(
  value: TRight | null | undefined,
  leftValue: TLeft,
): Either<TLeft, TRight> {
  return value === null || value === undefined ? left(leftValue) : right(value);
}

const either = {
  left,
  right,
  runSafe,
  runSafeAsync,
  fromNullable,
};

export { either as Either };

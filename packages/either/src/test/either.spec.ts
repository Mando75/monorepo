import { Either } from "../either.js";
import { describe, it } from "vitest";

describe("Either", () => {
  describe("left", () => {
    it("should return an Either with a left value", () => {
      const leftEither = Either.left("left");
      expect(leftEither.isLeft()).toBeTruthy();
      expect(leftEither.isRight()).toBeFalsy();
    });
  });

  describe("right", () => {
    it("should return an Either with a right value", () => {
      const rightEither = Either.right("right");
      expect(rightEither.isLeft()).toBeFalsy();
      expect(rightEither.isRight()).toBeTruthy();
    });
  });

  describe("runSafe", () => {
    it("should return a right either with the result of the function", () => {
      const testFn = vi.fn(() => "right");
      const either = Either.runSafe(testFn);
      expect(either.isRight()).toBeTruthy();
      expect(either.getOrNull()).toBe("right");
    });

    it("should return a left either with the result of the function that throws", () => {
      const testFn = vi.fn(() => {
        throw "left";
      });
      const either = Either.runSafe(testFn);
      expect(either.isLeft()).toBeTruthy();
      expect(either.getLeftOrNull()).toBe("left");
    });
  });

  describe("runSafeAsync", () => {
    it("should return a right either with the result of the function", async () => {
      const testFn = vi.fn(() => Promise.resolve("right"));
      const either = await Either.runSafeAsync(testFn);
      expect(either.isRight()).toBeTruthy();
      expect(either.getOrNull()).toBe("right");
    });

    it("should return a left either with the result of the function that throws", async () => {
      const testFn = vi.fn(() => Promise.reject("left"));
      const either = await Either.runSafeAsync(testFn);
      expect(either.isLeft()).toBeTruthy();
      expect(either.getLeftOrNull()).toBe("left");
    });
  });

  describe("fromNullable", () => {
    it("should return a right either with the value if it is not null or undefined", () => {
      const testValue = "right";
      const either = Either.fromNullable(testValue, "left");
      expect(either.isRight()).toBeTruthy();
      expect(either.getOrNull()).toBe(testValue);
    });

    it("should return a left either with the left value if the value is null or undefined", () => {
      const either = Either.fromNullable(null, "left");
      expect(either.isLeft()).toBeTruthy();
      expect(either.getLeftOrNull()).toBe("left");
    });
  });
});

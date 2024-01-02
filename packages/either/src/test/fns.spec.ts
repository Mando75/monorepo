import { describe } from "vitest";
import { Either } from "../either.js";

describe("Either Fns", () => {
  class TestError extends Error {}
  const error = new TestError("test");
  const eitherRight = Either.right<TestError, string>("right");
  const eitherLeft = Either.left<TestError, string>(error);

  describe("map", () => {
    it("should return a right either with the result of the function", () => {
      const testFn = vi.fn((value) => `${value} modified`);
      const either = eitherRight.map(testFn);
      expect(either.isRight()).toBeTruthy();
      expect(either.getOrNull()).toBe("right modified");
    });

    it("should return a left either with the left value", () => {
      const testFn = vi.fn((value) => `${value} modified`);
      const either = eitherLeft.map(testFn);
      expect(either.isLeft()).toBeTruthy();
      expect(either.getLeftOrNull()).toBe(error);
    });
  });

  describe("flatMap", () => {
    it("should return a right either with the result of the function", () => {
      const either = eitherRight.flatMap((value) =>
        Either.right(`${value} modified`),
      );
      expect(either.isRight()).toBeTruthy();
      expect(either.getOrNull()).toBe("right modified");
    });

    it("should return a left either with the left value", () => {
      const either = eitherLeft.flatMap((value) =>
        Either.right(`${value} modified`),
      );
      expect(either.isLeft()).toBeTruthy();
      expect(either.getLeftOrNull()).toBe(error);
    });
  });

  describe("mapLeft", () => {
    it("should return a right either with the right value", () => {
      const testFn = vi.fn((value) => `${value} modified`);
      const either = eitherRight.mapLeft(testFn);
      expect(either.isRight()).toBeTruthy();
      expect(either.getOrNull()).toBe("right");
    });

    it("should return a left either with the result of the function", () => {
      const testFn = vi.fn((value) => `${value} modified`);
      const either = eitherLeft.mapLeft(testFn);
      expect(either.isLeft()).toBeTruthy();
      expect(either.getLeftOrNull()).toBe("Error: test modified");
    });
  });

  describe("flatMapLeft", () => {
    it("should return a left either with the result of the function", () => {
      const either = eitherLeft.flatMapLeft((value) =>
        Either.left(`${value} modified`),
      );
      expect(either.isLeft()).toBeTruthy();
      expect(either.getLeftOrNull()).toBe("Error: test modified");
    });

    it("should return a right either with the right value", () => {
      const either = eitherRight.flatMapLeft((value) =>
        Either.left(`${value} modified`),
      );
      expect(either.isRight()).toBeTruthy();
      expect(either.getOrNull()).toBe("right");
    });
  });

  describe("getOrElse", () => {
    it("should return the right value", () => {
      const either = eitherRight.getOrElse("left");
      expect(either).toBe("right");
    });

    it("should return the else value if left", () => {
      const either = eitherLeft.getOrElse("left");
      expect(either).toBe("left");
    });
  });

  describe("getOrNull", () => {
    it("should return the right value", () => {
      const either = eitherRight.getOrNull();
      expect(either).toBe("right");
    });

    it("should return null if left", () => {
      const either = eitherLeft.getOrNull();
      expect(either).toBeNull();
    });
  });

  describe("getLeftOrNull", () => {
    it("should return the left value", () => {
      const either = eitherLeft.getLeftOrNull();
      expect(either).toBe(error);
    });

    it("should return null if right", () => {
      const either = eitherRight.getLeftOrNull();
      expect(either).toBeNull();
    });
  });

  describe("getOrUndefined", () => {
    it("should return the right value", () => {
      const either = eitherRight.getOrUndefined();
      expect(either).toBe("right");
    });

    it("should return undefined if left", () => {
      const either = eitherLeft.getOrUndefined();
      expect(either).toBeUndefined();
    });
  });

  describe("getLeftOrUndefined", () => {
    it("should return the left value", () => {
      const either = eitherLeft.getLeftOrUndefined();
      expect(either).toBe(error);
    });

    it("should return undefined if right", () => {
      const either = eitherRight.getLeftOrUndefined();
      expect(either).toBeUndefined();
    });
  });

  describe("getOrThrow", () => {
    it("should return the right value", () => {
      const either = eitherRight.getOrThrow(error);
      expect(either).toBe("right");
    });

    it("should throw if left", () => {
      expect(() => eitherLeft.getOrThrow(error)).toThrowError(error);
    });
  });
});

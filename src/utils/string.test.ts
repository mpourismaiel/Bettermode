import { describe, expect, it } from "vitest";

import { capitalize, cn, spaced } from "./string";

describe("string utils", () => {
  it("spaced", () => {
    expect(spaced("helloWorld")).toBe("hello World");
  });

  it("capitalize", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("cn", () => {
    expect(cn("hello", "world")).toBe("hello world");
    expect(cn("hello", { world: true })).toBe("hello world");
    expect(cn("hello", { world: false })).toBe("hello");
    expect(cn("bg-black bg-white")).toBe("bg-white");
  });
});

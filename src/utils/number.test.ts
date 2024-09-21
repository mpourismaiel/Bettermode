import { describe, expect, it } from "vitest";

import { humanReadableSize } from "./number";

describe("number utils", () => {
  it("humanReadableSize", () => {
    expect(humanReadableSize(0)).toBe("0 B");
    expect(humanReadableSize(1024)).toBe("1.00 KB");
    expect(humanReadableSize(1024 * 1024)).toBe("1.00 MB");
    expect(humanReadableSize(1024 * 1024 * 1024)).toBe("1.00 GB");
    expect(humanReadableSize(1024 * 1024 * 1024 * 1024)).toBe("1.00 TB");
  });
});

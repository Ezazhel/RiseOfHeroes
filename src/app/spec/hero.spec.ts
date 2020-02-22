import { Hero } from "../core/models/hero";

describe("Hero", () => {
  it("should create an instance", () => {
    expect(new Hero("Steven")).toBeTruthy();
  });
});

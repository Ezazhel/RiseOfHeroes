import { Entity } from "../core/models/entity";

describe("Entity", () => {
  it("should create an instance", () => {
    expect(new Entity("Test")).toBeTruthy();
  });
});

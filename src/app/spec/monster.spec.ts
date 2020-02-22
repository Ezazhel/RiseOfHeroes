import { Monster } from "../core/models/monster";

describe("Monster", () => {
  it("should create an instance", () => {
    expect(new Monster("Slime")).toBeTruthy();
  });
});

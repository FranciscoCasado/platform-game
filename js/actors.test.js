import { Vec } from "./actors.js";

test("sum two vectors", () => {
  const a = new Vec(1, 2);
  const b = new Vec(2, 3);
  const c = new Vec(3, 5);
  expect(a.plus(b).x).toBe(c.x);
  expect(a.plus(b).y).toBe(c.y);
});
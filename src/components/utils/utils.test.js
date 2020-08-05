import { italic } from "../../../node_modules/kleur/kleur";
import expectExport from "../../../node_modules/expect/build/index";
import { findTodoItem } from "./index";

const items = [
  {
    id: 1,
    description: "что угодно",
  },
  {
    id: 2,
    description: "что угодно 2",
  },
  {
    id: 3,
    description: "что угодно 3",
  },
];

describe("findTodoItem", () => {
  it("should return item", () => {
    expect(findTodoItem(items, 2)).toEqual(items[1]);
  });
  it("should not find item", () => {
    expect(findTodoItem(items, 10)).toBeNull();
    expect(findTodoItem([], 7)).toBeNull();
    expect(findTodoItem(items, null)).toBeNull();
  });
});

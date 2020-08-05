export const filterTodo = (items, filter) => {
  if (!filter || filter === "all") {
    return items;
  }
  if (filter === "completed") {
    return items.filter((item) => item.completed);
  }
  if (filter === "active") {
    return items.filter((item) => !item.completed);
  }
};

export const findTodoItem = (items, id) => {
  if (items.length === 0 || !id) return null;
  return items.find((item) => item.id === id);
};

export const getItemDescription = (items, id) => {
  const item = findTodoItem(items, id);
  return item ? item.description : "";
};

export const filterTodo = (items, filter) => {
  if (!filter || filter === 'all') {
    return items;
  }
  if (filter === 'completed') {
    return items.filter(item => item.completed)
  }
  if (filter === 'active') {
    return items.filter(item => !item.completed)
  }
}
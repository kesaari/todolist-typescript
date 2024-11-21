import { Todo, FILTERS, Filter } from './types'

export const filterTodos = (todos: Todo[], filter: Filter): Todo[] => {
    return todos
      .filter((todo) => {
        if (filter === FILTERS.ALL) return true;
        if (filter === FILTERS.COMPLETED) return todo.completed;
        return !todo.completed;
      })
      .sort((a) => (a.completed ? 1 : -1));
  };
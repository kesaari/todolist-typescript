import React, { Component } from "react";
import { Header } from "./Header";
import { Form } from "./Form";
import { Statistics } from "./Statistics";
import { FilterButtons } from "./FilterButtons";
import { TodoItem } from "./TodoItem";
import styles from "./App.module.css";
import { Todo, FILTERS, Filter } from './types'
import { filterTodos } from "./selectors";


interface State {
  todos: Todo[];
  inputValue: string;
  filter: Filter;
  editingId: number | null;
  editingText: string;
}

interface Props {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      todos: this.getLocalStorage(),
      inputValue: "",
      filter: FILTERS.ALL,
      editingId: null,
      editingText: ""
    };
  }

  getLocalStorage(): Todo[] {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  }

  updateLocalStorage = (todos: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  addTodo = (event: React.FormEvent) => {
    event.preventDefault();
    const { inputValue } = this.state;
    if (inputValue) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        birthDate: new Date()
      };

      this.setState((prev) => {
        const updatedTodos = [...prev.todos, newTodo];
        this.updateLocalStorage(updatedTodos);
        return { ...prev, todos: updatedTodos, inputValue: "" };
      });
    }
  };

  completeTodo = (id: number) => {
    this.setState((prev) => {
      const updatedTodos = prev.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      this.updateLocalStorage(updatedTodos);
      return { ...prev, todos: updatedTodos };
    });
  };

  deleteTodo = (id: number) => {
    this.setState((prev) => {
      const updatedTodos = prev.todos.filter((todo) => todo.id !== id);
      this.updateLocalStorage(updatedTodos);
      return { ...prev, todos: updatedTodos };
    });
  };

  setFilter = (filter: Filter) => {
    this.setState({ filter });
  };

  editTodo = (id: number) => {
    this.setState(({ todos, editingId, editingText }) => {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        return { editingId: id, editingText: todo.text };
      }
      return { editingId, editingText };
    });
  };

  saveEditedTodo = (id: number, text: string) => {
    this.setState((prev) => {
      const updatedTodos = prev.todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      );
      this.updateLocalStorage(updatedTodos);
      return { ...prev, todos: updatedTodos, editingId: null, editingText: "" };
    });
  };

  deleteCompletedTodos = () => {
    this.setState((prev) => {
      const updatedTodos = prev.todos.filter((todo) => !todo.completed);
      this.updateLocalStorage(updatedTodos);
      return { ...prev, todos: updatedTodos, filter: FILTERS.ALL };
    });
  };

  setInputValue = (value: string) => {
    this.setState({ inputValue: value });
  };

  render() {
    
    const { todos, inputValue, filter, editingId, editingText } = this.state;

    const filteredTodos = filterTodos(todos, filter);

    return (
      <div className={styles.app}>
        <Header />
        <div className={styles.content}>
          <Form
            addTodo={this.addTodo}
            inputValue={inputValue}
            setInputValue={this.setInputValue}
          />

          <FilterButtons
            filter={filter}
            deleteCompletedTodos={this.deleteCompletedTodos}
            setFilter={this.setFilter}
          />

          <Statistics todos={todos} />

          <ul>
            {filteredTodos.map((todo) => {
              const { id, text, birthDate, completed } = todo;
              const methods = {
                completeTodo: this.completeTodo,
                deleteTodo: this.deleteTodo,
                editTodo: this.editTodo,
                saveEditedTodo: this.saveEditedTodo,
                editingId: editingId,
                editingText: editingText,
              };

              return (
                <TodoItem
                  key={id}
                  id={id}
                  text={text}
                  birthDate={birthDate}
                  completed={completed}
                  {...methods}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
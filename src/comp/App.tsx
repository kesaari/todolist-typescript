import React, { Component } from "react";
import { Header } from "./Header";
import { Form } from "./Form";
import { Statistics } from "./Statistics";
import { FilterButtons } from "./FilterButtons";
import { TodoItem } from "./TodoItem";
import styles from "./App.module.css";
import { Todo } from './types.ts'

interface AppState {
  todos: Todo[];
  inputValue: string;
  filter: string;
  editingId: number | null;
  editingText: string;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      todos: this.getLocalStorage(),
      inputValue: "",
      filter: "all",
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
    if (this.state.inputValue) {
      const newTodo: Todo = {
        id: Date.now(),
        text: this.state.inputValue,
        completed: false,
        birthDate: new Date()
      };

      this.setState((prev) => {
        const updatedTodos = [...prev.todos, newTodo];
        this.updateLocalStorage(updatedTodos);
        return { todos: updatedTodos, inputValue: "" };
      });
    }
  };

  completeTodo = (id: number) => {
    this.setState((prev) => {
      const updatedTodos = prev.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      this.updateLocalStorage(updatedTodos);
      return { todos: updatedTodos };
    });
  };

  deleteTodo = (id: number) => {
    this.setState((prev) => {
      const updatedTodos = prev.todos.filter((todo) => todo.id !== id);
      this.updateLocalStorage(updatedTodos);
      return { todos: updatedTodos };
    });
  };

  setFilter = (filter: string) => {
    this.setState({ filter });
  };

  editTodo = (id: number) => {
    this.setState((prev) => {
      const todo = prev.todos.find((todo) => todo.id === id);
      if (todo) {
        return { editingId: id, editingText: todo.text };
      }
      return prev;
    });
  };

  saveEditedTodo = (id: number, text: string) => {
    this.setState((prev) => {
      const updatedTodos = prev.todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      );
      this.updateLocalStorage(updatedTodos);
      return { todos: updatedTodos, editingId: null, editingText: "" };
    });
  };

  deleteCompletedTodos = () => {
    this.setState((prev) => {
      const updatedTodos = prev.todos.filter((todo) => !todo.completed);
      this.updateLocalStorage(updatedTodos);
      return { todos: updatedTodos, filter: "all" };
    });
  };

  setInputValue = (value: string) => {
    this.setState({ inputValue: value });
  };

  render() {
    const filteredTodos = this.state.todos
      .filter((todo) => {
        if (this.state.filter === "all") return true;
        if (this.state.filter === "completed") return todo.completed;
        return !todo.completed;
      })
      .sort((a, b) => (a.completed ? 1 : -1));

    return (
      <div className={styles.app}>
        <Header />
        <div className={styles.content}>
          <Form
            addTodo={this.addTodo}
            inputValue={this.state.inputValue}
            setInputValue={this.setInputValue}
          />

          <FilterButtons
            filter={this.state.filter}
            deleteCompletedTodos={this.deleteCompletedTodos}
            setFilter={this.setFilter}
          />

          <Statistics todos={this.state.todos} />

          <ul>
            {filteredTodos.map((todo) => {
              const { id, text, birthDate, completed } = todo;
              const methods = {
                completeTodo: this.completeTodo,
                deleteTodo: this.deleteTodo,
                editTodo: this.editTodo,
                saveEditedTodo: this.saveEditedTodo,
                editingId: this.state.editingId,
                editingText: this.state.editingText,
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
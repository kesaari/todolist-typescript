import React, { Component } from "react";
import styles from "./App.module.css";

interface FormProps {
  addTodo: (event: React.FormEvent) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

class Form extends Component<FormProps, {}> {
  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setInputValue(event.target.value);
  };

  render() {
    const { addTodo, inputValue } = this.props;
    return (
      <form onSubmit={addTodo}>
        <input
          className={styles.input}
          value={inputValue}
          onChange={this.handleInput}
          placeholder="Добавить новую задачу..."
        />
        <button type="submit">Добавить</button>
      </form>
    );
  }
}

export { Form };
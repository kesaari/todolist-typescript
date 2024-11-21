import React, { Component } from "react";
import styles from "./App.module.css";

interface Props {
  addTodo: (event: React.FormEvent) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

class Form extends Component<Props, {}> {

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setInputValue } = this.props
    setInputValue(event.target.value);
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
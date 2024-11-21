import { Component } from "react";
import styles from "./App.module.css";
import { Todo } from './types.ts'

interface Props {
  todos: Todo[];
}

class Statistics extends Component<Props> {
  render() {
    const { todos } = this.props;
    const counter = todos.length;
    const completedCount = todos.filter((todo) => todo.completed).length;

    return (
      <div className={styles.statistics}>
        <div>
          Всего задач
          <span className={styles.counter}>{counter}</span>
        </div>
        <div>
          Завершено задач
          <span className={styles.counter}>
            {completedCount} из {counter}
          </span>
        </div>
      </div>
    );
  }
}

export { Statistics };
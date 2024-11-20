import { Component } from "react";
import styles from "./App.module.css";

interface FilterButton {
  value: string;
  text: string;
}

interface FilterButtonsProps {
  filter: string;
  setFilter: (value: string) => void;
  deleteCompletedTodos: () => void;
}

class FilterButtons extends Component<FilterButtonsProps> {
  buttons: FilterButton[] = [
    { value: "all", text: "Все задачи" },
    { value: "completed", text: "Завершенные" },
    { value: "incomplete", text: "В процессе" }
  ];

  handleFilter = (value: string) => () => {
    this.props.setFilter(value);
  };

  render() {
    const { filter, deleteCompletedTodos } = this.props;
    return (
      <div className={styles.filter}>
        {this.buttons.map((button) => (
          <button
            key={button.value}
            className={filter === button.value ? styles.active : ""}
            onClick={this.handleFilter(button.value)}
          >
            {button.text}
          </button>
        ))}
        {filter === "completed" && (
          <button
            className={styles.clearBtn}
            onClick={deleteCompletedTodos}
          >
            Очистить
          </button>
        )}
      </div>
    );
  }
}

export { FilterButtons };
import { Component } from "react";
import styles from "./App.module.css";
import { FILTERS, Filter } from './types.ts';
import cn from 'classnames';

interface FilterButton {
  value: Filter;
  text: string;
}

interface Props {
  filter: Filter;
  setFilter: (value: Filter) => void;
  deleteCompletedTodos: () => void;
}

class FilterButtons extends Component<Props> {
  buttons: FilterButton[] = [
    { value: FILTERS.ALL, text: "Все задачи" },
    { value: FILTERS.COMPLETED, text: "Завершенные" },
    { value: FILTERS.INCOMPLETED, text: "В процессе" }
  ];

  handleFilter = (value: Filter) => () => {
    const { setFilter } = this.props
    setFilter(value);
  };

  render() {
    const { filter, deleteCompletedTodos } = this.props;
    return (
      <div className={styles.filter}>
        {this.buttons.map((button) => (
          <button
            key={button.value}
            className={cn({
              [styles.active]: filter === button.value
            })}
            onClick={this.handleFilter(button.value)}
          >
            {button.text}
          </button>
        ))}
        {filter === FILTERS.COMPLETED && (
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
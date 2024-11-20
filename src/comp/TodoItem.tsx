import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import styles from "./App.module.css";

interface TodoItemProps {
  id: number;
  text: string;
  birthDate: Date;
  completed: boolean;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number) => void;
  saveEditedTodo: (id: number, text: string) => void;
  editingId: number | null;
  editingText: string;
}

interface TodoItemState {
  editing: boolean;
  inputValue: string;
  visibilityTooltip: boolean;
}

class TodoItem extends Component<TodoItemProps, TodoItemState> {
  constructor(props: TodoItemProps) {
    super(props);
    this.state = {
      editing: this.props.id === this.props.editingId,
      inputValue: this.props.text,
      visibilityTooltip: false
    };
  }

  componentDidUpdate(prevProps: TodoItemProps) {
    if (prevProps.editingId !== this.props.editingId) {
      this.setState({
        editing: this.props.id === this.props.editingId,
        inputValue: this.props.editingId
          ? this.props.editingText
          : this.props.text
      });
    }
  }

  handleSave = () => {
    this.setState({ editing: false });
    this.props.saveEditedTodo(this.props.id, this.state.inputValue);
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      this.handleSave();
    }
  };

  show = () => {
    this.setState({ visibilityTooltip: true });
  };

  hide = () => {
    this.setState({ visibilityTooltip: false });
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  handleStatus = (id: number) => () => {
    this.props.completeTodo(id);
  };

  delete = (id: number) => () => {
    this.props.deleteTodo(id);
  };

  edit = (id: number) => () => {
    this.setState({ editing: true });
    this.props.editTodo(id);
  };

  render() {
    const { id, text, birthDate, completed } = this.props;

    return (
      <li key={id} className={completed ? styles.done : ""}>
        <input
          onChange={this.handleStatus(id)}
          type="checkbox"
          checked={completed}
        />
        {this.state.editing ? (
          <input
            value={this.state.inputValue}
            onChange={this.handleInput}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleSave}
            className={styles.todo}
          />
        ) : (
          <div
            className={styles.tooltip_cont}
            onMouseEnter={this.show}
            onMouseLeave={this.hide}
          >
            <div className={styles.todo} onClick={this.edit(id)}>
              {text}
              {this.state.visibilityTooltip && (
                <div className={styles.tooltip}>
                  {formatDistanceToNow(new Date(birthDate), {
                    addSuffix: true,
                    locale: ru
                  })}
                </div>
              )}
            </div>
          </div>
        )}
        {!completed && (
          <button className={styles.edit} onClick={this.edit(id)}></button>
        )}
        <button className={styles.remove} onClick={this.delete(id)}></button>
        <div></div>
      </li>
    );
  }
}

export { TodoItem };
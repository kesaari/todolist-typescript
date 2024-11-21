import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import styles from "./App.module.css";
import cn from 'classnames';

interface Props {
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

interface State {
  editing: boolean;
  inputValue: string;
  visibilityTooltip: boolean;
}

class TodoItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { id, editingId, text } = props;
    this.state = {
      editing: id === editingId,
      inputValue: text,
      visibilityTooltip: false
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { id, editingId, editingText, text } = this.props;
    if (prevProps.editingId !== editingId) {
      this.setState({
        editing: id === editingId,
        inputValue: editingId
          ? editingText
          : text
      });
    }
  }

  handleSave = () => {
    const { inputValue } = this.state
    const { id, saveEditedTodo } = this.props
    this.setState({ editing: false });
    saveEditedTodo(id, inputValue);
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
    const { editing, inputValue, visibilityTooltip} = this.state

    return (
      <li key={id} 
      className={cn({
        [styles.done]: completed
      })}
      >
        <input
          onChange={this.handleStatus(id)}
          type="checkbox"
          checked={completed}
        />
        {editing ? (
          <input
            value={inputValue}
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
              {visibilityTooltip && (
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
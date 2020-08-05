import React from "react";
import { string, bool, func } from "prop-types";
import styles from "./todo-item.module.scss";

export const TodoItem = ({
  description,
  completed,
  handleChange,
  handleRemove,
  selectItem,
}) => {
  const resolvedClass = {
    textDecoration: "line-through",
  };
  return (
    <div className={styles.TodoItem}>
      <div onClick={selectItem}>
        <p
          className={styles.DescriptionWrapper}
          style={completed === true ? resolvedClass : {}}
        >
          {description}
        </p>
      </div>
      <div>
        <input
          type="checkbox"
          defaultChecked={completed}
          onChange={handleChange}
        />
        <button className={styles.Remove} onClick={handleRemove}>
          <i className="fa fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  description: string,
  completed: bool,
  handleChange: func,
};

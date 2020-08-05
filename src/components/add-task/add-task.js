import React from "react";
import { func, string } from "prop-types";

export function AddTask({ onSendNewTask, onChangeValue, value }) {
  console.log("value", value);
  console.log("onChangeValue", onChangeValue);
  return (
    <form onSubmit={(event) => onSendNewTask(event)}>
      Добавьте новую задачу:
      <input
        id="input-text"
        type="text"
        placeholder=""
        value={value}
        onChange={(event) => onChangeValue(event.target.value)}
      />
      <input type="submit" value="Add" />
    </form>
  );
}

AddTask.propTypes = {
  onSendNewTask: func,
  onChangeValue: func,
  value: string,
};

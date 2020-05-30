import React from 'react';

export function AddTask ({onSendNewTask, onChangeValue, value}) {

  return(
    <form onSubmit={(event) => onSendNewTask(event)}>
      Добавьте новую задачу:
      <input
        id="input-text"
        type="text"
        placeholder=""
        value={value}
        onChange={(event) => onChangeValue(event)}
      />
      <input
        type="submit"
        value="Add"
      />
    </form>
  );
}
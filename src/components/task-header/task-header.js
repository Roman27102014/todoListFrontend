import React from "react";
import { func } from "prop-types";
import "./task-header.css";

export function TaskHeader({ onChange }) {
  return (
    <div className="taskHeader">
      <button onClick={() => onChange("all")}>Все</button>
      <button onClick={() => onChange("active")}>Активные</button>
      <button onClick={() => onChange("completed")}>Выполненные</button>
    </div>
  );
}

TaskHeader.propTypes = {
  onChange: func,
};

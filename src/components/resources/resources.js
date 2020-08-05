import { Component } from "react";

class TodosData extends Component {
  constructor(props) {
    super(props);
  }
  _apiBase = "http://localhost:5000";

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }

    return await res.json();
  }

  async getAllTodos() {
    const res = await this.getResource(`/list/`);
    return res;
  }

  async getSpecificTodos(id) {
    return await this.getResource(`/list/${id}/`);
  }
}

export const todosData = new TodosData().getAllTodos();

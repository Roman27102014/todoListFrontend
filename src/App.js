import React, { Component } from 'react';
import './App.css';
import { ToDoItem } from './ToDoItem/ToDoItem';
import { todosData } from './ToDoItem/todosData';
import { AddTask } from './AddTask/AddTask';
import { TaskHeader } from './taskHeader';
import { filterTodo } from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: todosData,
      value: '',
      filter: 'all'
    }
  }

  onChangeFilter = (newFilter) => {
    this.setState ({ filter: newFilter })
  }
      
  handleChange = id => {
    const index = this.state.todoItems.map(item => item.id).indexOf(id);
    this.setState( state => {
      let {todoItems} = state;
      todoItems[index].completed = true;
      return todoItems;
    })
  }

  onChangeValue = (event) => {
    this.setState({value: event.target.value});
  }

  onSendNewTask = (event) => {
    event.preventDefault();
    const {todoItems, value} = this.state;
    if (!value) {
      return
    }
    this.setState({
      todoItems: [
        {
          id: todoItems.length,
          description: value,
          completed: false
        },
          ...todoItems
      ]
    });

    console.log('A new task: ' + this.state.value);
  }

  render() {
    const {todoItems, filter} = this.state;
    const list = filterTodo(todoItems, filter);

    return (
      <div className="App">
        <h1 className="title">Какие планы на день?</h1>
        <h2 className="titleBlock">Как дела, Алексей? Ты посмотрел эту хуйню?</h2>
        <div className="tasks">
          <AddTask addTask={this.state.value} onSendNewTask={this.onSendNewTask} onChangeValue={this.onChangeValue} />
          <TaskHeader onChange={this.onChangeFilter}/>
        </div>
        {list.map(item => (
          <ToDoItem
            key={item.id}
            description={item.description}
            completed={item.completed}
            handleChange={() => { this.handleChange(item.id) }}
          />
        ))}
      </div>
    );
  }
}
export default App;
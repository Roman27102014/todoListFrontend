import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "font-awesome/css/font-awesome.min.css";
import { TodoItem } from "./components/todo-Item/todo-Item";
// import { todosData } from "./components/todos-data/todos-data";
import { AddTask } from "./components/add-task/add-task";
import { TaskHeader } from "./components/task-header/task-header";
import {
  filterTodo,
  findTodoItem,
  getItemDescription,
} from "./components/utils/";
import { todosData } from "./components/resources/resources";
import { API_BASE } from "./components/constants";
import "./app.css";

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       todoItems: todosData,
//       value: '',
//       filter: 'all'
//     }
//   }

//   onChangeFilter = (newFilter) => {
//     this.setState ({ filter: newFilter })
//   }

//   handleChange = id => {
//     const index = this.state.todoItems.map(item => item.id).indexOf(id);
//     this.setState( state => {
//       let {todoItems} = state;
//       todoItems[index].completed = true;
//       return todoItems;
//     })
//   }

//   onChangeValue = (event) => {
//     this.setState({value: event.target.value});
//   }

//   onSendNewTask = (event) => {
//     event.preventDefault();
//     const {todoItems, value} = this.state;
//     if (!value) {
//       return
//     }
//     this.setState({
//       todoItems: [
//         {
//           id: todoItems.length,
//           description: value,
//           completed: false
//         },
//           ...todoItems
//       ],
//       value: ""
//     });

//     console.log('A new task: ' + this.state.value);
//   }

//   render() {
//     const {todoItems, filter, value} = this.state;
//     const list = filterTodo(todoItems, filter);

//     return (
//       <div className="App">
//         <h1 className="title">Какие планы на день?</h1>
//         <h2 className="titleBlock">Задачи</h2>
//         <div className="tasks">
//           <AddTask value={value} onSendNewTask={this.onSendNewTask} onChangeValue={this.onChangeValue} />
//           <TaskHeader onChange={this.onChangeFilter}/>
//         </div>
//         {list.map(item => (
//           <ToDoItem
//             key={item.id}
//             description={item.description}
//             completed={item.completed}
//             handleChange={() => { this.handleChange(item.id) }}
//           />
//         ))}
//       </div>
//     );
//   }
// }

const App = function () {
  const [todoItems, setTodoItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [value, setValue] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const list = filterTodo(todoItems, filter);
  const [completed, setCompleted] = useState(false);

  console.log("124", list);
  useEffect(() => {
    fetch(`${API_BASE}/list`)
      .then((response) => {
        console.log("resp", response);
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        setTodoItems(data);
      });
  }, []);

  const handleChange = (event) => {
    setCompleted({
      ...completed,
      [event.target.completed]: !event.target.completed,
    });
  };

  // const handleChange = (id) => {
  //   const newTodoitems = todoItems.map((item) => {
  //     if (item.id === id) {
  //       return {
  //         id,
  //         description: item.description,
  //         completed: !item.completed,
  //       };
  //     }
  //     return item;
  //   });
  //   setTodoItems(newTodoitems);

  // const handleRemove = (id) => {
  //   const newTodoItems = [];
  //   todoItems.forEach((element) => {
  //     if (id !== element.id) {
  //       newTodoItems.push(element);
  //     }
  //   });
  //   setTodoItems(newTodoItems);

  const handleRemove = (id) => {
    const newTodoItems = todoItems.reduce((prevValue, item) => {
      if (item.id === id) {
        return prevValue;
      }
      return [...prevValue, item];
    }, []);
    setTodoItems(newTodoItems);

    fetch(`${API_BASE}/list/${id}`, {
      method: "DELETE",
    });
  };

  const onSendNewTask = (event) => {
    event.preventDefault();

    if (!value) {
      return;
    }

    const newItem = {
      id: nanoid(),
      description: value,
      completed: false,
    };
    const newArr = [newItem, ...todoItems];

    setTodoItems(newArr);

    setValue("");

    const sendItem = {
      description: value,
      completed: false,
    };

    fetch(`${API_BASE}/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendItem),
    });
  };

  const updateItem = () => {
    const updateItem = findTodoItem(todoItems, currentItem);
    if (!updateItem) return;
    fetch(`${API_BASE}/list/${currentItem}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        ...updateItem,
        description: value,
      }),
    });
  };

  const selectValue = (id) => {
    console.log("select", id, getItemDescription(todoItems, currentItem));
    setCurrentItem(id);
    setValue(getItemDescription(todoItems, currentItem));
  };

  return (
    <div className="App">
      <h1 className="title">Какие планы на день?</h1>
      <h2 className="titleBlock">Задачи</h2>
      <div className="tasks">
        <AddTask
          value={value}
          onSendNewTask={currentItem ? updateItem : onSendNewTask}
          onChangeValue={setValue}
        />
        <TaskHeader onChange={setFilter} />
      </div>
      {list &&
        list.map((item) => (
          <TodoItem
            key={item.id}
            description={item.description}
            completed={item.completed}
            handleChange={() => handleChange(item.id)}
            handleRemove={() => handleRemove(item.id)}
            selectItem={() => selectValue(item.id)}
          />
        ))}
    </div>
  );
};

export default App;

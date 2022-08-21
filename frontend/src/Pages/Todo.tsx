import { FunctionComponent } from "react";
import TaskIcon from '@rsuite/icons/Task';

interface TodoPageProps {
  name?: string
  className?: string
}

const Task = () => {
  return (
    <li className="task">
      <label>
          <input  type="checkbox" id="${id}" />
          <p className="${completed}">423489279</p>
      </label>
      <div className="settings">
          <i  className="uil uil-ellipsis-h"></i>
          <ul className="task-menu">
              <li><i className="uil uil-pen"></i>Edit</li>
              <li><i className="uil uil-trash"></i>Delete</li>
          </ul>
      </div>
    </li>
  )
}

const TodoPage :  FunctionComponent<TodoPageProps> = (props) => {
  return (
    <div className="todo">
      <div className="wrapper">
        <div className="task-input">
          <TaskIcon className="absolute top-1/2 left-8 translate-x-1/2 -translate-y-1/2 text-lg"/>
          <input type="text" placeholder="Add a new task"/>
        </div>
        <div className="controls">
          <div className="filters">
            <span className="active" id="all">All</span>
            <span id="pending">Pending</span>
            <span id="completed">Completed</span>
          </div>
          <button className="clear-btn">Clear All</button>
        </div>
        <ul className="task-box">
          <Task/>
        </ul>
      </div>
    </div>
  )
}

TodoPage.defaultProps = {
  name : 'world'
}

export default TodoPage;
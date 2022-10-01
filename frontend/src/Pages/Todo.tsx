import { FunctionComponent } from "react";
import TaskIcon from '@rsuite/icons/Task';
import { emptyFunction } from "../Utils";
import axios from "axios"
import { Icon } from '@iconify/react';
import React from "react";

interface TodoPageProps {
  name?: string
  className?: string
}

const Task = (props: any) => {
  const [checked, setChecked] = React.useState<boolean>(props.status == 'completed')
  const remove = () => {
    axios.delete(`http://localhost:3000/delete/${props.id}`)
    .then(res => {
      console.log(res);
      
      if (res.statusText == 'OK') {
        props.remove(props.id)
      }
    })
  }

  const complete = (e: any) => {
    axios.patch(`http://localhost:3000/completed/${props.id}`, {
      status: 'completed'
    })
    .then(res => {
      if (res.statusText == 'OK') {
        setChecked(!checked)
      }
    })
  }

  return (
    <li className="my-4 text-xl flex">
      <label className="flex items-center">
          <input className="mr-2" type="checkbox" checked={checked} onClick={complete}/>
          <input type="text" value={props.title}/>
      </label>
      <div className="flex justify-between w-10">
        {/* <button onClick={Edit}><Icon icon="ci:edit"/></button> */}
        <button onClick={remove}><Icon icon="clarity:trash-solid"/></button>
      </div>
    </li>
  )
}

type InputProps = {
  submit?: (content: string) => void
}

const Input = ({
  submit = emptyFunction
}: InputProps) => {
  return (
    <input
      type="text"
      placeholder="Add a new task"
      onKeyUp={(e) => {
        if (e.key != 'Enter') return

        const element = e.currentTarget as HTMLInputElement;
        const content = (element.value || '').trim()
        if (content) {
          submit(content)
          element.value = ''
        }
      }}/>
  )
}

const TodoPage :  FunctionComponent<TodoPageProps> = (props) => {
  const [tasks, setTasks] = React.useState<any[]>([])
  const submit = (content: string) => {
    axios.post('http://localhost:3000/create', {
      title: content
    })
    .then((res) => {
      if (res.statusText == 'OK') {
        const taskList = [...tasks]
        const task = res.data
        taskList.unshift(task)
        setTasks(taskList)
      }
    })
  }

  const remove = (id: number) => {
    const taskList = [...tasks].filter((task: any) => task.id != id)
    setTasks(taskList)
  }

  React.useEffect(() => {
    axios.get('http://localhost:3000/select')
    .then(res => setTasks(res.data))
  },[])

  return (
    <div className="todo">
      <div className="wrapper">
        <div className="task-input">
          <TaskIcon className="absolute top-1/2 left-8 translate-x-1/2 -translate-y-1/2 text-lg"/>
          <Input submit={submit}/>
        </div>
        <div className="controls">
          <button className="clear-btn">Clear All</button>
        </div>
        <ul className="task-box h-[50vh] overflow-auto">
          {tasks.map((task: any) => <Task key={task.id} {...task} remove={remove}/>)}
        </ul>
      </div>
    </div>
  )
}

TodoPage.defaultProps = {
  name : 'world'
}

export default TodoPage;
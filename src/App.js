import React, { useEffect, useState, useRef } from 'react';



import axios from 'axios';

import Task from './components/Task';

const apiPath = 'http://localhost:3004/api/';

function App() {

  const [tasks, setTasks] = useState([]);
  const [getTasksAgain, setGetTasksAgain] = useState(false);
  const taskValue = useRef('');

  useEffect(() => {
    
    getAllTasks();

  }, [getTasksAgain])


  const  getAllTasks = () => {

    axios.get(`${apiPath}findall`, {

    })
    .then(function (resp) {
      console.log(resp);
      const res = resp.data;
      const toArray = Object.keys(res).map(key => {
        return res[key];
      })

      setTasks(toArray);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  const setInputValue = (value) => {
    taskValue.current = value.target.value;
  }

  const submitForm = (e) => {
    e.preventDefault();

    if(taskValue.current.length <= 0)
    {
      console.log('debes escribir algo');
    }
    else{
      axios.post(`${apiPath}create`, {
        title: taskValue.current
      })
      .then(function (resp) {
        console.log(resp);
        setGetTasksAgain(!getTasksAgain);
        taskValue.current = '';
      })
      .catch(function (error) {
        console.log(error);
        taskValue.current = '';
      });
    }

  }

  const deleteAllTasks = () => {
    axios.delete(`${apiPath}deleteall`, {

    })
    .then(function (resp) {
      console.log(resp);
      setGetTasksAgain(!getTasksAgain);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const getTaskAgain = () => {
    setGetTasksAgain(!getTasksAgain);
  }


  return (
    <div className='main-container'>
      <div className='con-title'>
        <h1 className='main-title'>Todo-app</h1>
      </div>

      <form onSubmit={ submitForm } className='to-do-form'>
        <p className='add-text'>Add a new task</p>
        <div className='con-input-button'>
          <input onChange={ (value) => setInputValue(value) } className='add-input' type="text" placeholder='New Task' />
          <button onSubmit={ submitForm } className='add-button'>
            Add
          </button>
        </div>
      </form>

      <button className='delete-all-button' onClick={ deleteAllTasks }>
        Delete All tasks
      </button>

      {
        tasks.map((task, index) => {
          return (
            <Task key={ index } task={ task } getTaskAgain={ getTaskAgain }/>
          )
        })
      }

    </div>
  );
}

export default App;

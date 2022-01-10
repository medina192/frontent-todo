

import React, { useState } from 'react';
import axios from 'axios';

const apiPath = 'http://localhost:3004/api/';

const Task = ( {task, getTaskAgain} ) => {



    const [edit, setEdit] = useState(false);
    

    const [inputValue, setinputValue] = useState(task.title)


    const updateTask = () => {

        if(inputValue.length <= 0)
        {

        }
        else{
            axios.put(`${apiPath}update/${task.id}`, {
                title: inputValue
              })
              .then(function (resp) {
                console.log(resp);
                getTaskAgain()
                setEdit(false);
              })
              .catch(function (error) {
                console.log(error);
              })
        }


    }

    const setInputValue = (value) => {
        setinputValue(value.target.value);
      }

    const deleteTask = () => {
        axios.delete(`${apiPath}delete/${task.id}`, {

          })
          .then(function (resp) {
            console.log(resp);
            getTaskAgain()
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div className='con-task'>
            <div className='con-data-task'>
                <p className='title-task'>{task.title}</p>
                {
                    edit ? 
                    (
                        <div>
                            <input onChange={ (value) => setInputValue(value) } 
                                value={inputValue} className='edit-input' type="text" />
                            <div>
                                <button onClick={ updateTask } className="save-changes">
                                    Save
                                </button>
                            </div>
                        </div>
                    )
                    :
                    (
                        <></>
                    )
                }
            </div>
            <div className='con-edit-delete-button'>
                <button onClick={() => setEdit(!edit)} className="edit-button">
                    Edit
                </button>
                <button onClick={ deleteTask } className="delete-button">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Task

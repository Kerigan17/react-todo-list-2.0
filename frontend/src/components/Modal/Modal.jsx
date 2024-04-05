import './Modal.scss';
import React from "react";
import axios from "axios";
import {baseURL} from "../../config.mjs";

export default function Modal({closeModal, userId}) {
    let taskTitle = React.createRef();
    let taskDescription = React.createRef();
    let priority = '';

    function setPriority(element) {
        if (element.className.includes('active')) return;

        document.querySelector('.active').classList.remove('active');
        element.classList.add('active');

        priority = element.classList[0];
    }

    function addNewTask() {
        closeModal();
        let currentDate = new Date();
        let day = currentDate.getDay() < 10 ? ('0' + currentDate.getDay().toString()) : currentDate.getDay().toString();
        let mouth = currentDate.getMonth() < 10 ? ('0' + currentDate.getMonth().toString()) : currentDate.getMonth().toString();
        let year = currentDate.getFullYear().toString();
        let fullDate = day + '.' + mouth + '.' + year;

        axios.post(`${baseURL}/tasks/add-task`, {
            taskTitle: taskTitle.current.value,
            taskDescription: taskDescription.current.value,
            priority: priority,
            date: fullDate,
            userId: userId
        })
            .then()
            .catch(error => console.log(error.response.data));
    }

    return (
        <div className={'modal-bg'}>
            <div className={'modal'}>
                <h2>Add new task</h2>

                <form className={'task-form'}>
                    <label>
                        Task title
                        <input ref={taskTitle}/>
                    </label>
                    <label>
                        Task description
                        <textarea ref={taskDescription}/>
                    </label>
                    <div className={'task-priorities'}>
                        <div className={'low active'} onClick={(event) => setPriority(event.target)}>low</div>
                        <div className={'medium'} onClick={(event) => setPriority(event.target)}>medium</div>
                        <div className={'high'} onClick={(event) => setPriority(event.target)}>high</div>
                    </div>
                    <button onClick={addNewTask}>Add task</button>
                </form>
            </div>
        </div>
    )
}
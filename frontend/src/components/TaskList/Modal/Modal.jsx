import './Modal.scss';
import React from "react";
import axios from "axios";
import {baseURL} from "../../../config.mjs";

export default function Modal({closeModal, userId, addTask}) {
    let taskTitle = React.createRef();
    let taskDescription = React.createRef();
    let priority = 'low';
    let fullDate;

    function setPriority(element) {
        if (element.className.includes('active')) return;

        document.querySelector('.active').classList.remove('active');
        element.classList.add('active');

        priority = element.classList[0];
    }

    function addNewTask() {
        let currentDate = new Date();
        let day = currentDate.getDay() < 10 ? ('0' + currentDate.getDay().toString()) : currentDate.getDay().toString();
        let mouth = currentDate.getMonth() < 10 ? ('0' + currentDate.getMonth().toString()) : currentDate.getMonth().toString();
        let year = currentDate.getFullYear().toString();
        fullDate = day + '.' + mouth + '.' + year;

        let title = taskTitle.current.value;
        let description = taskDescription.current.value;

        axios.post(`${baseURL}/tasks/add-task`, {
            taskTitle: title,
            taskDescription: description,
            priority: priority,
            date: fullDate,
            userId: userId
        })
            .then(res => {
                pushNewColumns(res.data.insertedId);
                addTask(
                    res.data.insertedId,
                    title,
                    description,
                    priority,
                    fullDate,
                    userId
                )
            })
            .catch(error => console.log(error.message));

        closeModal();

    }

    function pushNewColumns(taskId) {
        let columns;

        axios.get(`${baseURL}/columns/user-columns`, {
            params: {
                user_id: userId
            }
        })
            .then(res => {
                columns = res.data
                columns.new.push(taskId);

                axios.patch(`${baseURL}/columns/drop-task`, {
                    user_id: userId,
                    columns: columns
                })
                    .then(res => console.log(res))
            })
            .catch(err =>  console.log(err));
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

                <div className={'modal__close'} onClick={closeModal}>
                    <svg fill="#000000" width="20" height="20" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M29.484 0c-.13.004-.252.057-.343.15L17.164 12.13c-.49.47.235 1.197.706.707L29.846.857c.325-.318.1-.857-.363-.857zM12.488 17c-.13.004-.25.058-.34.15L.162 29.14c-.486.467.233 1.186.7.7L12.848 17.85c.325-.313.093-.85-.36-.85zM.5 0a.5.5 0 0 0-.348.86L29.14 29.845a.5.5 0 1 0 .706-.706L.86.152A.5.5 0 0 0 .5 0z"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}
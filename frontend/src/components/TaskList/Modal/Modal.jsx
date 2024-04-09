import './Modal.scss';
import React, {useEffect} from "react";

export default function Modal({userId, onModalSubmit, name, handleCloseModal, operation, data}) {
    let taskTitle = React.createRef();
    let taskDescription = React.createRef();
    let priority = 'low';

    useEffect(() => {
        if (data) priority = data.priority;
        let element = document.querySelector('.modal-priority.' + priority);
        element.classList.add('active')
    }, []);


    function setPriority(name) {
        let element = document.querySelector('.modal-priority.' + name);
        console.log(element)

        if (element.className.includes('active')) return;

        document.querySelector('.active').classList.remove('active');
        element.classList.add('active');

        priority = element.classList[0];
    }

    function handleModalSubmit(operation) {
        let currentDate = new Date();
        let day = currentDate.getDay() < 10 ? ('0' + currentDate.getDay().toString()) : currentDate.getDay().toString();
        let mouth = currentDate.getMonth() < 10 ? ('0' + currentDate.getMonth().toString()) : currentDate.getMonth().toString();
        let year = currentDate.getFullYear().toString();

        let newTask = {
            title: taskTitle.current.value,
            text: taskDescription.current.value,
            priority: priority,
            date: day + '.' + mouth + '.' + year,
            userId: userId
        }

        onModalSubmit(newTask, operation);
        handleCloseModal();
    }

    return (
        <div>
            <div className={'modal-bg'}>
                <div className={'modal'}>
                    {operation === 'edit' ? <h2>Edit task</h2> : <h2>Add {operation} task</h2>}

                    <form className={'task-form'}>
                        <label>
                            Task title
                            <input ref={taskTitle} defaultValue={data ? data.title : ''}/>
                        </label>
                        <label>
                            Task description
                            <textarea ref={taskDescription} defaultValue={data ? data.text : ''}/>
                        </label>
                        <div className={'task-priorities'}>
                            <div className={'modal-priority low'} onClick={(event) => setPriority('low')}>low</div>
                            <div className={'modal-priority medium'} onClick={(event) => setPriority('medium')}>medium</div>
                            <div className={'modal-priority high'} onClick={(event) => setPriority('high')}>high</div>
                        </div>

                        {operation === 'edit' ?
                            <button type={'button'} onClick={() => handleModalSubmit('edit')}>Edit task</button> :
                            <button type={'button'} onClick={() => handleModalSubmit('add')}>Add task</button>}

                    </form>

                    <div className={'modal__close'} onClick={handleCloseModal}>
                        <svg fill="#000000" width="20" height="20" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M29.484 0c-.13.004-.252.057-.343.15L17.164 12.13c-.49.47.235 1.197.706.707L29.846.857c.325-.318.1-.857-.363-.857zM12.488 17c-.13.004-.25.058-.34.15L.162 29.14c-.486.467.233 1.186.7.7L12.848 17.85c.325-.313.093-.85-.36-.85zM.5 0a.5.5 0 0 0-.348.86L29.14 29.845a.5.5 0 1 0 .706-.706L.86.152A.5.5 0 0 0 .5 0z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
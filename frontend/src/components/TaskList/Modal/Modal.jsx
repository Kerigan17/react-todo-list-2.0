import './Modal.scss';
import React, {useState} from "react";

export default function Modal({userId, onModalSubmit, name}) {
    const [modal, setModal] = useState(false);

    let taskTitle = React.createRef();
    let taskDescription = React.createRef();
    let priority = 'low';

    function setPriority(element) {
        if (element.className.includes('active')) return;

        document.querySelector('.active').classList.remove('active');
        element.classList.add('active');

        priority = element.classList[0];
    }
    function handleCloseModal() {
        setModal(false);
    }

    function HandleOpenModal() {
        setModal(true);
    }

    function handleModalSubmit() {
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

        onModalSubmit(newTask, name);
        handleCloseModal();
    }

    return (
        <div>
            <div className={'column-header'} onClick={HandleOpenModal}>
                <h2 className="column-title">{name.toUpperCase()}</h2>
                <div className={'add-task'}>Click for add</div>
            </div>

            {modal &&
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
                            <button type={'button'} onClick={handleModalSubmit}>Add task</button>
                        </form>

                        <div className={'modal__close'} onClick={handleCloseModal}>
                            <svg fill="#000000" width="20" height="20" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M29.484 0c-.13.004-.252.057-.343.15L17.164 12.13c-.49.47.235 1.197.706.707L29.846.857c.325-.318.1-.857-.363-.857zM12.488 17c-.13.004-.25.058-.34.15L.162 29.14c-.486.467.233 1.186.7.7L12.848 17.85c.325-.313.093-.85-.36-.85zM.5 0a.5.5 0 0 0-.348.86L29.14 29.845a.5.5 0 1 0 .706-.706L.86.152A.5.5 0 0 0 .5 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>}
        </div>
    )
}
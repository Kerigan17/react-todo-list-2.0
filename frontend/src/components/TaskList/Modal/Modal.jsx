import './Modal.scss';
import React, {forwardRef, useImperativeHandle, useState} from "react";

const Modal = forwardRef(function Modal({OnSubmit}, ref) {
        const [opened, setOpened] = useState(false);
        const [operation, setOperation] = useState('add');
        const [column, setColumn] = useState('');
        const [taskId, setTaskId] = useState('');
        const [inputs, setInputs] = useState({
            title: '',
            text: '',
            priority: ''
        });

        useImperativeHandle(ref, () => ({
            open(initColumn, initOperation = operation, initData = {title: '', text: '', priority: 'low'}, taskId) {
                setColumn(initColumn);
                setOperation(initOperation);
                setInputs(initData);
                setTaskId(taskId);
                setOpened(true);
            }
        }))

        function handleInputChange(key, value) {
            setInputs({
                ...inputs,
                [key]: value
            });
        }

        function handleClose() {
            setOpened(false);
        }

        function handleSubmit() {
            let currentDate = new Date();
            let day = currentDate.getDay() < 10 ? ('0' + currentDate.getDay().toString()) : currentDate.getDay().toString();
            let mouth = currentDate.getMonth() < 10 ? ('0' + currentDate.getMonth().toString()) : currentDate.getMonth().toString();
            let year = currentDate.getFullYear().toString();

            let newTask = {
                title: inputs.title,
                text: inputs.text,
                priority: inputs.priority,
                date: day + '.' + mouth + '.' + year,
            }

            OnSubmit(column, operation, newTask, taskId);
            setOpened(false);
        }

        let operationText = operation.charAt(0).toUpperCase() + operation.slice(1) + ' task';

        return (
            opened && <div>
                <div className={'modal-bg'}>
                    <div className={'modal'}>
                        <h2>{operationText}</h2>

                        <form className={'task-form'}>
                            <label>
                                Task title
                                <input
                                    value={inputs.title}
                                    onChange={event => handleInputChange('title', event.target.value)}
                                />
                            </label>
                            <label>
                                Task description
                                <textarea
                                    value={inputs.text}
                                    onChange={event => handleInputChange('text', event.target.value)}
                                />
                            </label>
                            <div className={'task-priorities'}>
                                {['low', 'medium', 'high'].map(priority => (
                                    <div
                                        key={priority}
                                        className={'modal-priority ' + priority + (priority === inputs.priority && ' active')}
                                        onClick={
                                            (event) => handleInputChange('priority', priority)}>
                                        {priority}
                                    </div>
                                ))}
                            </div>
                            <button type={'button'} onClick={() => handleSubmit()}>
                                {operationText}
                            </button>
                        </form>

                        <div className={'modal__close'} onClick={handleClose}>
                            <svg fill="#000000" width="20" height="20" viewBox="0 0 30 30"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M29.484 0c-.13.004-.252.057-.343.15L17.164 12.13c-.49.47.235 1.197.706.707L29.846.857c.325-.318.1-.857-.363-.857zM12.488 17c-.13.004-.25.058-.34.15L.162 29.14c-.486.467.233 1.186.7.7L12.848 17.85c.325-.313.093-.85-.36-.85zM.5 0a.5.5 0 0 0-.348.86L29.14 29.845a.5.5 0 1 0 .706-.706L.86.152A.5.5 0 0 0 .5 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
)

export {Modal};
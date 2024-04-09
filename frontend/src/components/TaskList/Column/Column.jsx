import {Droppable} from "react-beautiful-dnd";
import Task from "../Task/Task";
import './Column.scss';
import React, {useEffect} from "react";
import Modal from "../Modal/Modal";

export default function Column({name, tasks=[], deleteTask, userId, onTaskAdded}) {
    useEffect(() => {
        //console.log(tasks)
    }, [tasks]);

    return (
        <>
            <div className={name}>
                <Modal userId={userId} onModalSubmit={onTaskAdded} name={name}/>

                <Droppable droppableId={name}>
                    {(provided) =>
                        <div className={'column'}
                             ref={provided.innerRef}
                             {...provided.droppableProps}
                        >
                            <div className="tasks">
                                {tasks.map((task, index) => (
                                    <Task key={index} task={task} index={index} deleteTask={deleteTask} name={name}/>
                                ))}
                            </div>
                            {provided.placeholder}
                        </div>
                    }
                </Droppable>
            </div>
        </>
    );
}
import {Droppable} from "react-beautiful-dnd";
import Task from "../Task/Task";
import './Column.scss';
import React, {useEffect} from "react";

export default function Column({name, tasks=[], deleteTask, userId, onTaskAdded, handleOpenModal}) {
    useEffect(() => {
        //console.log(tasks)
    }, [tasks]);

    return (
        <>
            <div className={name}>
                {/*<Modal userId={userId} onModalSubmit={onTaskAdded} name={name}/>*/}

                <div className={'column-header'} onClick={() => handleOpenModal(name)}>
                    <h2 className="column-title">{name.toUpperCase()}</h2>
                    <div className={'add-task'}>Click for add</div>
                </div>

                <Droppable droppableId={name}>
                    {(provided) =>
                        <div className={'column'}
                             ref={provided.innerRef}
                             {...provided.droppableProps}
                        >
                            <div className="tasks">
                                {tasks.map((task, index) => (
                                    <Task key={index} task={task}
                                          index={index} deleteTask={deleteTask}
                                          name={name} handleOpenModal={handleOpenModal} />
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
import {Droppable} from "react-beautiful-dnd";
import Task from "../Task/Task";
import './Column.scss';
import {useEffect} from "react";

export default function Column({name, tasks=[]}) {
    useEffect(() => {}, [tasks]);

    function addTask() {
        alert('click')
    }

    return (
        <div className={name}>
            <div className={'column-header'} onClick={addTask}>
                <h2 className="column-title">{name.toUpperCase()}</h2>
            </div>
            <Droppable droppableId={name}>

                {(provided) =>
                    <div className={'column'}
                         ref={provided.innerRef}
                         {...provided.droppableProps}
                    >
                        <div className="tasks">
                            {tasks.map((task, index) => (
                                <Task key={index} task={task} index={index}/>
                            ))}
                        </div>
                        {provided.placeholder}
                    </div>
                }
            </Droppable>
        </div>
    );
}
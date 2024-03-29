import {Droppable} from "react-beautiful-dnd";
import Task from "../Task/Task";
import './Column.scss';
import {useEffect, useState} from "react";
import axios from "axios";
import {baseURL} from "../../../config.mjs";

export default function Column({name, tasksIds}) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}/tasks/all-tasks`, {
            params: {
                tasksIds: tasksIds
            }
        })
            .then(res => setTasks(res.data))
    }, []);

    return (
        <div className={name}>
            <div className={'column-header'}>
                <h2 className="column-title">{name.toUpperCase()}</h2>
                <div className="add-task">Add New +</div>
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
import {useEffect, useState} from "react";
import axios from "axios";
import {baseURL} from "../../../config";
import {Droppable} from 'react-beautiful-dnd'
import Task from "../Task/Task";

interface ColumnProps{
    name:string,
    tasksIds: Array<string>
}

export default function Column({name, tasksIds = []}:ColumnProps){
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}/tasks/all-tasks`, {
            params: {
                tasksIds: tasksIds
            }
        })
            .then(res => {
                let data: string[] = res.data;
                setTasks(res.data.toSorted((a:{_id:string},b:{_id:string}) => tasksIds.indexOf(a._id)-tasksIds.indexOf(b._id)));
            })
    }, []);

    useEffect(() => {
        if(tasksIds.length===0){
            setTasks([]);
            return;
        }

    }, [tasksIds.length,tasksIds]);

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
    )
}
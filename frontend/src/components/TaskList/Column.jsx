import {Droppable} from "react-beautiful-dnd";
import Tasks from "./Tasks";
import Task from "./Task";


export default function Column({name, tasks}){
    return(
        <Droppable droppableId ={name}>
            {(provided) =>
                <div className={'column'}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <div className="tasks">
                        {tasks.map((task, index) => (
                            <Task key = {task._id} task={task} index = {index}/>
                        ))}
                    </div>
                    {provided.placeholder}
                </div>
            }
        </Droppable>
    );
}
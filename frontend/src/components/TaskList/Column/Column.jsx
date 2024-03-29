import {Droppable} from "react-beautiful-dnd";
import Task from "../Task/Task";
import './Column.scss';

export default function Column({name, tasks, nameTasks}) {
    return (
        <div className={nameTasks}>
            <div className={'column-header'}>
                <h2 className="column-title">{name}</h2>
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
                                <Task key={task._id} task={task} index={index}/>
                            ))}
                        </div>
                        {provided.placeholder}
                    </div>
                }
            </Droppable>
        </div>

    );
}
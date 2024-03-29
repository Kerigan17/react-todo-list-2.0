import {Draggable} from "react-beautiful-dnd";
import React from "react";
import './Task.scss'

export default function Task({task, index}) {
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <div className={'task'}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}
                >
                    <div className={'task__title'}>{task.title}</div>
                    <div className="task__date">
                        <svg width="20px" height="20px" viewBox="0 0 30 30" version="1.1"
                             xmlns="http://www.w3.org/2000/svg">
                            <g id="icomoon-ignore">
                            </g>
                            <path
                                d="M16 3.205c-7.066 0-12.795 5.729-12.795 12.795s5.729 12.795 12.795 12.795 12.795-5.729 12.795-12.795c0-7.066-5.729-12.795-12.795-12.795zM16 27.729c-6.467 0-11.729-5.261-11.729-11.729s5.261-11.729 11.729-11.729 11.729 5.261 11.729 11.729c0 6.467-5.261 11.729-11.729 11.729z"
                                fill="#000000">
                            </path>
                            <path d="M16 17.066h-6.398v1.066h7.464v-10.619h-1.066z" fill="#000000"></path>
                        </svg>
                        {task.date}
                    </div>
                    <div className="task__priority">{task.priority}</div>
                    <div className={'task__text'}>{task.text}</div>
                </div>
            )}
        </Draggable>
    )
}
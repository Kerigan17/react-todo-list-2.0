import {Draggable} from "react-beautiful-dnd";
import React from "react";
import './Task.scss'

export default function Task({task, index, deleteTask}) {
    function editTask() {
        console.log('edit')
    }

    return (
        <Draggable key={task._id} draggableId={task._id} index={index}>
            {(provided) => (
                <div className={'task-block'}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}
                >
                    <div className={'task'}>
                        <div className={'task-header'}>
                            <div className={'task__title'}>{task.title}</div>
                            <div className={"task__priority " + task.priority}>{task.priority}</div>
                        </div>

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
                        <div className={'task__text'}>{task.text}</div>
                    </div>

                    <div className={'task__actions'}>
                        <div className={'task__edit'} onClick={editTask}>
                            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 36 36" version="1.1"
                                 preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                                <title>pencil-line</title>
                                <path className="clr-i-outline clr-i-outline-path-1"
                                      d="M33.87,8.32,28,2.42a2.07,2.07,0,0,0-2.92,0L4.27,23.2l-1.9,8.2a2.06,2.06,0,0,0,2,2.5,2.14,2.14,0,0,0,.43,0L13.09,32,33.87,11.24A2.07,2.07,0,0,0,33.87,8.32ZM12.09,30.2,4.32,31.83l1.77-7.62L21.66,8.7l6,6ZM29,13.25l-6-6,3.48-3.46,5.9,6Z"></path>
                                <rect x="0" y="0" width="36" height="36" fillOpacity="0"/>
                            </svg>
                        </div>
                        <div className={'task__delete'} onClick={() => deleteTask(task._id)}>
                            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 36 36" version="1.1"
                                 preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                                <title>trash-line</title>
                                <path className="clr-i-outline clr-i-outline-path-1"
                                      d="M27.14,34H8.86A2.93,2.93,0,0,1,6,31V11.23H8V31a.93.93,0,0,0,.86,1H27.14A.93.93,0,0,0,28,31V11.23h2V31A2.93,2.93,0,0,1,27.14,34Z"></path>
                                <path className="clr-i-outline clr-i-outline-path-2"
                                      d="M30.78,9H5A1,1,0,0,1,5,7H30.78a1,1,0,0,1,0,2Z"></path>
                                <rect className="clr-i-outline clr-i-outline-path-3" x="21" y="13" width="2"
                                      height="15"></rect>
                                <rect className="clr-i-outline clr-i-outline-path-4" x="13" y="13" width="2"
                                      height="15"></rect>
                                <path className="clr-i-outline clr-i-outline-path-5"
                                      d="M23,5.86H21.1V4H14.9V5.86H13V4a2,2,0,0,1,1.9-2h6.2A2,2,0,0,1,23,4Z"></path>
                                <rect x="0" y="0" width="36" height="36" fillOpacity="0"/>
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}
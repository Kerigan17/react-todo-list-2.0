import React, {useEffect, useState} from "react";
import {baseURL} from "../../config.mjs";
import axios from "axios";
import {DragDropContext} from 'react-beautiful-dnd'
import Column from "./Column/Column";
import "./TaskList.scss";

export default function TaskList({userId}) {
    const [tasks, setTasks] = useState([]);
    const [tasksNew, setTasksNew] = useState([]);
    const [tasksDone, setTasksDone] = useState([]);
    const [tasksProgress, setTasksProgress] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}/columns/user-columns`, {
            params: {
                user_id: userId
            }
        })
            .then(res => console.log(res.data))
    }, []);

    let onDragEnd = result => {
        const {destination, source, draggableId} = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h2 className={'tasks-title'}>Tasks</h2>
            <div className="columns">
                <Column name={'New Tasks'} tasks={tasksNew} nameTasks={'new'}/>
                <Column name={'Progress'} tasks={tasksProgress} nameTasks={'progress'}/>
                <Column name={'Done'} tasks={tasksDone} nameTasks={'done'}/>
            </div>
        </DragDropContext>
    )
}

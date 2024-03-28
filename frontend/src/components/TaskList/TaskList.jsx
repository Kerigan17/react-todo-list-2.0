import React, {useEffect, useState} from "react";
import {baseURL} from "../../config.mjs";
import axios from "axios";
import {DragDropContext} from 'react-beautiful-dnd'
import Column from "./Column";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}/tasks/all-tasks`)
            .then(res => {
                if (tasks.length === 0) setTasks(res.data);
                console.log(res.data)
            })
    }, []);

    let onDragEnd = result => {
        const {destination, source, draggableId} = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        let newTasks = [...tasks];
        newTasks.splice(source.index, 1);
        let movedTask = tasks.find((task) => task._id === draggableId);
        newTasks.splice(destination.index, 0, movedTask);
        setTasks(newTasks);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h2>Tasks</h2>
            <div className="columns">
                <Column name={'column'} tasks={tasks}/>

            </div>
        </DragDropContext>
    )
}

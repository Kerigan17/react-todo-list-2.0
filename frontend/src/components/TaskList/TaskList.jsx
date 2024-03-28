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
                setTasks(res.data);
                console.log(res.data)
            })
    }, []);

    let onDragEnd = result => {

    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h2>Tasks</h2>
            <div className="columns">
                <Column name ={'column'} tasks = {tasks}></Column>
            </div>
        </DragDropContext>
    )
}

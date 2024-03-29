import React, {useEffect, useState} from "react";
import {baseURL} from "../../config.mjs";
import axios from "axios";
import {DragDropContext} from 'react-beautiful-dnd'
import Column from "./Column/Column";
import "./TaskList.scss";

export default function TaskList({userId}) {
    const [columns, setColumns] = useState({})
    useEffect(() => {
        axios.get(`${baseURL}/columns/user-columns`, {
            params: {
                user_id: userId
            }
        })
            .then(res => setColumns(res.data))
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
                {
                    Object.entries(columns).map((column, index) =>
                        <Column key={index} name={column[0]} tasksIds={column[1]}/>
                    )
                }
            </div>
        </DragDropContext>
    )
}

import React, {useEffect, useState} from "react";
import {baseURL} from "../../config.mjs";
import axios from "axios";
import {DragDropContext} from 'react-beautiful-dnd'
import Column from "./Column/Column";
import "./TaskList.scss";

export default function TaskList({userId}) {

    const [columns, setColumns] = useState({})

    useEffect(() => {
        console.log(columns);
        if (Object.keys(columns).length  !== 0 ) return
        axios.get(`${baseURL}/columns/user-columns`, {
            params: {
                user_id: userId
            }
        })
        .then(res => {
            setColumns(res.data)
        })
    }, [columns, userId]);


    let onDragEnd = result => {
        const {destination, source, draggableId} = result;
        if (!destination) return;
        const sourceList = Array.from(columns[source.droppableId])
        let destinationList =  Array.from(columns[destination.droppableId])
        sourceList.splice(source.index, 1);
        if (destination.droppableId === source.droppableId)
        {
            if(destination.index === source.index) return;
            destinationList = sourceList;
        }
        destinationList.splice(destination.index, 0, draggableId)
        const updatedColumns = {
            ...columns,
            [source.droppableId]:sourceList,
            [destination.droppableId]: destinationList
        }
        setColumns(updatedColumns)

        axios.patch(`${baseURL}/columns/drop-task`, {
            user_id: userId,
            columns:updatedColumns
        })
            .then(res => console.log(res))
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

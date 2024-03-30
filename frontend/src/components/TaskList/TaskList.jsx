import React, {useEffect, useState} from "react";
import {baseURL} from "../../config.mjs";
import axios from "axios";
import {DragDropContext} from 'react-beautiful-dnd'
import Column from "./Column/Column";
import "./TaskList.scss";

export default function TaskList({userId}) {
    const [columns, setColumns] = useState({})
    useEffect(() => {
        if (Object.keys(columns).length  === 0 )
            axios.get(`${baseURL}/columns/user-columns`, {
                params: {
                    user_id: userId
                }
            })
                .then(res => {
                    setColumns(res.data)
                })
    }, [columns]);


    let onDragEnd = result => {
        const {destination, source, draggableId} = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        let changedColumns = {...columns};
        let sourceList = columns[source.droppableId];
        let destinationList = columns[destination.droppableId];

        sourceList.splice(sourceList.indexOf(draggableId),1);
        destinationList.splice(destination.index, 0, draggableId);
        changedColumns[source.droppableId] = sourceList;
        changedColumns[destination.droppableId] = destinationList;
        console.log(changedColumns);
        setColumns(changedColumns);


        // axios.patch(`${baseURL}/columns/drop-task`, {
        //     user_id: userId,
        //     task_id: draggableId,
        //     source_id: source.droppableId,
        //     destination_id: destination.droppableId,
        //     destination_index: destination.index
        // })
        //     .then(res => loadData())
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

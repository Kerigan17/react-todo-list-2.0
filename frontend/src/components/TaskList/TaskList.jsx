import React, {useEffect, useState} from "react";
import {baseURL} from "../../config.mjs";
import axios from "axios";
import {DragDropContext} from 'react-beautiful-dnd'
import Column from "./Column/Column";
import "./TaskList.scss";

export default function TaskList({userId}) {

    const [columns, setColumns] = useState({})
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        console.log(tasks);
        if (Object.keys(columns).length  !== 0 ) return
        axios.get(`${baseURL}/columns/user-columns`, {
            params: {
                user_id: userId
            }
        })
        .then(res => {
            setColumns(res.data)
        })
        axios.get(`${baseURL}/tasks/all-tasks`, {
            params: {
                user_id: userId
            }
        })
            .then(res => {
                setTasks(res.data)
            })

    }, [columns, tasks, userId]);


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

    const splitTasks = {
        new: selectTasks('new'),
        progress: selectTasks('progress'),
        done: selectTasks('done')
    }
    function selectTasks(key){
        return tasks.filter(task=>columns[key].includes(task._id))
            .toSorted((a,b) => columns[key].indexOf(a._id)-columns.new.indexOf(b._id));
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h2 className={'tasks-title'}>Tasks</h2>
            <div className="columns">
                {
                    Object.entries(columns).map((column, index) =>
                        <Column key={index} name={column[0]} tasks={splitTasks[column[0]]}/>
                    )
                }
            </div>
        </DragDropContext>
    )
}

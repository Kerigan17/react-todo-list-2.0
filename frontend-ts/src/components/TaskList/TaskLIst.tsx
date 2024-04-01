import React, {Component, useEffect, useState} from "react";
import {baseURL} from "../../config";
import axios from "axios";
import {DragDropContext} from 'react-beautiful-dnd'
import Column from "./Column/Column";
import "./TaskList.scss";
import {setColumns, moveItem} from "../../features/columns/columns-slice";
import {useAppDispatch,useAppSelector} from "../../app/hooks";



export default function TaskList({userId}:{userId:string}) {

    const columns = useAppSelector((state) => state.columns)
    const dispatch = useAppDispatch();

    useEffect(() => {
        axios.get(`${baseURL}/columns/user-columns`, {
            params: {
                user_id: userId
            }
        })
            .then(res => {
                dispatch(setColumns(res.data));
            })
    }, []);



    let onDragEnd = (result: { destination: any; source: any; draggableId: any; }) => {
        const {destination, source, draggableId} = result;
        if (!destination) return;
        dispatch(moveItem({
            sourceId: source.draggableId,
            destinationId:destination.draggableId,
            draggableId: draggableId,
            sourceIndex: source.index,
            destinationIndex:destination.index
        }));
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

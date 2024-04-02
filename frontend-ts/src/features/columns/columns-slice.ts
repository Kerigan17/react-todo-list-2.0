import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {baseURL} from "../../config";
import {scryRenderedComponentsWithType, Simulate} from "react-dom/test-utils";
import progress = Simulate.progress;

interface ColumnsState{
    new: Array<string>;
    progress: Array<string>;
    done: Array<string>;
}

const initialState: ColumnsState = {
    new: [],
    progress: [],
    done: []
}

const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers:{
        setColumns(state, action){
            const payload = action.payload;
            state.new = payload.new;
            state.progress = payload.progress;
            state.done = payload.done;
        },
        moveItem(state, action){
            const sourceId: keyof ColumnsState = action.payload.sourceId;
            const destinationId: keyof ColumnsState = action.payload.destinationId;
            const draggableId = action.payload.draggableId;
            const sourceIndex =  action.payload.sourceIndex;
            const destinationIndex =  action.payload.destinationIndex;

            const sourceList = Array.from(state[sourceId])
            let destinationList = Array.from(state[destinationId])
            sourceList.splice(sourceIndex, 1);
            if (destinationId === sourceId)
            {
                if(destinationIndex === sourceIndex) return;
                destinationList = sourceList;
            }
            destinationList.splice(destinationIndex, 0, draggableId)
            state[sourceId] = sourceList;
            state[destinationId] = destinationList;

            // axios.patch(`${baseURL}/columns/drop-task`, {
            //     user_id: userId,
            //     columns:updatedColumns
            // })
            //     .then(res => console.log(res))
        }
    }
})

export const  {setColumns, moveItem} = columnsSlice.actions;
export default columnsSlice.reducer;
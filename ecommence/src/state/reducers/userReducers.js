import {createSlice} from '@reduxjs/toolkit';



export const useSlice = createSlice({
    name: 'user',
    initialState: { 
        value: 0
    },
    reducers: {
        login: (state) => {
             state.value += 1;
        }
    }
})


export const {login} = useSlice.actions;

export default useSlice.reducer;
 
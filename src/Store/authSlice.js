import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState : {
        user : null,
    },
        reducers : {
            loginUser : (state , action) =>{
                state.user = action.payload;
            }
        }
})



export const { loginUser } = authSlice.actions;
export default authSlice.reducer;
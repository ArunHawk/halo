import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode'

const initialState ={
    user: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name:"HaloTodo",
    initialState,
    reducers:{
        loginStart: (state) => {
            state.loading = true;
          },
          loginSuccess: (state,action) => {
            state.loading = false;
            state.user = jwtDecode(action.payload);
            state.error = false;
            localStorage.setItem('haloUser', action.payload);
          },
          loginFailure: (state) => {
            state.loading = false;
            state.error = true;
          },
          logout: () => {
            localStorage.setItem("haloUser",null)
            return initialState
          },
    }
});

export const {loginStart,loginSuccess,loginFailure,logout} = userSlice.actions;

export default userSlice.reducer;
  
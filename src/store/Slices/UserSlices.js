import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    login: false,
    userData: {}
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        isLogin: (state) =>{
            state.login = true
        },
        
        isLogout: (state) =>{
            state.login = false
        },

        isUserData: (state, action) => {
            state.userData = action.payload
        },

       updateUser: (state, action) =>{
        const {fname, lname} = action.payload
        state.userData = {...state.userData, fname: fname, lname: lname}
       }
    }
})

export const { isLogin, isLogout, isUserData, updateUser } = userSlice.actions
export default userSlice.reducer
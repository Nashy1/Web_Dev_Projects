import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const intialState ={
    mode:"light",
    user:null,
    token: null,
    post:[],
};

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode =state.mode === "light" ? "dark":"light"; 
        },
        setLogin:(state,action)=>{
            state.user =action.payload.user;
            state.token =action.payload.token;

        },
        setLogout: (state)=>{
            state.user = null,
            state.token = null;
        },
        setFriends:(state,actoin)=>{
            if(state.user){
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent :(");
            }
        },
        setPosts: (state,action)=>{
            state.posts =action.payload.posts;
        },
        setPost: (state,action)=>{
            const updatedPost = state.posts.map((post)=>{
                if(post._id === action.payload.post.post_id) {
                    return action.payload.post;
                }return post;
            })
        }
        
    }
    })
import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
  name: "Lists",
  initialState: {
    BlackList: [],
    FavouriteList: []
  },
  reducers: {
    ///favouritelist
    addFavouriteList: (state:any, action) => {
      action.payload.favourite=true
      state.FavouriteList.push(action.payload);
      return state
    },
    removeAllFavouriteList: (state,action) => {
      action.payload.map((item:any)=>{
        if(item.favourite){
          item.favourite=false
        }else{
          return
        }
      })
      state.FavouriteList = []
      return state
    },
    removeFavouriteListItem: (state, action) => {
      action.payload.favourite=false
      const newState = state.FavouriteList.filter((item:any) => item.id !== action.payload)
      state.FavouriteList = newState
      return state
    },
    ///blacklist
    addBlackList: (state:any, action)  => {
      action.payload.blacklist=true
      state.BlackList.push(action.payload);
      return state
    },
    removeAllBlackList: (state,action) => {
      action.payload.map((item:any)=>{
        if(item.blacklist){
          item.blacklist=false
        }else{
          return
        }
      })
      state.BlackList = []
      return state
    },
    removeBlackListItem: (state, action) => {
      action.payload.blacklist=false
      const newState = state.BlackList.filter((item:any) => item.id !== action.payload)
      state.BlackList = newState
      return state
    }
  }
});


export const { addBlackList, addFavouriteList, removeAllFavouriteList, removeAllBlackList, removeBlackListItem, removeFavouriteListItem } = listSlice.actions;
export default listSlice.reducer;
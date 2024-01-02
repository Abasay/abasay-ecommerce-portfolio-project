import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  imgUrl: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log(action.payload);
      // state._id = action.payload.userData._id;
      // state.firstName = action.payload.userData.firstName;
      // state.lastName = action.payload.userData.lastName;
      // state.email = action.payload.userData.email;
      // state.imgUrl = action.payload.userData.imgUrl;
      console.log(action.payload.userData.imgUrl);
      return {
        ...action.payload.userData,
      };
    },
    logOutRedux: (state, action) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { loginRedux, logOutRedux } = userSlice.actions;

export default userSlice.reducer;

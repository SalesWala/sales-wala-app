import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {
      name: '',
      email: '',
      firstname: '',
      lastname: '',
      id: '',
      updatedAt: '',
      createdAt: '',
      metadata: {},
      isEnabled: false,
      isVerified: false,
    },
  },
  reducers: {
    setLogout: state => {
      //@ts-ignore
      state.userData = null;
    },

    setUserData: (state, action) => {
      const userData = {
        ...action.payload,
      };

      try {
        if (userData.metadata) {
          userData.metadata = JSON.parse(userData.metadata);
        }
      } catch (err) {}
      state.userData = userData;
    },
  },
});

export const {setUserData, setLogout} = userSlice.actions;

export default userSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import { AttendanceModal } from '@src/realm/models/AttendanceModal';

type SliceState = {
  data: AttendanceModal[],
  currentPunchIn: AttendanceModal | null
  lastAttendance: AttendanceModal | null
};

const initialState: SliceState = {
  data: [],
  currentPunchIn: null,
  lastAttendance:null
};

export const slice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    addAttendance: (state, action) => {
      const items = [...state.data];
      const payload = {
        ...JSON.parse(action.payload),
      };
      payload.metadata = JSON.parse(payload.metadata);
      // items.push(payload);
      items.splice(0, 0, payload);

      state.data = items;
      state.currentPunchIn = payload
      state.lastAttendance = payload
    },
    setPunchIn: (state, action) => {
      if (action.payload !== null) {
        const payload = {
          ...JSON.parse(action.payload),
        };
        payload.metadata = JSON.parse(payload.metadata);
      
        state.currentPunchIn = payload
      } else {
        state.currentPunchIn = null
      }
     
    },


    setAttendanceData: (state, action) => {
      const items: AttendanceModal[] = [];

      for (let item of JSON.parse(action.payload)) {
        const payload = {
          ...item,
        };

        payload.metadata = JSON.parse(payload.metadata);
        items.push(payload);
      }
      state.data = items.reverse();
      if (state.data.length > 0) {
        state.lastAttendance = state.data[items.length-1];
      }
 
    },

    updateAttendance: (state, action) => {
      const payload = {
        ...JSON.parse(action.payload),
      };

      payload.metadata = JSON.parse(payload.metadata);
      const items = [];

      for (let item of state.data) {
        if (item.id === payload.id) {
          item = payload;
        }
        items.push(item);
      }

      state.data = items;
    },
  },
});

export const {setAttendanceData,setPunchIn, addAttendance, updateAttendance} = slice.actions;

export default slice.reducer;

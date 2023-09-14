import {createSlice} from '@reduxjs/toolkit';
import {VendorModal} from '@src/realm/models/VendorModal';

type SliceState = {data: VendorModal[]};

const initialState: SliceState = {
  data: [],
};
export const slice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    addVendor: (state, action) => {
      const items = [...state.data];
      const payload = {
        ...JSON.parse(action.payload),
      };
      payload.metadata = JSON.parse(payload.metadata);
      // items.push(payload);
      items.splice(0, 0, payload);

      state.data = items;
    },

    setVendorData: (state, action) => {
      const items: VendorModal[] = [];

      for (let item of JSON.parse(action.payload)) {
        const payload = {
          ...item,
        };
        payload.metadata = JSON.parse(payload.metadata);
        items.push(payload);
      }
      state.data = items.reverse();
    },

    updateVendor: (state, action) => {
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

export const {setVendorData, addVendor, updateVendor} = slice.actions;

export default slice.reducer;

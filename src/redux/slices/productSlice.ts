import {createSlice} from '@reduxjs/toolkit';
import {ProductModal} from '@src/realm/models/ProductModal';

type SliceState = {data: ProductModal[]};

const initialState: SliceState = {
  data: [],
};

export const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const items = [...state.data];
      const payload = {
        ...JSON.parse(action.payload),
      };
      try {
        payload.metadata = JSON.parse(payload.metadata);

      } catch (err) {
        payload.metadata ={}
      }
      // items.push(payload);

      items.splice(0, 0, payload);

      state.data = items;
    },

    setProductData: (state, action) => {
      const items: ProductModal[] = [];

      for (let item of JSON.parse(action.payload)) {
        const payload = {
          ...item,
        };

        try {
          payload.metadata = JSON.parse(payload.metadata);
  
        } catch (err) {
          payload.metadata ={}
        }
        items.push(payload);
      }
      state.data = items.reverse();
    },

    updateProduct: (state, action) => {
      const payload = {
        ...JSON.parse(action.payload),
      };

      try {
        payload.metadata = JSON.parse(payload.metadata);

      } catch (err) {
        payload.metadata ={}
      }
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

export const {setProductData, addProduct, updateProduct} = slice.actions;

export default slice.reducer;

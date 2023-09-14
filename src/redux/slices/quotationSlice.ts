import {createSlice} from '@reduxjs/toolkit';
import { QuotationModal } from '@src/realm/models/QuotationModal';

type SliceState = {data: QuotationModal[]};

const initialState: SliceState = {
  data: [],
};


const sanitizeQuotationParticulars = (raw:string) => {
  const quotationParticulars= [];

  for (let quotationParticular of JSON.parse(raw)) {
    const payload = {
        ...quotationParticular
    }

    payload.metadata = JSON.parse(payload.metadata)
    quotationParticulars.push(payload)
  }
  return quotationParticulars;
}
export const slice = createSlice({
  name: 'quotations',
  initialState,
  reducers: {
    addQuotation: (state, action) => {
      const items = [...state.data];
      const payload = {
        ...JSON.parse(action.payload),
      };
      payload.metadata = JSON.parse(payload.metadata);
      const quotationParticulars = sanitizeQuotationParticulars(payload.quotationParticulars)
      payload.quotationParticulars = quotationParticulars
      
      items.splice(0, 0, payload);

      state.data = items;
    },

    setQuotationData: (state, action) => {
      const items: QuotationModal[] = [];

      for (let item of JSON.parse(action.payload)) {
        const payload = {
          ...item,
        };

        try {
          payload.metadata = JSON.parse(payload.metadata);
          const quotationParticulars = sanitizeQuotationParticulars(payload.quotationParticulars)
          payload.quotationParticulars = quotationParticulars
        } catch (err) {
          
        }
        items.push(payload);
      }
      state.data = items.reverse();
    },

    updateQuotation: (state, action) => {
      const payload = {
        ...JSON.parse(action.payload),
      };

      payload.metadata = JSON.parse(payload.metadata);
      const quotationParticulars = sanitizeQuotationParticulars(payload.quotationParticulars)
      payload.quotationParticulars = quotationParticulars
      
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

export const {setQuotationData, addQuotation, updateQuotation} = slice.actions;

export default slice.reducer;

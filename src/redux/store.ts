import {configureStore} from '@reduxjs/toolkit';
import userSlice from '@src/redux/slices/userSlice';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import vendorSlice from './slices/vendorSlice';
import productSlice from './slices/productSlice';
import attendanceSlice from './slices/attendanceSlice';
import quotationSlice from './slices/quotationSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    vendors: vendorSlice,
    products: productSlice,
    attendance: attendanceSlice,
    quotations:quotationSlice
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

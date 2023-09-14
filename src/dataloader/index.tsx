import { useEffect, useState } from 'react';
import { useRealm, useQuery as useRealmQuery } from '@realm/react';
import { VendorModal } from '@src/realm/models/VendorModal';
import { useDispatch } from 'react-redux';
import { setVendorData } from '@src/redux/slices/vendorSlice';
import { ProductModal } from '@src/realm/models/ProductModal';
import { setProductData } from '@src/redux/slices/productSlice';
import { useQuery as useApolloQuery } from '@apollo/client';
import { GET_VENDORS } from '@src/apollo/queries/backend-queries';
import { AttendanceModal } from '@src/realm/models/AttendanceModal';
import { setAttendanceData, setPunchIn } from '@src/redux/slices/attendanceSlice';
import { QuotationModal } from '@src/realm/models/QuotationModal';
import { setQuotationData } from '@src/redux/slices/quotationSlice';

const DataLoader = () => {
  const vendors = useRealmQuery(VendorModal);
  const products = useRealmQuery(ProductModal);
  const attendances = useRealmQuery(AttendanceModal);
  const quotations = useRealmQuery(QuotationModal);

  const dispatch = useDispatch();



  useEffect(() => {
    if (vendors) {
      dispatch(setVendorData(JSON.stringify(vendors)));
    }
  }, [vendors]);


  useEffect(() => {
    if (attendances) {
      dispatch(setAttendanceData(JSON.stringify(attendances)));
      const punchedInAttendance = attendances.find((attendance) => {
        return !attendance.punchOutTime
      })
      if (punchedInAttendance) {
        dispatch(setPunchIn(JSON.stringify(punchedInAttendance)))
      }
    }
  }, [attendances]);



  useEffect(() => {
    if (products) {
      dispatch(setProductData(JSON.stringify(products)));
    }
  }, [products]);

  useEffect(() => {
    if (quotations) {
      dispatch(setQuotationData(JSON.stringify(quotations)));
    }
  }, [quotations]);

  return <></>;
};

export default DataLoader;

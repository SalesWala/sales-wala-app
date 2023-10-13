import { useLazyQuery } from "@apollo/react-hooks"
import { useRealm, useQuery as useRealmQuery } from "@realm/react";
import { SYNC_DATA } from "@src/apollo/queries/backend-queries"
import { UserModal } from "@src/realm/models/UserModal";
import { useDispatch } from "react-redux";
import { UserType } from '@src/types/UserType';
import { setUserData } from "@src/redux/slices/userSlice";
import { VendorModal } from "@src/realm/models/VendorModal";
import { ProductModal } from "@src/realm/models/ProductModal";
import { setVendorData } from "@src/redux/slices/vendorSlice";
import { setProductData } from "@src/redux/slices/productSlice";
import { AttendanceModal } from "@src/realm/models/AttendanceModal";
import { setAttendanceData } from "@src/redux/slices/attendanceSlice";
import { QuotationModal } from "@src/realm/models/QuotationModal";
import { setQuotationData } from "@src/redux/slices/quotationSlice";


export const useCloudData = () => {
  const vendors = useRealmQuery(VendorModal);
  const products = useRealmQuery(ProductModal);
  // const organisation = useRealmQuery(ProductModal);
  const attendances = useRealmQuery(AttendanceModal);
  const quotations = useRealmQuery(QuotationModal);

  const realm = useRealm();
  const dispatch = useDispatch();
  const users = useRealmQuery(UserModal);

  const [syncData] = useLazyQuery(SYNC_DATA, {
    errorPolicy: 'all',
  })




  const addOrUpdateUser = async (userData: UserType) => {
    if (users.length == 0) {
      // realm.write(() => {
      //   realm.create('User', userData);
      // });
      realm.create('User', userData);
    } else {

      // realm.write(() => {
      //   users[0].createdAt = userData.createdAt;
      //   users[0].updatedAt = userData.updatedAt;
      //   users[0].email = userData.email;
      //   users[0].lastname = userData.lastname;
      //   users[0].firstname = userData.firstname;
      //   users[0].isEnabled = userData.isEnabled;
      //   users[0].id = userData.id;
      //   users[0].isVerified = userData.isVerified;
      //   if (userData.metadata) {
      //     users[0].metadata = userData.metadata;
      //   }
      // });
      users[0].createdAt = userData.createdAt;
      users[0].updatedAt = userData.updatedAt;
      users[0].email = userData.email;
      users[0].lastname = userData.lastname;
      users[0].firstname = userData.firstname;
      users[0].isEnabled = userData.isEnabled;
      users[0].id = userData.id;
      users[0].isVerified = userData.isVerified;
      if (userData.metadata) {
        users[0].metadata = userData.metadata;
      }
    }

  };


  const parseAndSaveUser = async (data: any) => {
    const payload = {
      ...data,
      isEnabled: true,
      isVerified: true,
    }
    delete payload.__typename
    await addOrUpdateUser(payload);
    dispatch(setUserData({ ...payload }))
  }


  const parseAndSaveVendors = async (data: any) => {
    let list: any[] = []
    for (let item of data) {
      const payload = {
        ...item,
      }
      delete payload.__typename
      list.push(payload)
    }



    for (let vendor of vendors) {
      realm.delete(vendor)
    }

    for (let vendor of list) {
      realm.create("Vendor", vendor)
    }
    dispatch(setVendorData(JSON.stringify(list)))
  }




  const parseAndSaveProducts = async (data: any) => {
    let list: any[] = []
    for (let item of data) {
      const payload = {
        ...item,
      }
      delete payload.__typename
      list.push(payload)
    }



    for (let product of products) {
      realm.delete(product)
    }

    for (let product of list) {
      realm.create("Product", product)
    }
    dispatch(setProductData(JSON.stringify(list)))
  }


  const parseAndSaveQuotations = async (data: any) => {

    let list: any[] = []
    for (let item of data) {
      const payload = {
        ...item,
      }
      delete payload.__typename
      list.push(payload)

    }


    for (let quotation of quotations) {
      realm.delete(quotation)
    }

    for (let quotation of list) {

      const payload = {
        ...quotation
      };

      payload.quotationParticulars = JSON.stringify(payload.quotationParticulars )
      realm.create("Quotation", payload)
    }
  }

  const parseAndSaveAttendance = async (data: any) => {

    console.log("parseAndSaveAttendance",data)
    let list: any[] = []
    for (let item of data) {
      const payload = {
        ...item,
      }
      delete payload.__typename
      list.push(payload)

    }


    for (let attendance of attendances) {
      realm.delete(attendance)
    }

    for (let attendance of list) {
      realm.create("Attendance", attendance)
    }
    dispatch(setAttendanceData(JSON.stringify(list)))
  }

  const syncCloudData = async () => {
    const resp = await syncData()
    if (resp.error) {
      if (resp.error.message === 'Access Denied') {
        throw new Error("Access Denied")
      }
    }
    realm.beginTransaction()

    try {
      await parseAndSaveUser(resp.data.me);
      await parseAndSaveVendors(resp.data.getMyVendors);
      await parseAndSaveProducts(resp.data.getProducts);
      await parseAndSaveAttendance(resp.data.getMyAttendances);
      await parseAndSaveQuotations(resp.data.getMyQuotations);
    } catch (err) {
      console.error("syncCloudData", err)
    }

    realm.commitTransaction()
    console.log("donee")

  }


  return {
    syncCloudData
  }


}

import { AttendanceModal } from './models/AttendanceModal';
import {ProductModal} from './models/ProductModal';
import { QuotationModal } from './models/QuotationModal';
import {UserModal} from './models/UserModal';
import {VendorModal} from './models/VendorModal';

export const realmConfig: Realm.Configuration = {
  schema: [UserModal, VendorModal, ProductModal,AttendanceModal,QuotationModal],
  schemaVersion: 22,
};

import Realm from 'realm';

export class QuotationModal extends Realm.Object<QuotationModal> {
  id!: string;
  createdAt!: string;
  updatedAt!: string;
  metadata!: string;
  vendorId!: string;
  hasConvertedToOrder!: boolean;
  orderState?: String;
  
  quotationParticulars!: string;


  static schema = {
    name: 'Quotation',
    properties: {
      id: 'string',
      createdAt: 'string',
      updatedAt: 'string',
      metadata: 'string',
      vendorId: 'string',
      quotationParticulars: 'string',
      hasConvertedToOrder: 'bool?',
      orderState:"string?"
    },
    primaryKey: 'id',
  };
}

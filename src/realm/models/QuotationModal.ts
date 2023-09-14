import React from 'react';
import Realm from 'realm';

export class QuotationModal extends Realm.Object<QuotationModal> {
  createdAt!: string;
  updatedAt!: string;
  id!: string;
  metadata!: string;
  vendorId!: string;
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
    },
    primaryKey: 'id',
  };
}

import React from 'react';
import Realm from 'realm';

export class VendorModal extends Realm.Object<VendorModal> {
  createdAt!: string;
  updatedAt!: string;
  id!: string;
  metadata!: string;

  static schema = {
    name: 'Vendor',
    properties: {
      id: 'string',
      createdAt: 'string',
      updatedAt: 'string',
      metadata: 'string',
    },
    primaryKey: 'id',
  };
}

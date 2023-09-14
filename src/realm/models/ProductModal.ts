import React from 'react';
import Realm from 'realm';

export class ProductModal extends Realm.Object<ProductModal> {
  createdAt!: string;
  updatedAt!: string;
  id!: string;
  metadata!: string;
  defaultPrice!: string;

  static schema = {
    name: 'Product',
    properties: {
      id: 'string',
      createdAt: 'string',
      updatedAt: 'string',
      metadata: 'string',
      defaultPrice: 'string',
    },
    primaryKey: 'id',
  };
}

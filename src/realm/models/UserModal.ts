import React from 'react';
import Realm from 'realm';

export class UserModal extends Realm.Object<UserModal> {
  createdAt!: string;
  updatedAt!: string;
  email!: string;
  id!: string;
  metadata!: string;

  firstname!: string;
  lastname!: string;
  isVerified: boolean | undefined;
  isEnabled: boolean | undefined;

  static schema = {
    name: 'User',
    properties: {
      createdAt: 'string',
      updatedAt: 'string',
      email: 'string',
      metadata: 'string',
      firstname: 'string',
      id: 'string',
      lastname: 'string',
      isVerified: 'bool',
      isEnabled: 'bool',
    },
    primaryKey: 'id',
  };
}

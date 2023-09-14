import React from 'react';
import Realm from 'realm';

export class AttendanceModal extends Realm.Object<AttendanceModal> {
  createdAt!: string;
  updatedAt!: string;
  id!: string;
  metadata?: string;
  punchOutTime?: string;
  punchInTime?: string;
  attendanceStatus?: string;

  static schema = {
    name: 'Attendance',
    properties: {
      id: 'string',
      createdAt: 'string',
      updatedAt: 'string',
      metadata: 'string?',
      punchOutTime: 'string?',
      punchInTime: 'string?',
      attendanceStatus: 'string?',
    },
    primaryKey: 'id',
  };
}


import moment from "moment";

export interface UserType {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstname: string;
  metadata?: string;
  lastname: string;
  isVerified: boolean;
  isEnabled: boolean;
}



import { any } from "sequelize/types/lib/operators"

export interface Appointments {
  UserID: number;
  ServiceProviderID: number;
  AppointmentDate: any;
  StartTime: any;
  EndTime: any;
  Status: any;
  PaymentMode: any;
  TotalCost: any;
  IsPaid: any;
}
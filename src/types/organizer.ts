import { Event } from "./event";

export interface Organizer {
    id: number,
    fullName: string,
    email: string,
    password: string,
    phoneNumber : string,
    role: string,
    profilePicture: string,
    referralCod: string,
    pointsBalance : number,
    pointsExpiryDate: Date,
    address: string,
    bankAccount: string,
    isDeleted : boolean,
    createdAt: Date,
    updatedAt : Date,
    events: Event[]
  }
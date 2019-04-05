import { IUser } from "./User";

export declare interface IChangeHistoryEntry {
    user: IUser
    at: Date
    statusName: string
}
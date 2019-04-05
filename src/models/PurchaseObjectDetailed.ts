import { IPurchaseObject } from './PurchaseObject';
import { ISpecification } from './PurchaseObjectDetailedSpecification';

// Реестровый номер	
// Закон-основание	
// КПГЗ	
// Предмет закупки	
// Код финансирования	
// Стоимость	
// Статус	
// Действие

export const enum PurchaseObjectDetailStatus {
    CREATING = 'CREATING',
    PUBLISHED = 'PUBLISHED',
    APPROVED = 'APPROVED',
    INCLUDED_IN_LOT = 'INCLUDED_IN_LOT'
}

export const enum PurchaseObjectDetailedAddressType{
    FROM_BTE = 'FROM_BTE',
    CONDITIONAL = "CONDITIONAL",
    OUTSIDE_RF = 'OUTSIDE_RF'
}

export declare interface ISubjectClass {
    code: string
    description: string
}

export declare interface IPurchaseObjectDetailed {
    id: string
    object: IPurchaseObject
    subject: string
    addressType: PurchaseObjectDetailedAddressType
    specifications: ISpecification[]
    status: PurchaseObjectDetailStatus
    isPerItemPurchase: boolean
}
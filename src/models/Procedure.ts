import { LawType } from './Shared';

export const enum ProcedureStatus {
    CREATING = 'CREATING',
    PUBLISHED = 'PUBLISHED',
    APPROVED = 'APPROVED',
    EDITING = 'EDITING',
    DELETED = 'DELETED'
}

export const enum ProviderSetWayType {
    SELECT = 'SELECT',
    E_AUC = 'E_AUC',
    E_EXAM = 'E_EXAM',
    E_TWOSTAGE_EXAM = 'E_TWOSTAGE_EXAM',
    E_LIMITED_EXAM= 'E_LIMITED_EXAM',
    E_OFFERS_REQUEST = 'E_OFFERS_REQUEST',
    E_QUOTATIONS_REQUES = 'E_QUOTATIONS_REQUES',
    OPENED_EXAM = 'OPENED_EXAM',
    QUATATIONS_REQUES = 'QUATATIONS_REQUES',
    ONE_PROVID_PURCHASE = 'ONE_PROVID_PURCHASE',
    OFFERS_REQUEST = 'OFFERS_REQUEST',
    TWOSTAGE_EXAM = 'TWOSTAGE_EXAM',
    LIMITED_EXAM = 'LIMITED_EXAM'
}

export declare interface IProcedure {
    id: string
    regNumber: string
    law: LawType

    subjectName: string

    fundingCode: string
    purchaseSize: number

    contacts: {
        fio: {
            firstName: string
            secondName: string
        }
        email: string
        cellPhone: string
    }

    status: ProcedureStatus
}

export declare interface IProcedure44 extends IProcedure {
    isEqualOrgs: boolean
    isGetPurchase: boolean
    purchaseDocuments: any
    documentsSize: number
    lots: any
    
    procedureDocSubmitInfo: {
        address: string
        cabinet: string
        email: string
        cellPhone: string
        fax: string
        contactPerson: {
            firstName: string
            secondName: string
        }
        isStandardOrder: boolean
        submitingOrder: string
    }
    procedureDocAcceptInfo: {
        address: string
        cabinet: string
        email: string
        cellPhone: string
        fax: string
        contactPerson: {
            firstName: string
            secondName: string
        }
        copies: number
        isStandardOrder: boolean
        acceptingOrder: string
    }
}
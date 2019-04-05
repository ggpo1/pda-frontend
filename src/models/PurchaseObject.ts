import { IUsedSource } from "./FinancialSource";
import { LawType } from './Shared';

export const enum PurchaseObjectStatus {
    CREATING = 'CREATING',
    PUBLISHED = 'PUBLISHED',
    APPROVED = 'APPROVED'
}

export declare interface ISubjectClass {
    code: string
    description: string
}

export declare interface IPurchaseObject {
    id: string
    regNumber: string
    purchaseId: string
    law: LawType

    subject: string
    subjectClass: ISubjectClass

    fundingCode: string
    purchaseSize: number
    remainingSize: number
    status: PurchaseObjectStatus
}

export const enum SmallVolumeType {
    NO = 'NO',
    UNDER_400 = 'UNDER_400',
    UNDER_100 = 'UNDER_100'
}


export const enum SpecialPurchaseType { 
    NO = 'NO',
    PT_7 = 'PT_7',
    PT_23 = 'PT_23',
    PT_26 = 'PT_26',
    PT_33 = 'PT_33'
}

export const enum GoalType {
    EVENT_EXECUTION = 'EVENT_EXECUTION',
    WORLDWIDE_PROGRAM = 'WORLDWIDE_PROGRAM',
    FUNCTION_EXECUTION = 'FUNCTION_EXECUTION'
}

export const enum TermsDuration {
    ONE_TIME = 'ONE_TIME',
    REPEATING = 'REPEATING'
}

export const enum TermsPeriod {
    UNDEFINED = 'UNDEFINED',
    YEAR = 'YEAR',
    QUARTER = 'QUARTER',
    MONTH = 'MONTH',
    WEEK = 'WEEK',
    DAY = 'DAY',
    WORKDAY = 'WORKDAY'
}

export declare interface ITerms {
    duration: TermsDuration
    beginDate: Date
    period: TermsPeriod
    count: number
}

export declare interface IPurchaseObject44 extends IPurchaseObject {
    specialPurchaseType: SpecialPurchaseType
    smallVolume: SmallVolumeType
    goal: {
        type: GoalType
        expectedResult: string
        programName: string
        programEvents: string
        purchaseReason: string
        legalActs: string
        pt7Info: string
    }
    terms: ITerms
    financialSources: IUsedSource[]
    isPublicDiscussionNotApplicableDueToClosedMethod: boolean
    isPublicDiscussionNotApplicableDueToSingleProvider: boolean
}
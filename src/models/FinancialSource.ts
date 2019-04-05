export enum FinancialSourceType {
    FIN_ACTIONS = 'FIN_ACTIONS',
    OWN_FUNDS = 'OWN_FUNDS',
    LIMIT = 'LIMIT'
}

export declare interface IFinancialSource {
    id: string
    type: FinancialSourceType
    total: number
    used: number
}

export declare interface IOwnFundsSource extends IFinancialSource {
    name: string
}

export declare interface IFinancialActionSource extends IFinancialSource {
    chapterCode: string
    expenseKind: string
    govOperationClass: string
}

export declare interface ILimitSource extends IFinancialSource {
    chapterCode: string
    sectionCode: string
    targetExpenseAccount: string
    expenseKind: string
    govOperationClass: string
    territorialIncome: string
}

export declare interface IUsedSource {
    source: IFinancialSource
    amount: number
    year: number
}
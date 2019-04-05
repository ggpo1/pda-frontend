export const enum SupplyStagePeriodType {
    RELATIVE = "RELATIVE",
    ABSOLUTE = "ABSOLUTE"
}

export const enum DayType {
    NORMAL = "NORMAL",
    WORKDAY = "WORKDAY"
}

export declare interface ISupplyStage {
    volume: number
    type: SupplyStagePeriodType
    relativePeriod: {
        startOffset: number
        startOffsetType: DayType
        endOffset: number
        endOffsetType: DayType
    }
    absolutePeriod: {
        startDate: Date
        endDate: Date
    }
    conditions: string
}

export declare interface ISpecification {
    subjectDeclaration: {
        id: string
        subjectClass: {
            code: string
            description: string
        }
        subject: string
    }
    volume: number
    units: string // todo
    
    hasJustification: boolean
    justification: string
    // todo file
    
    supplyStages: ISupplyStage[]
}
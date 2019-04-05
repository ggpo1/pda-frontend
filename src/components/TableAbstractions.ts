export declare interface ITableColumn {
    title: string
    filter?: 'TEXT' | 'SELECT' | 'RANGE' | 'DATE'
    action?: {
        id: string
        title?: string
        icon?: {
            type: string
            name: string
        }
    }
    getter(row: any, index?: number): string
    setter?(row: any): string
    url?(row: any): string
}

export declare interface ITableGroup {
    header: string
    items: any[]
}

export declare interface ITableGroupConfig {
    group(items: any[]): ITableGroup[]
}

export declare interface ITableAction {
    id: string
    title: string
}
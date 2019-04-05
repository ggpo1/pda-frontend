import { Vue } from 'vue-property-decorator'
import { VueClass } from 'vue-class-component/lib/declarations';
import { IHint } from '@/components/form-table/FormFields';

export declare interface ISectionField {

}

export declare interface ISection {
    name: string
    component: VueClass<Vue>
    visible: boolean
    data?: object
    required?: boolean
    hint?: IHint
    
}

export declare interface IFormStats {
    component: VueClass<Vue>
}

export const enum IconType { 
    CLASS = 'CLASS',
    FONT = 'FONT'
}

export declare interface IAction {
    name: string
    title?: string
    icon?: { type: IconType, name: string }
    color?: string
    isRightAligned?: boolean
}

export const enum FormStyle {
    VERTICAL = "VERTICAL",
    HORIZONTAL = "HORIZONTAL"
}

export declare interface IForm {
    header: string
    stats?: IFormStats
    sections: ISection[]
    actions: IAction[]
    formStyle?: FormStyle
}
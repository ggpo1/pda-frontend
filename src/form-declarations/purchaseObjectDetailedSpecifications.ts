import { ISection, IconType, IForm, FormStyle } from '@/views/FormAbstractions'
import FieldSection from '@/views/form-renderers/FieldSection.vue'
import TableSection from '@/views/form-renderers/TableSection.vue'
import { ISpecification } from '@/models/PurchaseObjectDetailedSpecification'
import { IRow } from '@/components/form-table/FormFields';

export declare interface ISpecificationFormDeclaration {
    declaration: IForm
    subjDeclRow: IRow
}

export default function(): ISpecificationFormDeclaration {
    const subjDeclRow: IRow = {
        id: 'subjectDeclaration',
        title: 'СПГЗ',
        type: 'PICK',
        required: true,
        visible: false,

        getter: (s: ISpecification) => s.subjectDeclaration.subject,
        setter: (s: ISpecification) => {}
    }

    const purchaseInfoSection: ISection = {
        name: "Содержание закупки",
        component: FieldSection,
        visible: true,
        data: {
            columnCount: 1,
            columns: [{
                rows: [{
                    id: 'subjectType',
                    title: 'КПГЗ',
                    type: 'PICK',
                    visible: true,
                    required: true,
                    
                    getter: (s: ISpecification) => s.subjectDeclaration.subjectClass.code + ' ' + s.subjectDeclaration.subjectClass.description,
                    setter: (s: ISpecification) => {}
                }, subjDeclRow]
            }]
        }
    }

    const generalSpecificationsSection: ISection = {
        name: "Основные характеристики",
        component: TableSection,
        visible: false,
        data: {
            headers: [
                { key: 'specName', title: 'Характеристика' },
                { key: 'units', title: 'Единица измерения' },
                { key: 'operation', title: 'Условные операции' },
                { key: 'value', title: 'Значение' },
            ]
        },
    }

    const additSpecificationsSection: ISection = {
        name: "Дополнительные характеристики",
        component: TableSection,
        visible: false,
        data: {
            headers: [
                { key: 'specName', title: 'Характеристика' },
                { key: 'units', title: 'Единица измерения' },
                { key: 'operation', title: 'Условные операции' },
                { key: 'value', title: 'Значение' },
            ]
        }
    }

    const priceSection: ISection = {
        name: "Цена",
        component: FieldSection,
        visible: false,
        data: {
            columnCount: 1,
            columns: [{
                rows: [{
                    title: 'Объем закупки',
                    type: 'TEXT',
                    small: true,
                    required: true,

                    getter: (s: ISpecification) => s.volume + "",
                    setter: (s: ISpecification, value: number) => s.volume = value
                }, {
                    title: 'Единицы измерения',
                    type: 'SELECT',
                    required: true,

                    selectOptions: [
                        { key: '', desc: 'Выберите ед. изм.' }
                    ],
                    getter: (s: ISpecification) => {},
                    setter: (s: ISpecification) => {}
                }]
            }]
        }
    }

    const purchaseSizeInfoAdditFields = {
        purchaseSizeInfo: {
            title: 'Обоснование суммы закупки',
            type: 'MULTILINE_TEXT',
            editable: true,

            getter: (s: ISpecification) => s.justification,
            setter: (s: ISpecification) => {}
        },
        purchaseSizeInfoFile: {
            title: 'Файл-обоснование суммы закупки',
            type: 'FILE',
            editable: true,

            getter: (s: ISpecification) => "",
            setter: (s: ISpecification) => {}
        }
    }

    const purchaseSizeInfoSection: ISection = {
        name: "Обоснование суммы закупки",
        component: FieldSection,
        visible: false,
        data: {
            columnCount: 1,
            columns: [{
                rows: [{
                    title: 'Устанавливается в лоте',
                    type: 'CHECKBOX',

                    getter: (s: ISpecification) => !s.hasJustification,
                    setter: (s: ISpecification, value: boolean) => {
                        s.hasJustification = !value
                        purchaseSizeInfoAdditFields.purchaseSizeInfo.editable = value // todo: readonly
                        purchaseSizeInfoAdditFields.purchaseSizeInfoFile.editable = value
                    }                 
                }, purchaseSizeInfoAdditFields.purchaseSizeInfo, purchaseSizeInfoAdditFields.purchaseSizeInfoFile, {
                    type: 'TEXT',
                    editable: false,

                    getter: (s: ISpecification) => { return "Допустимые типы файлов: doc, docx, xls, xlsx, pdf, tiff, jpg, jpeg, zip, rar.Максимальный размер файла - 10 МБ" }
                }]
            }]
        }
    }

    const decl: IForm = {
        header: "",
        stats: undefined,
        formStyle: FormStyle.HORIZONTAL,
        actions: [{
            name: "save",
            icon: {
                type: IconType.CLASS,
                name: "save"
            },
            color: "blue"
        }, {
            name: "save-and-continue",
            icon: {
                type: IconType.CLASS,
                name: "save-thin"
            },
            color: "blue"
        }, {
            name: "close",
            icon: {
                type: IconType.CLASS,
                name: "close"
            },
            isRightAligned: true
        }],
        sections: [
            purchaseInfoSection,
            generalSpecificationsSection,
            additSpecificationsSection,
            priceSection,
            purchaseSizeInfoSection
        ]
    }

    return { declaration: decl, subjDeclRow }
}
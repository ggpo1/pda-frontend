import { ISection, IconType, IForm, FormStyle } from '@/views/FormAbstractions'
import FieldSection from '@/views/form-renderers/FieldSection.vue'
import TableSection from '@/views/form-renderers/TableSection.vue'
import { IPurchaseObjectDetailed } from '../models/PurchaseObjectDetailed';
import DetailedSpecificationsSection from '@/views/form-renderers/DetailedSpecificationsSection.vue'
import { LawType } from '@/models/Shared';

export default function(): IForm {

    const generalSection: ISection = {
        name: "Содержание закупки",
        component: FieldSection,
        visible: true,
        data: {
            columnCount: 2,
            columns: [{
                rows: [{
                    title: 'Закон-основание',
                    type: 'TEXT',
                    editable: false,

                    cssStyle: "",
                    

                    getter: (p: IPurchaseObjectDetailed) => p.object.law === LawType.F44 ? "44-ФЗ" : "223-ФЗ",
                    setter: (p: IPurchaseObjectDetailed, v: LawType) => p.object.law = v
                }, {
                    title: 'Заказчик',
                    type: 'TEXT',
                    editable: false,
                    
                       
                    getter: (p: IPurchaseObjectDetailed) => "NYI",
                    setter: (p: IPurchaseObjectDetailed, v: boolean) => {}
                }, {
                    title: 'Предмет закупки',
                    type: 'MULTILINE_TEXT',
                    editable: true,
                    required: true,

                    getter: (p: IPurchaseObjectDetailed) => p.subject,
                    setter: (p: IPurchaseObjectDetailed, v: string) => p.subject = v
                }, {
                    title: 'Закупка на единицу продукции',
                    type: 'CHECKBOX',

                    getter: (p: IPurchaseObjectDetailed) => p.isPerItemPurchase,
                    setter: (p: IPurchaseObjectDetailed, v: boolean) => p.isPerItemPurchase = v
                }]
            }]
        }
    }
    
    const financingSection: ISection = {
        name: "Финансирование",

        component: TableSection,
        visible: true,
        data: {
            headers: [
                { key: '', title: 'ГРБС' },
                { key: '', title: 'Тип' },
                { key: '', title: 'Источник' },
                { key: '', title: 'Лимит объекта, руб.' },
                { key: '', title: 'Остаток объекта, руб.' },
                { key: '', title: 'Сумма, руб.' },
                { key: '', title: 'Процент от суммы закупки, %' },
                { key: '', title: 'Титул АИП' },
                { key: '', title: 'Остаток по титулу АИП, руб.' }
            ]
        }
    }

    const anotherAddressFields = {
        title: '',
        type: 'RADIO_SELECT',
        visible: false,
        groupName: "specialAddress",
        
        selectOptions: [
            { key: 'FROM_BTE', desc: 'Адрес из БТИ' },
            { key: 'CONDITIONAL', desc: 'Условные ориентиры' },
            { key: 'OUTSIDE_RF', desc: 'За пределами РФ' }
        ],

        getter: (p: IPurchaseObjectDetailed) => p.addressType,
        setter: (p: IPurchaseObjectDetailed) => {}
    }

    const addressSection: ISection = {
        name: "Адрес поставки",
        component: FieldSection,
        visible: true,
        data: {
            columnCount: 1,
            columns: [{
                rows: [{
                    title: 'Адрес поставки',
                    type: 'TEXT',
                    required: true,
                    placeholder: 'поиск по ФИАС',

                    getter: (p: IPurchaseObjectDetailed) => {},
                    setter: (p: IPurchaseObjectDetailed) => {}
                }, anotherAddressFields]
            }]
        }
    }

    const historySection: ISection = {
        name: "История изменений",
        component: TableSection,
        visible: true,
        data: {
            headers: [
                { key: '', title: 'Пользователь' },
                { key: '', title: 'дата и время изменения' },
                { key: '', title: 'Статус' },
                { key: '', title: 'Время выполнения операции' }
            ]
        }
    }

    

    return {
        header: "Новый детализированный объект закупки",
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
            generalSection,
            {
                name: 'Спецификации',
                component: DetailedSpecificationsSection,
                visible: true
            },
            financingSection,
            addressSection,
            historySection
        ]
    }
}
import { ISection, IconType, IForm, FormStyle } from '@/views/FormAbstractions'
import FieldSection from '@/views/form-renderers/FieldSection.vue'
import { IProcedure44 } from '../models/Procedure';
import { LawType } from '@/models/Shared';

export default function(): IForm {

    const purchaseOrg = {
        title: '',
        type: 'SELECT',
        editable: true,
        selectOptions: [
            { key: 'SELECT', desc: 'Выберите организацию по проведению закупки' },
            { key: '', desc: 'ГБУ "СЦ 44"' },
            { key: '', desc: 'ЗАО "КВИТ"' },
            { key: '', desc: 'ООО "ВОСХОД"' },                               
            { key: '', desc: 'ООО "КомСтрин"' }
        ],
        getter: (p: IProcedure44) => {},
        setter: (p: IProcedure44) => {}
    }

    const submitingOrderField = {
        title: 'Порядок предоставление',
        type: 'MULTILINE_TEXT',
        required: true,
        editable: false,

        getter: (p: IProcedure44) => p.procedureDocSubmitInfo.submitingOrder,
        setter: (p: IProcedure44) => {}
    }

    const acceptingOrderField = {
        title: 'Порядок подачи',
        type: 'MULTILINE_TEXT',
        required: true,
        editable: true,

        getter: (p: IProcedure44) => p.procedureDocAcceptInfo.acceptingOrder,
        setter: (p: IProcedure44) => {}
    }

    const documentationSection: ISection = {
        name: "Документация и приём заявок",
        component: FieldSection,
        visible: true,
        data: {
            columnCount: 1,
            columns: [{
                rows: [{
                    type: 'STATIC_FIELD',
                    labelText: 'Место и порядок предоставления документации о процедуре закупки',
                    size: '3',

                    getter: () => {},
                    setter: () => {}
                }, {
                    title: 'Адрес',
                    type: 'TEXT',
                    required: true,

                    getter: (p: IProcedure44) => p.procedureDocSubmitInfo.address,
                }, {
                    title: 'Кабинет',
                    type: 'TEXT',
                    required: false,

                    getter: (p: IProcedure44) => p.procedureDocSubmitInfo.cabinet,
                }, {
                    title: 'Электронная почта',
                    type: 'TEXT',
                    required: true,

                    getter: (p: IProcedure44) => p.procedureDocSubmitInfo.email,
                }, {
                    title: 'Телефон',
                    type: 'TEXT',
                    required: true,

                    getter: (p: IProcedure44) => p.procedureDocSubmitInfo.cellPhone,
                }, {
                    title: 'Факс',
                    type: 'TEXT',
                    required: true,

                    getter: (p: IProcedure44) => p.procedureDocSubmitInfo.fax,
                }, {
                    title: 'Контактное лицо',
                    type: 'TEXT',
                    required: true,

                    getter: (p: IProcedure44) => p.procedureDocSubmitInfo.contactPerson.firstName + ' ' + p.procedureDocSubmitInfo.contactPerson.secondName,
                }, {
                    title: 'Стандартный порядок',
                    type: 'CHECKBOX',

                    getter: (p: IProcedure44) => p.procedureDocSubmitInfo.isStandardOrder,
                    setter: (p: IProcedure44) => {
                        p.procedureDocSubmitInfo.isStandardOrder = !p.procedureDocSubmitInfo.isStandardOrder;
                        submitingOrderField.editable = !p.procedureDocSubmitInfo.isStandardOrder
                    }
                }, submitingOrderField, {
                    type: 'STATIC_FIELD',
                    labelText: 'Место и порядок приема заявок на участие в процедуре закупки',
                    size: '3',

                    getter: () => {},
                    setter: () => {}
                }, {
                    title: 'Адрес',
                    type: 'TEXT',
                    required: true,

                    getter: (p: IProcedure44) => p.procedureDocAcceptInfo.address,
                }, {
                    title: 'Кабинет',
                    type: 'TEXT',
                    required: false,

                    getter: (p: IProcedure44) => p.procedureDocAcceptInfo.cabinet,
                }, {
                    title: 'Электронная почта',
                    type: 'TEXT',
                    required: true,

                    getter: (p: IProcedure44) => p.procedureDocAcceptInfo.email,
                }, {
                    title: 'Телефон',
                    type: 'TEXT',
                    required: true,

                    getter: (p: IProcedure44) => p.procedureDocAcceptInfo.cellPhone,
                }, {
                    title: 'Факс',
                    type: 'TEXT',
                    required: true,

                    getter: (p: IProcedure44) => p.procedureDocAcceptInfo.fax,
                }, {
                    title: 'Контактное лицо',
                    type: 'TEXT',
                    required: true,

                    getter: (p: IProcedure44) => p.procedureDocAcceptInfo.contactPerson.firstName + ' ' + p.procedureDocAcceptInfo.contactPerson.secondName,
                }, {
                    title: 'Количество копий заявки',
                    type: 'TEXT',
                    required: true,

                    getter: (p: IProcedure44) => p.procedureDocAcceptInfo.copies,
                }, {
                    title: 'Стандартный порядок',
                    type: 'CHECKBOX',

                    getter: (p: IProcedure44) => p.procedureDocAcceptInfo.isStandardOrder,
                    setter: (p: IProcedure44) => {
                        p.procedureDocAcceptInfo.isStandardOrder = !p.procedureDocAcceptInfo.isStandardOrder;
                        acceptingOrderField.editable = !p.procedureDocAcceptInfo.isStandardOrder
                    }
                }, acceptingOrderField, {
                    type: 'STATIC_FIELD',
                    labelText: 'Размер и порядок внесения платы, взимаемой за предоставление документации о закупке',
                    size: '3',

                    getter: () => {},
                    setter: () => {}
                }, {
                    title: 'Взимается плата',
                    type: 'RADIO_SELECT',
                    groupName: "isGetPurchaseRadio",

                    selectOptions: [
                        { key: 'YES', desc: 'Да' },
                        { key: 'NO', desc: 'Нет' }
                    ],

                    getter: (p: IProcedure44) => p.isGetPurchase,
                    setter: (p: IProcedure44) => {}
                }]
            }]
        }
    }

    const generalSection: ISection = {
        name: "Общие сведения",
        component: FieldSection,
        visible: true,
        data: {
            columnCount: 1,
            columns: [{
                rows: [{
                    title: 'Закон-основание',
                    type: 'TEXT',
                    editable: false,

                    getter: (p: IProcedure44) => p.law === LawType.F44 ? "44-ФЗ" : "223-ФЗ",
                    setter: (p: IProcedure44, v: LawType) => p.law = v
                }, {
                    title: 'Организатор закупки',
                    type: 'PICK',
                    required: true,

                    getter: (p: IProcedure44) => {},
                    setter: (p: IProcedure44) => {}
                }, {
                    title: 'Описание закупки',
                    type: 'MULTILINE_TEXT',
                    required: true,

                    getter: (p: IProcedure44) => {},
                    setter: (p: IProcedure44) => {}
                }, {
                    title: 'Способ определения поставщика',
                    type: 'SELECT',
                    required: true,

                    selectOptions: [
                        { key: 'SELECT', desc: 'Выберите способ определения поставщика' },
                        { key: 'E_AUC', desc: 'электронный аукцион' },
                        { key: 'E_EXAM', desc: 'электронный конкурс' },
                        { key: 'E_TWOSTAGE_EXAM', desc: 'электронный двухэтапный конкурс' },
                        { key: 'E_LIMITED_EXAM', desc: 'электронный конкурс с ограниченным участием' },
                        { key: 'E_OFFERS_REQUEST', desc: 'электронный запрос предложений' },
                        { key: 'E_QUOTATIONS_REQUES', desc: 'электронный запрос котировок' },
                        { key: 'OPENED_EXAM', desc: 'открытый конкурс' },
                        { key: 'QUATATIONS_REQUES', desc: 'запрос котировок' },
                        { key: 'ONE_PROVID_PURCHASE', desc: 'закупка у единственного поставщика' },
                        { key: 'OFFERS_REQUEST', desc: 'запрос предложений' },
                        { key: 'TWOSTAGE_EXAM', desc: 'двухэтапный конкурс' },
                        { key: 'LIMITED_EXAM', desc: 'конкурс с ограниченным участием' }
                    ],
                    getter: (p: IProcedure44) => {},
                    setter: (p: IProcedure44) => {}
                }, {
                    title: 'Специализированная организация по подготовке документации',
                    type: 'SELECT',
                    selectOptions: [
                        { key: 'SELECT', desc: 'Выберите организацию по подготовке документации' },
                        { key: '', desc: 'ГБУ "СЦ 44"' },
                        { key: '', desc: 'ЗАО "КВИТ"' },
                        { key: '', desc: 'ООО "ВОСХОД"' },                               
                        { key: '', desc: 'ООО "КомСтрин"' }
                    ],
                    getter: (p: IProcedure44) => {},
                    setter: (p: IProcedure44) => {}
                }, {
                    title: 'Специализированная организация по проведению процедуры закупки',
                    type: 'CHECKBOX',

                    getter: (p: IProcedure44) => p.isEqualOrgs,
                    setter: (p: IProcedure44) => {
                        p.isEqualOrgs = !p.isEqualOrgs;

                        purchaseOrg.editable = !p.isEqualOrgs;
                    }
                }, purchaseOrg, 
                {
                    type: 'STATIC_FIELD',
                    labelText: 'Документы лотов',
                    size: '3',

                    getter: () => {},
                    setter: () => {}
                }, {
                    type: 'TABLE',
                    tableData: {
                        headers: [
                            { key: 'lotNum', title: '№ лота' },
                            { key: 'lotName', title: 'Наименование лота' },
                            { key: 'docType', title: 'Тип документа' },
                            { key: 'description', title: 'Примечание' },
                            { key: 'document', title: 'Документ' },
                            { key: 'size', title: 'Размер' }
                        ]
                    }
                }, {
                    type: 'STATIC_FIELD',
                    labelText: 'Документы закупки',
                    size: '3',

                    getter: () => {},
                    setter: () => {}
                }, {
                    title: 'Номер решения о проведении закупки',
                    type: 'TEXT',
                    placeholder: 'Номер решения о проведении закупки',

                    getter: (p: IProcedure44) => {},
                    setter: (p: IProcedure44) => {}
                }, {
                    title: 'Дата решения о проведении закупки',
                    type: 'DATE_PICKER',

                    getter: (p: IProcedure44) => {},
                    setter: (p: IProcedure44) => {}
                }, {

                }, {
                    type: 'TEXT',
                    editable: false,

                    
                    getter: (p: IProcedure44) => p.purchaseDocuments == undefined ? "Документов нет" : "",
                }, {
                    type: 'LABEL_BUTTON',
                    buttonTitle: 'Добавить',

                    getter: (p: IProcedure44) => {},
                    setter: (p: IProcedure44) => {}
                }, {
                    type: 'TEXT',
                    editable: false,

                    getter: (p: IProcedure44) => "Общий размер отправляемых документов на ЕИС/ЭТП: " + p.documentsSize
                }, {
                    type: 'STATIC_FIELD',
                    labelText: 'Ответственное должностное лицо',
                    size: '3',

                    getter: () => {},
                    setter: () => {}
                }, {
                    title: 'ФИО',
                    type: 'TEXT',
                    editable: false,
                    required: true,

                    getter: (p: IProcedure44) => p.contacts.fio.firstName + ' ' + p.contacts.fio.secondName,
                    setter: () => {}
                },{
                    title: 'Электронная почта',
                    type: 'TEXT',
                    editable: false,
                    required: true,

                    getter: (p: IProcedure44) => p.contacts.email,
                    setter: () => {} 
                }, {
                    title: 'Телефон',
                    type: 'TEXT',
                    editable: false,
                    required: true,

                    getter: (p: IProcedure44) => p.contacts.cellPhone,
                    setter: () => {} 
                }]
            }]
        }
    }


      const lotSection: ISection = {
        name: "Лоты",
        component: FieldSection,
        visible: true,
        data: {
            columnCount: 1,
            columns: [{
                rows: [{
                    type: 'TEXT', 
                    editable: false,

                    getter: (p: IProcedure44) => p.lots == undefined ? "Лотов нет" : p.lots,
                }]
            }]
        }
    }

    return {
        header: "Новая процедура",
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
            documentationSection,
            lotSection
        ]
    }
}
import { IPurchaseObject44, GoalType, SpecialPurchaseType, SmallVolumeType } from '@/models/PurchaseObject'
import { ISection, IconType, IForm } from '@/views/FormAbstractions'
import FieldSection from '@/views/form-renderers/FieldSection.vue'
import ProvisionSection from '@/views/form-renderers/ProvisionSection.vue'
import TableSection from '@/views/form-renderers/TableSection.vue'
import { IChangeHistoryEntry } from '../models/ChangeHistoryEntry'
import { IRow } from '@/components/form-table/FormFields'
import { specialPurchaseDesc } from './enums'
import { LawType } from '@/models/Shared';

export declare interface IPurchaseObjectForm {
    object: IPurchaseObject44
    isDiscussionRequired: boolean
}

export declare interface IPurchaseObjectFormDeclaration {
    declaration: IForm
    discussionFields: IRow[]
    largeVolumeBlocks: ISection[]
    largeVolumeFields: IRow[]
    singleTerm: IRow
    periodicTerm: IRow
    onlyEvExecFields: IRow[]
}

export function FormDeclarationBuilder(): IPurchaseObjectFormDeclaration {
    const subjectClassField: IRow = {
        id: 'subjectClass',
        title: 'КПГЗ',
        type: 'PICK',
        visible: true,

        getter: (p: IPurchaseObjectForm) => p.object.subjectClass ? p.object.subjectClass.code + ' ' + p.object.subjectClass.description : "",
        setter: (p: IPurchaseObjectForm, v: GoalType) => {}
    }

    const discussionFields: IRow[] = [{
        title: 'Не требуется в связи с применением закрытых способов определения поставщиков (подрядчиков, исполнителей)',
        type: 'CHECKBOX',
        visible: true,

        getter: (p: IPurchaseObjectForm) => p.object.isPublicDiscussionNotApplicableDueToClosedMethod,
        setter: (p: IPurchaseObjectForm, v: boolean) => p.object.isPublicDiscussionNotApplicableDueToClosedMethod = v
    }, {
        title: 'Не требуется в связи с проведением закупки у единственного поставщика',
        type: 'CHECKBOX',
        visible: true,

        getter: (p: IPurchaseObjectForm) => p.object.isPublicDiscussionNotApplicableDueToSingleProvider,
        setter: (p: IPurchaseObjectForm, v: boolean) => p.object.isPublicDiscussionNotApplicableDueToSingleProvider = v
    }]

    const expectedResultField: IRow = {
        title: 'Ожидаемый результат:',
        type: 'MULTILINE_TEXT',
        
        getter: (p: IPurchaseObjectForm) => p.object.goal.expectedResult,
        setter: (p: IPurchaseObjectForm, v: string) => p.object.goal.expectedResult = v
    }

    const eventsField: IRow  = {
        title: 'Мероприятия  программы:',
        type: 'MULTILINE_TEXT',

        getter: (p: IPurchaseObjectForm) => p.object.goal.programEvents,
        setter: (p: IPurchaseObjectForm, v: string) => p.object.goal.programEvents = v
    }

    const pt7InfoField: IRow  = {
        title: 'Информация в соответствии с п.7 ч.2 ст.17:',
        type: 'MULTILINE_TEXT',

        getter: (p: IPurchaseObjectForm) => p.object.goal.pt7Info,
        setter: (p: IPurchaseObjectForm, v: string) => p.object.goal.pt7Info = v
    }

    const onlyEvExecFields: IRow[] = [expectedResultField, eventsField, pt7InfoField]

    const goalSection: ISection = {
        name: "Цель",
        component: FieldSection,
        visible: true,
        data: {
            columnCount: 2,
            columns: [{
                rows: [{
                    title: 'Цель закупки:',
                    type: 'TEXT',

                    getter: (p: IPurchaseObjectForm) => p.object.goal.type,
                    setter: (p: IPurchaseObjectForm, v: GoalType) => p.object.goal.type = v
                }]
            }, {
                rows: [expectedResultField]
            }, {
                rows: [{
                    title: 'Наименование программы:',
                    type: 'MULTILINE_TEXT',

                    getter: (p: IPurchaseObjectForm) => p.object.goal.programName,
                    setter: (p: IPurchaseObjectForm, v: string) => p.object.goal.programName = v
                }, eventsField, {
                    title: 'Обоснование соответствия объекта закупки мероприятию программы:',
                    type: 'MULTILINE_TEXT',

                    getter: (p: IPurchaseObjectForm) => p.object.goal.purchaseReason,
                    setter: (p: IPurchaseObjectForm, v: string) => p.object.goal.purchaseReason = v
                }, {
                    title: 'Полное наименование, дата принятия и номер утвержденных в соответствии со ст. 19 нормативных правовых (правовых) актов, или указание на отсутствие такого акта для соответствующего объекта и (или) соответствующих объектов закупки:',
                    type: 'MULTILINE_TEXT',

                    getter: (p: IPurchaseObjectForm) => p.object.goal.legalActs,
                    setter: (p: IPurchaseObjectForm, v: string) => p.object.goal.legalActs = v
                }, pt7InfoField]
            }]
        }
    }

    const singleTerm: IRow = {
        title: 'Дата закупки',
        type: 'TEXT',
        visible: false,

        getter: (p: IPurchaseObjectForm) => p.object.terms.beginDate,
        setter: (p: IPurchaseObjectForm, _: any) => {}
    }
    const periodicTerm: IRow = {
        title: 'Периодичность закупки',
        type: 'TEXT',
        visible: false,

        getter: (p: IPurchaseObjectForm) => `${p.object.terms.count} раз начиная с ${p.object.terms.beginDate}`,
        setter: (p: IPurchaseObjectForm, _: any) => {}
    }

    const termsSection: ISection = {
        name: "Срок осуществления закупки",
        component: FieldSection,
        visible: true,
        data: {
            columnCount: 1,
            columns: [{
                rows: [singleTerm, periodicTerm]
            }]
        }
    }

    const discussionSection: ISection = {
        name: "Общественное обсуждение",
        component: FieldSection,
        visible: true,
        data: {
            columnCount: 1,
            columns: [{
                rows: [{
                    title: 'Обязательность общественного обсуждения',
                    type: 'TEXT',
                    editable: false,

                    getter: (p: IPurchaseObjectForm) => p.isDiscussionRequired ? "Да" : "Нет",
                    setter: (p: IPurchaseObjectForm, v: string) => {}
                }, ...discussionFields]
            }]
        }
    }

    const specialPurchaseField: IRow = {
        title: 'Особая закупка',
        type: 'TEXT',

        getter: (p: IPurchaseObjectForm) => specialPurchaseDesc[p.object.specialPurchaseType],
        setter: (p: IPurchaseObjectForm, v: SpecialPurchaseType) => p.object.specialPurchaseType = v
    }

    const decl: IForm = {
        header: "Новый объект закупки",
        stats: undefined,
        actions: [{
            name: "clone",
            icon: {
                type: IconType.CLASS,
                name: "clone"
            },
            color: "blue"
        }, {
            name: "edit",
            icon: {
                type: IconType.CLASS,
                name: "edit"
            },
            color: "blue"
        }, {
            name: "delete",
            icon: {
                type: IconType.CLASS,
                name: "delete"
            },
            color: "red"
        }, {
            name: "approve",
            title: "Утвердить",
            isRightAligned: true,
            color: "green"
        }, {
            name: "detail",
            title: "Детализировать объект",
            isRightAligned: true,
            color: "green"
        }, {
            name: "close",
            icon: {
                type: IconType.CLASS,
                name: "close"
            },
            isRightAligned: true
        }],
        sections: [{
            name: "Содержание закупки",
            component: FieldSection,
            visible: true,
            data: {
                columnCount: 1,
                columns: [{
                    rows: [{
                        title: 'Закон-основание',
                        type: 'TEXT',
                        editable: false,

                        getter: (p: IPurchaseObjectForm) => p.object.law === LawType.F44 ? "44-ФЗ" : "223-ФЗ",
                        setter: (p: IPurchaseObjectForm, v: LawType) => p.object.law = v
                    }, {
                        title: 'Заказчик',
                        type: 'TEXT',

                        getter: (p: IPurchaseObjectForm) => "NYI",
                        setter: (p: IPurchaseObjectForm, v: string) => {}
                    }, {
                        title: 'Закупка малого объема',
                        type: 'TEXT',

                        getter: (p: IPurchaseObjectForm) => p.object.smallVolume,
                        setter: (p: IPurchaseObjectForm, v: SmallVolumeType) => { p.object.smallVolume = v }
                    }, {
                        title: 'КПГЗ',
                        type: 'TEXT',

                        getter: (p: IPurchaseObjectForm) => p.object.subjectClass.code + ": " + p.object.subjectClass.description,
                        setter: (p: IPurchaseObjectForm, v: string) => {}
                    },  {
                        title: 'ОКПД-2',
                        type: 'TEXT',

                        getter: (p: IPurchaseObjectForm) => "??",
                        setter: (p: IPurchaseObjectForm, v: string) => {}
                    }, {
                        title: 'Предмет закупки',
                        type: 'MULTILINE_TEXT',

                        getter: (p: IPurchaseObjectForm) => p.object.subject,
                        setter: (p: IPurchaseObjectForm, v: string) => p.object.subject = v
                    }, {
                        title: 'Планируемый год размещения извещения о закупке',
                        type: 'TEXT',

                        getter: (p: IPurchaseObjectForm) => "NYI",
                        setter: (p: IPurchaseObjectForm, v: string) => {}
                    }, specialPurchaseField, {
                        title: 'ИКЗ',
                        type: 'TEXT',
                        editable: false,

                        getter: (p: IPurchaseObjectForm) => "не сгенерирован",
                        setter: (p: IPurchaseObjectForm, v: string) => {}
                    }]
                }]
            }
        }, {
            name: "Финансовое обеспечение закупки",
            component: ProvisionSection,
            visible: true
        }, goalSection, termsSection, discussionSection, {
            name: "История изменений",
            component: TableSection,
            visible: true,
            data: {
                headers: [ {
                    title: "Пользователь",
                    getter: (p: IChangeHistoryEntry) => p.user.lastName + ' ' + p.user.firstName + ' ' + p.user.middleName
                }, {
                    title: "Дата и время изменения",
                    getter: (p: IChangeHistoryEntry) => p.at
                }, { 
                    title: "Статус",
                    getter: (p: IChangeHistoryEntry) => p.statusName
                }],
                items: [{
                    user: { lastName: "Иванов", firstName: "Иван", middleName: "Иванович" },
                    at: new Date(Date.now()),
                    statusName: "Согласована ГРБС"
                }, {
                    user: { lastName: "Иванов", firstName: "Иван", middleName: "Иванович" },
                    at: new Date(Date.now() - 100000),
                    statusName: "Формирование"
                }]
            }
        }]
    }

    return { 
        declaration: decl, 
        discussionFields: discussionFields, 
        largeVolumeBlocks: [ termsSection, discussionSection, goalSection ], 
        largeVolumeFields: [ subjectClassField, specialPurchaseField ],
        singleTerm,
        periodicTerm,
        onlyEvExecFields
    }
}
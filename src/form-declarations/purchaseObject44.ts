import { IPurchaseObject44, GoalType, SpecialPurchaseType, SmallVolumeType } from '@/models/PurchaseObject'
import { ISection, IconType, IForm } from '@/views/FormAbstractions'
import FieldSection from '@/views/form-renderers/FieldSection.vue'
import ProvisionSection from '@/views/form-renderers/ProvisionSection.vue'
import TableSection from '@/views/form-renderers/TableSection.vue'
import { ITerms } from '../models/PurchaseObject'
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
    onlyEvExecFields: IRow[]
}

export function FormDeclarationBuilder(): IPurchaseObjectFormDeclaration {
    const subjectClassField: IRow = {
        id: 'subjectClass',
        title: 'КПГЗ',
        type: 'PICK',
        visible: true,
        required: true,
        hint: {
            text: "Поле для выбора элемента из классификатора предметов государственного заказа, определяющего предмет закупки",
            link: {
                title: "П.3 часть 2 статья 17 глава 2 ФЗ – 44",
                href: "http://www.consultant.ru/cons/cgi/online.cgi?req=doc;base=LAW;n=157037;div=LAW;dst=101694;rnd=0.6302542458288372#05735342883270671"
            }
        },

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
        required: true,
        visible: true,
        hint: {
            text: "Ожидаемый результат реализации мероприятия государственной программы города Москвы.",
        },

        getter: (p: IPurchaseObjectForm) => p.object.goal.expectedResult,
        setter: (p: IPurchaseObjectForm, v: string) => p.object.goal.expectedResult = v
    }

    const eventsField: IRow  = {
        title: 'Мероприятия  программы:',
        type: 'MULTILINE_TEXT',
        required: true,
        visible: true,
        hint: {
            text: "Наименование мероприятия государственной программы города Москвы"
        },

        getter: (p: IPurchaseObjectForm) => p.object.goal.programEvents,
        setter: (p: IPurchaseObjectForm, v: string) => p.object.goal.programEvents = v
    }

    const pt7InfoField: IRow  = {
        title: 'Информация в соответствии с п.7 ч.2 ст.17:',
        type: 'MULTILINE_TEXT',
        required: true,
        visible: true,

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
                    type: 'RADIO_SELECT',
                    groupName: "goalType",
                    required: true,
                    hint: {
                        text: "Поле для указания цели закупки",
                        link: {
                            title: "44-ФЗ:Глава 1, статья 13",
                            href: "http://www.consultant.ru/cons/cgi/online.cgi?req=doc;base=LAW;n=157037;div=LAW;dst=100111;rnd=0.49889100645668805#04945507943836873"
                        }
                    },
                    
                    selectOptions: [
                        { key: 'EVENT_EXECUTION', desc: 'Достижение целей и реализации мероприятий, предусмотренных государственными программами (в том числе федеральными, региональными, муниципальными целевыми программами) и документами стратегического и программно-целевого планирования Российской Федерации и ее субъектов' },
                        { key: 'WORLDWIDE_PROGRAM', desc: 'Исполнение международных обязательств Российской Федерации, реализация межгосударственных целевых программ, участником которых является Российская Федерация' },
                        { key: 'FUNCTION_EXECUTION', desc: 'Выполнение функций и полномочий государственных органов Российской Федерации, органов управления государственными внебюджетными фондами Российской Федерации, государственных органов субъектов Российской Федерации, органов управления территориальными внебюджетными фондами, муниципальных органов' }
                    ],

                    getter: (p: IPurchaseObjectForm) => p.object.goal.type,
                    setter: (p: IPurchaseObjectForm, v: GoalType) => p.object.goal.type = v
                }]
            }, {
                rows: [expectedResultField]
            }, {
                rows: [{
                    title: 'Наименование программы:',
                    type: 'MULTILINE_TEXT',
                    required: true,

                    getter: (p: IPurchaseObjectForm) => p.object.goal.programName,
                    setter: (p: IPurchaseObjectForm, v: string) => p.object.goal.programName = v
                }, eventsField, {
                    title: 'Обоснование соответствия объекта закупки мероприятию программы:',
                    type: 'MULTILINE_TEXT',
                    required: true,

                    getter: (p: IPurchaseObjectForm) => p.object.goal.purchaseReason,
                    setter: (p: IPurchaseObjectForm, v: string) => p.object.goal.purchaseReason = v
                }, {
                    title: 'Полное наименование, дата принятия и номер утвержденных в соответствии со ст. 19 нормативных правовых (правовых) актов, или указание на отсутствие такого акта для соответствующего объекта и (или) соответствующих объектов закупки:',
                    type: 'MULTILINE_TEXT',
                    required: true,

                    getter: (p: IPurchaseObjectForm) => p.object.goal.legalActs,
                    setter: (p: IPurchaseObjectForm, v: string) => p.object.goal.legalActs = v
                }, pt7InfoField]
            }]
        }
    }

    const termsSection: ISection = {
        name: "Срок осуществления закупки",
        component: FieldSection,
        visible: true,
        required: true,
        data: {
            columnCount: 1,
            columns: [{
                rows: [{
                    title: 'Периодичность',
                    type: 'DATE_RANGE',
                    hint: {
                        text: "Поле для указания срока или периодичности осуществления закупки",
                        link: {
                            title: "П.5 часть 2 статья 17 глава 2 ФЗ – 44",
                            href: "http://www.consultant.ru/cons/cgi/online.cgi?req=doc;base=LAW;n=157037;div=LAW;dst=100145;rnd=0.9274810992646962#016038874362352518"
                        }
                    },

                    getter: (p: IPurchaseObjectForm) => p.object.terms,
                    setter: (p: IPurchaseObjectForm, v: ITerms) => p.object.terms = v
                }]
            }]
        }
    }

    const discussionSection: ISection = {
        name: "Общественное обсуждение",
        component: FieldSection,
        visible: true,
        hint: {
            text: "Согласно 20 статье 2 главы 44-ФЗ процедура общественного обсуждения необходима при закупке свыше 1 000 000 000руб",
            link: {
                title: "статья 20 Глава 2 44-ФЗ",
                href: "http://www.consultant.ru/cons/cgi/online.cgi?req=doc;base=LAW;n=157037;div=LAW;dst=100184;rnd=0.027654005214571953#09227484808202129"
            }
        },
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
        type: 'RADIO_SELECT',
        groupName: "specialPurchase",

        selectOptions: Object.entries(specialPurchaseDesc).map(x => ({key: x[0], desc: x[1] as string})),
        getter: (p: IPurchaseObjectForm) => p.object.specialPurchaseType,
        setter: (p: IPurchaseObjectForm, v: SpecialPurchaseType) => p.object.specialPurchaseType = v
    }

    const decl: IForm = {
        header: "Новый объект закупки",
        stats: undefined,
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
        sections: [{
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

                        getter: (p: IPurchaseObjectForm) => p.object.law === LawType.F44 ? "44-ФЗ" : "223-ФЗ",
                        setter: (p: IPurchaseObjectForm, v: LawType) => p.object.law = v
                    }, {
                        title: 'Заказчик',
                        type: 'TEXT',
                        editable: false,
                        required: true,
                        hint: {
                            text: "Поле для выбора заказчика, в план закупок которого будет включен объект закупки",
                            link: {
                                title: "Часть 1 статья 17 глава 2 44-ФЗ",
                                href: "http://www.consultant.ru/cons/cgi/online.cgi?req=doc;base=LAW;n=157037;div=LAW;dst=100139"
                            }
                        },

                        getter: (p: IPurchaseObjectForm) => "NYI",
                        setter: (p: IPurchaseObjectForm, v: string) => {}
                    }, {
                        title: 'Закупка малого объема',
                        type: 'RADIO_SELECT',
                        groupName: "smallVolume",
                        required: true,

                        selectOptions: [
                            { key: 'NO', desc: 'Нет' },
                            { key: 'UNDER_100', desc: 'п.4 ч.1 ст.93 (до 100 тыс. рублей)' },
                            { key: 'UNDER_400', desc: 'п.5 ч.1 ст.93 (до 400 тыс. рублей)' }
                        ],

                        getter: (p: IPurchaseObjectForm) => p.object.smallVolume,
                        setter: (p: IPurchaseObjectForm, v: SmallVolumeType) => { p.object.smallVolume = v }
                    }, subjectClassField]
                }, {
                    rows: [{
                        title: 'Предмет закупки',
                        type: 'MULTILINE_TEXT',
                        required: true,
                        hint: {
                            text: "Предмет закупки"
                        },

                        getter: (p: IPurchaseObjectForm) => p.object.subject,
                        setter: (p: IPurchaseObjectForm, v: string) => p.object.subject = v
                    }]
                }, {
                    rows: [{
                        title: 'Планируемый год размещения извещения о закупке',
                        type: 'SELECT',
                        groupName: "year",
                        required: true,

                        selectOptions: [
                            { key: '2018', desc: '2018' },
                            { key: '2019', desc: '2019' },
                            { key: '2020', desc: '2020' }
                        ],

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
            visible: true,
            required: true
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
        onlyEvExecFields
    }
}
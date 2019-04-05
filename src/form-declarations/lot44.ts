import { ILot44 } from '@/models/Lot'
import { ISection, IconType, IForm, FormStyle } from '@/views/FormAbstractions'
import FieldSection from '@/views/form-renderers/FieldSection.vue'
import SpecificationsSection from '@/views/form-renderers/SpecificationsSection.vue'
import DocumentationSection from '@/views/form-renderers/DocumentationSection.vue'
import NmzSection from '@/views/form-renderers/NmzSection.vue'
import { LawType } from '@/models/Shared';

export default function(): IForm {

    const multiLotFields = {
        orgType: {
            title: 'Тип организатора',
            type: 'RADIO_SELECT',
            visible: false,
            groupName: "ortType",
            

            selectOptions: [
                { key: '', desc: 'Организатор совместных торгов' },
                { key: '', desc: 'Уполномоченное учреждение' }
            ],
            getter: (p: ILot44) => {},
            setter: (p: ILot44) => {}
        },
        org: {
            title: 'Организатор',
            type: 'LABEL_BUTTON',
            buttonTitle: 'Редактировать',
            visible: false,

            getter: (p: ILot44) => {},
            setter: (p: ILot44) => {},
        }
    }
 
    const requestSection: ISection = {
        name: 'Обеспечение заявки',
        component: FieldSection,
        visible: true,
        data: {
            columnCount: 1,
            columns: [{
                rows: [{
                    title: 'Взимается обеспечение заявки',
                    type: 'STATIC_FIELD',
                    labelText: 'Обеспечение заявки не указывается.',

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }]
            }]
        }
    }

    const contractInfo = {
        title: 'Размер обеспечения исполнения контракта (%)',
        type: 'TEXT',
        editable: true,
        small: true,
        labelText: 'Обеспечение заявки не указывается.',

        getter: (p: ILot44) => 0,
        setter: (p: ILot44, v: boolean) => {}
    }

    const contractSection: ISection = {
        name: 'Обеспечение контракта',
        component: FieldSection,
        visible: true,
        data: {
            columnCount: 1,
            columns: [{
                rows: [{
                    title: 'Взимается обеспечение исполнения контракта',
                    type: 'CHECKBOX',
                    labelText: '',

                    getter: (p: ILot44) => p.contractProvision,
                    setter: (p: ILot44, v: boolean) => {
                        p.contractProvision = !p.contractProvision

                        p.contractProvision ? contractInfo.title = 'Размер обеспечения исполнения контракта (%)' : contractInfo.title = '';
                        p.contractProvision ? contractInfo.type = 'TEXT' : contractInfo.type = 'STATIC_FIELD';
                    }
                }, contractInfo]
            }]
        }
    }

    const markSection: ISection = {
        name: 'Критерии оценки',
        component: FieldSection,
        visible: true,
        required: true,
        data: {
            columnCount: 1,
            columns: [{
                rows: [{
                    title: 'Для данного способа определения поставщика критерии оценки не указываются',
                    type: 'STATIC_FIELD',

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }]
            }]
        }
    }

    const multiLotCheckField = {            
        title: 'Данный лот должен быть включен в совместный лот',
        type: 'CHECKBOX',
        visible: true,

        getter: (p: ILot44) => p.isMultiLot,
        setter: (p: ILot44, v: boolean) => {
            p.isMultiLot = !p.isMultiLot;
            multiLotFields.orgType.visible = p.isMultiLot;
            multiLotFields.org.visible = p.isMultiLot;
            markSection.visible = !p.isMultiLot;
        }
    
    }

    const generalSection: ISection = {
        name: "Общие сведения",
        component: FieldSection,
        visible: true,
        data: {
            columnCount: 1,
            style: '123',
            columns: [{
                rows: [{
                    title: 'Закон-основание',
                    type: 'TEXT',
                    editable: false,

                    getter: (p: ILot44) => p.law === LawType.F44 ? "44-ФЗ" : "223-ФЗ",
                    setter: (p: ILot44, v: LawType) => p.law = v
                    
                }, {
                    title: 'ИКЗ',
                    type: 'STATIC_FIELD',
                    

                }, {
                    title: 'Заказчик',
                    type: 'TEXT',
                    editable: false,
                    required: true,

                    getter: (p: ILot44) => "NYI",
                    setter: (p: ILot44, v: boolean) => {} 
                }, {
                    title: 'Тип контракта',
                    type: 'SELECT',
                    required: true,

                    selectOptions: [
                        { key: 'SELECT', desc: 'Выберите тип контракта' },
                        { key: 'GOOD_PROVIDING', desc: 'Поставка товаров' },
                        { key: 'DO_SERVICES', desc: 'Оказание услуг' },
                        { key: 'WORK_COMPLETES', desc: 'Выполнение работ' }
                    ],
                    
                    getter: (p: ILot44) => p.lotContractType,
                    setter: (p: ILot44) => {
                        // const _contractType = p.contractType === ""
                        
                    }
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

                    getter: (p: ILot44) => "",
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Обоснование способа определения поставщика',
                    type: 'MULTILINE_TEXT',
                    required: true,

                    getter: (p: ILot44) => "",
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Файл-обоснование способа определения поставщика',
                    type: 'FILE',
                    required: true,

                    getter: (p: ILot44) => "",
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    type: 'TEXT',
                    editable: false,

                    getter: (p: ILot44) => "Допустимые типы файлов: doc, docx, xls, xlsx, pdf, tiff, jpg, jpeg, zip, rar.Максимальный размер файла - 10 МБ",
                }, {
                    title: 'Предмет закупки',
                    type: 'MULTILINE_TEXT',
                    required: true,
                    hint: {
                        text: "Поле должно содержать развернутое описание закупаемых работ/товаров/услуг Пример: - Поставка бумаги для нужд Департамента градостроительной политики города Москвы на первое полугодие 2016 года - Услуги почты России на 2016 год - Системное обслуживание информационно-вычислительных комплексов"
                    },
                    getter: (p: ILot44) => {},
                    setter: (p: ILot44) => {}
                }, {
                    title: 'Планируемая дата публикации',
                    type: 'DATE_PICKER',
                    required: true,

                    getter: (p: ILot44) => "",
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Срок исполнения контракта',
                    type: 'DATE_PICKER',
                    required: true,

                    getter: (p: ILot44) => "",
                    setter: (p: ILot44, v: boolean) => {}
                }, multiLotCheckField, multiLotFields.orgType, multiLotFields.org, {
                    title: 'Совместная закупка',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => p.multiPurchase,
                    setter: (p: ILot44) => {
                        p.multiPurchase = !p.multiPurchase;
                        multiLotCheckField.visible = !p.multiPurchase;
                        contractSection.visible = !p.multiPurchase
                    }
                }, {
                    title: 'Закупка на единицу продукции',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => "",
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Закупка относится к капитальному ремонту объектов капитального строительства',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => "",
                    setter: (p: ILot44, v: boolean) => {}
                }]
            }]
        }
    }


    const additSection: ISection = {
        name: 'Дополнительные сведения',
        component: FieldSection,
        visible: true,
        data: {
            columnCount: 1,
            columns: [{
                rows: [{
                    title: 'Преимущества учреждениям УИС (%)',
                    type: 'TEXT',
                    editable: true,
                    small: true,

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Преимущества организациям инвалидов (%)',
                    type: 'TEXT',
                    editable: true,
                    small: true,

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    id: 'avansSize',
                    title: 'Размер аванса (%)',
                    type: 'TEXT',
                    editable: true,
                    small: true,

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Условия запрета допуска иностранных товаров',
                    type: 'MULTILINE_TEXT',
                    editable: true,

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Объём иностранных товаров',
                    type: 'TEXT',
                    editable: true,

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Товары, произведенные на территории государств - членов Евразийского экономического союза; преимущества предоставляются при условии соответствия пунктам 3, 4, 5, 6, 7 приказа Минэкономразвития от 25 марта 2014 г. № 155',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Применение запрета для товаров, входящих в Перечень сельскохозяйственной продукции, сырья и продовольствия, страной происхождения которых является Турецкая Республика и которые запрещены с 1 января 2016 г. к ввозу в Российскую Федерацию (утверждено постановлением Правительства Российской Федерации от 30 ноября 2015 г. № 1296)',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Применение запрета для товаров, входящих в Перечень отдельных видов товаров машиностроения, происходящих из иностранных государств, в соответствии с постановлением Правительства Российской Федерации от 14 июля 2014 г. № 656',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Применение запрета на допуск отдельных видов товаров легкой промышленности, происходящих из иностранных государств, в соответствии с постановлением Правительства Российской Федерации от 11 августа 2014 г. N 791',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Применение запрета на допуск программ для электронных вычислительных машин и баз данных, реализуемых независимо от вида договора на материальном носителе и (или) в электронном виде по каналам связи, происходящих из иностранных государств, а также исключительных прав на такое программное обеспечение и прав использования такого программного обеспечения, в соответствии с положениями постановления Правительства Российской Федерации от 16 ноября 2015 г. № 1236',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Применение ограничений допуска отдельных видов пищевых продуктов, происходящих из иностранных государств в соответствии с постановлением Правительства Российской Федерации от 22 августа 2016 г. № 832',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Применение ограничений допуска отдельных видов медицинских изделий, происходящих из иностранных государств в соответствии с постановлением Правительства Российской Федерации от 05 февраля 2015 г. № 102',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Применение ограничений допуска отдельных видов лекарственных препаратов, включенных в Перечень жизненно необходимых и важнейших лекарственных препаратов и происходящих из иностранных государств в соответствии с постановлением Правительства Российской Федерации от 30 ноября 2015 г. № 1289',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Об ограничениях и условиях допуска отдельных видов радиоэлектронной продукции, происходящих из иностранных государств, для целей осуществления закупок для обеспечения государственных и муниципальных нужд',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Применение запрета на допуск отдельных видов товаров мебельной и деревообрабатывающей промышленности, происходящих из иностранных государств, в соответствии с постановлением Правительства Российской Федерации от 5 сентября 2017 г. № 1072',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Предметом контракта является поставка товара, необходимого для нормального жизнеобеспечения в случаях, указанных в ч. 9 ст. 37 44-ФЗ',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Выполнение научно-исследовательских, опытно-конструкторских, технологических работ или оказание консультационных услуг',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    id: 'editPersonInfoBtn',
                    title: 'Информация об ответственном должостном лице заказчика',
                    type: 'LABEL_BUTTON',
                    buttonTitle: 'Редактировать',

                    getter: (P: ILot44) => {  },
                    setter: (p: ILot44, v: boolean) => {  }
                }, {
                    title: 'Контактное лицо',
                    type: 'STATIC_FIELD',
                    labelText: 'Матерова Елена Викторовна',
                    required: true,

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {} 
                }, {
                    title: 'Телефон',
                    type: 'STATIC_FIELD',
                    labelText: '+7 (495) 685-38-04',
                    required: true,
                    
                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {} 
                }, {
                    title: 'Электронная почта',
                    type: 'STATIC_FIELD',
                    labelText: 'sp11@zdrav.mos.ru',
                    required: true,

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {} 
                }, {
                    title: 'Информация о контрактной службе/управляющем, ответственных за заключение контракта',
                    type: 'STATIC_FIELD',

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {}
                }, {
                    title: 'Контактное лицо',
                    type: 'STATIC_FIELD',
                    labelText: 'Матерова Елена Викторовна',
                    required: true,

                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {} 
                }, {
                    title: 'Телефон',
                    type: 'STATIC_FIELD',
                    labelText: '+7 (495) 685-38-04',
                    required: true,
                    
                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {} 
                }, {
                    title: 'Электронная почта',
                    type: 'STATIC_FIELD',
                    labelText: 'sp11@zdrav.mos.ru',
                    required: true,
                    
                    getter: (p: ILot44) => {},
                    setter: (p: ILot44, v: boolean) => {} 
                }, {}]
            }]
        }
    }

    const additProvidReqFields = {
        additProvidReq: {
            title: '',
            type: 'MULTILINE_TEXT',
            visible: false,
            getter: (p: ILot44) => {},
            setter: (p: ILot44, v: boolean) => {} 
        },
        additProvidReqInfo: {
            title: 'Обоснование дополнительного требования',
            type: 'MULTILINE_TEXT',
            visible: false,

            getter: (p: ILot44) => {},
            setter: (p: ILot44, v: boolean) => {} 
        },

    }
    
    const additReqSection: ISection = {
        name: 'Дополнительные требования',
        component: FieldSection,
        visible: true,
        data: {
            columnCount: 1,
            columns: [{
                rows: [{
                    title: 'Дополнительные требования к поставщику',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => p.haveAdditProviderReq,
                    setter: (p: ILot44, v: boolean) => {
                        p.haveAdditProviderReq = !p.haveAdditProviderReq;

                        additProvidReqFields.additProvidReq.visible = p.haveAdditProviderReq;

                        additProvidReqFields.additProvidReqInfo.visible = p.haveAdditProviderReq || p.haveAddirRfReq;
                    }
                }, additProvidReqFields.additProvidReq, {
                    title: 'Дополнительные требования согласно Постановлению Правительства РФ от 4.02.2015 № 99',
                    type: 'CHECKBOX',

                    getter: (p: ILot44) => p.haveAddirRfReq,
                    setter: (p: ILot44, v: boolean) => {
                        p.haveAddirRfReq = !p.haveAddirRfReq;
                        additProvidReqFields.additProvidReqInfo.visible = p.haveAdditProviderReq || p.haveAddirRfReq;
                    }
                }, additProvidReqFields.additProvidReqInfo]
            }]
        }
    }

    

    return {
        header: 'Новый лот',
        stats: undefined,
        formStyle: FormStyle.HORIZONTAL,
        actions: [
            {
                name: "save",
                icon: {
                    type: IconType.CLASS,
                    name: "save"
                },
                color: "blue"
            },
        ],
        sections: [
            generalSection,
            {
                name: 'НМЦ',
                component: NmzSection,
                visible: true  
            },
            {
                name: 'Спецификации',
                component: SpecificationsSection,
                visible: true
            },
            requestSection,
            contractSection,
            markSection,
            additSection,
            additReqSection,
            {
                name: 'Документация',
                component: DocumentationSection,
                visible: true
            },
        ]
    }
}
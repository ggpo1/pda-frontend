import { LawType } from './Shared';

/*
Реестровый номер	
Закон-основание	
ИКЗ	
Предмет закупки	
НМЦ контракта	
Способ определения поставщика	
Дата начала закупки	
Размещение среди СМП/МСП	
Статус	
Номер повторной закупки	
Действие

SELECT = 'Выберите тип контракта',
GOOD_PROVIDING = 'Поставка товаров',
DO_SERVICES = 'Оказание услуг',
WORK_COMPLETES = 'Выполнение работ'

SELECT = 'Выберите способ определения поставщика',
e_auc = 'электронный аукцион',
e_exam = 'электронный конкурс',
e_twoStage_exam = 'электронный двухэтапный конкурс',
e_limited_exam = 'электронный конкурс с ограниченным участием',
e_offers_request = 'электронный запрос предложений',
e_quotations_reques = 'электронный запрос котировок',
opened_exam = 'открытый конкурс',
quotations_reques = 'запрос котировок',
one_provid_purchase = 'закупка у единственного поставщика',
offers_request = 'запрос предложений',
twoStage_exam = 'двухэтапный конкурс',
limited_exam = 'конкурс с ограниченным участием'
*/

export const enum IncludingInSmpOrMspType {
    NO = 'NO',
    PART_INCLUDING = 'PART_INCLUDING',
    FULL_INCLUDING = 'FULL_INCLUDING',
}

export const enum LotContractType {
    SELECT = 'SELECT',
    GOOD_PROVIDING = 'GOOD_PROVIDING',
    DO_SERVICES = 'DO_SERVICES',
    WORK_COMPLETES = 'WORK_COMPLETES'
}

export const enum ProviderSetWayType {
    SELECT = 'SELECT',
    E_AUC = 'E_AUC',
    E_EXAM = 'E_EXAM',
    E_TWOSTAGE_EXAM = 'E_TWOSTAGE_EXAM',
    E_LIMITED_EXAM= 'E_LIMITED_EXAM',
    E_OFFERS_REQUEST = 'E_OFFERS_REQUEST',
    E_QUOTATIONS_REQUES = 'E_QUOTATIONS_REQUES',
    OPENED_EXAM = 'OPENED_EXAM',
    QUATATIONS_REQUES = 'QUATATIONS_REQUES',
    ONE_PROVID_PURCHASE = 'ONE_PROVID_PURCHASE',
    OFFERS_REQUEST = 'OFFERS_REQUEST',
    TWOSTAGE_EXAM = 'TWOSTAGE_EXAM',
    LIMITED_EXAM = 'LIMITED_EXAM'
}

export const enum LotStatus {
    CREATING = 'CREATING',
    PUBLISHED = 'PUBLISHED',
    APPROVED = 'APPROVED'
}

export declare interface ILot {
    id: string
    regNumber: string
    law: LawType
    ekz: string
    purchaseObject: string
    contractNmz: number
    providerSetWay: string
    purchaseStartDate: Date
    includingInSmpOrMsp: IncludingInSmpOrMspType
    rePurchaseNumber: number

    status: LotStatus
}

export declare interface ILot44 extends ILot {
    lotContractType: LotContractType
    providerSetWayType: ProviderSetWayType
    isMultiLot: boolean
    multiPurchase: boolean
    haveStages: boolean
    contractProvision: boolean
    haveAdditProviderReq: boolean
    haveAddirRfReq: boolean
}
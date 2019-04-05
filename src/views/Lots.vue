<template>
    <div>

        <!-- <HeadTitle header="" /> -->

        <LotsTableHeader header="Лоты"
        @add-lot="addLot"/>
       

        <SingleTableView 
        notNeedHeader="true"
        :headers="headers"
        :dataset="dataset"
            @add-object="addObject"/>

        <Modal @close-modal="isAddObjectModalVisible = false" :visible="isAddObjectModalVisible" title="Выбор закона-основания">
            <div>
                <div class="subj-law-selection">
                    <div>Закон-основание:</div>
                    <label>
                        <input type="radio" name="selectedLawType" value="44" v-model="selectedLaw"/>
                        44-ФЗ
                    </label>
                    <label>
                        <input type="radio" name="selectedLawType" value="223" v-model="selectedLaw" disabled/>
                        223-ФЗ
                    </label>
                </div>
                <div class="subj-modal-footer">
                    <Button title="Создать"
                            color="green" 
                            @click="confirmAdd"/>
                </div>
            </div>
        </Modal>
        
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import HeadTitle from '@/components/HeadTitle.vue'
import SingleTableView from '@/components/SingleTableView.vue'
import { ITableColumn } from '@/components/TableAbstractions'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import FormField from '@/components/FormField.vue'
import LotsTableHeader from '@/components/LotsTableHeader.vue'
import router from '@/router'

const statusTexts: { [index: string]: string } = {
    CREATING: "Формирование",
    PUBLISHED: "Опубликован",
    APPROVED: "Утвержден"
}

@Component({ components: { SingleTableView, HeadTitle, Modal, Button, FormField, LotsTableHeader } })
export default class Lots extends Vue {
    private isAddObjectModalVisible: boolean = false
    private selectedLaw: string = "44"




    private headers: ITableColumn[] = [{
        title: 'Реестровый номер',
        getter: (x: any) => x.regNumber,
        url: (x: any) => `/plan-objects/${x.id}`,
        filter: 'TEXT'
    }, {
        title: 'Закон-основание', 
        getter: (x: any) => x.law === 'F44' ? '44-ФЗ' : '223-ФЗ',
        filter: 'SELECT'
    }, {
        title: 'ИКЗ', 
        getter: (x: any) => x.purchaseId,
        filter: 'TEXT'
    }, {
        title: 'Предмет закупки',
        getter: (x: any) => x.subject,
        filter: 'TEXT'
    }, {
        title: 'НМЦ контракта',
        getter: (x: any) => x.contractNmz,
        filter: 'TEXT'
    }, {
        title: 'Способ определения поставщика', 
        getter: (x: any) => x.providerSetWay,
        filter: 'TEXT'
    }, {
        title: 'Дата начала закупки', 
        getter: (x: any) => x.purchaseStartDate,
        filter: 'TEXT'
    }, {
        title: 'Размещение среди СМП/МСП',
        getter: (x: any) => x.includingInSmpOrMsp,
        filter: 'TEXT'
    }, {
        title: 'Номер повторной закупки',
        getter: (x: any) => x.rePurchaseNumber,
        filter: 'TEXT'
    }, {
        title: 'Статус',
        getter: (x: any) => statusTexts[x.status],
        filter: 'TEXT'
    }]

    private dataset: any = {from: -20, totalCount: 1}

    private addLot() {
        this.isAddObjectModalVisible = true
    }

    private confirmAdd() {
        if (this.selectedLaw === "44") {
            router.push("/plan-objects/create44lot");
        }
        
        this.isAddObjectModalVisible = false
    }
}
</script>

<style>
.subj-modal-footer {
    border-top: 1px solid #ddd;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
}
.subj-modal-fields{
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 94%;
    padding-left: 30px;
}
.subj-law-selection {
    display: flex;
    align-items: center;
    margin: 30px;
}

.subj-law-selection :first-child {
    font-weight: 500;
}

.subj-law-selection :nth-child(n + 2) {
    margin-left: 30px;
}
</style>

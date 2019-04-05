<template>
    <div class="page-content">
        <Card title="Расчет НМЦ" :padding="0" :isLargeHeader="true" :hasBorder="false"/>
        <NavPanel ref="in-page-panel" :sections="navSections" :actions="[]"
            @section-selected='selectSection'/>
        <div v-if="currentPage === 'page1'">
            <Card title="Информация" :isLargeHeader="true" :padding="30">
                <table class="info-table">
                    <tr>
                        <td/>
                        <th>СПГЗ:</th>
                        <td><input type="text"/></td>
                        <td/>
                    </tr>
                    <tr>
                        <td/>
                        <th>Количество:</th>
                        <td><input type="text"/></td>
                        <td/>
                    </tr>
                    <tr>
                        <td/>
                        <th>Ед. изм:</th>
                        <td><input type="text"/></td>
                        <td/>
                    </tr>
                    <tr>
                        <td/>
                        <th>Ориентировочная цена:</th>
                        <td><input type="text"/></td>
                        <td/>
                    </tr>
                    <tr>
                        <td/>
                        <th>Дата расчета:</th>
                        <td><input type="text"/></td>
                        <td/>
                    </tr>
                </table>
            </Card>
            <Card title="НМЦ расчетная" :isLargeHeader="true" :padding="30">
                <DataTable :dataset="dataset" :headers="headers"/>
            </Card>
            <Card title="НМЦ" :padding="30" :isLargeHeader="true">
                <DataTable :dataset="dataset2" :headers="headers2"/>
            </Card>
        </div>
        <div v-if="currentPage === 'page2'">
            <Card title="Информация для расчёта НМЦ" :isLargeHeader="true" :padding="30">
                <div class="table-wrapper">
                    <div class="fields-wrapper">
                        <div class="field">
                            <div class="field-header">СПГЗ:</div>
                            <input class="field-text-input" type="text"/>
                        </div>
                        <div class="multi-field">
                            <div class="multi-field-sub">
                                <div class="field-header-small">Количество:</div>
                                <div class="field-text-input-block">
                                    <input class="field-text-input-small" type="text"/>
                                </div>
                                
                            </div>
                            <div class="multi-field-sub">
                                <div class="field-header-small">Валюта:</div>
                                <div class="field-text-input-block">
                                    <input class="field-text-input-small" type="text">
                                </div>
                                
                            </div>
                            <div class="multi-field-sub">
                                <div class="field-header-small">Ед. изм.:</div>
                                <div class="field-text-input-block">
                                    <input class="field-text-input-small" type="text"/>
                                </div>
                                
                            </div>
                        </div>
                        <div class="footer">
                            <Button color="green" title="рассчитать нмц" class="add-button field-text-input-small" />
                            <div class="multi-field-sub">
                                <div class="field-header">НМЦ:</div>
                                <input class="field-text-input" type="text"/>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <Card title="Рыночные цены" :canFilter="true" :isLargeHeader="true" :padding="30"><!-- -->
                <DataTable :tableStyle="'nmz'" :headers="pricesHeaders"/>
                <!-- <SingleTableView 
                    notNeedHeader="true"
                    :headers="headers"
                /> -->
            </Card>
            <Card title="Портал поставщиков" :canFilter="true" :padding="30" :isLargeHeader="true">
                <DataTable :tableStyle="'nmz'" :headers="providPortalHeaders"/>
            </Card>
            <Card title="Предложения поставщиков" :canAdd="true" :canFilter="true" :padding="30" :isLargeHeader="true">
            </Card>
        </div>
        <div v-if="currentPage === 'page3'">
            <Card title="Информация для расчёта НМЦ" :isLargeHeader="true" :padding="30">
            </Card>
            <Card title="Выбор контрактов" :isLargeHeader="true" :padding="30">
            </Card>
        </div>
        <div v-if="currentPage === 'page4'">
            <Card title="Общая информация" :isLargeHeader="true" :padding="30">
            </Card>
            <Card title="Удельные показатели" :isLargeHeader="true" :padding="30">
            </Card>
        </div>
    </div>
</template>

<script lang="ts">
import NavPanel from '@/components/NavPanel.vue'
import Expander from '@/components/Expander.vue'
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'
import DataTable from '@/components/DataTable.vue'
import SingleTableView from '@/components/SingleTableView.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ITableColumn } from '@/components/TableAbstractions';

@Component({components: {NavPanel, Card, Expander, DataTable, Button, SingleTableView }})
export default class extends Vue {
    private currentPage = 'page1'
    private navSections = [
        { anchor: 'page1', title: 'НМЦ СПГЗ', active: true }, 
        { anchor: 'page2', title: 'Анализ рыночных цен', active: false }, 
        { anchor: 'page3', title: 'По контрактам', active: false }, 
        { anchor: 'page4', title: 'Удельных показателей', active: false }]

    private selectSection(foo: any, sectionIndex: number) {
        for (const sec of this.navSections) sec.active = false
        this.navSections[sectionIndex].active = true
        this.currentPage = this.navSections[sectionIndex].anchor
    }

    private headers: ITableColumn[] = [{
        title: "Метод",
        getter(v: any) { return v.methodName }
    }, {
        title: "НМЦ Рассчитанная",
        getter(v: any) { return v.applicable ? "0.00" : "не применим" }
    }, {
        title: "Коэффициент оптимизации заказчика",
        getter(v: any) { return v.applicable ? "0.00" : "не применим" }
    }, {
        title: "НМЦ Итоговая",
        getter(v: any) { return v.methodName }
    }]

    private dataset: any[] = [{
        methodName: "Анализ рыночных цен",
        applicable: true
    }, {
        methodName: "Анализ цен, содержащихся в реестре контрактов",
        applicable: true
    }, {
        methodName: "Нормативный",
        applicable: false
    }, {
        methodName: "Тарифный",
        applicable: false
    }, {
        methodName: "Удельных показателей",
        applicable: true
    }, {
        methodName: "Сметный",
        applicable: true
    }, {
        methodName: "Затратный",
        applicable: true
    }, {
        methodName: "Анализ стоимости аналогов",
        applicable: true
    }, {
        methodName: "Параметрический",
        applicable: true
    }, {
        methodName: "Иной",
        applicable: true
    }]

    private headers2: ITableColumn[] = [{
        title: "Метод",
        getter(_) { return "Затратный" }
    }, {
        title: "НМЦ",
        getter(_) { return "100000" }
    }, {
        title: "Ставка НДС",
        getter(_) { return "10%" }
    }, {
        title: "Сумма НДС",
        getter(_) { return "0" }
    }, {
        title: "Валюта",
        getter(_) { return "" }
    }, {
        title: "Ед. изм.",
        getter(_) { return "" }
    }]

    private pricesHeaders: ITableColumn[] = [{
        title: "Наименование позиции",
        getter(_) { return "" }
    }, {
        title: "Цена за единицу с НДС",
        getter(_) { return "" }
    }, {
        title: "Источник данных",
        getter(_) { return "" }
    }, {
        title: "Поставщик",
        getter(_) { return "" }
    }, {
        title: "Дата начала действия",
        getter(_) { return "" }
    }, {
        title: "Дата окончания действия",
        getter(_) { return "" }
    }]

    private providPortalHeaders: ITableColumn[] = [{
        title: "Наименование позиции",
        getter(_) { return "" }
    }, {
        title: "Цена за единицу с НДС",
        getter(_) { return "" }
    }, {
        title: "Источник данных",
        getter(_) { return "" }
    }, {
        title: "Поставщик",
        getter(_) { return "" }
    }, {
        title: "Дата начала действия",
        getter(_) { return "" }
    }, {
        title: "Дата окончания действия",
        getter(_) { return "" }
    }]
    

    private dataset2: any[] = [{}]
}
</script>

<style scoped>
    .related-objects {
        display: flex;
        flex-wrap: wrap;
    }

    .page-content:not(.page-content-modal) {
        margin: 30px;
    }

    .info-table {
        width: 100%;
        table-layout: fixed;
    }

    .info-table th {
        text-align: right;
    }

    .info-table input {
        width: 100%;
        box-sizing: border-box;
    }
    
    .info-table > tr > :nth-child(1) {
        width: 10%;
    }

    .info-table > tr > :nth-child(2) {
        width: 20%;
    }

    .info-table > tr > :nth-child(3) {
        width: 40%;
    }

    .info-table > tr > :nth-child(4) {
        width: 30%;
    }

    .table-wrapper {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .fields-wrapper {
        display: flex;
        flex-direction: column;
        width: 70%;
        padding: 10px;
    }

    .field {
        display: flex;
        justify-content: space-between;  
        padding: 10px; 
    }

    .multi-field {        
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }

    .multi-field-left {
        display: flex;
    }

    .multi-field-sub {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .field-header {
        display: flex;
        flex-flow: column;
        justify-content: center;
        width: 10%;
        text-align: center;
    }

    .footer {
        display: flex;
        justify-content: space-evenly;
        padding: 10px;
    }

    .field-text-input {
        width: 90%;
    }

    .field-header-small {
        display: flex;
        flex-flow: column;
        justify-content: center;
        width: 30%;
        text-align: center;
    }

    .field-text-input-block {
        width: 70%;
    }

    .field-text-input-small {
        width: 30%;
    }

    
</style>
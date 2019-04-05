<template>    
    <div class="specifications-sec">
        <div class="">
            <div class="field-header header title-padding">
                Документы лота
                <!-- <span class="red-star">*</span> -->
            </div>
            <div class="field-component flexed">
                <GreenButton header="Сформировать расчет НМЦ" class="wide-button" />
                <GreenButton header="сформировать критерии оценки" class="wide-button" />
            </div>
            <div id="notice" class="field-component padding flexed">
                Сформировать ТЗ и контракт по шаблону и расчет НМЦ можно будет после первого сохранения лота в режиме редактирования
            </div>
        </div>
        <div class="">
            <div class="field-header title-padding">
                Документов нет
                <!-- <span class="red-star">*</span> -->
            </div>
            <div class="field-component flexed padding">
                
                <Button color="green" title="добавить" class="add-button" @click="$emit('form-pick', 'uploadDocument')" />
                <Button title="удалить" color="red" class="add-button red-button" />
                <GreenButton header="посмотреть историю изменений документов" class="wide-button wide-wide-button" />
            </div>
        </div>
        <div class="">
            <div class="field-header title-padding">
                Обязательные документы к заявке
            </div>
            <div class="field-component flexed padding">

            </div>
        </div>
        <div class="">
            <div class="field-header no-doc title-padding">
                Документов нет
            </div>
            <div class="field-component flexed padding">

            </div>
        </div>
    </div>
    

                
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ISection } from '@/views/FormAbstractions'
import Button from '@/components/Button.vue'
import DataTable from '@/components/DataTable.vue'
import { ILot44 } from '@/models/Lot';
import ComboBox from '@/components/ComboBox.vue'
import GreenButton from '@/components/GreenButton.vue'
import DatePick from '@/components/form-table/DatePick.vue'


@Component({ components: { Button, DataTable, ComboBox, GreenButton, DatePick } })
export default class extends Vue {
    @Prop() private source!: ILot44 
    @Prop({ default: false }) private readonly!: boolean
    @Prop({ default: true }) private hideButton!: boolean
    
    
}
</script>

<style scoped>
    .specifications-sec {
        padding: 30px 30px;  
        
    }
    .field {
        display: flex;
        justify-content: space-between;
    }
    .field-header{
        font-size: 12px;
        font-weight: 500;
        color: #2e4358;
        max-width: 400px;
        margin-bottom: 5px;
    }
    .field-component {
        width: 65%;
        flex-basis: content;
    }

    .add-button {
        width: 100px;
        margin-top: 0px;
    }

    .wide-button {
        width: 250px;
        margin-right: 10px;
        margin-top: 0px;
    }
    .wide-wide-button {
        width: 350px;
        margin-left: 30px;
        margin-top: 0px;
    }

    .hidden {
        display: none;
    }

    .combobox{
        height: 30px;
        padding-left: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .component-colors{
        border-color: #b2b2b2;
        background: #fafafa;
    }
    .padding {
        border-bottom: 50px solid white;
    }
    .red-star{
        color: red;
    }
    .header {
        font-size: 16pt;
    }
    .title-padding {
        padding-bottom: 20px;
    }
    .flexed {
        display: flex;
    }
    .red-button {
        margin-left: 30px;
    }
    
    .no-doc {
        font-size: 12pt;
    }
    #notice {
        background: #fcf8e3;
        border-radius: 5px;
        padding: 10px;
        margin-left: 30px;
        width: 96.5%;
        color: #eac87a;
    }
</style>
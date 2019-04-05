<template>
    <div class="specifications-sec">
        <div class="field">
            <div class="field-header">
                Размещение среди СМП 
                <!-- <span class="red-star">*</span> -->
            </div>
            <div class="field-component padding">
                <ComboBox 
                class="component combobox component-colors"
                :selectOptions="[
                    { key: '', desc: 'Выберите размещение среди СМП' }
                ]"
                />
            </div>
        </div>
        <div class="">
            <div class="field-header">
                Детализированных объектов нет
                <!-- <span class="red-star">*</span> -->
            </div>
            <div class="padding">
                <Button color="green" title="добавить" class="add-button" @click="$emit('form-pick', 'lotSpecifications')" />
            </div>
        </div>
        <div class="field">
            <div class="field-header">
                Предусмотрена этапность оплаты
                <!-- <span class="red-star">*</span> -->
            </div>
            <div class="field-component padding">
                <input type="checkbox" @change="$emit('set-value', 'havePurchaseStages')">
            </div>
        </div>
         <div class="field">
            <div class="field-header">
                Дата оплаты
                <span class="red-star">*</span>
            </div>
            <div class="field-component padding">
                <DatePick />
            </div>
        </div>
        <div class="">
            <div class="field-header">
                <!-- <span class="red-star">*</span> -->
            </div>
            <div class="padding">
                <Button color="green" id="add-stage" title="добавить этап оплаты" class="add-button" @click="$emit('form-pick', 'purchaseStage')" />
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
        width: 400px;
    }

    .field-component {
        flex-grow: 1;
        flex-basis: content;
    }

    .add-button {
        width: 100px;
        margin-top: 30px;
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
    #add-stage {
        width: 180px;
    }
</style>
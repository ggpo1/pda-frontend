<template>
    <div>
        <div class="specifications-sec">
            <div class="field">
                <div class="field-header">
                    НМЦ по план-графику
                </div>
                <div class="field-component flexed padding">
                    <b>0,00</b>
                </div>
                <div class="field-header">
                    НМЦ контракта
                </div>
                <div class="field-component flexed">
                    <input type="text" name="" id="" class="nmz-input">
                </div>
            </div>

            <div class="field">
                <div class="field-header">
                    Валюта НМЦ по план-графику
                </div>
                <div class="field-component flexed padding">
                    <b>Российский рубль</b>
                </div>
                <div class="field-header">
                    Валюта НМЦ контракта
                </div>
                <div class="field-component flexed">
                    <b>Российский рубль</b>
                </div>
            </div>
        </div>

        <div class="specifications-sec">
        
            <div class="field-full">
                <div class="field-header">
                    Обоснование метода определения НМЦ
                </div>
                <div class="field-component padding">
                    <textarea class="component-colors area"></textarea>
                </div>
                
                <div class="field-header">
                    НМЦ контракта
                </div>
                <div class="field-component padding">
                    <textarea class="component-colors area"></textarea>
                </div>
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



@Component({ components: { Button, DataTable, ComboBox } })
export default class extends Vue {
    @Prop() private source!: ILot44 
    @Prop({ default: false }) private readonly!: boolean
    @Prop({ default: true }) private hideButton!: boolean
    
    
}
</script>

<style scoped>
    .specifications-sec {
        padding: 30px 30px;
        display: flex;
    }
    .field {
        width: 40%;
        height: 40%;
    }
    .field-full {
        width: 100%;
        height: 40%;
    }
    .field-header{
        font-size: 12px;
        font-weight: 500;
        color: #2e4358;
        max-width: 400px;
        margin-bottom: 5px;
    }
    .area {
        width: 100%;
        height: 100px;
    }
    .field-component {
        width: 65%;
        flex-basis: content;
    }
    .nmz-input {
        width: 100%;
    }
    .component-colors{
        border-color: #b2b2b2;
        background: #fafafa;
    }
    .padding {
        border-bottom: 30px solid white;
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
</style>
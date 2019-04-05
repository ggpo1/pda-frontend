<template>
    <div class="specifications-sec">            
        <div>
            <DataTable v-if="source.specifications.length" :dataset="source.specifications" :headers="headers"
                @item-action="(i, a) => $emit('form-pick', 'specification', {item: i, action: a})"/>
            <div class="field-header" v-else>Спецификаций нет</div>
            <Button color="green" title="добавить" class="add-button" @click="$emit('form-pick', 'specification')" />
        </div>
    </div>  
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ISection } from '@/views/FormAbstractions'
import Button from '@/components/Button.vue'
import DataTable from '@/components/DataTable.vue'
import { IPurchaseObjectDetailed } from '@/models/PurchaseObjectDetailed';
import ComboBox from '@/components/ComboBox.vue'
import GreenButton from '@/components/GreenButton.vue'
import DatePick from '@/components/form-table/DatePick.vue'
import { ITableColumn } from '@/components/TableAbstractions';
import { ISpecification } from '@/models/PurchaseObjectDetailedSpecification'


@Component({ components: { Button, DataTable, ComboBox, GreenButton, DatePick } })
export default class extends Vue {
    @Prop() private source!: IPurchaseObjectDetailed
    @Prop({ default: false }) private readonly!: boolean
    @Prop({ default: true }) private hideButton!: boolean

    private headers: ITableColumn[] = [{
        title: "#",
        getter(v: any, i: number) { return (i + 1) + "" }
    }, {
        title: "СПГЗ",
        getter(v: ISpecification) { return v.subjectDeclaration.subject }
    }, {
        title: "Объем",
        getter(v: ISpecification) { return v.volume + "" }
    }, {
        title: "Цена за единицу",
        getter(v: ISpecification) { return "?" }
    }, {
        title: "Сумма, руб.",
        getter(v: ISpecification) { return "?" }
    }, {
        title: "Ред.",
        action: {
            id: "edit",
            icon: {
                type: "CLASS",
                name: "edit"
            }
        },

        getter(v: any) { return "" }
    }, {
        title: "НМЦ",
        action: {
            id: "calculate",
            icon: {
                type: "FONT",
                name: "calculator"
            }
        },

        getter(v: any) { return "" }
    }]
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
</style>
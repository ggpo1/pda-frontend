<template>
    <div>
        <FormBase :formDeclaration="formDeclaration" :source="source" @form-pick="pickFormValue" @set-value="setFormValue" state="ENABLED"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FormBase from '@/views/FormBase2.vue'
import { IForm, ISection, IconType } from '@/views/FormAbstractions'

import { IRow, ISetValueEvent } from '@/components/form-table/FormFields';
import { IProcedure44, ProcedureStatus, ProviderSetWayType } from '../models/Procedure';
import { LawType } from '@/models/Shared'
import FormDeclarationBuilder from '@/form-declarations/procedure44'


@Component({ components: { FormBase } })
export default class extends Vue {
    public source: IProcedure44 = {
        id: "",
        regNumber: "",
        law: LawType.F44,
        
        subjectName: "",

        fundingCode: "",
        purchaseSize: 0,

        isEqualOrgs: false,

        contacts: {
            fio: {
                firstName: 'Тест',
                secondName: 'Тест',
            },
            email: 'тест@тест.рф',
            cellPhone: '+7 (999) 999-99-99'
        },

        procedureDocSubmitInfo: {
            address: 'Москва',
            cabinet: '',
            email: 'тест@тест.рф',
            cellPhone: '+7 (999) 999-99-99',
            fax: '+7 (342) 2351622',
            contactPerson: {
                firstName: 'Тест',
                secondName: 'Тест'
            },
            isStandardOrder: true,
            submitingOrder: "После даты размещения извещения о проведении закупки заказчик на основании поданного в письменной форме заявления любого заинтересованного лица в течение двух рабочих дней с даты получения соответствующего заявления обязан предоставить такому лицу документацию в порядке, указанном в извещении о проведении закупки. При этом документация предоставляется в форме документа на бумажном носителе после внесения данным лицом платы за предоставление документации, если данная плата установлена и указание об этом содержится в извещении о проведении закупки, за исключением случаев предоставления конкурсной документации в форме электронного документа."
        },
        procedureDocAcceptInfo: {
            address: 'Москва',
            cabinet: '',
            email: 'тест@тест.рф',
            cellPhone: '+7 (999) 999-99-99',
            fax: '+7 (342) 2351622',
            contactPerson: {
                firstName: 'Тест',
                secondName: 'Тест'
            },
            copies: 2,
            isStandardOrder: false,
            acceptingOrder: '',
        },
        isGetPurchase: false,

        purchaseDocuments: undefined,
        documentsSize: 0,
        lots: undefined,

        status: ProcedureStatus.CREATING
    }

    public formDeclaration = FormDeclarationBuilder()

    public setFormValue(e: ISetValueEvent) {
        e.row.setter(this.source, e.value)
        this.updateFormDependencies()
    }

    public updateFormDependencies() {
        // const isNotSmallVolume = this.source.smallVolume === 'NO'
        // this.subjectClassField.visible = isNotSmallVolume
        // this.goalSection.visible = isNotSmallVolume
        // this.discussionSection.visible = isNotSmallVolume
        // this.termsSection.visible = isNotSmallVolume
    }
}
</script>

<style>

</style>

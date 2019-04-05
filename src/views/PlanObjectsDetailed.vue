<template>
    <div>
        <SingleTableView
            header="Детализированные объекты закупок"
            :headers="headers"
            :dataset="dataset"
            @change-page="load"
            :itemActions="itemActions"
            @item-action="onItemAction"
            :pages="pages"
            :activePage="activePage"/>
        <ObjectDeletionModal @close-modal="isDeleteConfirmationModalVisible = false" :visible="isDeleteConfirmationModalVisible"
            @confirm-delete="confirmDelete" 
            title="Подтверждение удаления детализированного объекта закупки"
            description="Вы действительно хотите удалить детализированный объект закупки?"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import SingleTableView from '@/components/SingleTableView.vue'
import { ITableColumn } from '@/components/TableAbstractions'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import ObjectDeletionModal from '@/views/modals/ObjectDeletionModal.vue'
import router from '@/router'

const statusTexts: { [index: string]: string } = {
    CREATING: "Формирование",
    PUBLISHED: "Опубликован",
    APPROVED: "Утвержден"
}

type PaginationRequest = 'TO_START' | 'TO_PREVIOUS' | 'TO_NEXT' | 'TO_END' | number

@Component({ components: { SingleTableView, Modal, Button, ObjectDeletionModal } })
export default class extends Vue {
    private isDeleteConfirmationModalVisible: boolean = false
    private deletingObject: any | null = null

    private itemActions: any[] = [{
        id: 'delete', 
        title: 'Удалить'
    }, {
        id: 'edit',
        title: 'Редактировать'
    }]

    private headers: ITableColumn[] = [{
        title: 'Реестровый номер',
        getter: (x: any) => x.code,
        url: (x: any) => `/plan-objects/detailed/${x.code}`,
        filter: 'TEXT'
    }, {
        title: 'Закон-основание', 
        getter: (x: any) => x.object.law === 'F44' ? '44-ФЗ' : '223-ФЗ',
        filter: 'SELECT'
    }, {
        title: 'КПГЗ',
        getter: (x: any) => x.object.subjectClass.code + ' ' + x.object.subjectClass.description,
        filter: 'TEXT'
    }, {
        title: 'Предмет закупки',
        getter: (x: any) => x.subject,
        filter: 'TEXT'
    }, {
        title: 'Код финансирования', 
        getter: (x: any) => x.object.fundingCode,
        filter: 'TEXT'
    }, {
        title: 'Стоимость',
        getter: (x: any) => "1337",
        filter: 'TEXT'
    }, {
        title: 'Статус',
        getter: (x: any) => statusTexts[x.status],
        filter: 'TEXT'
    }]

    private dataset: any = {from: -20, totalCount: 1}
    private pages: number[] = []
    private activePage: number = -1
    
    private mounted() { this.load(0) }

    private doLoadRequest(page: number) {
        fetch(`http://localhost:5000/api/purchaseObjectDetails?from=${page * 20}&count=20`)
            .then(response => response.json())
            .then(response => {
                this.dataset = response
                this.activePage = (response.from / 20) | 0

                if (this.dataset.totalCount === 0) {
                    this.pages = [0]
                    return
                }
                
                const maxPages = 5
                const endPage = ((this.dataset.totalCount / 20) | 0) - (this.dataset.totalCount % 20 > 0 ? 0 : 1)
                let lPages = Math.min(this.activePage, maxPages - 1)
                let rPages = Math.min(endPage - this.activePage, maxPages - 1)
                if (lPages < rPages) {
                    rPages = maxPages - lPages - 1
                } else if (rPages < lPages) {
                    lPages = maxPages - rPages - 1
                } else {
                    const total = Math.min(maxPages - 1, lPages + rPages)
                    rPages = lPages = total / 2
                }
                this.pages = []
                for (let i = 0; i < lPages; i++) {
                    this.pages.push(this.activePage - (lPages - i))
                }
                this.pages.push(this.activePage)
                for (let i = 0; i < rPages; i++) { 
                    this.pages.push(this.activePage + i + 1)
                }
            })
    }

    private load(page: PaginationRequest, force: boolean = true) {
        const currentPage = (this.dataset.from / 20) | 0
        let actualPage

        const endPage = ((this.dataset.totalCount / 20) | 0) - (this.dataset.totalCount % 20 > 0 ? 0 : 1)
        
        switch (page) {
            case 'TO_START': actualPage = 0; break
            case 'TO_END': actualPage = endPage; break
            case 'TO_NEXT': actualPage = currentPage + 1; break
            case 'TO_PREVIOUS': actualPage = currentPage - 1; break
            default: actualPage = page; break
        }

        if (actualPage >= 0 && actualPage <= endPage && (force || actualPage !== currentPage)) {
            this.doLoadRequest(actualPage)
        }
    }

    private onItemAction(item: any, action: string) {
        switch (action) {
            case 'edit':
                router.push(`/plan-objects/detailed/${item.code}/edit`)
                break
            case 'delete':
                this.deletingObject = item
                this.isDeleteConfirmationModalVisible = true
                break
        }
    }

    private confirmDelete() {
        // delete object request
        this.isDeleteConfirmationModalVisible = false
        fetch(`http://192.168.10.20:5000/api/purchaseObjectDetails/${this.deletingObject.code}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => this.load(0, true))
    }
}
</script>

<style scoped>
.subj-modal-footer {
    border-top: 1px solid #ddd;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Board from '@/components/page-components/Board';
import router from '@/router';


@Component({ components: { Board } })
export default class Boards extends Vue {
    private todoTasks: any[] = [{
        title: 'Цель 1',
        description: 'Защитить дипломную работу',
        progress: 85,
    }, {
        title: 'Цель 2',
        description: 'Научится играть на фортепиано',
        progress: 30,
    }];
}

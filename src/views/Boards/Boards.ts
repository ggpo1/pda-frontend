import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Board from '@/components/page-components/Board';
import router from '@/router';


@Component({ components: { Board } })
export default class Boards extends Vue {
    private todoTasks: any[] = [{
        title: 'PDA-1',
        description: 'Добавить стартовую страницу',
    }, {
        title: 'PDA-1',
        description: 'Добавить стартовую страницу',
    }, {
        title: 'PDA-1',
        description: 'Добавить стартовую страницу',
    }];
}

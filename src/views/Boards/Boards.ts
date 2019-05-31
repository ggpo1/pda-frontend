import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Board from '@/components/page-components/Board';
import router from '@/router';


@Component({ components: { Board } })
export default class Boards extends Vue {
    private todoTasks: any[] = [{
        title: 'EAIST-1',
        description: 'Добавить стаартовую страницу',
    }, {
        title: 'EAIST-1',
        description: 'Добавить стаартовую страницу',
    }, {
        title: 'EAIST-1',
        description: 'Добавить стаартовую страницу',
    }];
}

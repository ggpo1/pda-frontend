import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Board from '@/components/page-components/Board';
import router from '@/router';


@Component({ components: { Board } })
export default class Boards extends Vue {
    private todoTasks: any[] = [{
        title: 'таска 1',
    }, {
        title: 'таска 2',
    }, {
        title: 'таска 3',
    }];
}

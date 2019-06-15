import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import router from '@/router';

import Board from '@/components/page-components/Board'


@Component({ components: { Board } })
export default class Tasks extends Vue {
    private todoTasks: any[] = [{
        title: 'Задача 1',
        description: 'Написать пояснительную записку',
        priority: 'Высокий',
    }, {
        title: 'Задача 2',
        description: 'Сделать презентацию',
        priority: 'Низкий',
    }];
}

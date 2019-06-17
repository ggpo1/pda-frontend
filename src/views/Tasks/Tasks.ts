import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import router from '@/router';

import Board from '@/components/page-components/Board';
import Task from '@/models/Task';
import Goal from '@/Models/Goal';
import ApiGoal from '@/api/ApiGoal';


@Component({ components: { Board } })
export default class Tasks extends Vue {
    @Prop() public goalId!: string;
    private selectedGoal!: Goal;

    // TODO API METHOD FOR GET GOAL BY ID

    private todoTasks: Task[] = [];
    private doneTasks: Task[] = [];
    public async mounted() {
        // alert(this.goalId)
        // let apiGoal = new ApiGoal();
        // let goals = apiGoal.getGoals();
        // console.log(typeof(goals));
        if (this.goalId) {
            // let newTaskList: Task[] = [];
            // this.todoTasks.forEach(task => {
            //     if (task.goalId === this.goalId) {
            //         newTaskList.push(task);
            //     }
            // });
            // this.todoTasks = newTaskList;
                // let apiGoal = new ApiGoal();
                // let goals = apiGoal.getGoals();
                // console.log(goals)
            fetch(`https://localhost:5050/api/tasks/taskstatus/${this.goalId}/work`, { method: 'GET' })
            .then(response => response.json())
            .then((data) => {
                    // this.ser(data)
                    // console.log(this.response)
                // console.log(data)    
                this.todoTasks = data;
                    // console.log(this.todoTasks)
            })
            fetch(`https://localhost:5050/api/tasks/taskstatus/${this.goalId}/done`, { method: 'GET' })
            .then(response => response.json())
            .then((data) => {
                    // this.ser(data)
                    // console.log(this.response)
                // console.log(data)    
                this.doneTasks = data;
                    // console.log(this.todoTasks)
            })
                // console.log(this.response)
        }
    }
}

export default class Task {
    constructor(
        public Id: string,
        public TaskTitleNum: string,
        public Title: string,
        public Description: string,
        public Priority: string,
        public GoalId: string,
    ) {}
}

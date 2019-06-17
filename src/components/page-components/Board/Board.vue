<template>
    <div class="board-wrapper" v-if="boardType === 'goals'">
        <div class="board-title">
            {{ title }}
        </div>
        <div class="tasks-controls">
            <div class="control" @click="isAddGoalBlock = true">
                Cоздать
            </div>
        </div>
        <div v-if="isAddGoalBlock" class="task-add-block">
            <input type="text" placeholder="заголовок">
            <textarea placeholder="описание" class="area"></textarea>
            <div class="task-add-block-footer">
                <button class="btn btn-green">создать</button>
                <button @click="isAddGoalBlock = false" class="btn btn-red">отменить</button>
            </div>
        </div>
        <div class="board-body">
            <div @click="clickGoals(task)" class="task-wrapper" v-for="(task, i) in tasksList" :key="'task_'+i">
                <div style="font-size: 14px;">
                    {{ task.Title }}<br>
                    {{ task.Description }}
                </div>
                <div>Прогресс: {{ task.Progress }}%</div>
            </div>
        </div>
    </div>
    <div class="board-wrapper" v-else-if="boardType === 'tasks'">
        <div class="board-title">
            {{ title }}
        </div>
        <div class="tasks-controls">
            <div class="control" @click="goalPush">
                Цели
            </div>
            <div class="control" @click="addTaskBlockOpen">
                Cоздать
            </div>
            <div class="control" @click="goalStatistic">
                Анализ
            </div>
        </div>
        <div v-if="isAddTaskBlock" class="task-add-block">
            <input type="text" v-model="getMaxTitle" placeholder="заголовок" disabled>
            <textarea placeholder="описание" v-model="newTask.Description" class="area"></textarea>
            <input type="text" v-model="newTask.Priority" placeholder="приоритет">
            <!-- <input type="text" placeholder="статус"> -->
            <div class="task-add-block-footer">
                <button @click="addTask" class="btn btn-green">создать</button>
                <button @click="isAddTaskBlock = false" class="btn btn-red">отменить</button>
            </div>
        </div>
        <div v-if="isStatBlock" class="task-add-block">
            <div class="stats-label">
                Всего: {{ stats.Total }}
            </div>
            <div class="stats-label">
                Завершенные: {{ stats.Done }}
            </div>
            <div class="stats-label">
                Оставшиеся: {{ stats.Work }}
            </div>
            <div class="stats-label">
                Процент выполнения: {{ getTotalProgress }}%
            </div>
            <div class="stats-label">
                Эффективность: {{ getPrettyEfficiency }}
            </div>
            <div class="task-add-block-footer">
                <!-- <button @click="addTask" class="btn btn-green">создать</button> -->
                <button @click="isStatBlock = false" class="btn btn-red">закрыть</button>
            </div>
        </div>
        <div class="board-body">
            <div class="task-wrapper" v-for="(task, i) in todoList" :key="'task_'+i">
                <div style="font-size: 14px; width: 75%">
                    {{ task.Title }}<br>
                    {{ task.Description }}
                </div>
                
                <div>Приоритет: {{ task.Priority }}</div>
                <div>
                    <button @click="setDoneTask(task)" class="btn btn-green">выполнено</button>
                </div>
            </div>
            <div style="padding: 10px; border-bottom: 3px solid #bbc1d0;">
                Выполненные
            </div>
            <div class="task-wrapper" :class="task.Status === 'done' ? 'task-done': ''" v-for="(task, i) in doneTodoList" :key="'done_task_'+i">
                <div style="font-size: 14px;">
                    <s>{{ task.Title }}</s><br>
                    {{ task.Description }}
                </div>
                <div>Приоритет: {{ task.Priority }}</div>
            </div>
        </div>

        
    </div>
</template>

<script lang="ts" src="./Board.ts" />

<style>
.board-wrapper {
    display: flex;
    flex-direction: column;
    padding: 10px;
    /* border: 0px solid #bbc1d0; */
    width: 100%;
    /* background: green; */

}
.task-wrapper {
    margin-top: 5px;
    padding: 10px;
    text-align: left;
    border: 1px solid #bbc1d0;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}
.task-wrapper:hover {
    border: 1px solid black;
}
.board-title {
    padding-bottom: 10px;
    border-bottom: 5px solid #bbc1d0;
}

.board-components {
    display: flex;
}
.task-done {
    margin-top: 5px;
    padding: 10px;
    text-align: left;
    border: 1px solid rgb(180, 176, 176);
    display: flex;
    justify-content: space-between;
    background: rgb(206, 206, 206);
    cursor: default;
}
.task-done:hover {
    border: 1px solid rgb(196, 196, 196);
}

.tasks-controls {
    /* background: rebeccapurple; */
    width: 100%;
    padding-top: 10px;
    padding-bottom: 5px;
    font-size: 14px;
    display: flex;
    justify-content: start;
    border-bottom: 5px solid #bbc1d0;
}
.control:hover {
    cursor: pointer;
    color: rgb(107, 169, 219);
}

.control:not(:first-child) {
    /* width: 10%; */
    margin-left: 10px;
    /* background: rebeccapurple; */
    /* width: 100%; */
    /* text-align: left; */

}

.task-add-block {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border: 1px dashed black;
    padding: 10px 10px;
    padding-bottom: 0px;

}
.task-add-block > input:not(.area) {
    margin-top: 5px;
    height: 18px;
    padding: 5px;
}

.area:not(:first-child) {
    height: 100px;
    margin-top: 5px;
    resize: vertical;
    min-height: 100px;
    box-sizing: border-box;
    padding: 5px;
}

.task-add-block > input:not(:first-child) {
    margin-top: 5px;
}

.task-add-block-footer {
    margin: 5px;
    display: flex;
    justify-content: space-around;
}

.task-add-block-footer > button {
    width: 30%;
    height: 25px;

}

.btn {
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px;
}

.btn-green {
    color: white;
    background: rgb(86, 158, 86);
}
.btn-red {
    color: white;
    background: rgb(189, 58, 58);
}
.stats-label {
    text-align: left;
}
.stats-label:not(:first-child) {
    margin-top: 5px;
}
</style>

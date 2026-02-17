"use strict";
// 以下の型を定義すること
//  - User: { id: number, name: string }
//  - Task: { title: string, completed: boolean, user: User }
//  - Priority: "low"|"middle"|"high"のいずれかの値をとる
//  - PriorityTask: Taskかつ{ priority: Priority }を持つ型
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
exports.isLowOrCompletedTask = isLowOrCompletedTask;
exports.not = not;
var Priority = {
    low: 'low',
    middle: 'middle',
    high: 'high',
};
// Userオブジェクトであることを判定する
var isUserObject = function (obj) {
    return (typeof obj === 'object' &&
        typeof obj['id'] === 'number' &&
        typeof obj['name'] === 'string');
};
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this._tasks = [];
    }
    // タスクを追加する
    TaskManager.prototype.add = function (task) {
        this._tasks.push(task);
    };
    // タスクを完了にする
    // Userオブジェクトを指定した場合はそのUserのタスクを全て完了にする
    // 文字列を指定した場合は、そのタイトルのタスクを全て完了にする
    TaskManager.prototype.completeTask = function (target) {
        if (isUserObject(target)) {
            this._tasks
                .filter(function (t) { return t.user === target; })
                .forEach(function (t) { return (t.completed = true); });
        }
        else {
            this._tasks
                .filter(function (t) { return t.title === target; })
                .forEach(function (t) { return (t.completed = true); });
        }
    };
    // 引数の関数にマッチするタスクを返す
    // 引数を省略した場合はすべてのタスクを返す
    TaskManager.prototype.getTasks = function (predicate) {
        if (predicate === undefined) {
            return this._tasks;
        }
        else {
            return this._tasks.filter(predicate);
        }
    };
    return TaskManager;
}());
exports.TaskManager = TaskManager;
// priority="low"または完了済のタスクを判定する
function isLowOrCompletedTask(priorityTask) {
    return priorityTask.priority === 'low' || priorityTask.completed;
}
// 判定関数の否定結果を返す関数を生成する
function not(f) {
    return function (arg) { return !f(arg); };
}

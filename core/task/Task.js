const _ = require("underscore");

class Task {

    constructor(subTasks = []) {
        this._subTasks = subTasks;
    }

    addTask(task) {
        this._subTasks.push(task);
    }

    async execute(page, option) {
        console.log('Please implement <3');
    }

    async _run(page, option) {
        await this.execute(page, option);
        await this._runTask(page, option);
    }

    async _runTask(page, option) {
        if(!_.isArray(subTasks)){
            return;
        }

        for(let subTask of this._subTasks) {
            await subTask.run(page, option); // 
        }
    }
}

module.exports = Task;
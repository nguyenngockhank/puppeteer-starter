const _ = require("underscore");

var TaskAbstract = function(_subTasks){
    var subTasks = _.isArray(_subTasks) ? _subTasks : []; 
    var instance = {};

    /// NEED TO OVERRIDE BY SUBCLASS
    instance.execute = async function(page, option){
        console.log('Please implement <3');
    }

    /// DONT EXPECT TO OVERRIDE
    instance.addTask = (task) => {subTasks.push(task) } ;

    /// DONT EXPECT TO OVERRIDE
    instance.run = async function(page, option) {
        await instance.execute(page, option);
        await instance.runTasks(page, option);
    }

    /// DONT EXPECT TO OVERRIDE
    instance.runTasks =  async function(page, option){
        if(!_.isArray(subTasks)){
            return;
        }

        for(let subTask of subTasks) {
            await subTask.run(page, option); // 
        }
    }

    return instance;
};

module.exports = TaskAbstract;
import Task from '../models/task';

const fetchTask = (columnId, t) => {
    return new Promise((resolve, reject) => {
        
        const tasks = Task.findAll({
            where: {
                columnId: columnId
            }
        }).then(res => {
            
            resolve(res);

        }).catch(err => {
            reject(err);
        });
        
    });
}

export default fetchTask;
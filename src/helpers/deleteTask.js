import Task from '../models/task';

export const deleteTask = (taskId, t) => {
    
    
    return new Promise((resolve, reject) => {
        
        const deletedTask = Task.destroy({
            where: {
                id: taskId
            },
            transaction: t
            
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    });
}
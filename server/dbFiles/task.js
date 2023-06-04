class Task{
    constructor(text, status, priority, userId){
        this.text = text;
        this.status = status;
        this.priority = priority;
        this.userId = userId;
    }
}

module.exports = Task;
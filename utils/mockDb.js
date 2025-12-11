class MockDB {
    constructor() {
        this.users = [];
        this.tasks = [];
    }

    // User Methods
    async findUserByUsername(username) {
        return this.users.find(u => u.username === username);
    }

    async createUser(user) {
        const newUser = { _id: Date.now().toString(), ...user };
        this.users.push(newUser);
        return newUser;
    }

    // Task Methods
    async findTasks(userId) {
        return this.tasks.filter(t => t.userId === userId);
    }

    async createTask(task) {
        const newTask = {
            _id: Date.now().toString(),
            completed: false,
            createdAt: new Date().toISOString(),
            ...task
        };
        this.tasks.push(newTask);
        console.log('Task Created:', newTask);
        return newTask;
    }

    async deleteTask(id) {
        const index = this.tasks.findIndex(t => t._id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }

    async updateTask(id, updates) {
        const index = this.tasks.findIndex(t => t._id === id);
        if (index !== -1) {
            this.tasks[index] = { ...this.tasks[index], ...updates };
            return this.tasks[index];
        }
        return null;
    }
}

module.exports = new MockDB();

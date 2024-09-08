// __tests__/task.test.js

const request = require('supertest');
const app = require('../src/index'); // Replace with the path to your Express app

describe('Task API', () => {
  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'New Task', description: 'Task description' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('New Task');
  });

  it('should get a task by ID', async () => {
    const taskId = 1; // Replace with a valid task ID from your database
    const response = await request(app).get(`/api/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(taskId);
  });
});

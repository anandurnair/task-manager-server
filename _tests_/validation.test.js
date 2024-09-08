// __tests__/validation.test.js

const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
});

describe('Task Validation', () => {
  it('should validate a valid task', () => {
    const task = { title: 'Valid Task', description: 'Valid description' };
    const { error } = taskSchema.validate(task);
    expect(error).toBeUndefined();
  });

  it('should invalidate a task without a title', () => {
    const task = { description: 'No title' };
    const { error } = taskSchema.validate(task);
    expect(error).toBeDefined();
  });
});

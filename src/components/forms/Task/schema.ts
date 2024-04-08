import Joi from 'joi'
import { IRequestModalTask } from './type'

export const taskSchema = Joi.object<IRequestModalTask>({
  title: Joi.string().required(),
  content: Joi.string().required(),
  startAt: Joi.date().required(),
  endAt: Joi.date().greater(Joi.ref('startAt')).required().messages({
    'date.greater': 'End Date must be greater than Start Date',
  }),
  completed: Joi.boolean().required(),
})

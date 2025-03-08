import { Request, Response, Router } from "express"
import { v4 as uuidv4 } from "uuid"
import { Todo } from "../types/todo"

const todoRouter = Router()

const todos = [
  { id: uuidv4(), task: "Wash landry", isCompleted: false },
  { id: uuidv4(), task: "Buy groceries", isCompleted: false },
  { id: uuidv4(), task: "Clean the house", isCompleted: false },
]

/**
 * Get all todos
 *
 * @route GET /
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
todoRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(todos)
})

/**
 * Get all todos
 *
 * @route GET /
 * @param {Request<{ id: string}>} req
 * @param {Response} res
 * @returns {void}
 */
todoRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params
  const todo = todos.find(todo => todo.id === id)
  if (!todo) {
    res.status(404).json({ message: "Todo not found" })
    return
  }
  res.status(200).json(todo)
})

/**
 * Search todos
 *
 * @route GET /todos/search?task=some-value
 * @param {Request<{}, {}, {}, { task: string }>} req
 * @param {Response} res
 * @returns {void}
 */

todoRouter.get("/search", (req: Request<{}, {}, {}, { task: string }>, res: Response) => {
  const { task } = req.query
  const foundTasks: Todo[] = todos.filter(todo => todo.task.toLowerCase().includes(task.toLowerCase()))
  res.status(200).json(foundTasks)
})

export default todoRouter

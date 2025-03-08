import { Request, Response, Router } from 'express'
import { Employee } from '../types/employee'
import { v4 as uuidv4 } from 'uuid'

const employeeRouter = Router()

const employees: Employee[] = [
  { id: uuidv4(), firstName: 'John', lastName: 'Doe', age: 25, isMarried: false },
  { id: uuidv4(), firstName: 'Jane', lastName: 'Doe', age: 24, isMarried: true },
  { id: uuidv4(), firstName: 'Jack', lastName: 'Smith', age: 30, isMarried: true },
]

/**
 * Get all employees
 *
 * @route GET /employees
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
employeeRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json(employees)
})

/**
 * Search employees by search param
 */
employeeRouter.get('/search', (req: Request<{}, {}, {}, { firstName: string}>, res: Response) => {
  const { firstName } = req.query
  const foundEmployees = employees.filter(employee => employee.firstName.toLowerCase().includes(firstName.toLowerCase()))
  if (foundEmployees.length === 0) {
    res.status(404).send("Employees not found")
    return
  }
  res.status(200).json(foundEmployees)
})

/**
 * Get an employee by id
 *
 * @route GET /employees/:id
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void}
 */
employeeRouter.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const employee = employees.find(employee => employee.id === id)
  if (!employee) {
    res.status(404).send("Employee was not found")
    return
  }
  res.status(200).json(employee)
})

/**
 * Add an employee
 *
 * @route POST /employees
 * @param {Request<{}, {}, Employee>} req
 * @param {Response} res
 * @returns {void}
 */
employeeRouter.post('/', (req: Request<{}, {}, Employee>, res: Response) => {
  const id = uuidv4()
  const { firstName, lastName, age, isMarried } = req.body
  const newEmployee: Employee = { id, firstName, lastName, age, isMarried }
  employees.push(newEmployee)
  res.status(201).json(newEmployee)
})

/**
 * Edit an employee
 */
employeeRouter.put('/:id', (req: Request<{ id: string }, {}, Partial<Employee>>, res: Response) => {
  const { id } = req.params
  const foundIndex = employees.findIndex(employee => employee.id === id)
  if (foundIndex === -1) {
    res.status(404).send("Employee was not found")
    return
  }
  const updatedEmployee = {
    ...employees[foundIndex],
    firstName: req.body.firstName ?? employees[foundIndex].firstName,
    lastName: req.body.lastName ?? employees[foundIndex].lastName,
    age: req.body.age ?? employees[foundIndex].age,
    isMarried: req.body.isMarried ?? employees[foundIndex].isMarried
  }
  employees[foundIndex] = updatedEmployee
  res.status(200).json(updatedEmployee)
})

/**
 * Delete an employee
 */
employeeRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const foundIndex = employees.findIndex(employee => employee.id === id)
  if (foundIndex === -1) {
    res.status(404).send("Employee was not found")
    return
  }
  employees.splice(foundIndex, 1)
  res.status(200).send("Employee was deleted")
})

export default employeeRouter
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const employeeRouter = (0, express_1.Router)();
const employees = [
    { id: (0, uuid_1.v4)(), firstName: 'John', lastName: 'Doe', age: 25, isMarried: false },
    { id: (0, uuid_1.v4)(), firstName: 'Jane', lastName: 'Doe', age: 24, isMarried: true },
    { id: (0, uuid_1.v4)(), firstName: 'Jack', lastName: 'Smith', age: 30, isMarried: true },
];
/**
 * Get all employees
 *
 * @route GET /employees
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
employeeRouter.get('/', (req, res) => {
    res.status(200).json(employees);
});
/**
 * Search employees by search param
 */
employeeRouter.get('/search', (req, res) => {
    const { firstName } = req.query;
    const foundEmployees = employees.filter(employee => employee.firstName.toLowerCase().includes(firstName.toLowerCase()));
    if (foundEmployees.length === 0) {
        res.status(404).send("Employees not found");
        return;
    }
    res.status(200).json(foundEmployees);
});
/**
 * Get an employee by id
 *
 * @route GET /employees/:id
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void}
 */
employeeRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const employee = employees.find(employee => employee.id === id);
    if (!employee) {
        res.status(404).send("Employee was not found");
        return;
    }
    res.status(200).json(employee);
});
/**
 * Add an employee
 *
 * @route POST /employees
 * @param {Request<{}, {}, Employee>} req
 * @param {Response} res
 * @returns {void}
 */
employeeRouter.post('/', (req, res) => {
    const id = (0, uuid_1.v4)();
    const { firstName, lastName, age, isMarried } = req.body;
    const newEmployee = { id, firstName, lastName, age, isMarried };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});
/**
 * Edit an employee
 */
employeeRouter.put('/:id', (req, res) => {
    var _a, _b, _c, _d;
    const { id } = req.params;
    const foundIndex = employees.findIndex(employee => employee.id === id);
    if (foundIndex === -1) {
        res.status(404).send("Employee was not found");
        return;
    }
    const updatedEmployee = Object.assign(Object.assign({}, employees[foundIndex]), { firstName: (_a = req.body.firstName) !== null && _a !== void 0 ? _a : employees[foundIndex].firstName, lastName: (_b = req.body.lastName) !== null && _b !== void 0 ? _b : employees[foundIndex].lastName, age: (_c = req.body.age) !== null && _c !== void 0 ? _c : employees[foundIndex].age, isMarried: (_d = req.body.isMarried) !== null && _d !== void 0 ? _d : employees[foundIndex].isMarried });
    employees[foundIndex] = updatedEmployee;
    res.status(200).json(updatedEmployee);
});
/**
 * Delete an employee
 */
employeeRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const foundIndex = employees.findIndex(employee => employee.id === id);
    if (foundIndex === -1) {
        res.status(404).send("Employee was not found");
        return;
    }
    employees.splice(foundIndex, 1);
    res.status(200).send("Employee was deleted");
});
exports.default = employeeRouter;

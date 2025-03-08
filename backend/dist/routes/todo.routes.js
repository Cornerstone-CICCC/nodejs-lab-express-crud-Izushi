"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const todoRouter = (0, express_1.Router)();
const todos = [
    { id: (0, uuid_1.v4)(), task: "Wash landry", isCompleted: false },
    { id: (0, uuid_1.v4)(), task: "Buy groceries", isCompleted: false },
    { id: (0, uuid_1.v4)(), task: "Clean the house", isCompleted: false },
];
/**
 * Get all todos
 *
 * @route GET /
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
todoRouter.get("/", (req, res) => {
    res.status(200).json(todos);
});
/**
 * Get all todos
 *
 * @route GET /
 * @param {Request<{ id: string}>} req
 * @param {Response} res
 * @returns {void}
 */
todoRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        res.status(404).json({ message: "Todo not found" });
        return;
    }
    res.status(200).json(todo);
});
/**
 * Search todos
 *
 * @route GET /todos/search?task=some-value
 * @param {Request<{}, {}, {}, { task: string }>} req
 * @param {Response} res
 * @returns {void}
 */
todoRouter.get("/search", (req, res) => {
    const { task } = req.query;
    const foundTasks = todos.filter(todo => todo.task.toLowerCase().includes(task.toLowerCase()));
    res.status(200).json(foundTasks);
});
exports.default = todoRouter;

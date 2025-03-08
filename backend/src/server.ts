import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import todoRouter from './routes/todo.routes'
import employeeRouter from './routes/employee.routes'

// Create server
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use("/todos", todoRouter)
app.use("/employees", employeeRouter)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
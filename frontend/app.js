// API request
const getEmployees = async () => {
  const res = await fetch("http://localhost:3500/employees", {
    method: "GET"
  })

  if (!res.ok) {
    throw new Error(`Failed to add employee: ${res.statusText}`)
  }

  const data = await res.json()
  return data
}

const getEmployeeById = async (id) => {
  const res = await fetch(`http://localhost:3500/employees/${id}`, {
    method: "GET"
  })

  if (!res.ok) {
    throw new Error(`Failed to get employee: ${res.statusText}`)
  }

  const data = await res.json()
  return data
}

const searchEmployees = async (firstName) => {
  const res = await fetch(`http://localhost:3500/employees/search?firstName=${firstName}`, {
    method: "GET"
  })

  if (!res.ok) {
    throw new Error(`Failed to search employee: ${res.statusText}`)
  }

  const data = await res.json()
  return data
}

const addEmployee = async (firstName, lastName, age, isMarried) => {
  const res = await fetch("http://localhost:3500/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, age, isMarried }),
  })

  if (!res.ok) {
    throw new Error(`Failed to get employees: ${res.statusText}`);
  }

  const data = await res.json()
  return data;
}

const updateEmployee = async (id, firstName, lastName, age, isMarried) => {
  const res = await fetch(`http://localhost:3500/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, age, isMarried }),
  })

  if (!res.ok) {
    throw new Error(`Failed to update employee: ${res.statusText}`)
  }

  const data = await res.json()
  return data
}

const deleteEmployeeById = async (id) => {
  const res = await fetch(`http://localhost:3500/employees/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error(`Failed to delete employee: ${res.statusText}`)
  }

  return true
}

const render = async () => {
  const employeeList = document.querySelector('#employees')
  employeeList.innerHTML = ""
  const employees = await getEmployees()
  employees.forEach(employee => {
    const li = document.createElement('li')
    const viewBtn = document.createElement('button')
    const editBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')

    li.textContent = employee.firstName + " " + employee.lastName
    viewBtn.textContent = "VIEW"
    viewBtn.addEventListener('click', () => viewEmployee(employee.id))
    li.appendChild(viewBtn)

    editBtn.textContent = "EDIT"
    editBtn.addEventListener('click', () => editEmployee(employee.id))
    li.appendChild(editBtn)

    deleteBtn.textContent = "DELETE"
    deleteBtn.addEventListener('click', () => deleteEmployee(employee.id))
    li.appendChild(deleteBtn)

    employeeList.appendChild(li)
  })
  document.querySelector('#employees').appendChild(employeeList)
}

document.querySelector('#search').addEventListener('click', async () => {
  const firstName = document.querySelector('input[type="text"]').value;
  const employee = await searchEmployees(firstName);
  renderEmployees(employee);
});

const renderEmployees = (employees) => {
  const employeeInfo = document.querySelector('#employeeInfo');
  employeeInfo.innerHTML = "";

  employees.forEach(employee => {
    const employeeInfoList = document.createElement('ul');

    const liFirstName = document.createElement('li')
    liFirstName.textContent = `First name: ${employee.firstName}`
    employeeInfoList.appendChild(liFirstName)

    const liLastName = document.createElement('li')
    liLastName.textContent = `Last name: ${employee.lastName}`
    employeeInfoList.appendChild(liLastName)

    const liAge = document.createElement('li')
    liAge.textContent = `Age: ${employee.age}`
    employeeInfoList.appendChild(liAge)

    const liMarried = document.createElement('li')
    liMarried.textContent = `Married: ${employee.isMarried ? "Yes" : "No"}`
    employeeInfoList.appendChild(liMarried)

    employeeInfo.appendChild(employeeInfoList)
  })
}

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const firstName = e.target.firstName.value
  const lastName = e.target.lastName.value
  const age = e.target.age.value
  const isMarried = e.target.isMarried.checked

  await addEmployee(firstName, lastName, age, isMarried)
  render()
})

const editEmployee = async (id) => {
  const employee = await getEmployeeById(id);

  document.querySelector('form[name="editEmployee"] input[name="firstName"]').value = employee.firstName;
  document.querySelector('form[name="editEmployee"] input[name="lastName"]').value = employee.lastName;
  document.querySelector('form[name="editEmployee"] input[name="age"]').value = employee.age;
  document.querySelector('form[name="editEmployee"] input[name="isMarried"]').checked = employee.isMarried;

  document.querySelector('form[name="editEmployee"]').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const age = e.target.age.value;
    const isMarried = e.target.isMarried.checked;

    await updateEmployee(id, firstName, lastName, age, isMarried);
    render();
  }, { once: true }); // Ensure the event listener is added only once
}

const deleteEmployee = async (id) => {
  await deleteEmployeeById(id)
  alert("Employee deleted")
  render()
}

render()


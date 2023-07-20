const test = [
    [
      { department_id: 1, department_name: 'Management' },
      { department_id: 2, department_name: 'Finance' },
      { department_id: 3, department_name: 'Marketing' },
      { department_id: 4, department_name: 'Purchasing' },
      { department_id: 5, department_name: 'Logistics' },
      { department_id: 6, department_name: 'Production' },
      { department_id: 7, department_name: 'Human Resources' }
    ],
    [
      `department_id` INT NOT NULL PRIMARY KEY,
      `department_name` VARCHAR(50) NOT NULL
    ]
  ]


  console.log(test);
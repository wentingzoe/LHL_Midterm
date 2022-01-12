// lINK THE INPUT DATA TO LOCAL DATABASE

const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});
/**
 * Add a new task to the database.
 * @param {{task_title: string , task_description: string}} task
 * @return {Promise<{}>} A promise to the task.
 */
 const addTask =  function(task) {

  const queryString = `INSERT INTO tasks (user_id, status_id, task_title, task_description,start_date, end_date, archived) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
  const values = [task.user_id, task.status_id, task.task_title, task.task_description, task.start_date, task.end_date, task.archived];
  return pool
  .query(queryString,values)
  .then(res => res.rows)
  .catch(err => console.error(err.message));
}



exports.alltasks = alltasks;



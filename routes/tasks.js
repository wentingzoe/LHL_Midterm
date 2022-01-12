const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/add", (req, res) => {
    console.log("test!")
    console.log(req.body)

      let queryString = `
        INSERT INTO tasks (task_title, task_description, user_id, status_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      let queryParams = [req.body.task_title, req.body.task_desc, 1, 1];

      db.query(queryString, queryParams)
      .then((data) => {
        let addtodo = `INSERT INTO todo
        (task_id, category_id)
        VALUES ($1, $2)
        RETURNING *;`;
      })
      .then((data) => {
        const tasks = data.rows;
        console.log("Successfully, inserted!");
        res.json({ tasks });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });

  return router;
}


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

  router.post("/delete", (req, res) => {
    console.log("test!");

      let queryString = `DELETE FROM tasks WHERE id = $1;`;
      let queryParams = [req.body.id];
      db.query(queryString, queryParams)
      .then((data) => {
        const tasks = data.rows;
        console.log("Successfully, deleted!");
        res.json({ tasks });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });

  router.post("/edit", (req, res) => {
    console.log("test!");
    console.log(req.body);

      let queryString = `UPDATE tasks
      SET task_title = $1, task_description = $2, start_date = $3, end_date =$4
      WHERE id = $5;`;
      let queryParams = [req.body.task_title, req.body.task_desc, req.bodystart_date, req.body.end_date, req.body.id];
      db.query(queryString, queryParams)
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
};




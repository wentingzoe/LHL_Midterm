const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/add", (req, res) => {
    console.log("test!")
    console.log(req.body)

      let queryString = `
        INSERT INTO tasks (task_title, task_description, user_id, status_id, start_date,end_date)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
      let queryParams = [req.body.task_title, req.body.task_desc, 1, 1,req.body.start_date, req.body.end_date];
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
}


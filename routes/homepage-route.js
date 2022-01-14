const { request, response } = require('express');
const express = require('express');
const router = express.Router();

const homepageRoute = (db) => {
    
    router.get("/", (request, response) => {
        response.render("index")
    });

    router.get("/tasks", (request, response) => {
        db.query('SELECT * FROM tasks WHERE completed IS FALSE;')
          .then((task) => {
            console.log(task.rows)
            const templateVars = { tasks : task.rows }
            response.render("id", templateVars);
        })
    });

    router.get("/tasks/eat", (request, response) => {
        db.query('SELECT * FROM tasks WHERE category_id = 2 AND completed IS FALSE;')
          .then((toEat) => {
            const templateVars = { toEats : toEat.rows }
            response.render("eatList", templateVars);
        });
    });

    router.get("/tasks/read", (request, response) => {
        db.query('SELECT * FROM tasks WHERE category_id = 3 AND completed IS FALSE;')
          .then((toRead) => {
            const templateVars = { toReads : toRead.rows }
            response.render("readList", templateVars);
        });
    });

    router.get("/tasks/buy", (request, response) => {
        db.query('SELECT * FROM tasks WHERE category_id = 4 AND completed IS FALSE;')
          .then((toBuy) => {
            const templateVars = { toBuys : toBuy.rows }
            response.render("buyList", templateVars);
        });
    });

    router.get("/tasks/watch", (request, response) => {
        db.query('SELECT * FROM tasks WHERE category_id = 1 AND completed IS FALSE;')
          .then((toWatch) => {
            const templateVars = { toWatchs : toWatch.rows }
            response.render("watchList", templateVars);
        });
    });

    router.get("/tasks/completed", (request, response) => {
        db.query(`SELECT * FROM tasks WHERE completed IS TRUE;`)
          .then((completed) => {
            const templateVars = { completeds : completed.rows }
            response.render("completed", templateVars);
        });
    });

    router.get("/tasks/archived", (request, response) => {
        db.query('SELECT * FROM tasks WHERE archived IS TRUE;')
          .then((archived) => {
            const templateVars = { archiveds : archived.rows }
            response.render("archived", templateVars);
        });
    });

    router.get("/tasks/newtask", (request, response) => {
        response.render("id");
    });

    router.get("/profile", (request, response) => {
        response.render("profile");
    });

    router.get("/tasks/:id", (request, response) => {
        let queryString = 'SELECT * FROM tasks WHERE id = $1;'
        let queryParams = [request.params.id];
        db.query(queryString, queryParams)
          .then((task) => {
            const templateVars = { task : task.rows[0] }
            console.log(task.rows[0]);
            response.render("editpage", templateVars);
        })
    });

    return router;
};

const createHTML = (data) => {
    let dataHTML = "<div>";
    for (let i=0; i<data.length;i++) {
        dataHTML += `<h4>${data[i].task_title}</h4>`;
        dataHTML += `<p>${data[i].task_description}</p>`;
        dataHTML += `<hr>`;
    }
    dataHTML += '</div>'
    return dataHTML;
}

module.exports = homepageRoute;
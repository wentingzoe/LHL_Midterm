const { request } = require('express');
const express = require('express');
const router = express.Router();

const homepageRoute = (db) => {
    
    router.get("/", (request, response) => {
        response.render("index")
    });

    router.get("/profile", (request, response) => {
        db.query('SELECT * FROM tasks;')
          .then((task) => {
            const templateVars = { tasks : task.rows }
            response.render("id", templateVars);
        })
    });

    router.get("/profile/eat", (request, response) => {
        db.query('SELECT * FROM tasks JOIN todolists ON tasks.id = task_id WHERE category_id = 2;')
          .then((watchlist) => {
            response.send(watchlist.rows);
        });
    });

    router.get("/profile/read", (request, response) => {
        db.query('SELECT * FROM tasks JOIN todolists ON tasks.id = task_id WHERE category_id = 3;')
          .then((watchlist) => {
            response.send(watchlist.rows);
        });
    });

    router.get("/profile/buy", (request, response) => {
        db.query('SELECT * FROM tasks JOIN todolists ON tasks.id = task_id WHERE category_id = 4;')
          .then((watchlist) => {
            response.send(watchlist.rows);
        });
    });

    router.get("/profile/watch", (request, response) => {
        db.query('SELECT * FROM tasks JOIN todolists ON tasks.id = task_id WHERE category_id = 1;')
          .then((watchlist) => {
            response.send(watchlist.rows);
        });
    });

    router.get("/profile/completed", (request, response) => {
        db.query('SELECT * FROM tasks JOIN todolists ON tasks.id = task_id WHERE status_name = "Not completed";')
          .then((watchlist) => {
            response.send(watchlist.rows);
        });
    });

    router.get("/profile/archived", (request, response) => {
        db.query('SELECT * FROM tasks WHERE archived = "f";')
          .then((watchlist) => {
            response.send(watchlist.rows);
        });
    });

    router.get("/profile/newtask", (request, response) => {
        response.render("id");
    })

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
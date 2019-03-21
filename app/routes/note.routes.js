const request = require("request-promise");

module.exports = (app, ensureLogin) => {
    const notes = require('../controllers/note.controller');

    // list note
    app.get('/notes', ensureLogin, function(req, res, next) {
        request.get(req.protocol + '://' + req.get('host') + "/api/notes", (err, response, body) => {
            if (err) {
                return next(err);
            }
            res.render("pages/notes", { data: JSON.parse(body), views: req.session.views });
        });
    });

    // insert note
    app.get('/notes/add', function(req, res, next) {
        res.render("pages/notes_add", { data: { "_id": "", "title": "", "content": "" }, action: { "name": "/notes/add" } });
    });

    // add to database
    app.post('/notes/add', function(req, res, next) {
        request.post(req.protocol + '://' + req.get('host') + "/api/notes", { form: { title: req.body.title, content: req.body.content } }, (err, response, body) => {
            if (err) {
                return next(err);
            }
            res.redirect("/notes");
        });
    });

    // detele from database
    app.get('/notes/delete/:noteId', function(req, res, next) {
        request.delete(req.protocol + '://' + req.get('host') + "/api/notes/" + req.params.noteId, (err, response, body) => {
            if (err) {
                return next(err);
            }
            res.redirect("/notes");
        });
    });

    // edit from database
    app.get('/notes/edit/:noteId', function(req, res, next) {
        request.get(req.protocol + '://' + req.get('host') + "/api/notes/" + req.params.noteId, (err, response, body) => {
            if (err) {
                return next(err);
            }
            res.render("pages/notes_add", { data: JSON.parse(body), action: { "name": "/notes/edit" } });
        });
    });

    // save from database
    app.post('/notes/edit', function(req, res, next) {
        req.session.views = 1;
        request.put(req.protocol + '://' + req.get('host') + "/api/notes/" + req.body._id, { form: { title: req.body.title, content: req.body.content } }, (err, response, body) => {
            if (err) {
                return next(err);
            }
            res.redirect("/notes");
        });
    });
}

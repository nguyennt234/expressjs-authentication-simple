module.exports = (app) => {
    const user = require('../controllers/user.controller.js');
    // Load index page
    app.get('/', user.index);
}

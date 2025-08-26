const { Router } = require("express");
const indexRouter = Router();

indexRouter.get('/', (req, res) => res.send('hi'))

module.exports = indexRouter;
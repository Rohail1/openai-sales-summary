module.exports = (app, express) => {

  let router = express.Router();
  require('./sales.js')(router);
  app.use(router);

}
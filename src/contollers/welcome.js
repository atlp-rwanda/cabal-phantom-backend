import app from '../languages/international';
exports.getWelcome = app.get('/',(req, res) =>
 {
    res.status(200).send({
        status:res.__("ok"),
        message:res.__('Welcome')
    })
  });


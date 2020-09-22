import app from '../routes/utils/international';
exports.getWelcome = app.get('/',(req, res) =>
 {
    res.status(200).send({
        status:res.__("ok"),
        message:res.__('Welcome')
    })
  });

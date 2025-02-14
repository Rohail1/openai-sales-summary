const salesValidators = require('../Validators')().sales


function salesInsight(req, res) {
  console.log('Sales insight !!!!!');
  const validationResult = salesValidators.saleInsightSchema.validate(req.body);
  if (!validationResult.error) {
    res.status(200).json({ 'status': "200" });

  } else {
    res.status(400).json({ 'error': validationResult.error.details });
  }

}



module.exports = (router) => {
  router.post('/sales/insights', salesInsight)

}
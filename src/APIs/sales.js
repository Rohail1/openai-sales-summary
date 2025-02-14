
function salesInsight(req, res) {
  console.log('Sales insight !!');
}



module.exports = (router) => {

  router.post('/sales/insights', salesInsight)

}
const _ = require('lodash')
const salesValidators = require('../Validators')().sales
const MESSAGES = require('../Configs/messages')
const openai = require('../Libs/openai')

async function salesInsight(req, res) {
  try {
    const validationResult = salesValidators.saleInsightSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(MESSAGES.BAD_REQUEST.code).json({ 'error': validationResult.error.details });

    } else {
      // 1. Total Orders
      // 2. Total Sales
      // 3. Average Sales per Order
      // 4. Best Selling product Category by Order Count
      // 5. Best Selling product Category by Sales Revenue
      // 6. Highest Paying Customer
      // 7. State with highest Orders

      const totalOrders = req.body.length;
      const totalSales = _.sumBy(req.body, 'amount');
      const averageSalesPerOrder = Number((totalSales / totalOrders).toFixed(2));
      const categoriesByOrderCount = _.countBy(req.body, 'category');
      const bestCategoryByOrderCount = Object.keys(categoriesByOrderCount).reduce((a, b) => categoriesByOrderCount[a] > categoriesByOrderCount[b] ?
        a : b);

      const categoryByHighestSales = _(req.body).groupBy('category')
        .map((data, name) => ({
          category: name,
          sales: _.sumBy(data, 'amount'),
        })).maxBy('sales');

      const highestPayingCustomer = _(req.body).groupBy('name')
        .map((data, name) => ({
          name,
          sales: _.sumBy(data, 'amount'),
        })).maxBy('sales')


      const stateWithMostOrders = _(req.body).countBy('state').entries().maxBy(_.last)
      const analytics = { totalOrders, totalSales, averageSalesPerOrder, bestCategoryByOrderCount, categoryByHighestSales, highestPayingCustomer, stateWithMostOrders }

      const gptResponse = await openai.SummarizeData(analytics);
      analytics.summary = gptResponse.choices[0].message.content;
      analytics.summary = analytics.summary.replace(/\n/g, '');
      return res.status(MESSAGES.SUCCESSFUL.code).json(analytics);
    }
  } catch (error) {
    console.log(error)
    return res.status(MESSAGES.INTERNAL_SERVER_ERROR.code).json(MESSAGES.INTERNAL_SERVER_ERROR);
  }


}



module.exports = (router) => {
  router.post('/sales/insights', salesInsight)

}
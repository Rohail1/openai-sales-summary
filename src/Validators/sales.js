module.exports = (joi) => {


  // {
  //   "name": "Alice Johnson",
  //   "email": "alice.johnson1@example.com",
  //   "product": "Widget A",
  //   "category": "Widgets",
  //   "amount": 120.5,
  //   "date": "2023-03-01",
  //   "state": "California"
  // }


  const saleInsightSchema = joi.array().items(
    joi.object({
      name: joi.string()
        .min(3)
        .required(),


      email: joi.string()
        .email({ minDomainSegments: 2, })
        .required(),

      product: joi.string()
        .required(),

      category: joi.string()
        .required(),

      amount: joi.number()
        .strict()
        .precision(2)
        .required(),

      date: joi.date()
        .format('YYYY-MM-DD')
        .required(),

      state: joi.string()
        .required(),

    }).required()
  )



  return {
    saleInsightSchema
  }


}
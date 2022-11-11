const convert = async (conversion_rates, body, res) => {
    const newTransaction = await prisma.transaction.create({
      data: {
        ...body,
        amount: body.dollar_amount * conversion_rates,
      },
    });
  
    res.status(201).json(newTransaction);
  };
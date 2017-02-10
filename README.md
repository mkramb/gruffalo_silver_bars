gruffalo_silver_bars
========

**Installing**

    npm install

**Running Tests**

    npm test

**Api Example**

    const { OrderBoard, OrderTypes } = require('../index');
    const orderId = OrderBoard.register({
      userId: 42,
      quantity: 3.5,
      price: 306,
      type: OrderTypes.sell
    });

    OrderBoard.all();           // outputs summary information (array)
    OrderBoard.cancel(orderId); // cancel a registered order
    OrderBoard.clear();         // clears orders storage

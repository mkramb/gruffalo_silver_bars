'use strict';

const { OrderBoard, OrderTypes } = require('../index');

const orderIdA = OrderBoard.register({
  userId: 42, quantity: 3.5, price: 306, type: OrderTypes.sell
});

const orderIdB = OrderBoard.register({
  userId: 40, quantity: 1.2, price: 310, type: OrderTypes.sell
});

const orderIdC = OrderBoard.register({
  userId: 40, quantity: 1.5, price: 307, type: OrderTypes.sell
});

const orderIdD = OrderBoard.register({
  userId: 40, quantity: 2.0, price: 306, type: OrderTypes.sell
});

const orderIdE = OrderBoard.register({
  userId: 40, quantity: 2.0, price: 306, type: OrderTypes.buy
});

const orderIdI = OrderBoard.register({
  userId: 40, quantity: 2.0, price: 308, type: OrderTypes.buy
});

// OrderBoard.cancel(orderIdI);

OrderBoard.debug();

'use strict';

const uuidV4 = require('uuid/v4')
const { getSummary, cancelOrder } = require('./utils');

let orders = {};

const register = (order) => {
  const id = uuidV4();
  orders[id] = order;

  return id;
};

const debug = () => getSummary(orders).forEach((order) => 
  console.log(`${order.type ? 'buy' : 'sell'} ${order.quantity} kg for ${order.price}`)
);

module.exports = {
  register,
  cancel: (id) => orders = cancelOrder(id, orders),
  summary: () => getSummary(orders),
  debug
};
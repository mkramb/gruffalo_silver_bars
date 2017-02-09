'use strict';

const uuidV4 = require('uuid/v4')
const { getSummary, cancelOrder } = require('./utils');

let orders = {};

const register = (order) => {
  const id = uuidV4();
  orders[id] = order;

  return id;
};

const debug = () => {
  const messages = getSummary(orders).map((order) => 
    `${order.type ? 'buy' : 'sell'} ${order.quantity} kg for ${order.price}`
  );

  console.log(messages.join('\n'))
}

module.exports = {
  register,
  cancel: (id) => orders = cancelOrder(id, orders),
  summary: () => getSummary(orders),
  debug
};
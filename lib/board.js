'use strict';

const R = require('ramda');
const uuidV4 = require('uuid/v4')

const {
  groupByTypeAndPrice,
  combineOrdersQuantity,
  sortOrdersByTypeAndPrice
} = require('./utils');

let orders = {};

const register = (order) => {
  const id = uuidV4();
  orders[id] = order;

  return id;
};

const cancel = (id, orders) => {
  if (orders[id]) {
    return R.omit(id, orders);
  }

  return orders;
}

const live = (orders) => {
  const compileOrders = R.map(
    (orders) => R.reduce(combineOrdersQuantity, { quantity: 0 }, orders),
    R.values(groupByTypeAndPrice(R.values(orders)))
  );

  return sortOrdersByTypeAndPrice(compileOrders);
};

const debug = () => {
  const messages = live(orders).map((order) => 
    `${order.type ? 'buy' : 'sell'} ${order.quantity} kg for ${order.price}`
  );

  console.log(messages.join('\n'))
}

module.exports = {
  register,
  cancel: (id) => orders = cancel(id, orders),
  live,
  debug
};
'use strict';

const R = require('ramda');
const uuidV4 = require('uuid/v4');

const {
  combineByQuantity,
  groupByTypeAndPrice,
  sortByTypeAndPrice
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

const all = () => {
  const compileOrders = R.map(
    (orders) => R.reduce(combineByQuantity, { quantity: 0 }, orders),
    R.values(groupByTypeAndPrice(R.values(orders)))
  );

  return sortByTypeAndPrice(compileOrders);
};

module.exports = {
  register,
  cancel: (id) => orders = cancel(id, orders),
  clear: () => orders = {},
  all
};
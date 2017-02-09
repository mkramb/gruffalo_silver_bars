'use strict';

const R = require('ramda');
const { sell, buy } = require('./types');

const groupByTypeAndPrice = R.groupBy(
  (order) => '' + order.type + order.price
);

const mergeOrdersQuantity = (acc, obj) => {
  const merged = Object.assign({}, obj);

  merged.quantity = (
    acc.quantity + obj.quantity
  );

  return merged;
};

var sortOrdersByTypeAndPrice = (orders) => R.concat(
  R.sort(R.ascend(R.prop('price')), R.filter(R.propEq('type', sell), orders)),
  R.sort(R.descend(R.prop('price')), R.filter(R.propEq('type', buy), orders))
);

const cancelOrder = (id, orders) => {
  if (orders[id]) {
    return R.omit(id, orders);
  }

  return orders;
}

const getSummary = (orders) => {
  const compileOrders = R.map(
    (orders) => R.reduce(mergeOrdersQuantity, { quantity: 0 }, orders),
    R.values(groupByTypeAndPrice(R.values(orders)))
  );

  return sortOrdersByTypeAndPrice(compileOrders);
};

module.exports = {
  cancelOrder,
  getSummary
};
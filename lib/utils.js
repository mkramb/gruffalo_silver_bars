'use strict';

const R = require('ramda');
const { sell, buy } = require('./types');

const groupByTypeAndPrice = R.groupBy((
  order) => '' + order.type + order.price
);

const mergeOrdersQuantity = (acc, obj) => {
  const merged = Object.assign({}, obj);
  merged.quantity = acc.quantity + obj.quantity;

  return merged;
};

var sortOrdersByTypeAndPrice = R.pipe(
  R.sortWith([
    R.propEq('type', sell),
    R.ascend(R.prop('price'))
  ]),
  R.sortWith([
    R.propEq('type', buy),
    R.descend(R.prop('price')) 
  ])
);

const cancelOrder = (id, orders) => R.omit(id, orders);

const getSummary = (orders) => {
  return sortOrdersByTypeAndPrice(R.map(
    (orders) => R.reduce(mergeOrdersQuantity, { quantity: 0 }, orders),
    R.values(groupByTypeAndPrice(R.values(orders)))
  ));
};

module.exports = {
  cancelOrder,
  getSummary
};
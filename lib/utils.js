'use strict';

const R = require('ramda');
const { sell, buy } = require('./types');

const groupByTypeAndPrice = R.groupBy(
  (order) => '' + order.type + order.price
);

const combineOrdersQuantity = (acc, obj) => {
  const combined = Object.assign({}, obj);

  combined.quantity = (
    acc.quantity + obj.quantity
  );

  return combined;
};

var sortOrdersByTypeAndPrice = (orders) => R.concat(
  R.sort(R.ascend(R.prop('price')), R.filter(R.propEq('type', sell), orders)),
  R.sort(R.descend(R.prop('price')), R.filter(R.propEq('type', buy), orders))
);

module.exports = {
  groupByTypeAndPrice,
  combineOrdersQuantity,
  sortOrdersByTypeAndPrice
};
'use strict';

const R = require('ramda');
const { sell, buy } = require('./types');

const combineByQuantity = (acc, obj) => {
  const combined = Object.assign({}, obj);

  combined.quantity = (
    acc.quantity + obj.quantity
  );

  return combined;
};

const groupByTypeAndPrice = R.groupBy(
  (order) => '' + order.type + order.price
);

var sortByTypeAndPrice = (orders) => R.concat(
  R.sort(R.ascend(R.prop('price')), R.filter(R.propEq('type', sell), orders)),
  R.sort(R.descend(R.prop('price')), R.filter(R.propEq('type', buy), orders))
);

module.exports = {
  combineByQuantity,
  groupByTypeAndPrice,
  sortByTypeAndPrice
};
const R = require('ramda');
const { OrderBoard, OrderTypes } = require('../index');

const baseOrder = {
  userId: 42,
  quantity: 3.5,
  price: 306,
  type: OrderTypes.sell
};

beforeEach(function() {
  OrderBoard.clear();
});

describe('OrderBoard', function() {

  it('should be able to register orders', function() {
    const orders = [
      baseOrder,
      Object.assign({}, baseOrder, { price: 200 }),
      Object.assign({}, baseOrder, { price: 300 })
    ];

    orders.map(OrderBoard.register);

    expect(OrderBoard.all()).to.have.lengthOf(orders.length);
  });

  it('should be able to combine orders with the same price', function() {
    const orders = [
      baseOrder,
      baseOrder
    ];

    orders.map(OrderBoard.register);

    const allOrders = OrderBoard.all();

    expect(allOrders).to.have.lengthOf(1);
    expect(allOrders[0].quantity).to.equal(baseOrder.quantity * orders.length);
  });

  it('should be able to to sort orders of buy type', function() {
    const orders = [
      Object.assign({}, baseOrder, { price: 308, type: OrderTypes.buy }),
      Object.assign({}, baseOrder, { price: 306, type: OrderTypes.buy })
    ];

    orders.map(OrderBoard.register);

    const allOrders = OrderBoard.all();

    expect(allOrders).to.have.lengthOf(orders.length);
    expect(allOrders).deep.equal(orders);
  });

  it('should be able to to sort orders of sell type', function() {
    const orders = [
      Object.assign({}, baseOrder, { quantity: 3.5, price: 306, type: OrderTypes.sell }),
      Object.assign({}, baseOrder, { quantity: 1.5, price: 307, type: OrderTypes.sell }),
      Object.assign({}, baseOrder, { quantity: 1.2, price: 310, type: OrderTypes.sell })
    ];

    orders.map(OrderBoard.register);

    const allOrders = OrderBoard.all();

    expect(allOrders).to.have.lengthOf(orders.length);
    expect(allOrders).deep.equal(orders);
  });

  it('should be able to to cancel an order', function() {
    const orders = [
      Object.assign({}, baseOrder, { price: 308, type: OrderTypes.buy }),
      Object.assign({}, baseOrder, { quantity: 3.5, price: 306, type: OrderTypes.sell }),
      Object.assign({}, baseOrder, { quantity: 1.5, price: 307, type: OrderTypes.sell })
    ];

    const orderA = OrderBoard.register(orders[0]);
    const orderB = OrderBoard.register(orders[1]);
    const orderC = OrderBoard.register(orders[2]);

    expect(OrderBoard.all()).to.have.lengthOf(orders.length);

    OrderBoard.cancel(orderB);
    OrderBoard.cancel(orderB);

    expect(OrderBoard.all()).to.have.lengthOf(orders.length - 1);
  });

});
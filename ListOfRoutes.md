****************************************** API List ******************************************

==> Categories Apis

    🡺🡺🡺    GET - /api/categories
        description : to show all categories on admin panel on create product page in create product select
        cetegories dropdown

==> Products Apis

    🡺🡺🡺    GET - /api/products
        description : with first sort by rank and then in 10 datas for pagination

    🡺🡺🡺    GET - /api/products/:categoryId
        description : with first sort by rank and then in 10 datas for pagination

    🡺🡺🡺    GET  - /api/products/:productId
        description : product detail page not with sort or anything else

    🡺🡺🡺    POST - /api/products
        description : create products admin panel

    🡺🡺🡺    PUT - /api/products/:ProductId
        description : Edit products admin panel

    🡺🡺🡺    DELETE - /api/products/:ProductId
        description : delete product admin panel

==> Orders Apis

        GET - /api/orders
        description : to show all order at admin panel 

        POST - /api/prders
        description : create order call api on payment button before payment done in user Panel

        


        {
  orderId: 6,
  uniqueOrderId: 'ORDER-20240824-VBSDWU9N',
  products: [
    {
      size: 'S',
      color: 'Red',
      price: 199.99,
      quantity: 1,
      subprice: 179.99,
      mainImage: '/ProductImages/e01a8799-2301-47fc-aa53-b5bfd1a59f3b-Elegant Evening Gown.jpg',
      productId: 1,
      productName: 'Elegant Evening Gown'
    }
  ],
  totalAmount: 180,
  customerDetail: {
    city: 'Gandhinagar',
    road: 'national highway',
    type: 'Home',
    house: '302,aaa colony',
    state: 'Gujarat',
    pincode: '698965',
    fullName: 'Harry Patel',
    phoneNumber: '8989685856'
  },
  createdAt: 2024-08-24T02:53:19.000Z,
  updatedAt: 2024-08-24T02:53:19.000Z
}
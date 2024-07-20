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
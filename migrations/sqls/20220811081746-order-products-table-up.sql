create table order_products (
    id serial primary key,
    quantity integer,
    order_id integer references orders(id),
    product_id integer references products(id)
);
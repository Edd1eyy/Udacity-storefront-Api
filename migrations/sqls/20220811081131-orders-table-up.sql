create table orders (
    id serial primary key,
    user_id integer references users(id) not null,
    status_complete BOOLEAN DEFAULT FALSE
);
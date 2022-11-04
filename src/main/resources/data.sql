insert
into users
    (username, password)
values ('admin', '$2a$10$HLkvO8OdJRpDAUAIJswJ7OGhZ7eN5aA.a3SwH4hj2MctzvhhsGQE6');

insert
into clients
    (id, first_name, last_name)
values (1, 'Nicole', 'Carman');

insert
into cats
    (id, name, client_id)
values (1, 'Dexter', 1),
       (2, 'Missy', 1),
       (3, 'Jinxie', 1),
       (4, 'Loki', 1),
       (5, 'Stormy', 1),
       (6, 'Luna', 1),
       (7, 'Kakashi', 1);

DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL (10,2) NOT NULL,
  stock_quantity INT NOT NULL DEFAULT '1',
  PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)

VALUES ("MacBook Pro Laptop", "Electronics", 1399.99, 10),
("Wine Glasses", "Kitchen", 34.99, 30),
("Dog Bed", "Pet", 109.99, 50),
("Pearl Earrings", "Jewelery", 299.99, 17),
("Leather Gloves", "Accessories", 68.99, 22),
("Pogo Stick", "Toys", 30.00, 200),
("Telescope", "Outdoors", 129.99, 50),
("Large Round Mirror", "Home", 99.99, 39),
("Birthday Cake Scented Candle", "Home", 12.99, 346),
("Wool Scarf", "Accessories", 72.99, 6)
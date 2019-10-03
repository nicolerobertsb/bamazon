var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("\nconnected as id " + connection.threadId + "\n")
    displayProduct();
});

function displayProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        displayManagerOptions(res);

    })
};

function displayManagerOptions(products) {
    inquirer.prompt([{
        type: "list",
        name: "choices",
        message: "What would the manager like to do?",
        choices: ["View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }]).then(function (manager) {
        switch (manager.choices) {
            case "View Products for Sale":
                console.table(products);
                displayManagerOptions(products);
                break;
            case "View Low Inventory":
                viewLowInventory(products);
                break;
            case "Add to Inventory":
                addToInventory(products);
                break;
            case "Add New Product":
                addNewProduct();
                break;

            default:
                console.log("Goodbye!")
                break;
        }
    })
};

function viewLowInventory(productsLowInventory) {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function (err, res) {
        if (err) throw err;
        console.table(res);
        displayManagerOptions(res);
    })

}

function addToInventory(inventoryToAdd) {
    inquirer.prompt([{
            type: "input",
            name: "inputID",
            message: "Please enter the ID of the item you'd like to add inventory to"
        },
        {
            type: "input",
            name: "inventoryAmount",
            message: "Please enter the amount of inventory you'd like to add"
        }
    ]).then(function(managerAddInventory){
        connection.query("UPDATE products SET ? WHERE ?",[{
            stock_quantity: managerAddInventory.inventoryAmount
        },{
            item_id: managerAddInventory.inputID
        }]);
        displayManagerOptions();
    });
}
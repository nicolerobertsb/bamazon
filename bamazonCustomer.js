// require the node modules, create connection to the database, throw error if it doesnt work.

var mysql = require ("mysql");
var inquirer = require ("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"password",
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log ("\nconnected as id " + connection.threadId + "\n")
    displayProduct();
});
function displayProduct(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        console.table(res);
        prompt(res);

    })
}

// as the user what ID of the product they want to buy & how many units 
function prompt(inventory){
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message:"Please enter the Item ID you'd like to purchase.",
            filter: Number
        }
    
    ]).then(function(answers){
        var idRequested = answers.ID;
        var product = validateId(idRequested, inventory);
        if(product){
            promptForQuantity(product);
        }
        else{
            console.log("\ninvalid id");
            displayProduct();
        }

    })
}


function validateId(id, inventory){
    for(var i=0; i<inventory.length; i++){
        if(inventory[i].item_id === id){
            console.log("\nYou'd like to purchase the " + inventory[i].product_name + " which costs a total of $" + inventory[i].price)
            return inventory[i]
        }
    }
    return null;
}


function promptForQuantity(product){
    inquirer.prompt([
        
        {
            name:"Quantity",
            type:"input",
            message:"How many units would you like to purchase?",
            filter: Number
        }
        
    ]).then(function(answers){
        
        var quantityRequested = answers.Quantity;
        if(quantityRequested < product.stock_quantity){
            console.log("\nYou are trying to buy " + quantityRequested + " units of " + product.product_name)
            makePurchase(product, quantityRequested);
        }
        else{
            console.log("\nInsufficient Quantity!")
            displayProduct();
        }

    })
}


function makePurchase(purchasedProduct, quantityRequested){
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",[quantityRequested, purchasedProduct.item_id], function(err, res){
        console.log("\nYour purchase of " + quantityRequested + " " + purchasedProduct.product_name + " was successful!" + "\nThe total cost of your purchase is " + quantityRequested * purchasedProduct.price + "\n")
        connection.end();
    })

}
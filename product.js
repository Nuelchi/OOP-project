class Product {
    #price;
    #stock;
  
    constructor(name, price, stock, category,) {
      this.name = name;
      this.#price = price;
      this.#stock = stock;
      this.category = category;
    }
  
    // Setter for price
    setPrice(newPrice) {
      if (!isNaN(newPrice) && newPrice >= 0) {
        this.#price = newPrice;
      } else {
        console.error("Price cannot be negative");
      }
    }

     // Getter for price
     getPrice() {
        return this.#price;
      }   

  
    // Setter for stock
    setStock(newStock) {
      if (!isNaN(newStock) && newStock >= 0) {
        this.#stock = newStock;
      } else {
        console.error("Stock must be a non-negative integer");
      }
    }

    // Getter for stock
    getStock() {
        return this.#stock;
      }

 // Method accessible only by subclasses
      displayDetails(){
        console.log(`Product: ${this.name}, Price: $${this.#price}, Stock: ${this.#stock}`);
      }

}


// Subclasses for different categories of Product(Polymorphism)

//ELECTRONIC
class Electronics extends Product{
    constructor(name, price, stock, warrantyPeriod) {
        super(name, price, stock, "Electronics");
        this.warrantyPeriod = warrantyPeriod;
      }
      
    //displayDetails method
      displayDetails(){
         console.log(`Electronics: ${this.name}, Price: $${this.getPrice()}, Stock: ${this.getStock()}, Warranty: ${this.warrantyPeriod} months`);
      }
}


// CLOTHING
class Clothing extends Product{

    constructor(name, price, stock, size) {
        super(name, price, stock, "Clothing");
        this.size = size;
      }

     //displayDetails method
    displayDetails(){
         console.log(`Clothing: ${this.name}, Price: $${this.getPrice()}, Stock: ${this.getStock()}, Size: ${this.size}`);
      }
    
}


//FURNITURE
class Furniture extends Product{

    constructor(name, price, stock, dimensions) {
        super(name, price, stock, "Furniture");
        this.dimensions = dimensions;
      }

     //displayDetails method
      displayDetails(){
        console.log(`Furniture: ${this.name}, Price: $${this.getPrice()}, Stock: ${this.getStock()}, Dimensions: ${this.dimensions}`);
      }
    
}

  // ProductCatalog class
  class ProductCatalog {
    constructor() {
      this.products = [];
    }
  
    // Method Add product to catalog
    addProduct(product) {
      this.products.push(product);
      console.log(`${product.name} added to catalog.`);
    }
  
     // Method Add remove product from catalog
    removeProduct(productName) {
      const index = this.products.findIndex(product => product.name === productName);
      if (index !== -1) {
        console.log(`${this.products[index].name} removed from catalog.`);
        this.products.splice(index, 1);
      } else {
        console.log("Product not found in catalog.");
      }
    }
  
    // Method to Search for product in catalog
    searchProduct(productName) {
      return this.products.find(product => product.name === productName);
    }
  
    // Display all products in catalog
    displayCatalog() {
      this.products.forEach(product => product.displayDetails());
    }
  }
  
 
  //Calling the Catalog program
  const catalog = new ProductCatalog();
  

 //initializing products
  const electronics = new Electronics("Laptop", 1200, 10, 24);
  const clothing = new Clothing("long-sleeve", 20, 50, "M");
  const furniture = new Furniture("Dining Table", 500, 5, "6ft x 3ft x 2.5ft");
  

//Adding products to catalog
console.log("----ADDING PRODUCTS TO THE CATALOGUE---")
  catalog.addProduct(electronics);
  catalog.addProduct(clothing);
  catalog.addProduct(furniture);
  

// Displaying all products in the catalog
console.log("----DISPLAYING PRODUCT DETAILS----")
  catalog.displayCatalog(); 

// Removing a product named "long-sleeve" from catalog
console.log("----TAKING PRODUCT OUT OF CATALOGUE----");
  catalog.removeProduct("long-sleeve"); 
  

// Searching for productS in catalog(Laptop)
  const findProduct = catalog.searchProduct("Laptop"); 
  if (findProduct) {
    console.log("-----------SEARCH RESULTS------------");
    findProduct.displayDetails(); 
  }
  else{
    console.log("Product is not found in the Catalog")
  }

const fs = require("fs");
const path = require("path");

//Funcion para mostrar Productos en product info
const productsDir = path.join(__dirname, "./emercado-api/products/");
// Función para cargar todos los archivos JSON en la carpeta
const loadProductFiles = () => {
    const files = fs.readdirSync(productsDir); // Lee los archivos en la carpeta
    return files
      .filter(file => file.endsWith(".json")) // Filtra solo archivos .json
      .map(file => {
        const filePath = path.join(productsDir, file); // Obtiene la ruta completa
        return require(filePath); // Carga el contenido del archivo JSON
      });
  };

  //Funcion para mostrar los productos de cada categoría
const catsProductsDir = path.join(__dirname, "./emercado-api/cats_products/");
const loadCatsProductFiles = () => {
    const files = fs.readdirSync(catsProductsDir); // Lee los archivos en la carpeta
    return files
      .filter(file => file.endsWith(".json")) // Filtra solo archivos .json
      .map(file => {
        const filePath = path.join(catsProductsDir, file); // Obtiene la ruta completa
        return require(filePath); // Carga el contenido del archivo JSON
      });
  };

  // funcion para mostrar los comentarios de cada producto
  const commentsDir = path.join(__dirname, "./emercado-api/products_comments/");
  // Función para cargar todos los archivos JSON en la carpeta
  const loadCommentFiles = () => {
      const files = fs.readdirSync(commentsDir); // Lee los archivos en la carpeta
      return files
        .filter(file => file.endsWith(".json")) // Filtra solo archivos .json
        .map(file => {
          const filePath = path.join(commentsDir, file); // Obtiene la ruta completa
          return require(filePath); // Carga el contenido del archivo JSON
        });
    };
  

  

const CATEGORIES_URL = require("./emercado-api/cats/cat.json");
const PUBLISH_PRODUCT_URL = require('./emercado-api/sell/publish.json');
const PRODUCT_INFO_URL = loadProductFiles();
const PRODUCTS_URL = loadCatsProductFiles();
const PRODUCT_INFO_COMMENTS_URL = loadCommentFiles();
const CART_INFO_URL = './emercado-api/user_cart/';
const CART_BUY_URL = './emercado-api/cart/buy.json';
const EXT_TYPE = '.json';

let cats = require("./emercado-api/cats/cat.json");

const express = require("express"); //uso framework de express
const app = express(); //instancia de express
const port = 3000;

app.listen(port, ()=>{
    console.log("Server is ON")
});

app.get("/", (req, res) =>{
    res.send("<h1> Bienvenido</h1>")
});

app.get("/cats", (req, res) =>{
    res.json(CATEGORIES_URL);
})

app.get(`/cats/:id`, (req, res)=>{
    const catID = req.params.id;
    const cat = CATEGORIES_URL.find(c => c.id === Number(catID));
    res.json(cat);
});

const productsInfo = loadProductFiles();
app.get("/productsInfo", (req, res) =>{
    res.json(productsInfo);
})

app.get(`/productsInfo/:id`, (req, res)=>{
    const productID = req.params.id;
    const product = productsInfo.find(p => p.id === Number(productID));
    res.json(product);
});

const catsProducts = loadCatsProductFiles();
app.get("/catProducts", (req, res) =>{
    res.json(catsProducts);
})

app.get(`/catProducts/:id`, (req, res)=>{
    const catsProductID = req.params.id;
    const catProduct = catsProducts.find(p => p.catID === Number(catsProductID));
    res.json(catProduct);
});


const commentProducts = loadCommentFiles();
app.get("/comments", (req, res) =>{
    res.json(commentProducts);
})

app.get(`/comments/:id`, (req, res)=>{
    const commentID = Number(req.params.id);
    const productComments = commentProducts
        .flat()
        .filter(p => p.product === commentID);
        res.json(productComments);
});



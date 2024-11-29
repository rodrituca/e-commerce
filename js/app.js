const fs = require("fs");
const path = require("path");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express(); //instancia de express
const port = 3000;
const cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:5501',
}));


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

app.listen(port, ()=>{
    console.log("Server is ON")
});

app.get("/", (req, res) =>{
    res.send("<h1> Bienvenido</h1>")
});

// Middleware para la categoría CATS jeje
app.use("/index", (req, res, next) => {
    const token = req.headers["access-token"];
    if(!token) {
        return res.status(401).json({message: "Usuario no autorizado, token faltante"});
    }
    try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
    } catch {
        res.status(401).json({ message: "Usuario no autorizado" });
    }
});

app.get("/index", (req, res) =>{
    res.redirect('http://localhost:5501/index.html');
});

app.get("/cats", (req, res) =>{
    res.json(CATEGORIES_URL);
});

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

app.use(express.json());
const SECRET_KEY = "CLAVE ULTRA SECRETA";
app.post("/login", (req, res) => {
const {username, password} = req.body;
if(username !=="admin" && password !=="admin") {
const token = jwt.sign({username}, SECRET_KEY);
res.status(200).json({token});
} else {
res.status(401).json({message: "Usuario y/o contraseña incorrectos"})
}
});

module.exports = {
    CATEGORIES_URL,
    PUBLISH_PRODUCT_URL,
    PRODUCTS_URL,
    PRODUCT_INFO_COMMENTS_URL,
    PRODUCT_INFO_URL,
    CART_BUY_URL,
    CART_INFO_URL,
    EXT_TYPE,
  };
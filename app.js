const express = require('express');
require("dotenv/config");
const path = require('path');
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require('morgan');
const multer = require('multer'); //! para manejar datos  multipart/form-data 
const uuid = require('uuid/v4');
const { format } = require('timeago.js');    
//! Initializations
const app = express();
//! Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
//! Middlewares
app.use(cors());
app.use(morgan('dev')); //! es un registrador de middleware de solicitud HTTP.
app.use(express.json()); //! reconocer el objeto de solicitud entrante como un objeto JSON.
app.use(express.urlencoded({extended: false})); //! false: no puedes publicar 'objeto anidado' Nested Object = { person: { name: cw } }
//! true: Las diferencias entre el análisis de los datos de URL con `qs library` vs` querystring library

const storage = multer.diskStorage({
     destination: path.join(__dirname, 'src/public/img/providers/'),
     filename: (req, file, cb, filename) => {
          cb(null, uuid() + path.extname(file.originalname));
     }
});
app.use(multer({
     storage: storage
}).single('image'));
//! Global variables
//! TimeAgo.js
     app.use((req, res, next)=>{ 
          app.locals.format = format;
          next();
     });
//! Routes
app.use(require('./src/routes/index'));

//! Static files
app.use(express.static(path.join(__dirname, 'src/public')));
//! Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

//! Start the server
app.listen(app.get('port'), ()=>{
     console.log(`Server on port ${app.get('port')}`);
});
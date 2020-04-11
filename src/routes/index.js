const {Router } = require('express');
const router = Router();
const path = require('path');
const { unlink } = require('fs-extra');
const Provider = require('../models/Provider');
router.get('/', (req, res) => {
     res.send('index page');
});

//! ROUTE API GET
router.get('/api/providers', async(req, res)=>{
      try {
           const providers = await Provider.find();
           res.json(providers);
      } catch (err) {
           res.json(     {
                message: err
           });           
      }
})

//! ROUTER API POST
router.post('/api/providers', async (req, res)=>{     
      try {
          const provider = new Provider({
               name: req.body.name,
               surname: req.body.surname,
               dni: req.body.dni,
               filename: req.file.filename,
               path: '/img/providers/' + req.file.filename,
               // originalname: req.file.originalname,
               // mimetype: req.file.mimetype,
               // size: req.file.size
               url: 'http://localhost:3000/img/providers/' + req.file.filename
          });
          const savedProvider = await provider.save();
          res.json(savedProvider);
     } catch (err) {
          res.json({
               message: err
          })
     }
})
//! ROUTE API DELETE
router.delete('/api/providers/:id', async(req,res)=>{
     try {
          const { id } = req.params;
          const removedProvider = await Provider.findByIdAndDelete(id);
          await unlink(path.resolve('./src/public' + removedProvider.path));
             res.json(removedProvider);
     } catch (err) {
          res.json({
               message: err
          });
     }
})

//!ROUTE API PATCH
router.patch('/api/providers/:id', async (req, res) => {
     try {
          const updatedProvider = await Provider.updateOne({
               _id: req.params.id
          }, {
               $set: {
                    name: req.body.name,
                    surname: req.body.surname,
                    dni: req.body.dni,
                    filename: req.file.filename,
                    path: '/img/providers/' + req.file.filename,
                         // originalname: req.file.originalname,
                         // mimetype: req.file.mimetype,
                         // size: req.file.size
                    url: 'http://localhost:3000/img/providers/' + req.file.filename
               }
          });
          await unlink(path.resolve('./src/public' + req.body.path));
          res.json(updatedProvider);
     } catch (err) {
          res.json({
               message: err
          });
     }
});

//! ROUTE GET
router.get('/providers', async (req, res) => {
     try {
          const providers = await Provider.find();
          res.render("providers", {providers});
          // res.json(providers);
     } catch (err) {
          res.json({
               message: err
          });
     }
});
//! ROUTE POST
router.post('/providers', async (req, res) => {
     const provider = new Provider({
          name: req.body.name,
          surname: req.body.surname,
          dni: req.body.dni,
          filename: req.file.filename,
          path: '/img/providers/'+ req.file.filename,
          // originalname: req.file.originalname,
          // mimetype: req.file.mimetype,
          // size: req.file.size
          url: 'http://localhost:3000/img/providers/' + req.file.filename
     })
     try{ 
          const savedProvider = await provider.save();
          res.redirect('/providers');
          // res.json(savedProvider);
     }catch(err){
          res.json({
               message: err
          })
     }
});

//! ROUTE GET
router.get('/providers/:id', async (req, res) => {
     try {
          const { id } = req.params;
          const provider = await Provider.findById(id);
          console.log(provider);
          res.render("provider", { provider });
          // res.json(provider);
     }catch (err) {
          res.json({
          message: err,
          });
     }
     // Esto puedes usar en archivos ejs<%- include("components/somecomponent")%>
})

//!ROUTE DELETE
router.get('/providers/:id/delete', async (req, res) => {
      try {
          const { id } = req.params;
          const removedProvider = await Provider.findByIdAndDelete(id);
          await unlink(path.resolve('./src/public' + removedProvider.path));
          res.redirect("/providers");
          //    res.json(removedProvider);
       } catch (err) {
             res.json({
               message: err
          });
       }
});
//! ROUTE POST
router.post('/providers/:id', async (req, res) => {
      try {
         const updatedProvider = await Provider.updateOne({
               _id: req.params.id
               },{
                    $set: {
                         name: req.body.name,
                         surname: req.body.surname,
                         dni: req.body.dni,
                         filename: req.file.filename,
                         path: '/img/providers/' + req.file.filename,
                               // originalname: req.file.originalname,
                               // mimetype: req.file.mimetype,
                               // size: req.file.size
                         url: 'http://localhost:3000/img/providers/' + req.file.filename
                    }
               });
          await unlink(path.resolve('./src/public' + req.body.path));
          res.redirect("/providers");
          //    res.json(updatedProvider);
       } catch (err) {
             res.json({
               message: err
          });
       }
});
module.exports = router;
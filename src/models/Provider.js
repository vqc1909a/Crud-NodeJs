const mongoose = require('mongoose');
const ProviderSchema = mongoose.Schema({
     name: {
          type: String,
          required: true,
     },
     surname: {
          type: String,
          required: true
     },
     dni: {
          type: String,
          required: true
     },
     filename: {
          type: String,
          required: true
     },
     path: {
           type: String,
           required: true
     },
     url: {
           type: String,
           required: true
     },
     // originalname: {
     //       type: String,
     //      required: true
     // },
     // mimetype: {
     //      type: String,
     //      required: true
     // },
     // size: {
     //      type: Number,
     //      required: true
     // },
     created_at: {
          type: Date,
          default: Date.now() 
     }
});
module.exports = mongoose.model('Providers', ProviderSchema);

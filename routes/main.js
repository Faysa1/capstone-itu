var router = require('express').Router();
var Product = require('../models/product');
var Category = require('../models/category');
var User = require('../models/user');

router.get('/',function(req,res){
  res.render('main/home');
});
router.get('/products/:id',function(req,res,next){
  Product
    .find({category: req.params.id})
    .populate('category')
    .exec(function(err,products){
      if(err) return next(err);
      res.render('main/category',{products : products});
    });
});

router.get('/categories',function(req,res,next){
  Category
    .find()
    .populate()
    .exec(function(err, categories){
      if(err) return next(err);
      console.log('Products :: ', categories);
      var categories = [];
      // categories = categories.map(item => {
      //   return {
      //     "type": "show_block",
      //     "block_names": [item.name],
      //     "title": "Show Block"
      //   }
      // });
      categories.push({
        "type": "show_block",
        "block_names": ["name of block"],
        "title": "Show Block"
      });
      categories.push({
        "type": "web_url",
        "url": "https://rockets.chatfuel.com",
        "title": "Visit Website"
      });
      categories.push({
        "url": "https://rockets.chatfuel.com/api/welcome",
        "type":"json_plugin_url",
        "title":"Postback"
      });
      
      res.send({
        "messages": [
          {
            "attachment": {
              "type": "template",
              "payload": {
                "template_type": "button",
                "text": "Hello! How's it going?",
                "buttons": [
                  {
                    "url": "https://developers.google.com/speed/webp/gallery1",
                    "type": "json_plugin_url",
                    "title": "fruits"
                  },
                  {
                    "url": "https://developers.google.com/speed/webp/gallery1",
                    "type": "json_plugin_url",
                    "title": "abc"
                  },
                  {
                    "url": "https://developers.google.com/speed/webp/gallery1",
                    "type": "json_plugin_url",
                    "title": "def"
                  }
                ]
              }
            }
          }
        ]
      });
    });
});

module.exports = router;

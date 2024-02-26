const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
let items = require("../fakeDb");

//get all items
router.get("/", function (req, res) {
  res.json({items});
});

//add items
router.post('/', function (req, res) {
  const newItem = {
    name: req.body.name,
    price: req.body.price
  };
  items.push(newItem);
  res.status(201).json(newItem );
});

//get items by name
router.get('/:name', function (req, res) {
  const foundItem = items.find(item =>item.name === req.params.name);

  if (foundItem === undefined) {
    throw new ExpressError('item not found', 404);
  }

  res.json(foundItem);
  });

router.patch('/:name',function(req,res){
  const patchItem = items.find(item =>item.name === req.params.name);
  if (patchItem === undefined) {
    throw new ExpressError('item not found', 404);
  }
  patchItem.name=req.body.name
  patchItem.price=req.body.price

  res.json(patchItem)

})

router.delete('/:name',function(req,res,next){
  const itemToDelete = items.find(item =>item.name === req.params.name);

  if (itemToDelete === undefined) {
    throw new ExpressError('item not found', 404);
  }
  items=items.filter(item=>item !==itemToDelete)
  res.json({message:"Deleted"})

})





module.exports = router;
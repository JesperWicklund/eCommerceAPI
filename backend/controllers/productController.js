const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");

// @desc Get Products
// @route GET /api/products
// @access Private
const getProducts = asyncHandler(async (req, res) => {
  Product.find().then((productResponse) => {
    res.status(200).json(productResponse);
  });
});



// @desc Get One Product
// @route GET /api/products

const getProduct = asyncHandler(async (req, res) => {
  const myregexp = /^[a-f\d]{24}$/i;

  if (req.params.id.match(myregexp)) {
    Product.findById(req.params.id).then((response) => {
      res.status(200).json(response);
    });
  } else {
    res.status(400).json({ message: `Please provide a valid id` });
  }
});




// @desc Add Products
// @route POST /api/products

const addProduct = asyncHandler(async (req, res) => {
  const body = req.body;
  if (!body.name || !body.price || !body.description || !body.category) {
    res.status(400);
    throw new Error("request body is invalid");
  }

  const product = new Product(body);
  product.createdAt = Date.now();

  product.save().then((productResponse) => {
    res.status(200).json(productResponse);
  });
});






// @desc Update Product
// @route PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const myregexp = /^[a-f\d]{24}$/i;

  if (req.params.id.match(myregexp)) {
    const updateBody = req.body 
    updateBody._id = req.params.id
    updateBody.updatedAt= Date.now()


    Product.updateOne( updateBody  ).then((response) => {
      if (response) {
        res.status(200).json({ message: 'Updated success'});
      }
      else {
        res.status(200).json({ message: `Product with ${req.params.id} does not exist` })
      }
    });
  } else {
    res.status(400).json({ message: `Please provide a valid id` });
  }
});







// @desc Delete Product
// @route DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const myregexp = /^[a-f\d]{24}$/i;

  if (req.params.id.match(myregexp)) {
    Product.deleteOne({ _id: req.params.id }).then((response) => {
      if (response.deletedCount > 0) {
        res.status(200).json({ message: `Deleted product ${req.params.id} ` });
      } else {
        res
          .status(200)
          .json({ message: `Product with ${req.params.id} does not exist` });
      }
    });
  } else {
    res.status(400).json({ message: `Please provide a valid id` });
  }
});







module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};

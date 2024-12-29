// // routes/product.js
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const router = express.Router();
// const { protect, admin } = require('../middleware/authMiddleware');

// const Product = require('../models/Product')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Folder where images will be stored
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
//         cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
//     }
// });

// // File filter to allow only images
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (extname && mimetype) {
//         return cb(null, true);
//     } else {
//         cb('Images only!'); // If not a valid image file, send an error
//     }
// };

// // Initialize multer to handle multiple images
// const upload = multer({
//     storage,
//     limits: { fileSize: 1000000 }, // 1MB file size limit
//     fileFilter
// });

// // POST route to add a product (with multiple image uploads)
// router.post('/add', protect,  upload.array('images', 5), async (req, res) => {
//     try {
//         // Check if the user is authorized to add products
//         if (req.user.role !== 'admin' && req.user.role !== 'subAdmin') {
//             return res.status(403).json({ message: 'Access denied. Only admins and subAdmins can add products.' });
//         }
//         const {
//             name,
//             description,
//             price,
//             brand,
//             category,
//             Stock,
//             rating,
//             numReviews,
//             specifications
//         } = req.body;

//         // If no files are uploaded, return an error
//         if (!req.files || req.files.length === 0) {
//             return res.status(400).json({ message: 'No images uploaded' });
//         }

//         // Save all uploaded image paths to an array
//         // Fix: Use template literals for the correct image paths
//         const images = req.files.map(file => `/uploads/${file.filename}`);
//         const parsedSpecifications = JSON.parse(specifications);

//         const newProduct = new Product({
//             name,
//             description,
//             price,
//             images, // Save image paths array
//             brand,
//             category,
//             Stock,
//             rating,
//             numReviews,
//             specifications: parsedSpecifications ,// Save parsed specifications
//             addedBy: req.user.id // Store the user ID

//         });

//         const savedProduct = await newProduct.save();
//         res.status(201).json(savedProduct);
//     } catch (error) {
//         console.error('Error adding product:', error); // Log the error
//         res.status(500).json({ message: 'Error adding product', error: error.message });
//     }
// });


const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const dotenv = require('dotenv');

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'products', // Folder name in Cloudinary
        allowed_formats: ['jpeg', 'jpg', 'png'], // Restrict file formats
        public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Custom public ID
    }, 
});
  
// Initialize multer
const upload = multer({ storage });

// POST route to add a product (with multiple image uploads)
router.post('/add', protect, upload.array('images', 5), async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Uploaded Files:', req.files);

        // Check if the user is authorized to add products
        if (req.user.role !== 'admin' && req.user.role !== 'subAdmin') {
            return res.status(403).json({ message: 'Access denied. Only admins and subAdmins can add products.' });
        }

        // Validate input fields
        const {
            name,
            description,
            price,
            brand,
            category,
            Stock,
            rating,
            numReviews,
            specifications,
        } = req.body;

        if (!name || !description || !price || !category || !Stock) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }

        // Extract the image URLs from the uploaded files
        const images = req.files.map((file) => file.path); // Cloudinary URLs

        // Parse specifications if provided
        let parsedSpecifications = {};
        if (specifications) {
            try {
                parsedSpecifications = JSON.parse(specifications);
            } catch (error) {
                return res.status(400).json({ message: 'Invalid specifications format. It should be a valid JSON string.' });
            }
        }

        // Create a new product
        const newProduct = new Product({
            name,
            description,
            price,
            images, // Save Cloudinary URLs
            brand,
            category,
            Stock,
            rating: rating || 0,
            numReviews: numReviews || 0,
            specifications: parsedSpecifications, // Save parsed specifications
            addedBy: req.user.id, // Store the user ID
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error adding product:', error.message); // Log the error
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
});







// Update product route
router.put('/:id', protect, upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, category, Stock, brand } = req.body;

        // Check if an image file was uploaded
        const image = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedFields = { name, description, price, category, Stock, brand };
        if (image) updatedFields.image = image;

        // Check permissions
        if (
            req.user.role !== 'admin' && // If not an admin
            (req.user.role === 'subAdmin' && product.createdBy.toString() !== req.user._id.toString()) // SubAdmin but not the creator
        ) {
            return res.status(403).json({ message: 'Not authorized to delete this product' });
        }


        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
});


// GET all products
router.get('/', protect, async (req, res) => {
    try {
        // Assuming you have `req.user` populated via middleware (e.g., JWT or session)
        // const { role, id } = req.user; // Extract user role and ID from the request

        let products;

        if (req.user.role === 'admin') {
            // Admin can fetch all products
            products = await Product.find();
        } else if (req.user.role === 'subAdmin') {
            // Sub-admin can fetch only their own products
            products = await Product.find({ addedBy: req.user.id });
        } else {
            // Unauthorized role
            return res.status(403).json({ message: 'Access denied.' });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

router.get('/item', async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {};

    const { category, brand, minPrice, maxPrice, inStock } = req.query;
    let filter = { ...keyword };

    if (brand) {
        filter.brand = {
            $regex: brand,
            $options: 'i' // Case-insensitive search
        };
    }
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (inStock === 'true') {
        filter.Stock = { $gt: 0 };
    }

    const products = await Product.find(filter)
        .skip(skip)
        .limit(limit);

    const totalProducts = await Product.countDocuments(filter);

    res.json({
        products,
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
    });
});

// GET random products for carousel
router.get('/random', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;

        const randomProducts = await Product.aggregate([
            { $sample: { size: limit } }
        ]);

        res.status(200).json(randomProducts);
    } catch (error) {
        console.error('Error fetching random products:', error.message); // Log specific error message
        res.status(500).json({ message: 'Error fetching random products', error: error.message });
    }
});


// GET a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
});




// GET related products by category
router.get('/:id/related', async (req, res) => {
    try {
        const currentProduct = await Product.findById(req.params.id);
        if (!currentProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const relatedProducts = await Product.find({
            category: currentProduct.category,
            _id: { $ne: req.params.id } // Exclude the current product
        }); // Limit the number of related products

        res.status(200).json(relatedProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching related products', error });
    }
});


router.get('/:id/brand', async (req, res) => {
    try {
        const currentProduct1 = await Product.findById(req.params.id);
        if (!currentProduct1) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const relatedProducts1 = await Product.find({
            brand: currentProduct1.brand,
            _id: { $ne: req.params.id } // Exclude the current product
        }); // Limit the number of related products

        res.status(200).json(relatedProducts1);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching related products', error });
    }
});



// DELETE a product by ID
router.delete('/:id',protect, async (req, res) => {
    try {
        // Check permissions
        if (
            req.user.role !== 'admin' && // If not an admin
            (req.user.role === 'subAdmin' && product.addedBy.toString() !== req.user._id.toString()) // SubAdmin but not the creator
        ) {
            return res.status(403).json({ message: 'Not authorized to delete this product' });
        }


        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

//for reviews
router.post('/:id/review', protect, async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the user has already reviewed the product
        const alreadyReviewed = product.reviews.find(
            review => review.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({ message: 'Product already reviewed' });
        }

        // Create a new review
        const review = {
            name: req.user.name,  // Assuming user's name is in the token
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        // Update numReviews and recalculate rating
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();

        res.status(201).json({ message: 'Review added', product });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    }
});

router.get('/:id/reviews', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.status(200).json(product.reviews);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
});
 

router.put('/:productId/review/:reviewId', protect, async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the review to update
        const review = product.reviews.find(
            (review) => review._id.toString() === req.params.reviewId.toString()
        );

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if the user who is trying to update the review is the owner
        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this review' });
        }

        // Update the review fields
        review.rating = rating || review.rating;
        review.comment = comment || review.comment;

        // Recalculate the product's average rating
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();

        res.status(200).json({ message: 'Review updated', product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating review', error });
    }
});

router.delete('/:productId/review/:reviewId', protect, async (req, res) => {
    try {
        // Find the product
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the review to delete
        const review = product.reviews.find(
            (review) => review._id.toString() === req.params.reviewId.toString()
        );

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if the user is authorized to delete this review
        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this review' });
        }

        // Remove the review from the product's reviews array
        product.reviews = product.reviews.filter(
            (review) => review._id.toString() !== req.params.reviewId.toString()
        );

        // Update the product's review count and rating
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            (product.reviews.length || 1);  // Avoid division by 0 if no reviews are left

        await product.save();

        res.status(200).json({ message: 'Review deleted successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error });
    }
});

module.exports = router;

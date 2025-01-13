const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        name: { type: String, required: true },
      
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        images: { type: [String], required: true },
    },
    {
        _id: false,
    }
);
const shippingAddressSchema = mongoose.Schema(
    {
        phoneNumber: { type: Number, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: true },
    },
    {
        _id: false,
    }
);

const paymentResultSchema = mongoose.Schema(
    {
        id: { type: String }, // Payment ID from payment gateway
        status: { type: String }, // Success, Pending, Failed
        update_time: { type: String }, // Timestamp for payment update
        email_address: { type: String }, // Email used for payment
    },
    {
        _id: false,
    }
);

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        orderItems: [orderItemSchema],
        shippingAddress: shippingAddressSchema,
        paymentMethod: {
            type: String,
            required: true,
        },
        paymentResult: paymentResultSchema,
        tx_ref: { // Add tx_ref to track the transaction reference
            type: String,
            required: true,
        },
        itemsPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);
// To enable filtering based on the user who added the product, 
// populate the products in `orderItems` with `addedBy` from the Product model
orderSchema.methods.filterBySubAdminProducts = async function (subAdminId) {
    const orderItems = this.orderItems.filter(async (item) => {
        const product = await Product.findById(item.product);
        return product.addedBy.toString() === subAdminId.toString();
    });
    return orderItems;
};
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

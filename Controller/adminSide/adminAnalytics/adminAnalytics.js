import orderSchemas from "../../../Model/orderSchema/orderSchema.js"


export const totalRevenue = async (req, res) => {
    try {

        const orders = await orderSchemas.find().populate("products.productId")
        if (!orders) {
            res.status(404).json({ success: false, message: "no sales yet! " })

        }
        const totalRevenue = orders.map((order) => order.products.map((product) => {
            if (product.productId) return product.productId.price;
        }))

            .flat(Infinity).reduce((a, b) => a + b, 0);

        res.status(200).json({ success: true, message: `total revenue ${totalRevenue}` })

    } catch (error) {

        res.status(500).json({ success: false, message: `bad request ${error.message}` })

    }
}



export const totalSales = async (req, res) => {
    try {

        const orders = await orderSchemas.find().populate("products.productId");

        if (!orders) {
            return res.status(400).json({ success: false, message: "no sale yet" })
        }

        const totalSales = orders.map((order) => order.products.map((product) => product.quantity))

        res.status(200).json({ success: true, message: `total product purchesed is ${totalSales}` })

    } catch (error) {

        res.status(500).json({ success: false, message: `bad request :${error.message}` })
    }
} 
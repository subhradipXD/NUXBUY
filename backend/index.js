const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get("/", (req, res) => {
    res.status(200).send("Api Health Check");
});
app.listen(process.env.port, () => {
    console.log("listening on port: ", process.env.port);
})






app.post("/order", async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.key,
            key_secret: process.env.secret_key,
        });
        const options = req.body;
        const order = await razorpay.orders.create(options);
        if (!order) {
            return res.status(500).json({ error: true, message: "order empty!" });
        }
        res.json(order);
    } catch (error) {
        console.log(error);
    }

})


import { firestoreDB } from "../../Firebase/Firebase";
import { getDoc, doc, updateDoc, setDoc, collection } from "firebase/firestore";

const addToCart = async (userId, productId) => {
    try {
        const cartDocRef = doc(firestoreDB, "carts", userId);
        const cartDocSnap = await getDoc(cartDocRef);

        if (!cartDocSnap.exists()) {
            await setDoc(cartDocRef, {
                products: {
                    [productId]: 1
                }
            });
        } else {
            const currentProducts = cartDocSnap.data().products || {};
            const newQuantity = currentProducts[productId] ? currentProducts[productId] + 1 : 1;

            await updateDoc(cartDocRef, {
                products: {
                    ...currentProducts,
                    [productId]: newQuantity
                }
            });
        }
        console.log(`Product ${productId} added to cart for user ${userId}`);
        return true;
    } catch (error) {
        console.error("Error adding product to cart:", error);
        return false;
    }
};

const getCartItems = async (userId) => {
    const cartDocRef = doc(firestoreDB, "carts", userId);
    const cartDocSnap = await getDoc(cartDocRef);

    if (cartDocSnap.exists()) {
        return cartDocSnap.data().products;
    } else {
        await setDoc(cartDocRef, { products: {} });
        return {};
    }
};

const updateCart = async (userId, products) => {
    const cartDocRef = doc(firestoreDB, "carts", userId);
    await updateDoc(cartDocRef, { products });
};

const incrementQuantity = async (userId, productId) => {
    const products = await getCartItems(userId);
    products[productId] = (products[productId] || 0) + 1;
    await updateCart(userId, products);
};

const decrementQuantity = async (userId, productId) => {
    const products = await getCartItems(userId);
    if (products[productId] > 1) {
        products[productId] -= 1;
    } else {
        delete products[productId];
    }
    await updateCart(userId, products);
};

const removeItem = async (userId, productId) => {
    const products = await getCartItems(userId);
    delete products[productId];
    await updateCart(userId, products);
};

const clearCart = async (userId) => {
    const cartDocRef = doc(firestoreDB, "carts", userId);
    await setDoc(cartDocRef, { products: {} });
};

const order = async (userId, orderDetails) => {
    try {
        const orderDate = new Date().toISOString();
        const orderData = {
            date: orderDate,
            products: orderDetails,
        };

        const userOrdersCollectionRef = collection(firestoreDB, "orders", userId, "userOrders");
        const dateTimeDocRef = doc(userOrdersCollectionRef, orderDate);
        await setDoc(dateTimeDocRef, orderData);

        console.log(`Order placed for user ${userId} on ${orderDate}`);
        return true;
    } catch (error) {
        console.error("Error placing order:", error);
        return false;
    }
};

export { addToCart, getCartItems, incrementQuantity, decrementQuantity, removeItem, clearCart, order };

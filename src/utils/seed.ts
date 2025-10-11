import { connectDB } from "../../lib/mongodb";
import Product from "../../models/Product";


const products = [
  { title: "lordloss", image: "https://picsum.photos/300/200?random=1", price: "825,000 تومان", rating: 3 },
  { title: "larten", image: "https://picsum.photos/300/200?random=2", price: "750,000 تومان", rating: 4 },
  { title: "walk", image: "https://picsum.photos/300/200?random=3", price: "900,000 تومان", rating: 5 },
  { title: "city", image: "https://picsum.photos/300/200?random=4", price: "700,000 تومان", rating: 4 },
];

const seedProducts = async () => {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("✅ Seed products added");
};

seedProducts();

import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "Hammam",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456", 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: "Nike Air Jordan High Panda",
        logo: "/images/P1.jpg",
        description: "Top seller sneakers shoes",
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: "Dyan",
      email: "user@example.com",
      password: bcrypt.hashSync("123456", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: "1",
      name: "Nike Air Jordan High Panda",
      category: "Shoes-High",
      image: "/images/P1.jpg",
      countInStock: 10,
      price: 1200,
      brand: "Nike",
      rating: 4.5,
      numReviews: 12,
      description: "Top seller sneakers shoes",
    },
    {
      // _id: "2",
      name: "Nike Air Jordan Low Panda",
      category: "Shoes-Low",
      image: "/images/P2.jpg",
      countInStock: 0,
      price: 1100,
      brand: "Nike",
      rating: 4.0,
      numReviews: 20,
      description: "people always search",
    },
    {
      // _id: "3",
      name: "Nike Air Max 97",
      category: "Shoes-Sport",
      image: "/images/P3.jpg",
      countInStock: 15,
      price: 800,
      brand: "Nike",
      rating: 4.0,
      numReviews: 15,
      description: "Light for daily activities",
    },
    {
      // _id: "4",
      name: "Nike Air Force 1 White",
      category: "Shoes-Low",
      image: "/images/P4.jpg",
      countInStock: 25,
      price: 450,
      brand: "Nike",
      rating: 5.0,
      numReviews: 10,
      description: "high passionate for fashion",
    },
    {
      // _id: "5",
      name: "Nike Air Max",
      category: "Shoes-Low",
      image: "/images/P5.jpg",
      countInStock: 15,
      price: 550,
      brand: "Nike",
      rating: 4.0,
      numReviews: 18,
      description: "people always come for this",
    },
    {
      // _id: "6",
      name: "Nike Air Max 95",
      category: "Shoes-Low",
      image: "/images/P6.jpg",
      countInStock: 12,
      price: 800,
      brand: "Nike",
      rating: 3.5,
      numReviews: 25,
      description: "simple and elegant",
    },
  ],
};

export default data;

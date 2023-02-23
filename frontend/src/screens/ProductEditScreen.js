import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { detailsProduct, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

export default function ProductEditScreen(props) {
  //   1. get productId from the url
  const productId = props.match.params.id;
  //   2. hook product fetch
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  //   5.2 product redux
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  //   3. defining useEffect, fetch detail product

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }
    // 4. if product exist set value for reat hook
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      // 5.1 product get from redux-store
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
    // 6. isi manual second parameter [...]
  }, [product, dispatch, productId, successUpdate, props.history]);
  //   8. submitHandler function
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO dispatch update product
    dispatch(updateProduct({ _id: productId, name, price, image, category, brand, countInStock, description }));
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${userInfo.token}` },
      });
      setImage(data);
      setLoadingUpload(false);
      console.log(bodyFormData);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
      console.log(error);
    }
  };
  return (
    <div>
      {/* 7/ ui section */}
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product{productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input type="text" id="price" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input type="text" id="image" placeholder="Enter image" value={image} onChange={(e) => setImage(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input type="file" id="imageFile" label="Choose Image" onChange={uploadFileHandler}></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input type="text" id="category" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input type="text" id="brand" placeholder="Enter brand" value={brand} onChange={(e) => setBrand(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input type="text" id="countInStock" placeholder="Enter count in stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea type="text" id="description" rows="3" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

// Import thêm Button và Input.Search
import React, { useEffect, useState } from "react";
import { Col, Divider, Rate, Row, Tooltip, Select, Button, Input, Empty } from "antd";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { getAllProducts } from "../services/product";
import { IProduct } from "../common/type";
import { getCategory } from "../services/category";
import "./HomePage.css"
const HomePage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.datas.docs);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategory();
        const categoryNames = categoriesData.datas.docs.map(
          (category: any) => category.name
        );
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddToCart = (selectedProduct: IProduct) => {
    const existingProduct = cart.find(
      (product) => product._id === selectedProduct._id
    );
    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((product) =>
          product._id === selectedProduct._id
            ? { ...product, quality: product.quality + 1 }
            : product
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, selectedProduct]);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleClearFilter = () => {
    setSelectedCategory(null);
  };

  const renderProductCol = (filteredProducts: IProduct[]) => (
    <Row gutter={[16, 24]}>
      {filteredProducts.map((product) => (
        <Col key={product._id} className="gutter-row" span={6}>
          <div className="product-card">
            <img
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="product-image"
            />
            <div className="product-details">
              <strong style={{ color: "rgb(0 0 0 / 41%)", fontSize: "large" }}>
                {product.name}
              </strong>
              <p style={{ color: "#c48c46", fontSize: "large" }}>
                $
                {product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
                <Tooltip title="Thêm vào giỏ hàng">
                  <span
                    className="cart-icon"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCartOutlined />
                  </span>
                </Tooltip>
              </p>
              <p></p>
              <p>
                <Rate defaultValue={5} disabled />
              </p>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;
  
  const searchedProducts = searchValue
    ? filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : filteredProducts;

  return (
    <>
      <Divider orientation="left" style={{ fontSize: "1.5em" }}>
        Sản phẩm Bán Chạy
      </Divider>
      <Input.Group
        compact
        style={{
          display: "flex",
          width: '100%',
          justifyContent:'center'
        }}
      >
        <Button
          type="link"
          onClick={handleClearFilter}
          style={{
            display: selectedCategory ? "inline" : "none",
            marginBottom: 16,
          }}
        >
          Bỏ Lọc Sản Phẩm
        </Button>
        <Select
          placeholder="Chọn danh mục"
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ width: 200, marginRight: 8 }}
        >
          {categories.map((category) => (
            <Select.Option key={category} value={category}>
              {category}
            </Select.Option>
          ))}
        </Select>
        <Input.Search
          placeholder="Tìm kiếm sản phẩm"
          style={{ width: 300, marginLeft: 10 }}
          onSearch={handleSearch}
          enterButton={<SearchOutlined />}
        />
      </Input.Group>
      {searchedProducts.length > 0 ? (
        renderProductCol(searchedProducts)
      ) : (
        <Empty description="Không tìm thấy sản phẩm" style={{ height: "500px" }}/>
      )}
    </>
  );
};

export default HomePage;

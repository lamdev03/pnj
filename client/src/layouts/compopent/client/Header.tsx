import { Input, Button, Badge, Space, Popover, List, Table } from "antd";
import { UserOutlined, ShoppingCartOutlined, SearchOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import "./css.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const AppHeader = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [cart, setCart] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [localStorageVersion, setLocalStorageVersion] = useState(0);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [localStorageVersion]); // Trigger useEffect when localStorageVersion changes

  const handleStorageChange = () => {
    setLocalStorageVersion((prevVersion) => prevVersion + 1);
  };
  window.addEventListener("storage", handleStorageChange);

  window.removeEventListener("storage", handleStorageChange);

  useEffect(() => {
    setCartItemCount(cart.length);
  }, [cart]);

  const isAdmin = user && user.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser({});
  };
  const calculateTotalPrice = () => {
    return cart.reduce((total, product: any) => {
      const productTotal = product.price * product.quality;
      return total + productTotal;
    }, 0);
  };
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Soos luong",
      dataIndex: "quality",
      key: "quality",
    },
    {
      title: "Tổng giá",
      dataIndex: "total",
      key: "total",
      render: (text: any, record: any) => {
        const totalPrice =
          record.price && record.quality ? record.price * record.quality : 0;
        return totalPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      },
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        textAlign: "right",
        color: "black",
        background: "gray",
        fontSize: "20px",
        position: "fixed",
        top: 0,
        zIndex: 1000,
      }}
    >
      {isAdmin && (
        <div
          className=""
          style={{
            width: "100%",
            textAlign: "right",
            color: "black",
            background: "gray",
            fontSize: "20px",
            padding:"5px 0px"
          }}
        >
          <Link to={"admin"}><Button style={{marginRight:20}}>truy cap admin</Button></Link>
        </div>
      )}
      <div className="header-content">
        <div className="logo">
        <Input
          placeholder="Số điện thoại"
          style={{ width: 150, marginRight: 8 }}
          prefix={<PhoneOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
        <Input
          placeholder="Vị trí"
          style={{ width: 150, marginRight: 8 }}
          prefix={<EnvironmentOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
        </div>
        <div className="header-actions">
        <img
            width={100}
            src="https://cdn.pnj.io/images/logo/pnj.com.vn.png"
            alt=""
            style={{marginRight:550}}
          />
         
          <Space style={{ padding: "0px 18px" }}>
            <Popover
              placement="bottomRight"
              title="Giỏ hàng"
              content={
                <>
                  <Table
                    dataSource={cart}
                    columns={columns}
                    pagination={false}
                  />
                  <p
                    style={{
                      textAlign: "right",
                      fontWeight: "bold",
                      marginRight: "15px",
                    }}
                  >
                    Tổng tiền:{" "}
                    {calculateTotalPrice().toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>{" "}
                </>
              }
              trigger="hover"
            >
              <Badge count={cartItemCount}>
                <Link to={"/cart"}>
                  <ShoppingCartOutlined
                    style={{ color: "white", fontSize: "35px" }}
                  />
                </Link>
              </Badge>
            </Popover>
          </Space>
          {user && user.userName ? (
            <span style={{ color: "white", marginRight: 10 }}>
              Xin chào {user.userName}
              <Button
                onClick={handleLogout}
                type="link"
                style={{ color: "white" }}
              >
                Đăng xuất
              </Button>
            </span>
          ) : (
            <Button
              style={{ color: "white" }}
              type="link"
              icon={<UserOutlined />}
              href="#"
            >
              <Link to={"/signin"}>Đăng nhập</Link>
            </Button>
          )}

          {/* Sử dụng Badge để hiển thị số lượng sản phẩm trong giỏ hàng */}
        </div>
      </div>
    </div>
  );
};

export default AppHeader;

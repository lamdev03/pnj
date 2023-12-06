import { useEffect, useState } from "react";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../../../services/product";
import { IProduct } from "../../../../common/type";
import {
  Table,
  Space,
  Button,
  Popconfirm,
  Modal,
  notification,
  Pagination,
} from "antd";

import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import FormUpdateProduct from "./FormUpdateProduct";
import Title from "antd/es/typography/Title";
import FormAddProduct from "./FormAddProduct";

const List = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [totaldoc, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datass = await getProducts(currentPage, 5);
        if (datass && datass.datas && datass.datas.docs) {
          setProducts(datass.datas.docs);
          setTotal(datass.datas.totalDocs);
        } else {
          console.error("Data structure is not as expected:", datass);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalOpenAdd(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpenAdd(false);
  };
  const handleDelete = async (productId: IProduct | undefined) => {
    console.log("delete");
    try {
      console.log(productId);
      await deleteProduct(productId!);
      const updatedProducts = products.filter(
        (product) => product._id !== productId!._id
      );
      setProducts(updatedProducts);
      notification.success({ message: "xoa thanh cong" });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const defaultProduct = {
    name: "",
    price: 0,
    image: "",
    category: "vui long chon danh muc",
    desc: "",
    quality: 1,
  };
  const handleEdit = (record: IProduct) => {
    setSelectedProduct(record);
    console.log(record);

    setIsModalOpen(true);
  };
  setTimeout(() => {
    notification.destroy();
  }, 2000);
  const updateProducts = async (product: IProduct) => {
    try {
      const { _id, ...restOfProduct } = product;
      const data = await updateProduct(restOfProduct, _id!);
      setProducts((prevProducts) =>
        prevProducts.map((prevProduct) =>
          prevProduct._id === data?.datas?._id ? data.datas : prevProduct
        )
      );

      setIsModalOpen(false);
      notification.success({ message: "Thanh cong" });
      console.log("Thành công");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };
  const addProducts = async (product: IProduct) => {
    try {
      const data = await addProduct(product);
      setProducts((prevProducts) => [...prevProducts, data.datas]);
      console.log(data);
      setIsModalOpenAdd(false);
      notification.success({ message: "Thanh cong" });
      console.log("Thành công");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: 150,
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 450,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img src={image} alt="" style={{ width: "100px", height: "70px" }} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: IProduct) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          ></Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Space direction="vertical">
        <Title>Product List</Title>
        <Space style={{ marginBottom: "15px" }} direction="horizontal">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpenAdd(true)}
          >
            Add Product
          </Button>
        </Space>
      </Space>
      <Table
        bordered
        dataSource={products || []}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <Pagination
        total={totaldoc}
        showTotal={(totaldoc) => `Total ${totaldoc} items`}
        defaultPageSize={5}
        current={currentPage}
        onChange={handlePageChange}
        style={{ float: "right", marginBottom: "20px" }}
      />

      <Modal
        key="update-product-modal"
        title="Update Product"
        open={isModalOpen}
        onOk={handleOk}
        footer=""
        onCancel={handleCancel}
      >
        <FormUpdateProduct
          onsubmit={updateProducts}
          product={selectedProduct!}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
      <Modal
        key="add-product-modal"
        title="Add Product"
        open={isModalOpenAdd}
        onOk={handleOk}
        footer=""
        onCancel={handleCancel}
      >
        <FormAddProduct
          key="add-product-form"
          onsubmit={addProducts}
          product={defaultProduct}
          setIsModalOpenAdd={setIsModalOpenAdd}
        />
      </Modal>
    </div>
  );
};

export default List;

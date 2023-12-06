import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Popconfirm, Space, Table, notification } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react'
import { ICategory } from '../../../../../common/type';
import { addCategory, deleteCategory, getCategory, updateCategory } from '../../../../../services/category';
import FormUpdateCate from './FormUpdateProduct';
import FormAddCate from './FormAddProduct';

type Props = {}

const ListCate = (props: Props) => {
    const [category, setCategory] = useState<ICategory[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ICategory>();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const datass = await getCategory();
            if (datass && datass.datas) {
                setCategory(datass.datas.docs);
            } else {
              console.error("Data structure is not as expected:", datass);
            }
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
        fetchData();
      }, []);
      const handleOk = () => {
        setIsModalOpen(false);
        setIsModalOpenAdd(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalOpenAdd(false);
      };
      const handleDelete = async (cateId: ICategory | undefined) => {
        console.log("delete");
        try {
          console.log(cateId);
          await deleteCategory(cateId!);
          const updatedCates = category.filter(
            (cate) => cate._id !== cateId!._id
          );
          setCategory(updatedCates);
          notification.success({ message: "xoa thanh cong" });
        } catch (error) {
          console.error("Error deleting category:", error);
        }
      };
      const defaultProduct = {
        name: "",
        slug: "",
      };
      const handleEdit = (record: ICategory) => {
        setSelectedProduct(record);
        console.log(record);
        setIsModalOpen(true);
      };
      setTimeout(() => {
        notification.destroy();
      }, 2000);
      const updateCate = async (product: ICategory) => {
        try {
          const { _id, ...restOfProduct } = product;
          const data = await updateCategory(restOfProduct, _id!);
          setCategory((prevProducts) =>
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
      const addCategorys = async (cate: ICategory) => {
        try {
          const data = await addCategory(cate);
          setCategory((prevCates) => [...prevCates, data.datas]);
          setIsModalOpenAdd(false);
          notification.success({ message: "Thanh cong" });
          console.log("Thành công");
        } catch (error) {
          console.error("Lỗi khi thêm danh muc sản phẩm:", error);
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
          title: "Name",
          dataIndex: "name",
          key: "name",
          width: 450,
        },
        {
          title: "slug",
          dataIndex: "slug",
          key: "slug",
        },
        {
          title: "Action",
          key: "action",
          render: (record: ICategory) => (
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
            <Title>Product Category List</Title>
            <Space style={{ marginBottom: "15px" }} direction="horizontal">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalOpenAdd(true)}
              >
                Add Category
              </Button>
            </Space>
          </Space>
          <Table
            bordered
            dataSource={category || []}
            columns={columns}
            rowKey="id"
          />
           <Modal
            key="update-product-modal"
            title="Update Product"
            open={isModalOpen}
            onOk={handleOk}
            footer=""
            onCancel={handleCancel}
          >
            <FormUpdateCate
              onsubmit={updateCate}
              category={selectedProduct!}
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
            <FormAddCate
              key="add-product-form"
              onsubmit={addCategorys}
              category={defaultProduct}
              setIsModalOpenAdd={setIsModalOpenAdd}
            />
          </Modal> 
        </div>
      );
}

export default ListCate
import TextArea from "antd/lib/input/TextArea";
import { useForm } from "antd/lib/form/Form";
import { Button, Form, InputNumber, Input, Select, Upload, Spin } from "antd";
import { ICategory, IProduct } from "../../../../common/type";
import { useEffect, useState } from "react";
import { getCategory } from "../../../../services/category";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;
const FormAddProduct = ({
  product,
  setIsModalOpenAdd,
  onsubmit,
}: {
  product: IProduct;
  setIsModalOpenAdd?: any;
  onsubmit: any;
}) => {
  const [form] = useForm();
  const [category, setCategory] = useState<ICategory[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, Setloading] = useState<boolean>(false);
  const handleImageChange = (info: any) => {
    console.log("Upload onChange event:", info);
    if (info.fileList.length > 0) {
      const file = info.fileList[0];
      console.log("Selected file:", file);
      setImage(file);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (!image) {
        console.error("Please select an image");
        return;
      }
      Setloading(true);
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post<{ imageUrl: string }>(
        "http://localhost:9000/upload",
        formData
      );
      console.log("Image uploaded:", response.data.imageUrl);
      alert("thanh cong");
      Setloading(false);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const onFinish = (values: IProduct) => {
    const va = { ...values, image: imageUrl };
    console.log(imageUrl);
    console.log(va);
    
    onsubmit(va);
    form.resetFields();
    setImageUrl("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datass = await getCategory();
        if (datass && datass.datas) {
          setCategory(datass.datas.docs);
          console.log(datass.datas.docs);
        } else {
          console.error("Data structure is not as expected:", datass);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <>
      {loading === true && <Spin size="large" />}
      <Form
        form={form}
        name="basic"
        {...formItemLayout}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Select placeholder="Select category">
            {category.map((category) => (
              <Option key={category._id} value={category.name}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="quality"
          name="quality"
          initialValue={product.quality}
          style={{ display: "none" }}
        >
          <InputNumber value={product.quality} />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input value={product.name} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              message: "Price must be a non-negative number!",
            },
          ]}
        >
          <InputNumber
            value={product.price}
            defaultValue={product.price}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={handleImageChange}
        >
          <Upload
            accept="image/*"
            listType="picture"
            beforeUpload={(file) => {
              handleImageChange({ fileList: [file] });
              return false;
            }}
          > 
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
          <a onClick={handleImageUpload}>Upload Image</a>
        </Form.Item>

        <Form.Item
          label="Description"
          name="desc"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <TextArea value={product.desc} rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="text" onClick={() => setIsModalOpenAdd(false)}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormAddProduct;

import TextArea from "antd/lib/input/TextArea";
import { useForm } from "antd/lib/form/Form";
import { Button, Form, InputNumber, Input, Select } from "antd";
import { ICategory, IProduct } from "../../../../common/type";
import { useEffect, useState } from "react";
import { getCategory } from "../../../../services/category";
const { Option } = Select;
const FormUpdateProduct = ({ product, setIsModalOpen,onsubmit }: { product: IProduct; setIsModalOpen?: any;onsubmit:any }) => {
  const [form] = useForm();
  const [category, setCategory] = useState<ICategory[]>([]);
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
  useEffect(() => {
    form.setFieldsValue(product);
  }, [product, form]);
  const onFinish = (values: IProduct) => {
    console.log(values);
    onsubmit(values)
    form.resetFields();
  };
  console.log(product);
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <Form
      form={form}
      name="basic"
      {...formItemLayout}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={{ }}
    >
      <Form.Item label="ID" name="_id" hidden initialValue={product._id}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: "This field is required!" }]}
      >
        <Select placeholder="Select category">
          {category.map((category) => (
            <Option key={category._id}  initialValue={category.name} value={category.name}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="quality"
        name="quality"
        initialValue={product.quality}
        style={{display:'none'}}
      >
        <InputNumber value={product.quality}/>
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "This field is required!" }]}
        
      >
        <Input value={product.name}/>
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
        initialValue={product.price}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Image"
        name="image"
        rules={[{ required: true, message: "This field is required!" }]}
        initialValue={product.image}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="desc"
        rules={[{ required: true, message: "This field is required!" }]}
        initialValue={product.desc}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="text" onClick={() =>  setIsModalOpen(false)}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormUpdateProduct;

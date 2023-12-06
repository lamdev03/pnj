import { useForm } from "antd/lib/form/Form";
import { Button, Form,  Input } from "antd";
import { useEffect } from "react";
import { ICategory } from "../../../../../common/type";
import {useState} from'react'
const FormUpdateCate = ({ category, setIsModalOpen,onsubmit }: { category: ICategory; setIsModalOpen?: any;onsubmit:any }) => {
  const [form] = useForm();
  const [slug, setSlug] = useState<string>(category.slug || '');

  useEffect(() => {
    form.setFieldsValue(category);
  }, [category, form]);
  const onFinish = (values: ICategory) => {
    console.log(values);
    onsubmit(values)
    form.resetFields();
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const formattedSlug = name.toLowerCase().replace(/\s+/g, '-');
    setSlug(formattedSlug);
    console.log(formattedSlug);
    
    form.setFieldsValue({ slug: formattedSlug });
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
      <Form.Item label="ID" name="_id" hidden initialValue={category._id}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "This field is required!" }]}
        
      >
        <Input value={category.name} onChange={handleNameChange}/>
      </Form.Item>

    

      <Form.Item
        label="Slug"
        name="slug"
      >
        <Input onChange={(e) => setSlug(e.target.value)} />
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

export default FormUpdateCate;

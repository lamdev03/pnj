import { useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { Button, Form, Input } from 'antd';
import { ICategory } from '../../../../../common/type';

const FormAddCate = ({
  category,
  setIsModalOpenAdd,
  onsubmit,
}: {
  category: ICategory;
  setIsModalOpenAdd?: any;
  onsubmit: any;
}) => {
  const [form] = useForm();
  const [slug, setSlug] = useState<string>(category.slug || '');

  const onFinish = (values: ICategory) => {
    console.log(values);
    onsubmit(values);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const formattedSlug = name.toLowerCase().replace(/\s+/g, '-');
    setSlug(formattedSlug);
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
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'This field is required!' }]}
      >
        <Input value={category.name} onChange={handleNameChange} />
      </Form.Item>
      <Form.Item
        label="Slug"
        name="slug"
      >
        <Input onChange={(e) => setSlug(e.target.value)} />
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
  );
};

export default FormAddCate;

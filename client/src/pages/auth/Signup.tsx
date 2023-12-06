import { Button, Form, Input, notification } from "antd";
import { Link } from "react-router-dom";
import { signup } from "../../services/auth";
type FieldType = {
  userName?: string;
  password?: string;
  email?: string;
  confirmPassword?: string;
};
const SignupPage = () => {
  setTimeout(() => {
    notification.destroy();
  }, 2000);
    const onFinish = async (values: any) => {
        try {
            await signup(values);
            notification.success({ message: 'Bạn đã đăng ký thành công!' });
        } catch (error) {
            console.error("Error during signup:", error);
            notification.error({ message: 'Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại!' });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh", // Set the height to 100% of the viewport
      }}
    >
      <h1>Sign In </h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="userName"
          name="userName"
          rules={[
            { required: true, message: "Please input your user name!" },
            { min: 6, message: " user name must be at least 6 characters long!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters long!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          label="Confirm"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please input your confirm password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Link to={'/signin'}>ban da co tai khoan</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupPage;

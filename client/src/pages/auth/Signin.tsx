import { Button, Form, Input, notification } from "antd";
import { Link } from "react-router-dom";
import { signin } from "../../services/auth";
import { useNavigate } from "react-router-dom";
type FieldType = {
  username?: string;
  password?: string;
  email?: string;
  confirmpassword?: string;
};

const SigninPage = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    notification.destroy();
  }, 2000);
  const clearLocalStorage = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("accessToken");
    notification.success({ message: "Local storage cleared!" });
  };
   const clearLocalStorageInterval = setInterval(clearLocalStorage, 24 * 60 * 60 * 1000);
   const componentWillUnmount = () => clearInterval(clearLocalStorageInterval);
   componentWillUnmount();
  const onFinish = async (values: any) => {
    try {
      const data = await signin(values);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.accessToken);      
      notification.success({ message: "Bạn đã đăng nhập thành công!" });
      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error);
      notification.error({
        message: "Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại!",
      });
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
        height: "80vh",
      }}
    >
      <h1>Sign In</h1>
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
          label="Email"
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Link to={"/signup"}>ban chua co tai khoan</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SigninPage;

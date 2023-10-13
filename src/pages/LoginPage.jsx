import { Button, Checkbox, Form, Input, message } from "antd";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ISLOGGEDIN } from "../constants";

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    localStorage.setItem(ISLOGGEDIN, true);
    setIsLoggedIn(true);
    message.success("Thanks for Logging in")

  navigate("/dashboard");
  };
  return (
    <div className="login-page">
      <Form
        className="login-page-form"
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{}}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          className="form-item"
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input className="form-input" type="email" />
        </Form.Item>

        <Form.Item
          className="form-item"
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password className="form-input" />
        </Form.Item>

        <Form.Item
          className="form-item"
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          className="form-item"
          wrapperCol={{
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

LoginPage.propTypes = {
  setIsLoggedIn: PropTypes.func,
};

export default LoginPage;

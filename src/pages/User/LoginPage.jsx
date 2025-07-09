import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, Typography, message } from "antd";
import api from "../../api/apiUtils";
const { Title } = Typography;
const LoginPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("state", state);

  useEffect(() => {
    if (state?.values) {
      // If state contains values, set them in the form
      form.setFieldsValue({
        taiKhoan: state.values.taiKhoan,
        matKhau: state.values.matKhau,
      });
    }
  }, [form, state])

  const onFinish = (values) => {
    api.post("QuanLyNguoiDung/DangNhap", values)
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "Login success",
          duration: 2,
        });
        localStorage.setItem("userLogin", JSON.stringify(res.data.content));
        
        window.dispatchEvent(new Event("local-storage-change"))
        // Navigate to the previous page or home page
        if (state?.isRegister) {
          navigate("/");
          window.location.reload();
        } else {
          window.location.reload();
          navigate(-1);
        }

      }).catch((err) => {
        messageApi.open({
          type: "error",
          content: err.response.data.content,
          duration: 2,
        })
      })

  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div
          style={{
            width: "600px",
            height: "400px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
          }}
          className="flex flex-col justify-center items-center"
        >
          <Title level={2}>Login</Title>
          <Form
            name="login"

            form={form}
            style={{ width: 570 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="taiKhoan"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="matKhau"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button className="mb-2" block type="primary" htmlType="submit">
                Log in
              </Button>
              or <NavLink to="/register">Register now!</NavLink>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

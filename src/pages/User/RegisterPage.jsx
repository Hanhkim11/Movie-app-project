import React from "react";
import { NavLink } from "react-router-dom";
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, message } from 'antd';
import api from "../../api/apiUtils";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const RegisterPage = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    const data = { ...values, maNhom: "GP01" }
    console.log("data", data)
    api.post("QuanLyNguoiDung/DangKy", data)
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "Register success",
          duration: 2,
        })
        navigate("/login", { state: { values, isRegister: true } });
      })
      .catch((err)=>{
        console.log("err", err)
        messageApi.open({
          type: "error",
          content: err.response.data.content,
          duration: 2,
        })
      })
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
      {contextHolder}
      <div style={{ width: "600px", height: "500px", border: "1px solid #ccc", borderRadius: "10px", padding: "20px" }} className="flex flex-col justify-center items-center">
        <Title level={2}>Register</Title>
        <Form
          name="register"
          style={{ width: 570 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="taiKhoan"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your Email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="matKhau"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="soDT"
            rules={[{ required: true, message: 'Please input your Phone Number!' }]}
          >
            <Input type="number" maxLength={10} prefix={<PhoneOutlined />} placeholder="Phone Number" />
          </Form.Item>

          <Form.Item
            name="hoTen"
            rules={[{ required: true, message: 'Please input your Full Name!' }]}
          >
            <Input prefix={<IdcardOutlined />} placeholder="Full Name" />
          </Form.Item>

          <Form.Item>
            <Button className="mb-2" block type="primary" htmlType="submit">
              Register
            </Button>
            or <NavLink to="/login">Login now!</NavLink>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage
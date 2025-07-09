// src/pages/LandingPage.jsx
import React from "react";
import { Button, Typography, Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Content, Footer } = Layout;

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "100px", textAlign: "center" }}>
        <Title>Welcome to My App</Title>
        <Text>This is a simple to-do app with authentication.</Text>
        <br />
        <Button
          type="primary"
          size="large"
          style={{ marginTop: 20 }}
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </Content>
      <Footer style={{ textAlign: "center" }}>© 2025 My To-Do App</Footer>
    </Layout>
  );
}

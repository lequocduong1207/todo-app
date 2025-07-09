// src/pages/HomePage.jsx
import React, { useContext } from "react";
import { Button, Typography, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import ToDoPage from "./TodoPage";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function HomePage() {
        const { name, setUser } = useUser();

        const navigate = useNavigate();

        const handleLogout = () => {
                localStorage.removeItem("access_token"); // hoặc token nếu bạn dùng
                setUser({
                        isAuthenticated: false,
                        name: "",
                        email: ""
                });
                toast.info("Đã đăng xuất");
                navigate("/login");
        };

        return (
                <Layout style={{ minHeight: "100vh" }}>
                        <Header style={{ backgroundColor: "#001529" }}>
                                <Text style={{ color: "#fff", fontSize: 18 }}>
                                        Welcome, {name || "User"}
                                </Text>
                                <Button
                                        style={{ float: "right", marginTop: "16px" }}
                                        type="primary"
                                        danger
                                        onClick={handleLogout}
                                >
                                        Logout
                                </Button>
                        </Header>

                        <ToDoPage />
                </Layout>
        );
}

import {Link} from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Input,
  Typography,
  theme,
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { forgotPasswordApi } from "../services/api"; 

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function ForgotPassword() {
  const { token } = useToken();
  const screens = useBreakpoint();

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  const onFinish = async (values) => {
    try {
      const res = await forgotPasswordApi(values.email); // 👈 API gọi về backend
      if (res && res.EC === 0) {
        toast.success("📨 Đã gửi yêu cầu đặt lại mật khẩu đến email của bạn");
      } else {
        toast.error(res?.EM || "Gửi yêu cầu thất bại");
      }
    } catch (err) {
      toast.error("❌ Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.header}>
            <Title style={styles.title}>Forgot password?</Title>
            <Text style={styles.text}>
              Enter your email address to receive a password reset link.
            </Text>
          </div>
          <Form
            name="forgot_password"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "Please input your Email!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Reset Password
              </Button>
              <div style={styles.footer}>
                <Text style={styles.text}>
                  Remember your password? <Link to={"/login"}>Login</Link>
                </Text>
              </div>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  );
}

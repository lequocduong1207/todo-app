import { addTaskApi } from '../services/api';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Flex,
  Select,
} from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const { TextArea } = Input;

const AddTask = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ✅ loading state

  const onFinish = async (values) => {
    const task = {
      jobTitle: values.jobTitle,
      level: values.level,
      deadline: values.deadline,
      note: values.note
    };

    try {
      setLoading(true);
      const res = await addTaskApi(task);

      if (res) {
        notification.success({
              message: "Thêm công việc thành công",
        });
        form.resetFields(); 
      }
    } catch (err) {
      notification.error({
        message: "Thêm công việc thất bại",
        description: err.message || "Có lỗi xảy ra khi thêm công việc"
      });
      console.error("Error adding task:", err);
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="jobTitle"
        label="Tên công việc"
        rules={[{ required: true, message: "Không được bỏ trống tên công việc" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="level"
        label="Mức độ"
        rules={[{ required: true, message: "Chọn mức độ" }]}
      >
        <Select placeholder="Chọn mức độ">
          <Select.Option value="Thấp">Thấp</Select.Option>
          <Select.Option value="Vừa">Vừa</Select.Option>
          <Select.Option value="Cao">Cao</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="deadline"
        label="Hạn chót"
        rules={[{ required: true, message: "Chọn hạn chót" }]}
      >
        <DatePicker
          style={{ width: '100%' }}
          format="YYYY-MM-DD"
          disabledDate={(current) => current && current < dayjs().startOf('day')}
          placeholder="Chọn ngày"
        />
      </Form.Item>

      <Form.Item
        name="note"
        label="Ghi chú"
        rules={[{ required: true, message: "Không được bỏ trống ghi chú" }]}
      >
        <TextArea rows={6} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Flex gap="small">
          <Button type="primary" htmlType="submit" loading={loading}>
            {loading ? 'Đang lưu...' : 'Submit'}
          </Button>
          <Button danger onClick={onReset}>
            Reset
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default AddTask;

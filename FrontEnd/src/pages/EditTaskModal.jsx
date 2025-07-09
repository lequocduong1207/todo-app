import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { updateTaskApi } from '../services/api';

const EditTaskModal = ({ visible, task, onClose, onSuccess }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        jobTitle: task.jobTitle,
        note: task.note,
        level: task.level,
        deadline: dayjs(task.deadline, "DD/MM/YYYY"),
      });
    }
  }, [task]);

  const onFinish = async (values) => {
    const updated = {
      task : task,
      values: values,
      deadline: values.deadline.format("DD/MM/YYYY")
    };
    
    const res = await updateTaskApi(updated);
    if (res) onSuccess();
  };

  return (
    <Modal
      open={visible}
      title="Chỉnh sửa công việc"
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="jobTitle" label="Tên công việc" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="note" label="Ghi chú">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="level" label="Mức độ">
          <Select>
            <Select.Option value="Thấp">Thấp</Select.Option>
            <Select.Option value="Vừa">Vừa</Select.Option>
            <Select.Option value="Cao">Cao</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="deadline" label="Hạn chót" rules={[{ required: true }]}>
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;

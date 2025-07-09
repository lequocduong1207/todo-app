import { useEffect, useState } from 'react';
import { Layout, Menu, Button, Table, message, Modal, Grid } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { getTaskApi, deleteTaskApi } from '../services/api';
import AddTask from './AddTask';
import EventCalendar from './EventCelendar';
import EditTaskModal from './EditTaskModal';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const ToDoPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const [dataSource, setDatasource] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const screens = useBreakpoint(); // 👈 dùng để phát hiện kích thước màn hình

  const fetchTasks = async () => {
    const res = await getTaskApi();
    if (res) {
      const formatted = res.map((item) => ({
        ...item,
        createAt: dayjs(item.createAt).format("DD/MM/YYYY"),
        updateAt: dayjs(item.updateAt).format("DD/MM/YYYY"),
        deadline: dayjs(item.deadline).format("DD/MM/YYYY")
      }));
      setDatasource(formatted);
    } else {
      message.error("Lỗi khi tải dữ liệu");
    }
  };

  useEffect(() => {
    if (selectedKey === '2' || selectedKey === '4') fetchTasks();
  }, [selectedKey]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditModalVisible(true);
  };

  const handleDelete = (task) => {
    Modal.confirm({
      title: `Bạn có chắc muốn xoá "${task.jobTitle}"?`,
      onOk: async () => {
        const res = await deleteTaskApi(task._id);
        if (res) {
          message.success('Xoá thành công');
          fetchTasks();
        } else {
          message.error('Xoá thất bại');
        }
      },
    });
  };

  const columns = [
    { title: 'Tên Công Việc', dataIndex: 'jobTitle' },
    { title: 'Ngày Tạo', dataIndex: 'createAt' },
    { title: 'Ngày Sửa', dataIndex: 'updateAt' },
    { title: 'Hạn Chót', dataIndex: 'deadline' },
    { title: 'Ghi Chú', dataIndex: 'note' },
    { title: 'Mức độ', dataIndex: 'level' },
    {
      title: 'Hành động',
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Sửa</Button>{' '}
          <Button danger onClick={() => handleDelete(record)}>Xoá</Button>
        </>
      )
    }
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case '1': return <AddTask />;
      case '2': return (
        <Table
          rowKey="_id"
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: 'max-content' }} // 👈 responsive table scroll ngang
        />
      );
      case '4': return <EventCalendar dataSource={dataSource} />;
      default: return <div>Chọn một mục</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed || !screens.md} // 👈 auto collapse khi nhỏ hơn md
        breakpoint="md"
        onBreakpoint={(broken) => setCollapsed(broken)}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
          items={[
            { key: '1', icon: <UserOutlined />, label: 'Thêm công việc' },
            { key: '2', icon: <VideoCameraOutlined />, label: 'Danh sách công việc' },
            { key: '4', icon: <UploadOutlined />, label: 'Lịch công việc' },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{
          padding: '0 16px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px' }}
          />
          <h3 style={{ marginLeft: 16 }}>Quản lý công việc</h3>
        </Header>

        <Content style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          overflowX: 'auto' // 👈 nếu nội dung quá rộng vẫn cuộn được
        }}>
          {renderContent()}
        </Content>
      </Layout>

      <EditTaskModal
        visible={editModalVisible}
        task={editingTask}
        onClose={() => setEditModalVisible(false)}
        onSuccess={() => {
          setEditModalVisible(false);
          fetchTasks();
        }}
      />
    </Layout>
  );
};

export default ToDoPage;

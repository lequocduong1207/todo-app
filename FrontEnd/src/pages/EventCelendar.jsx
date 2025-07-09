import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Modal, List } from 'antd';
import dayjs from 'dayjs';

const EventCalendar = ({ dataSource }) => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const mapped = dataSource.map(item => ({
      ...item,
      date: dayjs(item.deadline, "DD/MM/YYYY").format("YYYY-MM-DD"),
    }));
    setEvents(mapped);
  }, [dataSource]);

  const getBadgeStatus = (level) => {
    switch (level) {
      case 'Cao': return 'error';
      case 'Vừa': return 'warning';
      case 'Thấp': return 'success';
      default: return 'default';
    }
  };

  const dateCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const matched = events.filter(e => e.date === dateStr);
    return (
      <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
        {matched.map((item, idx) => (
          <li key={idx}>
            <Badge status={getBadgeStatus(item.level)} text={item.jobTitle} />
          </li>
        ))}
      </ul>
    );
  };

  const handleSelect = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const matched = events.filter(e => e.date === dateStr);
    setSelectedDate({ date: value.format("DD/MM/YYYY"), tasks: matched });
    setModalVisible(true);
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <Calendar
        cellRender={dateCellRender}
        onSelect={handleSelect}
        fullscreen={true}
      />

      <Modal
        open={modalVisible}
        title={`📅 Công việc ngày ${selectedDate?.date}`}
        onCancel={() => setModalVisible(false)}
        footer={null}
        centered
        styles={{ body: { maxHeight: '400px', overflowY: 'auto' } }} // ✅ dùng styles.body thay vì bodyStyle
      >
        {selectedDate?.tasks.length > 0 ? (
          <List
            dataSource={selectedDate.tasks}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.jobTitle}
                  description={`📝 Ghi chú: ${item.note || 'Không có'} | 🚦 Mức độ: ${item.level}`}
                />
              </List.Item>
            )}
          />
        ) : (
          <p>Không có công việc nào trong ngày này.</p>
        )}
      </Modal>

    </div>
  );
};

export default EventCalendar;

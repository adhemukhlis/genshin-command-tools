import React, { useState } from 'react';
import axios from 'axios';
import { Button, Avatar, Row, Col, Select, Input, InputNumber } from 'antd';

import './style.css';

export default function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || { server: '', uid: undefined }
  );
  const [primogem, setPrimogem] = useState(999999);
  const SERVER_OPTIONS = [{ value: 'jp1-gc1-36', label: 'Japan 3.6' }];
  const setUserToLocal = () => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  const handleChangeServer = (value) => {
    setUser((prev) => ({ ...prev, server: value }));
  };
  const handleChangeUserUID = (e) => {
    setUser((prev) => ({ ...prev, uid: e.target.value }));
  };
  const runCommand = async (command) =>
    await axios.request({
      url: `https://ps.yuuki.me/api/server/${user.server}/command?uid=18983&cmd=${command}`,
    });
  const addPrimogem = async () => {
    const command = ['g', '223', primogem].join('+');
    return await runCommand(command);
  };
  return (
    <div>
      <h1>Genshin Private Server Command Tools</h1>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <Select
            placeholder="server"
            options={SERVER_OPTIONS}
            value={user.server}
            onChange={handleChangeServer}
          />
        </Col>
        <Col span={8}>
          <Input value={user.uid} onChange={handleChangeUserUID} />
        </Col>
        <Col span={8}>
          <Button onClick={setUserToLocal}>Set</Button>
        </Col>
        <Col span={2}>
          <Avatar
            src={<img src={'/images/Item_Primogem.webp'} alt="avatar" />}
          />
        </Col>
        <Col span={11}>
          <InputNumber value={primogem} onChange={setPrimogem} />
        </Col>
        <Col span={11}>
          <Button onClick={addPrimogem}>Add</Button>
        </Col>
      </Row>
    </div>
  );
}

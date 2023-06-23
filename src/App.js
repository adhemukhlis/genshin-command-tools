import React, { useState } from 'react';
import axios from 'axios';
import { Button, Avatar, Select, Input, InputNumber } from 'antd';

import './style.css';

export default function App() {
  const [user, setUser] = useState({ server: 'jp1-gc1-36', uid: 18983 });
  const [primogem, setPrimogem] = useState(999999);
  const SERVER_OPTIONS = [{ value: 'jp1-gc1-36', label: 'Japan 3.6' }];

  const runCommand = async (command) =>
    await axios.request({
      url: `https://ps.yuuki.me/api/server/${user.server}/command`,
      params: { uid: user.uid, cmd: command },
    });
  const addPrimogem = async () => {
    const command = ['g', '223', primogem].join('+');
    return await runCommand(command);
  };
  return (
    <div>
      <h1>Genshin Private Server Command Tools</h1>
      <Select
        placeholder="server"
        options={SERVER_OPTIONS}
        value={user.server}
      />
      <Input value={user.uid} />
      <Button>Set</Button>

      <Avatar src={<img src={'/images/Item_Primogem.webp'} alt="avatar" />} />
      <InputNumber value={primogem} onChange={setPrimogem} />
      <Button onClick={addPrimogem}>Add</Button>
    </div>
  );
}

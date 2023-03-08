
import axios from 'axios';
import React from 'react'
import Main from './components/Main/Main';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './App.css';


function App() {


  return (
    <div className="App">
      <ConfigProvider locale={zh_CN}>
        <Main />
      </ConfigProvider>
    </div>
  );
}

export default App;

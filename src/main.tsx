//引入初始化css reset、antd
import '@/plugins/reset'
import 'animate.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom';
import App from './App'
// 初始化多语言
import '@/plugins/i18next'
import Provider from '@/components/Provider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Provider>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
)

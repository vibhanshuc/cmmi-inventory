import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header/Header';
import routes from './routes';

export default function App() {
  return (
    <Layout>
      <Router>
        <Header />
        {routes}
      </Router>
    </Layout>
  );
}

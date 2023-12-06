import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = () => {

  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" >
      <Menu.Item key="4">
          <Link to="/">Home Client</Link>
        </Menu.Item>
      <Menu.Item key="1">
          <Link to="">Home Admin</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="products">Product</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="category">Category</Link>
        </Menu.Item>
        
      </Menu>
    </Header>
  );
};

export default AppHeader;

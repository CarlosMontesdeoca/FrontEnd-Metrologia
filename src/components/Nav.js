import React from 'react';

import { ShopFilled, SmileFilled, CarryOutFilled, FileTextFilled, FilePdfFilled, ApiFilled, EditFilled, LogoutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Nav from 'react-bootstrap/Nav';
import '../styles/nav.css';

const { SubMenu } = Menu;

function NavApp() {

  const handleLogOut = () => {
    sessionStorage.clear();
    window.location.reload();
  }

  return (
    <div className='nav'>
      <Menu mode="inline"   style={{ width: 256 }} theme="dark" className='menu-color'>
        <SubMenu key="clients" icon={<ShopFilled />} title="Clientes" className="submenu-color">
          <Menu.Item key="1" className="submenu-color" > <Nav.Link href="clients" > Gestión de Clientes </Nav.Link></Menu.Item>
        </SubMenu>
        <SubMenu key="projects" icon={<CarryOutFilled />} title="Proyectos" className="submenu-color">
          <Menu.Item key="4" className="submenu-color"  > <Nav.Link href="createProjects" > Crear Proyecto </Nav.Link></Menu.Item>
          <Menu.Item key="5" className="submenu-color"  > <Nav.Link href="viewProjects" > Gestion de Proyectos </Nav.Link></Menu.Item>
        </SubMenu>
        <SubMenu key="consts" icon={<SmileFilled />} title="Constantes" className="submenu-color">
          <Menu.Item key="9" className="submenu-color"  > <Nav.Link href="users">  Gestión de Personal </Nav.Link> </Menu.Item>
          <Menu.Item key="10" className="submenu-color"  > <Nav.Link href="certificateItems">  Gestion de Certificados </Nav.Link> </Menu.Item>
        </SubMenu>
        <SubMenu key="ftp" icon={<ApiFilled />} title="FTP" className="submenu-color">
          <Menu.Item key="13" className="submenu-color"  > <Nav.Link >  Politicas de uso </Nav.Link> </Menu.Item>
          <Menu.Item key="14" className="submenu-color"  > <Nav.Link >  Politicas de privacidad </Nav.Link> </Menu.Item>
        </SubMenu>
        <SubMenu key="certs" icon={<FileTextFilled />} title="Hojas de trabajo" className="submenu-color">
          <Menu.Item key="15" className="submenu-color"  > <Nav.Link href="certificatesToReview">  Por Revisar </Nav.Link> </Menu.Item>
          <Menu.Item key="16" className="submenu-color"  > <Nav.Link href="certificatesToRelease">  Por Liberar </Nav.Link> </Menu.Item>
        </SubMenu>
        <SubMenu key="inf" icon={<FilePdfFilled />} title="Informes" className="submenu-color">
          <Menu.Item key="17" className="submenu-color"  > <Nav.Link href="explorer">  Certificados en PDF </Nav.Link> </Menu.Item>
          <Menu.Item key="19" className="submenu-color"  > <Nav.Link href="history">  Resumen de Códigos </Nav.Link> </Menu.Item>
        </SubMenu>
        <SubMenu key="corr" icon={<EditFilled />} title="Correcciones" className="submenu-color">
          <Menu.Item key="20" className="submenu-color"  > <Nav.Link >  Datos de Prueba </Nav.Link> </Menu.Item>
          <Menu.Item key="21" className="submenu-color"  > <Nav.Link >  Combinaciones de Pesas </Nav.Link> </Menu.Item>
        </SubMenu>
        <Menu.Item key="logout" icon= {<LogoutOutlined />} onClick={handleLogOut} className="logout-color" >Log Out</Menu.Item>
      </Menu>
    </div>
  );
}

export default NavApp;
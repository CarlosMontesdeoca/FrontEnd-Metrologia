import React, {useState} from "react";

import { Icon } from '@iconify/react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Modal} from 'antd';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2'
import "../styles/login.css";

import Info from '../components/Info';


async function loginUser(credentials) {
  // return fetch('http://192.168.0.128:85/ApiMetrologia/public/api/login', {
  return fetch('http://127.0.0.1:8000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Login( { setToken } ) {

  const [ modalInfo, setModalInfo ] = useState(false);

  const onFinish = async (values) => {
    const token = await loginUser({
      usr: values.usr,
      password: values.password
    });
    setToken(token);
    if ( !token.token ) {
      return(Swal.fire({
        toast: true,
        icon: 'error',
        text: 'verifique las credenciales de acceso credenciales incorrectas',
        // confirmButtonColor: '#000'
      }));
    } 
  }

  return (
    <div className="Login">
      <div className="login-form">
        <img src="https://media-exp1.licdn.com/dms/image/C4E0BAQH22BVu2qZAZg/company-logo_200_200/0/1544801147523?e=2159024400&v=beta&t=IFjG1_Udjqb7j6bsy0JVFauwyEbzFqHKJKk6DGVsqWY"/>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="usr"
            rules={[
              {
                required: true,
                message: 'Ingrese su Usuario único',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="User Name" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Contraseña requerida',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block>
              Ingresar
            </Button>
          </Form.Item>
        </Form>
      </div>

      <br/>
      <br/>
      <p> Copyright © Precitrol 2022</p>
      <p> Sistema de Metrologia Versión: 2.0.0 <a><Icon onClick={() => setModalInfo(true)} icon="bi:info-square" /></a> </p>


      <Modal
        width = '60%'
        visible={modalInfo}
        confirmLoading={modalInfo}
        onCancel={() => setModalInfo(false)}
        okButtonProps = { {  style : {  display : 'none'  }  } } 
        cancelButtonProps = { {  style : {  display : 'none'  }  } }
      >
        <Info/>
      </Modal>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}


// informacion para comprender el token de acceso e inicio de secion https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
// https://www.youtube.com/watch?v=LKlO8vLvUao
// https://www.youtube.com/watch?v=bZhlX90m1cw
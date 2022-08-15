import React, {useState, useEffect} from "react";

import { Icon } from '@iconify/react';
import { Modal, Form, Input, Select, Row, Col } from 'antd';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

const { Option } = Select;

// const url = 'http://localhost:8000/api/';
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 20 },
};

export default function Register( { token, url } ) {

    const [form] = Form.useForm();

    const [ users, setUsers ] = useState([]);
    const [ metrologists, setMetrologists ] = useState([]);

    const [ modalForm, setModalForm ] = useState(false);

    const getUsers = async () =>{
        const response = await fetch(`${url}users`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
          const userstArray = await response.json();
          setUsers(userstArray);
    }

    const getMetrologist = async () =>{
        const response = await fetch(`${url}metrologists`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
          const metrologistArray = await response.json();
          setMetrologists(metrologistArray);
    }

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        getMetrologist();
    }, []);

    const handleNewUser = async (values) => {
        let route = '';
        const newUser = {
            nom: values.nom.toUpperCase(),
            usr: values.usr,
            carg: values.carg,
            email: values.email.toLowerCase(),
            password: values.password,
            est: 'A'
        }
        if ( values.carg === 'M' ){
            route = 'metrologists';
        } else { 
            route = 'register';
        }

        const data = await fetch(`${url}${route}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
      
            body: JSON.stringify(newUser)
        })
        console.log(newUser)
        if(data.status === 201){
            getUsers();
            getMetrologist();
            return(Swal.fire({
                icon: 'success',
                title: `El Usuario ${newUser.nom}, se ha ingresado al sistema de Metrologia.`,
            }))
        } else {
            return(Swal.fire({
                icon: 'warning',
                title: `Error: ${data.status} \n ${await (data).json()}`,
            }))
        }
    };

    const handleDeleteUsr = ( usr, route ) => {
        Swal.fire({
            icon: 'warning',
            text: `¿Esta seguro que quiere Eliminar el Usuario: ${usr.nom}?`,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    input: 'textarea',
                    inputLabel: '¿Por qué eliminara al usuario?',
                }).then((text) => {
                    const response = fetch(`${url}${route}/${usr.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            est: 'I',
                            com: text.value.toUpperCase()
                        })
                    }).then(() => {
                        Swal.fire('Se ha eliminado el registro exitosamente', response.state, 'success')
                        window.location.reload()
                    })
                })
            }
        })
    }

    return (
        <section className="Register">
            <h2 className="title">  Gestión de Personal </h2>
            
            <button className="btn-ok btn-stl" onClick={() => setModalForm(true)}> Registrar Presonal </button>
            <br/><br/>
            <h4 className="sub-title">  Usuarios del Sistema </h4>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Correo</th>
                        <th>Cargo</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                {
                    users.map((user, index) => (
                    <tr  key={index}>
                        <td> {user.nom} </td>
                        <td> {user.usr} </td>
                        <td> {user.email} </td>
                        <td> {user.rol} </td>
                        <td> 
                            <button className="btn-cancel btn-stl" onClick={() => handleDeleteUsr(user, 'users')}> <Icon icon="eva:person-delete-fill" /> </button>
                        </td>
                    </tr>
                    ))
                }
                </tbody>
            </Table>
            <br/>
            <br/>
            <h4 className="sub-title">  Metrologos del Sistema </h4>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Correo</th>
                        <th>Clave</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                {
                    metrologists.map((met, index) => (
                    <tr  key={index}>
                        <td> {met.nom} </td>
                        <td> {met.usr} </td>
                        <td> {met.email} </td>
                        <td> {met.password} </td>
                        <td> 
                            <button className="btn-cancel btn-stl" onClick={() => handleDeleteUsr(met, 'metrologists')}> <Icon icon="eva:person-delete-fill" /> </button>
                        </td>
                    </tr>
                    ))
                }
                
                </tbody>
            </Table>

            <Modal
                width = '60%'
                visible={modalForm}
                confirmLoading={modalForm}
                onCancel={() => setModalForm(false)}
                okButtonProps = { {  style : {  display : 'none'  }  } } 
                cancelButtonProps = { {  style : {  display : 'none'  }  } } 
            >
                <Form 
                {...layout}
                form={form}
                onFinish={handleNewUser}            
                scrollToFirstError
                >
                <h4 className="sub-title"> Registro de Usuario </h4>
                    <Row>
                        <Col span= {20} >
                            <Form.Item name="nom"   label="Nombre" rules={[{ required: true,  message: 'informacion requerida' }]}>
                                <Input autoComplete="off"/>
                            </Form.Item>
                        </Col>
                        <Col span= {10} >
                            <Form.Item name="usr"   label="Usuario" rules={[{ required: true,  message: 'informacion requerida' }]}>
                                <Input autoComplete="off"/>
                            </Form.Item>
                        </Col>
                        <Col span= {10} >
                            <Form.Item name="carg"   label="Cargo" rules={[{ required: true,  message: 'informacion requerida' }]}>
                                <Select placeholder="seleccione el tipo de industria">
                                    <Option key={1} value="ADMINISTRADOR"> Administrador </Option>
                                    <Option key={2} value="CONTADOR"> Contador </Option>
                                    <Option key={3} value="RESPONSABLE DE CALIDAD"> Responsable de Calidad </Option>
                                    <Option key={4} value="RESPONSABLE TECNICO"> Responsable Tecnico </Option>
                                    <Option key={5} value="AUXILIAR ADMINISTRATIVO"> Auxiliar Administrativo</Option>
                                    <Option key={6} value="M"> Metrologo </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span= {10} >
                            <Form.Item name="email"   label="Email" rules={[{ required: true,  message: 'informacion requerida' }]}>
                                <Input autoComplete="off"/>
                            </Form.Item>
                        </Col>
                        <Col span= {10} >
                            <Form.Item name="password"   label="Contraseña" rules={[{ required: true,  message: 'informacion requerida' }]}>
                                <Input 
                                    type="password"
                                    autoComplete="off"
                                />
                            </Form.Item>
                        </Col>
                        <Col style={{textAlign: "right"}} span= {24}>
                            <Form.Item >
                                <button className="btn-stl btn-ok" htmlType="submit" >
                                    Guardar                      
                                </button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form> 
            </Modal>

        </section>
    );
}

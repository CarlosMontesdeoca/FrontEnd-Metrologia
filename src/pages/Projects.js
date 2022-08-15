import React, {useState, useEffect} from "react";

import { Icon } from '@iconify/react';
import { Modal, Button, Row, Col, DatePicker, Tabs, Badge } from 'antd';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

const { TabPane } = Tabs;

let date = new Date();

function TableCert ({data, url, token, tip}) {
    
    const [ certificates, setCertificates ] = useState([]);
    const [ ID, getID ] = useState('');
    const [ modalCert, setModalCert ] = useState(false);
    const [ isOk, setIsOk ] = useState(false);
    
    const getCerts = async (id) => {
        const response  = await fetch(`${url}projects/${id}/certificates/to-All`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const CertsArray = await response.json();
        if (CertsArray.find(data => data.est !== 'L' && data.est !== 'C')) {
            setIsOk(false);
        } else {
            setIsOk(true);
        }
        setCertificates(CertsArray);
    }

    const handleSeeProject = (id) => {
        getID(id);
        getCerts(id);
        setModalCert(true);
    }
    
    const onCancel = () => {
        setModalCert(false);
        setCertificates([]);
    }

    const handleCancelPr = (cod, route) => {
        Swal.fire({
            icon: 'warning',
            text: `¿Esta seguro que quiere Eliminar el proyecto: ${cod}?`,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    input: 'textarea',
                    inputLabel: 'Message',
                }).then((text) => {
                    const response = fetch(`${url}${route}${cod}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            est: 'C',
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

    const handleRealasePR = (cod) => {
        console.log(date.toISOString().split('T')[0])
        Swal.fire({
            icon: 'warning',
            text: `Solo debe liberar el proyecto cuando se haya facturado \n ¿Esta seguro que decea liberarlo?`,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const response = fetch(`${url}projects/${cod}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ 
                        est: 'L',
                        fact: date.toISOString().split('T')[0] 
                    })
                    
                }).then(() => {
                    Swal.fire('Se ha Liberado el proyecto ', response.state, 'success')
                    window.location.reload()
                })
            }
        })
    }

    if ( data.length === 0 ) {
        return (
            <h1> No hay datos</h1>
        )
    }
    return (
        <section>
            <h4 className="sub-title" onClick={() => console.log(data)}> {tip} </h4>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th> Codigo </th>
                        <th> Cliente </th>
                        <th> Metrologo </th>
                        { tip !== 'Cancelados' ?(
                            <>
                            <th style={{width: "100px"}}> Por Revizar </th>
                            <th style={{width: "100px"}}> Por Aprobar </th>
                            <th style={{width: "100px"}}> Total </th> 
                            </>
                        ) : (
                            <>
                            <th> Razón </th>
                            </>
                        )}
                        
                        <th/>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((prj, index) => (
                    <tr  key={index}>
                        <td> {prj.id} </td>
                        <td> {prj.client} </td>
                        <td> {prj.metrologist} </td>
                        { tip !== 'Cancelados' ?(
                            <>
                            <td> {prj.certificates.rev} </td>
                            <td> {prj.certificates.apr} </td>
                            <td> {prj.certificates.all} </td>
                            </>
                        ) : (
                        <>
                            <td> {prj.com} </td>
                        </>
                        )}
                        <td className="btn-center"> 
                            <Button shape="circle" onClick={ () => handleSeeProject (prj.id) }> 
                                <Icon icon="flat-color-icons:document" />
                            </Button>
                        </td>
                    </tr>
                    ))
                }
                
                </tbody>
            </Table>

            <Modal
                width = '85%'
                visible={modalCert}
                confirmLoading={modalCert}
                onCancel={onCancel}
                okButtonProps = { {  style : {  display : 'none'  }  } }
                cancelButtonProps = { {  style : {  display : 'none'  }  } }  
            >
                <h3 className="title"> Proyecto: {ID} </h3>
                { tip === 'Pendientes' &&(
                    <>
                    <button className="btn-cancel btn-stl" onClick={() => handleCancelPr(ID, 'projects/')}>
                        Cancelar Proyecto <Icon icon="wpf:delete" />
                    </button>
                    { isOk &&(
                        <button className="btn-ok btn-stl" onClick={() => handleRealasePR(ID)}>
                            Liberar <Icon icon="flat-color-icons:inspection" />
                        </button>
                    )}
                    </>
                )}
                <Row>
                    <Col span={14}>
                        <Table striped bordered hover >
                            <thead>
                            <tr>
                                <th>Literal</th>
                                <th>Balanza</th>
                                <th>Creado</th>
                                <th>Estado</th>
                            </tr>
                            </thead>
                            <tbody>
                            {certificates.map ((cert) => (
                            <tr  key={cert.id}>
                                <td> {cert.codPro.slice(-1)} </td>
                                <td> {cert.item.marc} </td>
                                <td> {cert.created_at.substr(0,10)} </td>
                                <td> {cert.est} </td>
                            </tr>
                            ))}
                            
                            </tbody>
                        </Table>
                
                    </Col>
                    <Col span={2}></Col>
                    <Col span={5}>
                        <Table>
                            <thean>
                                <tr>
                                    <th>Estados</th>
                                </tr>
                            </thean>
                            <tbody>
                                <tr>
                                    <th>C</th>
                                    <td>Cancelado</td>
                                </tr>
                                <tr>
                                    <th>P</th>
                                    <td>Pendiente</td>
                                </tr>
                                <tr>
                                    <th>R</th>
                                    <td>Por Revizar</td>
                                </tr>
                                <tr>
                                    <th>A</th>
                                    <td>Por Aprobar</td>
                                </tr>
                                <tr>
                                    <th>L</th>
                                    <td>Liberado</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Modal>
        </section>
    )
}

export default function Projects( { token, url } ) {

    const [ ProP, setProP ] = useState([]);
    const [ ProF, setProF ] = useState([]);
    const [ ProC, setProC ] = useState([]);
    const [ year, setYear ] = useState(date.getFullYear());

    const getProjects = async () =>{
        const response = await fetch(`${url}projects/of-${year}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const projectstArray = await response.json();
        console.log(projectstArray);
        setProP(projectstArray.filter(dt => dt.est === 'P'));
        setProF(projectstArray.filter(dt => dt.est === 'L'));
        setProC(projectstArray.filter(dt => dt.est === 'C'));
        // setProjects(projectstArray);
    }

    useEffect(() => {
        getProjects();
    }, [year]);

    const handleSelectYear = (date, dateString) => {
        setYear(dateString);
    }

    return (
        <section className="Register">
            
            <h2 className='title'>  Proyectos de {year} </h2>
            <br/><br/>
            
            <DatePicker onChange={handleSelectYear} picker="year" />
            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab={<Badge count={ProP.length} offset={[10, 0]}> Pendientes </Badge>} key="1">
                        <TableCert data={ProP} url={url} token={token} tip={'Pendientes'}/>                
                    </TabPane>
                    <TabPane tab={<Badge count={ProF.length} offset={[10, 0]}> Facturados </Badge>} key="2">
                        <TableCert data={ProF} url={url} token={token} tip={'Facturados'}/>                
                    </TabPane>
                    <TabPane tab={<Badge count={ProC.length} offset={[10, 0]}> Cancelados </Badge>} key="3">
                        <TableCert data={ProC} url={url} token={token} tip={'Cancelados'}/>                
                    </TabPane>
                </Tabs>
            </div>

        </section>
    );
}

import React, {useState, useEffect} from 'react';

import { Icon } from '@iconify/react';
import { Modal, Button, Input, Form } from 'antd';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

import CertificateClsCam from '../components/CertificateClsCam';
import CertificateClsII from '../components/CertificateClsII';
import CertificateClsIII from '../components/CertificateClsIII';

const { TextArea } = Input;

export default function CertReview( {token, url } ) {
    let date = new Date();

    const [form] = Form.useForm();

    const [ certificates, setCertertificates ] = useState([]);
    const [ certificate, setCertertificate ] = useState([]);
    const [ projects, setProjects ] = useState([]);
    const [ observations, setObservations ] = useState([]);

    const [ idPr, setIdPr ] = useState('');
    const [ idCert, setIdCert ] = useState('');
    const [ page, setPage ] = useState('');

    const [ modalCertificate, setModalCertificate ] = useState(false);

    const [ user, setUser ] = useState({});

    const getMyUser = async () => {
        const response = await fetch(`${url}user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const myUser = await response.json();
        setUser(myUser);
        if (myUser.error === "token_expired"){
            sessionStorage.clear();
            window.location.reload();
        }
    }

    useEffect(() => {
        getMyUser();
    }, {});

    const getProjects = async () => {
        const data = await fetch(`${url}projects/to-P`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const ProjctArray = await data.json();
        setProjects(ProjctArray);
    }

    const getCertificates = async (id) => {
        const data = await fetch(`${url}projects/${id}/certificates/to-R`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const CertArray = await data.json();
        setCertertificates(CertArray);
    }

    const getCertificate = async (id) => {
        const data = await fetch(`${url}certificate/${id}/calibrate`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const CertArray = await data.json();
        setCertertificate(CertArray);
    }

    const getObservations = async (id) => {
        const data = await fetch(`${url}certificate/${id}/observations`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const obsArray = await data.json();
        setObservations(obsArray);
    }

    useEffect(() => {
        getProjects();
    }, []);

    const handleViewCerts = (pr_id) => {
        setIdPr(pr_id);
        getCertificates(pr_id);
        setModalCertificate(true);
    }

    const handleOpenCert = (id, cls) => {
        setIdCert(id);
        getCertificate(id);
        getObservations(id);
        setModalCertificate(false);
        setPage(cls);
    }

    const onCancel = () => {
        setModalCertificate(false);
        setCertertificates([]);
    }

    const handleRestart = () => {
        setCertertificate([]);
        setPage('');
    }

    const handleAddObservation = async (value) => {
        const newObs = {
            certificate_id: idCert,
            obs: value.obs.toUpperCase()
        }
        const data = await fetch(`${url}observations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newObs)
        })
        getObservations(idCert);
    }

    const handleReview = () => {
        Swal.fire({
            title: '¿Esta seguro que el certificado cumple con la revición respectiva?',
            showCancelButton: true,
            icon: 'warning',
        }).then(async (confirm) => {
            if (confirm.isConfirmed) {
                const data = await fetch(`${url}certificates/${idCert}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        est: 'A',
                        fecRev: date.toISOString().split('T')[0],
                        reviewer_id: user.id
                    })
                })
                Swal.fire('El Certificado esta a la espera de una Aprobación para su liberación', '', 'success')
                .then(() => {
                    window.location.reload()
                })
            }
        })
    }
  
    return(
        <section className="reviwed">

            <h2 className='title'> PROYECTOS POR REVIZAR </h2>
            {/* <button onClick={() => console.log(projects.find(dt => dt.est === ))}> :V </button> */}

            { projects === [] ? (
                <>
                    <h1> No existen registros por el momento</h1>
                </>
            ) : (
                <>{ page === '' ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th> Proyecto </th>
                                <th> Metrologo </th>
                                <th> Cliente </th>
                                <th> Localidad </th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            { projects.map((pr,index) => (
                                <> { pr.certificates.rev > 0 &&(
                                    <tr key={index}>
                                        <td> {pr.id} </td>
                                        <td> {pr.metrologist} </td>
                                        <td> {pr.client} </td>
                                        <td> {pr.loc} </td>
                                        <td className="btn-center">
                                            <Button shape="circle" onClick={() => handleViewCerts(pr.id)}> <Icon icon="flat-color-icons:search" /> </Button>
                                        </td>
                                    </tr>
                                )}</>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <>
                    { page === 'III' || page === 'IIII' &&(
                        <CertificateClsIII data={certificate} user={user}/>
                    )} { page === 'II'&&(
                        <CertificateClsII data={certificate} user={user}/>
                    )} { page === 'CAMIONERA' &&(
                        <CertificateClsCam data={certificate} user={user}/>
                    )}
                    <table className="table table-sm table-bordered">
                        <tbody className="txcenter">
                            <tr>
                                <td colspan="10" className="head" style={{ background: "#00CC66"}}> OBSERVACIONES </td>
                            </tr>
                            { observations.map ((ob, index) => (
                                <tr>
                                    <th> {index + 1} </th>
                                    <td style={{textAlign: "left"}}> {ob.obs} </td>
                                </tr>
                            ))}
                            <tr>
                                <td style={{padding: "0 auto", width: "100px"}}> 
                                <Form form={form} >
                                    <Form.Item >
                                        <Button shape="circle"  htmlType="submit"> 
                                            <Icon icon="flat-color-icons:add-database"/> 
                                        </Button>
                                    </Form.Item>
                                </Form>
                                </td>
                                <td> 
                                <Form form={form} onFinish={handleAddObservation}>
                                    <Form.Item name="obs" rules={[{ required: true }]}>
                                        <TextArea rows={1} placeholder="Text de Obserbación"/> 
                                    </Form.Item>
                                </Form>
                                </td>
                            </tr>
                        </tbody>
                    </table>
    
                    <button className="btn-ok btn-stl"  onClick={handleRestart}> Volver  <Icon icon="flat-color-icons:undo" height="30" /></button>
                    <button className="btn-ok btn-stl"  onClick={handleReview}> Enviar para Aprovar  <Icon icon="flat-color-icons:approval" height="30"/></button>
                    </>
                )} </>
            )}
 
            <Modal
                width = '60%'
                visible={modalCertificate}
                confirmLoading={modalCertificate}
                onCancel={() => onCancel()}
                okButtonProps = { {  style : {  display : 'none'  }  } } 
                cancelButtonProps = { {  style : {  display : 'none'  }  } } 
            >
                <h3>Proyecto: {idPr}</h3>
                
                <Table striped bordered hover >
                    <thead>
                    <tr>
                        <th>Literal</th>
                        <th>Balanza</th>
                        <th>Modelo</th>
                        <th>Clase</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {certificates.map ((cert) => (
                        <tr  key={cert.id}>
                            <td> {cert.codPro.slice(-1)} </td>
                            <td> {cert.item.marc} </td>
                            <td> {cert.item.modl} </td>
                            <td> {cert.item.cls} </td>
                            <td className="btn-center">
                                <Button shape="circle" onClick={() =>handleOpenCert(cert.id, cert.item.cls)}> <Icon icon="flat-color-icons:fine-print" /> </Button>
                            </td>
                        </tr>
                    ))}
                    
                    </tbody>
                </Table>
                
            </Modal> 
        </section>
    );
}

import React, {useState, useEffect} from 'react';

import { Icon } from '@iconify/react';
import { Modal, Button, DatePicker, Form, Row, Col, Input, Select, Radio, InputNumber, Divider } from 'antd';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

const { Option } = Select;
const { RangePicker } = DatePicker;

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 }
};
export default function CertItems( {token, url } ) {
    
    const [form] = Form.useForm();
    const [form1] = Form.useForm();

    const [ weights, setWeights ] = useState([]);
    const [ termin, setTermin ] = useState([]);
    const [ info, setInfo ] = useState([]);

    const [ modalWeights, setModalWeights ] = useState(false);
    const [ modalForm, setModalForm ] = useState(false);

    const [ tip, setTip ] = useState('P');
    const [ stateForm, setStateForm ] = useState(false);

    const getCertificates = async () => {
        const response = await fetch(`${url}certItems`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const certsArray = await response.json();
        setWeights(certsArray[0]);
        setTermin(certsArray[1]);
    };

    const getInfo = async (id) => {
        const response = await fetch(`${url}certItems/${id}/weights`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }) 
        const infoArray = await response.json();
        setInfo(infoArray);
    };

    useEffect(() =>{
        getCertificates();
    }, []);

    const handleNewCert = () => {
        setModalForm(true);
    }

    const handleSaveCertificate = async (values) =>{
        // let aux = null
        // if(values.tip === 'C' || values.tip === 'M'){
        //     aux = 'M1'
        // } 
        // if(values.tip === 'F'){
        //     aux = 'F2'
        // }
        const newCert = {
            tip: values.tip,
            nom: values.nom.toUpperCase(),
            ident: values.ident.toUpperCase(),
            fecCal: `${values.fec[0].format('YYYY-MM-DD')}/${values.fec[1].format('MM-DD')}`,
            fecExp: values.exp.format('YYYY-MM-DD'),
            loc: values.loc
        } 
        const data = await fetch(`${url}certItems`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newCert)
        })
        if ( data.status === 201 ){
            getCertificates();
            setModalForm(false);
            return (Swal.fire({
              icon: 'success',
              text: `El Certificado se a creado exitosamente.`
            })) 
        } else {
            return (Swal.fire({
              icon: 'error',
              text: `${data.status}`
            }))
        }
    }

    const handleSeeCert = ( id ) => {
        setModalWeights(true);
        getInfo(id);
    }

    const handleSelect = (e) => {
        setTip(e.target.value);
    }

    const handleSaveWeight = async (values) => {
        const newcert = { 
            certitems_id: info.id,
            val: values.val,
            uni: values.uni, 
            cant: values.cant, 
            cls: values.cls, 
            emp: values.emp, 
            incEst: values.incEst, 
            incDer: values.incDer, 
            masConv: values.masConv, 
        }
        console.log(newcert)
        const data = await fetch(`${url}weights`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newcert)
        })
        if(data.status === 201){
            getInfo(info.id);
            return(Swal.fire({
                icon: 'success',
                title: 'Sucursal agregada con exito',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3500,
                timerProgressBar: true,
            }))
        } else {
            return(Swal.fire({
                icon: 'warning',
                title: `Error: ${data.status}`,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3500,
            }))
        }
    }

    const onCancel = (n) => {
        if ( n === 1) {
            setModalWeights(false);
        } else {
            setModalForm(false);
        }
    }

    return(
        <section className="cert-item">

            <h2 className='title'> CERTIFICADOS </h2>

            <Row>
                <Col span={18}> <h4 className="sub-title"> Pesas </h4> </Col>
                <Col span={6}> <button className="btn-ok btn-stl" onClick={(handleNewCert)}> Nuevo Certificado </button> </Col>
            </Row>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th> Identificador </th>
                        <th> Nombre </th>
                        <th> Fecha de Certificación </th>
                        <th> Localidad </th>
                        <th> Cantidad </th>
                        <th> Fecha de Renovación </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                { weights.map((weight) =>(
                    <tr>
                        <td> {weight.ident} </td>
                        <td> {weight.nom} </td>
                        <td> {weight.fecCal} </td>
                        <td> {weight.loc} </td>
                        <td> {weight.cant} </td>
                        <td> {weight.fecExp} </td>
                        <td> 
                            <Button shape="circle" onClick={() => handleSeeCert(weight.id)}>
                                <Icon icon="flat-color-icons:database" />  
                            </Button>      
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <br/>
            <h4 className="sub-title"> Termohigrometros </h4>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th> Identificador </th>
                        <th> Nombre </th>
                        <th> Fecha de Certificación </th>
                        <th> Localidad </th>
                        <th> Fecha de Renovación </th>
                    </tr>
                </thead>
                <tbody>
                { termin.map((termin) =>(
                    <tr>
                        <td> {termin.ident} </td>
                        <td> {termin.nom} </td>
                        <td> {termin.fecCal} </td>
                        <td> {termin.loc} </td>
                        <td> {termin.fecExp} </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            
            <Modal
                width = '70%'
                visible={modalForm}
                confirmLoading={modalForm}
                onCancel={() => onCancel(2)}
                okButtonProps = { {  style : {  display : 'none'  }  } } 
                cancelButtonProps = { {  style : {  display : 'none'  }  } } 
            >
                <h3 className="sub-title"> Nuevo Certificado </h3>
                <Form 
                {...layout}
                form={form}
                onFinish={handleSaveCertificate}            
                scrollToFirstError
                >
                <Row>
                    <Radio.Group
                        onChange={handleSelect}
                        value={tip}
                        style={{marginBottom: 20, marginLeft: 20}}
                    >
                        <Radio.Button value="P">Pesas Patrón</Radio.Button>
                        <Radio.Button value="T">Termohigrometros</Radio.Button>
                    </Radio.Group>
                    
                    
                    <Col span={20}>
                    { tip !== 'T' && (
                        <Form.Item name="tip" label="Masa" rules={[{ required: true }]}>
                            <Select placeholder="seleccione el tipo de trabajo">
                                <Option value='C'> Camionera M1 </Option>
                                <Option value='M'> M1 </Option>
                                <Option value='F'> F2 </Option>
                            </Select>
                        </Form.Item>
                    )} 
                    </Col>
                    <Col span={10}>
                        <Form.Item name="nom" label="Nombre" rules={[{ required: true }]}>
                            <Input autoComplete="off"/>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="ident" label="Identificador" rules={[{ required: true }]}>
                            <Input autoComplete="off"/>
                        </Form.Item>
                    </Col>
                    <Col span= {20} >
                        <Form.Item name="fec"   label="Fecha de Calibración" rules={[{ required: true }]}>
                            <RangePicker />
                        </Form.Item>
                    </Col>
                    <Col span= {20} >
                        <Form.Item name="exp"   label="Fecha de Caducidad" rules={[{ required: true }]}>
                            <DatePicker />
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Form.Item name="loc" label="Localidad" rules={[{ required: true }]}>
                            <Select placeholder="seleccione el tipo de industria">
                                <Option value='UIO'> UIO </Option>
                                <Option value='GYE/MTA'> GYE/MTA </Option>
                                <Option value='NAC'></Option>
                            </Select>
                        </Form.Item>
                        <Form.Item >
                            <button className="btn-stl btn-ok" htmlType="submit" >
                                Guardar                      
                            </button>
                        </Form.Item>
                    </Col>
                    
                </Row>
                </Form> 
            </Modal>

            <Modal
                width = '60%'
                visible={modalWeights}
                confirmLoading={modalWeights}
                onCancel={() => onCancel(1)}
                okButtonProps = { {  style : {  display : 'none'  }  } } 
                cancelButtonProps = { {  style : {  display : 'none'  }  } } 
            >
                <h3 className="sub-title"> Certificado: {info.nom} </h3>
                { stateForm ? (
                <div >
                <Form 
                    {...layout}
                    form={form1}
                    onFinish={handleSaveWeight}            
                    scrollToFirstError
                >
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="val" label="Valor" rules={[{ required: true }]}>
                            <Input autoComplete="off"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="uni" label="Unidad" rules={[{ required: true }]}>
                            <Select>
                                <Option value='kg.'> kg. </Option>
                                <Option value='g.'> g. </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span= {8} >
                        <Form.Item name="cant"   label="Cantidad" rules={[{ required: true }]}>
                            <InputNumber/>
                        </Form.Item>
                    </Col>
                    <Col span= {8} >
                        <Form.Item name="cls"   label="Clase" rules={[{ required: true }]}>
                            <Select>
                                <Option value='M1'> M1 </Option>
                                <Option value='F2'> F2 </Option>    
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item name="emp"   label="e.m.p" rules={[{ required: true }]}>
                            <InputNumber/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="incEst"   label="Inc. Estandar" rules={[{ required: true }]}>
                            <InputNumber/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="incDer"   label="Inc. Derivada" rules={[{ required: true }]}>
                            <InputNumber/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="masConv"   label="Mas. Conv." rules={[{ required: true }]}>
                            <InputNumber/>
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Form.Item >
                            <button className="btn-cancel btn-stl" onClick={() =>setStateForm(false)}>
                                Cancelar <Icon icon="icons8:cancel" width="20" />
                            </button>
                            <button className="btn-stl btn-ok" htmlType="submit" >
                                Guardar                      
                            </button>
                        </Form.Item>
                    </Col>
                    
                </Row>
                </Form>
                </div>
                ) : (
                    <button className="btn-ok btn-stl" onClick={() => setStateForm(true)}> Agregar </button>
                )}
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th> Valor </th>
                            <th> U </th>
                            <th> Cantidad </th>
                            <th> Clase </th>
                            <th> e.m.p </th>
                            <th> Inc. Estandar </th>
                            <th> Inc. Deriva </th>
                            <th> Mas. Conv. </th>
                        </tr>
                    </thead>
                    <tbody>
                    {info.certificates &&(
                        info.certificates.map ((cert) => (
                            <tr  key={cert.id}>
                                <td> {cert.val} </td>
                                <td> {cert.uni} </td>
                                <td> {cert.cant} </td>
                                <td> {cert.cls} </td>
                                <td> {cert.emp} </td>
                                <td> {cert.incEst} </td>
                                <td> {cert.incDer} </td>
                                <td> {cert.masConv} </td>
                            </tr>
                        ))
                    )}
                    
                    </tbody>
                </Table> 
            </Modal>
        </section>
    );
}
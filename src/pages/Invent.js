// import React, {useState, useEffect} from 'react';
// import { DeleteOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import '../styles/invent.css';

// import { Table } from 'react-bootstrap';

// import { Modal, Button, Form, Input, InputNumber, Select } from 'antd';

// const { Search } = Input;

// const { Option } = Select;


// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
//   };
  

// const Invent = () => {

//     const [form] = Form.useForm();

//     const [ dumbbells, setDumbbells ] = useState([]);
//     const [ dumbbellInfo, setDumbbellInfo ] = useState([]);

//     const [ dumbbellsSearch, setDumbellsSearch ] = useState([]);
//     const [ findWord, setFindWord ] = useState(""); 
//     // variables para guardar un nuevo contacto
//     const [ _id, set_id ] = useState('');
//     const [ mass, setMass ] = useState(0);
//     const [ unit, setUnit ] = useState('kg');
//     const [ density, setDensity ] = useState(0);
//     const [ material, setMaterial ] = useState('');
//     const [ state, setState ] = useState('');
//     const [ mark, setMark ] = useState('N/A');
//     const [ model, setModel ] = useState('N/A');

//     const getDumbbells = async () => {
//         const response = await fetch(
//             `http://localhost:8080/api/dumbbells`
//         );
//         const dumbbelltArray = await response.json();
//         setDumbbells(dumbbelltArray);
//         setDumbellsSearch(dumbbelltArray);
//         console.log("Item de Calibracion", dumbbells);
//     };
    
//     useEffect(() => {
//         getDumbbells();
//     }, []);

//     const handleSeeDumbb = (id) => {
//         console.log(id);  
//     }

//     const onSearch = value => {
//         const dumbbArray = dumbbells;
//         console.log(value);
//         console.log(dumbbArray);  
//     } 

//     const handleSearch = e => {
//         setFindWord(e.target.value);
//         handleSearchStart(e.target.value.toUpperCase())
//     }

//     const handleSearchStart = (word) => {
//         var dumbbArray = dumbbellsSearch.filter((data) => {
//             if(data._id.toString().includes(word) || data.mass.toString().includes(word) || data.material.toString().includes(word) || data.mark.toString().includes(word) || data.model.toString().includes(word)) {
//                 return data;
//             }
//         });
//         setDumbbells(dumbbArray);
//     }

//     const IdGenerate = () => {
//         let newId = dumbbells[dumbbells.length-1]._id.toString();
//         newId = `PT20-0${dumbbells.length+1}`
//         set_id(newId);
//     }


//     const handleNewDumbb = async ( obj ) => {
//         const data = await axios.post(`http://localhost:8080/api/dumbbells`, obj )
//         .then(() => {
//             getDumbbells();
//         })
//         setModalText('The modal will be closed after two seconds');
//         setModalForm(true);
//         setTimeout(() => {
//             setVisibleForm(false);
//             setModalForm(false);
//         }, 2000);
//     }

//     const handleEditDumbb = (id) => {
//         console.log(id);
//     }

//     const handleDeleteDumbb = (id) => {
//         if(window.confirm('¿Seguro que quiere eliminar los datos del item de calibracion? \n los datos se borraran permanentemente')){
//             axios.put(`http://localhost:8080/api/dumbbells/${id}`)
//             .then(() => {
//                 getDumbbells();
//             })
//             setDumbbellInfo([]);
//         }
//         setVisibleInfo(false);

//     }
//     const [visibleForm, setVisibleForm] = useState(false);
//     const [visibleInfo, setVisibleInfo] = useState(false);
//     const [modalForm, setModalForm] = useState(false);
//     const [modalInfo, setCModalInfo] = useState(false);
//     const [modalText, setModalText] = useState('Content of the modal');

//     const showModal = () => {
//         setVisibleForm(true);
//         let newId = dumbbells[dumbbells.length-1]._id.toString();
//         newId = `PT20-0${dumbbells.length+1}`
//         set_id(newId);
//     };

//     const handleOk = () => {
//         // setModalText('The modal will be closed after two seconds');
//         setModalForm(true);
//         setVisibleInfo(false);
//     };

//     const handleCancel = () => {
//         console.log('Clicked cancel button', density);
//         if ( visibleForm === true ){
//             setVisibleForm(false);
//         } else {
//             setVisibleInfo(false);
//         }
        
//     };    

//     const defineDensity = ( val ) => {
//         switch (val) {
//             case "PLATINO":
//                 return 21400
//             case "NÍQUEL PLATA":
//                 return 8600
//             case "BRONCE":
//                 return 8400
//             case"ACERO INOXIDABLE":
//                 return 7950
//             case "ACERO AL CARBÓN" || "HIERRO FUNDIDO(blanco)":
//                 return 7700
//             case "HIERRO":
//                 return 7800
//             case "HIERRO FUNDIDO(blanco)":
//                 return 7100
//             case "ALUMINIO":
//                 return 2700
//         }
//     }
//     useEffect(() => {
//         defineDensity()
//     }, 0);

//     const onFinish1 = (values: any) => {
        
//         const auxArray = {
//             _id,
//             density: defineDensity(values.material),
//             mark,
//             model
//         }
//         const newDumbbell = { ...values, ...auxArray};
//         console.log(newDumbbell);
//         handleNewDumbb(newDumbbell);
//     };

//     return (
//         <section className="Invent">
//             <h1>INVENTARIO PRECITROL SA</h1>
//                 <Button onClick={showModal}> Nuevo Item </Button>
//                 <br/><br/>

//                 <Search placeholder="Nombre del cliente" onSearch={onSearch} style={{ width: 400, float: 'right' }} onChange={handleSearch} />

          
//                 <Table striped bordered hover >
//                 <thead>
//                     <tr>
//                         <th> ID </th>
//                         <th> Masa(kg). </th>
//                         <th> Material </th>
//                         <th> Densidad </th>
//                         <th> Estado </th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                 {
//                     dumbbells.map((dumbb, index) => (
//                         (dumbb.active) ?(
//                             <tr  key={index}>
//                             <td> {dumbb._id} </td>
//                             <td> {dumbb.mass} </td>
//                             <td> {dumbb.material} </td>
//                             <td> {dumbb.density} </td>
//                             <td> {dumbb.state} </td>
//                             <td> 
//                                 <Button onClick={ () => handleDeleteDumbb(dumbb._id)} icon={<DeleteOutlined />}> </Button>
//                             </td>
//                         </tr>
//                         ) :(
//                             <>
//                             </>
//                         )
                        
//                     ))
//                 }
//                 </tbody>
//             </Table>
//             <br/>
        
//             <Modal
//                 title="Nuevo Contacto"
//                 visible={visibleForm}
//                 onOk={handleNewDumbb}
//                 confirmLoading={modalForm}
//                 onCancel={handleCancel}
//                 okButtonProps = { {  style : {  display : 'none'  }  } } 
//                 cancelButtonProps = { {  style : {  display : 'none'  }  } } 
//             >
//                 <Form
//                     {...layout}
//                     form={form}
//                     onFinish={onFinish1}
//                     scrollToFirstError
//                 >
//                     <Form.Item value={_id} onChange={(e) => set_id(e.target.value.toUpperCase())} label="Identificador" rules={[{ required: true }]}>
//                         <Input value={_id} disabled/>
//                     </Form.Item>
//                     <Form.Item name="mass" label="Masa (kg)." rules={[{ required: true,  message: 'inrese la masa!' }]}>
//                         <InputNumber style={{ width: '100%' }}/>
//                     </Form.Item>
//                     <Form.Item name="material" label="Material" rules={[{ required: true, message: 'Ingrese el material!' }]}>
//                         <Select placeholder="seleccione el material del Item">
//                             <Option value="PLATINO"> Platino </Option>
//                             <Option value="NÍQUEL PLATA"> Níquel Plata</Option>
//                             <Option value="BRONCE"> Bronce</Option>
//                             <Option value="ACERO INOXIDABLE">Acero Inoxidable</Option>
//                             <Option value="ACERO AL CARBÓN"> Acero al Carbon</Option>
//                             <Option value="HIERRO"> Hierro </Option>
//                             <Option value="HIERRO FUNDIDO(blanco)"> Hierro fundido (blanco)</Option>
//                             <Option value="HIERRO FUNDIDO(blanco)"> Hierro fundido (gris)</Option>
//                             <Option value="ALUMINIO">Aluminio</Option>
//                         </Select>
//                     </Form.Item>
//                     <Form.Item name="state" label="Estado" rules={[{ required: true, message: 'Observaciones del estado del Item' }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item label="Marca.">
//                         <Input value='N/A' style={{ width: '100%' }}/>
//                     </Form.Item >      
//                     <Form.Item label="Model">
//                         <Input value='N/A' style={{ width: '100%' }}/>
//                     </Form.Item>
//                     <Form.Item >
//                         <Button type="primary" htmlType="submit">
//                              Guardar
//                         </Button>
//                     </Form.Item>
//                 </Form>
        
//             </Modal>
//             <br/>
//       </section>
//     )
// }

// export default Invent
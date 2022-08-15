import React, {useState, useEffect} from 'react';

import { Icon } from '@iconify/react';
import { Modal, Button, Form, Input, Select, Radio, Row, Col, InputNumber, Pagination } from 'antd';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../styles/clients.css';

const { Search } = Input;
const { Option } = Select;

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

const idustry = [
  { val: "Academico" }, { val: "Alimentos frescos y procesados" }, { val: "Biotecnologia (bioquimica y biomedicina)." }, { val: "Confecciones y calzado" },
  { val: "Construccion" }, { val: "Energia renovable" }, { val: "Ente de control" }, { val: "Farmaceutica " }, { val: "Laboratorios a credicatos" },
  { val: "Metalica" }, { val: "Petroquimica " }, { val: "Productos forestales de madera" }, { val: "Salud" }, { val: "Servicios ambientales" }, { val: "Tecnologia" },
  { val: "Transporte y logistica" }, { val: "Turismo" }, { val: "Vahiculos automotores carrocerias y partes" }, { val: "Otros1" }
]

const Dumtip = [
  { val: "Balanza Analógica" }, { val: "Balanza Colgante Analógica" }, { val: "Balanza Colgante Electrónica" }, { val: "Balanza de Mesa Analógica" }, { val: "Balanza de Mesa Electrónica" }, 
  { val: "Balanza de Piso Analógica" }, { val: "Balanza de Piso Electrónica" }, { val: "Camionera Analógica" }, { val: "Camionera Electrónica" },  
  { val: "Plataforma Analógica" }, { val: "Plataforma Electrónica" }, { val: "Silo" }, { val: "Tolva" }
]

export default function Clients( { token, url } ) {

  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();

  // variables donde se guarrdara las listas de informacion existentes en la abse de datos
  const [ clients, setClients ] = useState([]);
  const [ plants, setPlants ] = useState([]);
  const [ clientInfo, setClientInfo ] = useState([]);
  const [ contacts, setContacts ] = useState([]);
  const [ items, setItems ] = useState([]);
  // variables necesarias apra el buscador
  const [ pages, setPages ] = useState(0);
  // estado para tipo de cliente 
  const [ stateForm, setStateForm ] = useState(false);
  // controladores para el estado de los modales que se manejan en la pagina clientes.
  const [ modalForm, setModalForm ] = useState(false);
  const [ modalPlant, setModalPlant ] = useState(false);
  const [ modalInfo, setModalInfo ] = useState(false);

  const [ ID, setID ] = useState('');

  const getClients = async (pg) => {
    const response = await fetch(`${url}clients?page=${pg}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const clientsArray = await response.json();
    setClients(clientsArray);
    if ( pages === 0 ){
      setPages(clientsArray.last_page * 10);
    }
  };

  const getPlants = async (id) => {
    const response = await fetch(`${url}clients/${id}/plants/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const plantsArray = await response.json();
    setPlants(plantsArray);
  }

  const getContacts = async (id) => {
    const response = await fetch(`${url}plants/${id}/contacts`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const arrayContacts = await response.json();
    setContacts(arrayContacts);
  }

  const getItems = async (id) => {
    const response = await fetch(`${url}plants/${id}/items`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const itemsArray = await response.json();
    setItems(itemsArray) 
  }
  
  useEffect(() => {
    getClients(1);
  }, []);

  const ChangePage = (pageNumber) => {
    getClients(pageNumber);
  };

  //Visualizacion de clientes
  const handleSeeClient = (client) => {
    setClientInfo(client);
    setModalPlant(true);
    getPlants(client.id)
  }
  
  const handleSeeItems = (id) => {
    setStateForm(false);
    setModalInfo(true);
    getItems(id);
    getContacts(id);
    setID(id);
  }

  // busqueda de clientes por labras clave
  //-----------------------------------------------------------------------------------
  const onSearch = async (value) => {
    const response = await fetch(`${url}clients/filter-${value}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const clientsArray = await response.json();
    setClients(clientsArray);
    setPages(clientsArray.last_page * 10);
  } 
  // -------------------------------------------------------------------------------------------------------

  //Creacion de nuevos clientes en la base -----------------------------------------------------------------
  const handleNewClient = async ( obj ) => {
    const data = await fetch(`${url}clients`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(obj)
    })
    console.log(data.status)
    if ( data.status === 201 ){
      getClients();
      setModalForm(false);
      return (Swal.fire({
        icon: 'success',
        text: `El Cliente ${obj.name} se creo con exito. \n ingrese al cliente y agrege sus sucursales`
      })) 
    } else {
      return (Swal.fire({
        icon: 'error',
        text: `Puede que este intentando ingresar un Registro duplicado \n Verifique si los siguientes valores son correctos:\n RUC/CI: ${obj.id}\n Nombre: ${obj.nom}`
      }))
    }
  }
  
  const onFinish = (values) => {
    const newClient = {
      id: values.id,
      nom: values.nom.toUpperCase(),
      ind: values.ind
    }
    handleNewClient(newClient);
  }

  // agregar sucursal
  const handleSavePlant = async (values) => {
    const newPlant = {
      ciu: values.ciu.toUpperCase(),
      cost: values.cost,
      dir: values.dir.toUpperCase(),
      tip: values.tip,
      client_id: clientInfo.id
    }  
    const data = await fetch(`${url}plants`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newPlant)
    })
    if(data.status === 201){
      getPlants(clientInfo.id);
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

  const handleSaveContact = async (values) => {
    const newContact = {
      plant_id: ID,
      nom: values.nom.toUpperCase(),
      telf: values.telf,
      email: values.email.toLowerCase()
    }
    const response = fetch(`${url}contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newContact)
    })
    if((await response).status === 201){
      getContacts(ID);
      return(Swal.fire({
        icon: 'success',
        title: 'Contacto agregada con exito',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
      }))
    } else {
      return(Swal.fire({
        icon: 'warning',
        title: `Error: ${response.status}`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500,
      }))
    }
  }

  // agrega contactos           
  const handleSaveItem = async (values) => {
    if ( values.maxCap < values.usCap ){
      return window.alert('La capacidad maxima no debe ser superada por la capacidad de uso! \n Verifique los valores e intentelo nuevamente.')
    }
    const newItem = {
      plant_id: ID,
      tip: values.tip.toUpperCase(),
      marc: values.marc,
      modl: values.modl,
      ser: values.ser,
      cls: values.cls,
      uni: values.uni,
      maxCap: values.maxCap,
      usCap: values.usCap,
      scal: values.scal
    }
    console.log(newItem)
    const data = await fetch(`${url}items`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

      body: JSON.stringify(newItem)
    })
    if(data.status === 201){
      getItems(ID);
      return(Swal.fire({
        icon: 'success',
        title: 'Balanza agregada con exito',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500,
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

  // funcion para cerrar el modal de informacion del cliente o el formulario.
  const handleCancel = (n) => {
    setStateForm(false);
    if ( n === 1 ){
      setPlants([]);
      setModalForm(false);
      setModalPlant(false);
    } else {
      setModalInfo(false);
    }
  }; 

  // cambia de estado para que el formulario para un cliente aparesca 
  const handleOpenForm = () => {
    if (!stateForm) {
      setStateForm(true);
    } else {
      setStateForm(false);
    }
  }

  return(
    <section className="Clients">
      
      <h2 className='title'>LISTA DE CLIENTES</h2>
      <button className="btn-ok btn-stl" onClick={() =>setModalForm(true)}> Nuevo Cliente </button>

      <Search placeholder="Nombre del cliente" onSearch={onSearch} style={{ width: 400, float: 'right' }}/>

      { clients.data && (
      <><Table striped bordered hover >
        <thead>
          <tr>
            <th> RUC/CI. </th>
            <th> Nombre </th>
            <th> Industria </th>
            <th/>
          </tr>
        </thead>
        <tbody>
        {
          clients.data.map((client, index) => (
            <tr  key={index}>
              <td> {client.id} </td>
              <td> {client.nom} </td>
              <td> {client.ind} </td>
              <td className="btn-center"> 
                <Button shape='circle' onClick={() => handleSeeClient (client)}>
                  <Icon icon="flat-color-icons:factory" />
                </Button> 
              </td>
            </tr>
          ))
        }
        
        </tbody>
      </Table>
      <Pagination defaultCurrent={clients.current_page} total={pages} onChange={ChangePage}/></>
      )}

      <Modal
        width = '50%'
        visible={modalForm}
        confirmLoading={modalForm}
        onCancel={() => handleCancel(1)}
        okButtonProps = { {  style : {  display : 'none'  }  } } 
        cancelButtonProps = { {  style : {  display : 'none'  }  } } 
      >
        <Form 
          {...layout}
          form={form}
          onFinish={onFinish}            
          scrollToFirstError
        >
          <h4 className="sub-title"> Datos Generales </h4>
          <Row>
            <Col span={20}>
              <Form.Item name="id" label="RUC/CI" rules={[{ required: true }]}>
                <Input autoComplete="off"/>
              </Form.Item>
            </Col>
            <Col span= {20} >
              <Form.Item name="nom"   label="Nombre" rules={[{ required: true }]}>
                <Input autoComplete="off"/>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item name="ind" label="Industria" rules={[{ required: true }]}>
                <Select placeholder="seleccione el tipo de industria">
                  { idustry.map ((value, index) => (
                    <Option key={index} value={value.val.toUpperCase()}> {value.val} </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item >
                <button className="btn-ok btn-stl"  align="right" htmlType="submit" >
                  Guardar                      
                </button>
              </Form.Item>
            </Col>  
          </Row>
        </Form> 
      </Modal>
      <Modal
        width = '70%'
        visible={modalPlant}
        confirmLoading={modalPlant}
        onCancel={() => handleCancel(1)}
        okButtonProps = { {  style : {  display : 'none'  }  } } 
        cancelButtonProps = { {  style : {  display : 'none'  }  } } 
      >
        <h2 className='title'>Sucursales de {clientInfo.nom}</h2>
        
          { stateForm ? (
            <div >
              <Form 
                {...layout}
                form={form1}
                onFinish={handleSavePlant}            
                scrollToFirstError
              >
                <Row>
                  <Col span={10}>
                    <Form.Item name="ciu" label="Ciudad" rules={[{ required: true }]}>
                      <Input autoComplete="off"/>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name="cost" label="Centro de costos" rules={[{ required: true }]}>
                      <Select placeholder="donde se facturo">
                        <Option key={1} value="QUITO"> Quito </Option>
                        <Option key={2} value="GUAYAQUIL"> Guayaquil </Option>
                        <Option key={3} value="MANTA"> Manta </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name="dir" label="Direccón" rules={[{ required: true }]}>
                      <Input autoComplete="off"/>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name="tip" label="Tipo" rules={[{ required: true }]}>
                      <Select placeholder="">tipo
                        <Option key={1} value="M"> Matriz </Option>
                        <Option key={2} value="S"> Sucursal </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item >
                  <button className="btn-cancel btn-stl" onClick={handleOpenForm}>
                    Cancelar <Icon icon="icons8:cancel" width="20" />
                  </button>
                  <button className="btn-ok btn-stl" htmlType="submit">
                    Guardar <Icon icon="entypo:save" wigth="20" />                 
                  </button>
                </Form.Item>
            
              </Form>
            </div>
          ) : (
            // 
            <button className="btn-ok btn-stl" onClick={handleOpenForm}> 
              Agregar sucursal
            </button>
          )}
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>Ciudad</th>
                <th>Centro de costos</th>
                <th>Direccion</th>
                <th>Tipo</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {plants.map ((plant) => (
                <tr  key={plant.id}>
                  <td> {plant.ciu} </td>
                  <td> {plant.cost} </td>
                  <td> {plant.dir} </td>
                  <td> {plant.tip} </td>
                  <td className="btn-center">
                    <Button shape="circle" onClick={ () => handleSeeItems (plant.id) }> <Icon icon="flat-color-icons:search" /> </Button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </Table>
          
      </Modal>
      
      <Modal
        width = '80%'
        visible={modalInfo}
        confirmLoading={modalInfo}
        onCancel={() => handleCancel(2)}
        okButtonProps = { {  style : {  display : 'none'  }  } } 
        cancelButtonProps = { {  style : {  display : 'none'  }  } } 
      >
        <h3 className="title">Información de Planta</h3>
        
         { stateForm ? (
          <div >
            <h4 className="sub-title"> Nuevo Equipo </h4>
            <Form 
              {...layout}
              form={form2}
              onFinish={handleSaveItem}            
              scrollToFirstError
            >
              <Row>
                <Col span={16}>
                  <Form.Item name="tip" label="Descripción" rules={[{ required: true }]}>
                    <Select placeholder="seleccione la descripción de la balanza">
                      { Dumtip.map ((value) => (
                        <Option value={value.val.toUpperCase()}> {value.val} </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name="marc" label="Marca">
                    <Input/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name="modl" label="Modelo" >
                    <Input autoComplete="off"/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name="ser" label="N° Serie" >
                    <Input autoComplete="off"/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name="cls" label="Clase">
                    <Select placeholder="">Cargo
                      <Option value="II"> II (Dos) </Option>
                      <Option value="III"> III (Tres) </Option>
                      <Option value="IIII"> IIII ( Cuatro) </Option>
                      <Option value="CAM"> Camionera </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span ={16}>
                  <Form.Item name="uni" label ="Unidad de Peso." rules={[{ required: true }]}>
                    <Radio.Group>
                      <Radio value='g'> g. </Radio>
                      <Radio value='kg'> kg. </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name="maxCap" label="Cap. Max." rules={[{ required: true }]}>
                    <InputNumber />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name="usCap" label="Cap. Uso" rules={[{ required: true }]}>
                    <InputNumber />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name="scal" label="Escala" rules={[{ required: true }]}>
                    <InputNumber />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item >
                  <button className="btn-cancel btn-stl" onClick={handleOpenForm}>
                    Cancelar <Icon icon="icons8:cancel" width="20" />
                  </button>
                  <button className="btn-ok btn-stl" htmlType="submit">
                    Guardar <Icon icon="entypo:save" wigth="20" />                 
                  </button>
              </Form.Item>
          
            </Form>
          </div>
        ) : (<>
          <h4 className="sub-title"> Contactos </h4>
          <Table striped bordered hover>
            <thead >
              <tr>
                <th> Nombre </th>
                <th> Teléfono </th>
                <th> Correo </th>
                <th/>
              </tr>
            </thead>
            <tbody>
              { contacts.map ((cnt, index) => (
              <tr key={index}>
                <td> {cnt.nom} </td>
                <td> {cnt.telf} </td>
                <td> {cnt.email} </td>
                <td/>
              </tr>
              ))}
              <tr>
                <td> 
                  <Form form={form3} >
                    <Form.Item name="nom" rules={[{required: true}]}>
                      <Input autoComplete='off'/>
                    </Form.Item>
                  </Form>
                </td>
                <td> 
                  <Form form={form3} >
                    <Form.Item name="telf" rules={[{required: true}]}>
                      <Input autoComplete='off'/>
                    </Form.Item>
                  </Form>
                </td>
                <td> 
                  <Form form={form3} >
                    <Form.Item name="email" rules={[{required: true}]}>
                      <Input autoComplete='off'/>
                    </Form.Item>
                  </Form>
                </td>
                <td className="btn-center"> 
                  <Form form={form3}  onFinish={handleSaveContact}>
                    <Form.Item>
                      <Button shape="circle"  htmlType="submit"> <Icon icon="flat-color-icons:add-database"/>  </Button>
                    </Form.Item>
                  </Form>
                </td>
              </tr>
            </tbody>
          </Table>
          <h4 className="sub-title"> Lista de Equipos </h4>
          <button className="btn-ok btn-stl" onClick={handleOpenForm}> 
            Agregar Equipo
          </button></>
        )}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Serie</th>
              <th>Clase</th>
              <th>Cap. max.</th>
              <th>Cap. uso</th>
              <th>Escala</th>
            </tr>
          </thead>
          <tbody>
            {  items && (
              items.map((item, index) => (
                <tr  key={index}>
                  <td> {item.tip} </td>
                  <td> {item.marc} </td>
                  <td> {item.modl} </td>
                  <td> {item.ser} </td>
                  <td> {item.cls} </td>
                  <td> {item.maxCap} {item.uni} </td>
                  <td> {item.usCap} {item.uni} </td>
                  <td> {item.scal} {item.uni} </td>
                  
                </tr>
              )) 
            )}
          </tbody>
        </Table>
      </Modal> 
      
    </section>
  );
}
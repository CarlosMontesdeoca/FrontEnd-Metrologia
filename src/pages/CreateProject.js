import React, {useState, useEffect} from 'react';

import { Icon } from '@iconify/react';
import { Input, Col, Row } from 'antd';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Items from '../components/Items';

const { Search } = Input;

export default function CreateProject( { token, url } ) {
  let date = new Date();

  const [ clients, setClients ] = useState({data: []});
  const [ plants, setPlants ] = useState([]);
  const [ contacts, setContacts ] = useState([]);
  const [ metrl, setMetrl ] = useState([]);
  const [ idPro, setIdPro ] = useState('');

  const [ listPlant, setListPlant ] = useState(false);
  const [ listContact, setListContact ] = useState(false);
  const [ listMet, setListMet ] = useState(false);

  const [ stage, setStage ] = useState(0);

  const findClients = async (value) => {
    const response = await fetch(`${url}clients/filter-${value}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const clientsArray = await response.json();
    setClients(clientsArray);
  }

  const getPlants = async (id) => {
    const response = await fetch(`${url}clients/${id}/plants/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const plantsArray = await response.json();
    setPlants(plantsArray);
    console.log(plantsArray)
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

  const getMetrologists = async () => {
    const response = await fetch(`${url}metrologists/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const metArray = await response.json();
    setMetrl(metArray); 
  }

  const getCodPro = async () => {
    const response = await fetch(`${url}projects/date/${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const codPro = await response.json();
    setIdPro(`${String(date.getFullYear()).substring(2,4)}${String(date.getMonth() + 1).padStart(2, '0')}${String(codPro).padStart(2, '0')}`);
  } 

  useEffect(() => {
    getCodPro();
  }, []);

  const handleSelectClient = (cli) => {
    setListPlant(true);
    getPlants(cli.id);
    setClients({data: [cli]});
  }

  const handleSelectPlant = (plant) => {
    setListContact(true);
    getContacts(plant.id);
    getMetrologists();
    setPlants([plant]);
  }

  const handleSelectContact = (contact) => {
    setListMet(true);
    setContacts([contact]);
  }

  const handleCreateProject = (met) => {
    Swal.fire({
      title: '¿Los datos del Proyecto son correctos?',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      html: `<ul style={{ listStyle: "none"}}> 
              <li>  ID:  ${idPro} </li> 
              <li>  Cliente: ${clients.data[0].nom} </li>
              <li>  Dirección: ${plants[0].ciu} ${plants[0].dir} </li>
              <li>  Persona de Contacto : ${contacts[0].nom} </li>
              <li>  Metrologo: ${met.nom} </li>
            </ul>`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const newProject = {
          id: idPro,
          contact_id: contacts[0].id,
          plant_id: plants[0].id,
          metrologist_id: met.id
        }
        handleSaveProject(newProject);
      }
    })
  }

  const handleSaveProject = async (obj) => {
    const response = await fetch(`${url}projects/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(obj)
    })
    if ( response.status === 201 ) {
      setStage(1);
      Swal.fire('Proyecto creado con exito!', '', 'success');
    } else {
      Swal.fire(`Error: ${response.status}`, '', 'error');
    }
  }

  return (
    <section className="CreateProject">
      { stage === 0 ? (
        <>
        <h2 className="title"> Creación de Proyectos </h2>

        <Row>
          <Col span={10}>
            <h4 className="sub-title"> Buscar un Cliente </h4>
          </Col>
          <Col span={14}>
          <Search placeholder="Busque un Cliente" onSearch={findClients} style={{ width: 400, float: 'right' }}/>
          </Col>
        </Row>
        { clients.data.length !== 0 ? (
        <Table striped bordered hover >
          <thead>
            <tr>
              <th> RUC/CI. </th>
              <th> Nombre </th>
              <th> Industria </th>
              <th/>
            </tr>
          </thead>
          <tbody>
            { clients.data.map((client, index) => (
              <tr  key={index}>
                <td> {client.id} </td>
                <td> {client.nom} </td>
                <td> {client.ind} </td>
                <td className="btn-center"> 
                  <button className="btn-stl btn-ok" onClick={() => handleSelectClient (client)}>
                    <Icon icon="material-symbols:add-business" height="20"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        ) : (
        <h2> No se encontraron coincidencias.. </h2>
        )}
        
        { listPlant && (
          <>
          <br/>
          <h4 className="sub-title"> Selecciones los datos de la sucursal. </h4>
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>Ciudad</th>
                <th>Dirección</th>
                <th>Tipo</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              { plants.map((plant) => (
                <tr  key={plant.id}>
                  <td> {plant.ciu} </td>
                  <td> {plant.dir} </td>
                  <td> {plant.tip} </td>
                  <td className="btn-center">
                    <button className="btn-stl btn-ok" onClick={() => handleSelectPlant (plant)}>
                      <Icon icon="material-symbols:add-business" height="20" />
                    </button> 
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </>
        )}

        { listContact && (
          <>
          <br/>
          <h4 className="sub-title"> Selecciones un Contacto </h4>
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              { contacts.map((con) => (
                <tr  key={con.id}>
                  <td> {con.nom} </td>
                  <td> {con.telf} </td>
                  <td> {con.email} </td>
                  <td className="btn-center">
                    <button className="btn-stl btn-ok" onClick={() => handleSelectContact (con)}>
                      <Icon icon="material-symbols:add-business" height="20" />
                    </button> 
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </>
        )}
        { listMet && (
          <>
          <br/>
          <h4 className="sub-title"> Asigne un Metrologo al Proyecto. </h4>
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              { metrl.map ((metr, index) => (
                <tr key={index}>
                  <td> {metr.nom} </td>
                  <td> {metr.email} </td>
                  <td className="btn-center">
                    <button className="btn-stl btn-ok" onClick={() => handleCreateProject (metr)}>
                      <Icon icon="entypo:save" wigth="30" />
                    </button> 
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          </>
        )}
        </>
      ) : (
        <Items client={clients.data[0].nom} plant={plants[0].id} project={idPro} url={url} token={token}/>
      )}
    </section>
  );
};
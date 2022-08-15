import React, {useState, useEffect} from 'react';

import { Checkbox, Form, Button } from 'antd';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Items({project, client, plant, url, token }) {

    const [ items, setItems ] = useState([]);

    const getItems = async () => {
        const response = await fetch(`${url}plants/${plant}/items`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const itemsArray = await response.json();
      setItems(itemsArray);      
    }
    
    useEffect(() => {
        getItems();
    }, []);

    const saveCertificate = async (obj) => {
        const response = await fetch(`${url}certificates`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(obj)
        })
        if( response.status === 201 ){
            return (Swal.fire({
                icon: 'success',
                text: `Certificados generados con exito`
            }),
            window.reload("http://localhost:3000/viewProjects")) 
        } else {
            return (Swal.fire({
                icon: 'warning',
                text: `error ${response.status}`
            })) 
        }
    }

    const handleSendMessage = async (codPro) => {
        const response = await fetch(`${url}mail/${codPro}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if( response.status !== 202 ){
            return (Swal.fire({
                icon: 'warning',
                text: `error: ${response.status} \n Nose pudo enviar el correo de notificación`,
                toast: true,
                showConfirmButton: false,
                timer: 3500,
                timerProgressBar: true,
            })) 
        }
    }

    const selectItems = (values) => {
        const request = {
            project_id: project,
            data: values.items
        } 
        saveCertificate(request);
        handleSendMessage(project);
    }

    return (
    <>
        <h4 className="sub-title"> Selecciones las balanzas a calibrar de {client} </h4>

        <Form
            name="balance-list"
            onFinish={selectItems}
        >
            <Button className="btn-stl btn-ok" htmlType="submit">
                Agregar
            </Button>
            <Form.Item name="items">
                <Checkbox.Group>
                    <Table>
                        <thead>
                            <tr>
                                <th> ° </th>
                                <th> Descripción</th>
                                <th> Marca </th>
                                <th> Modelo </th>
                                <th> N° Serie</th>
                                <th> Cap. Maxima</th>
                                <th> Cap. Uso</th>
                                <th> Escala </th> 
                            </tr>
                        </thead>
                        <tbody>
                            { items.map ((item, index) => (
                            <tr key={index}>
                                <td> <Checkbox value={item.id} /> </td>
                                <td> {item.tip} </td>
                                <td> {item.marc} </td>
                                <td> {item.modl} </td>
                                <td> {item.ser} </td>
                                <td> {item.maxCap} {item.uni}. </td>
                                <td> {item.scal} {item.uni}. </td> 
                                <td> {item.usCap} {item.uni}. </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </Checkbox.Group>
            </Form.Item>
        </Form> 
    </>
  );
}

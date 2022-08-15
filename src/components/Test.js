import React, {useState, useEffect} from 'react';

import { Checkbox, Form, Button, Table } from 'antd';
// import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Items({project, client, plant, url, token }) {

    const [ items, setItems ] = useState([]);
    const colums = [
        { title: 'Descripción', dataIndex: 'tip' },
        { title: 'Marca', dataIndex: 'marc' },
        { title: 'Modelo', dataIndex: 'modl' },
        { title: 'N° Serie', dataIndex: 'ser' },
        { title: 'Cap. Maxima', dataIndex: 'maxCap' },
        { title: 'Cap. Uso', dataIndex: 'usCap' },
        { title: 'Escala', dataIndex: 'scal' }
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
          Table.SELECTION_ALL,
          Table.SELECTION_INVERT,
          Table.SELECTION_NONE,
          {
            key: 'odd',
            text: 'Select Odd Row',
            onSelect: (changableRowKeys) => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                if (index % 2 !== 0) {
                  return false;
                }
    
                return true;
              });
              setSelectedRowKeys(newSelectedRowKeys);
            },
          },
          {
            key: 'even',
            text: 'Select Even Row',
            onSelect: (changableRowKeys) => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                if (index % 2 !== 0) {
                  return true;
                }
    
                return false;
              });
              setSelectedRowKeys(newSelectedRowKeys);
            },
          },
        ],
      };

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
        console.log(obj)
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
            })) 
        } else {
            return (Swal.fire({
                icon: 'warning',
                text: `error ${response.status}`
            })) 
        }
    }

    const selectItems = (values) => {
        const request = {
            project_id: project,
            data: values.items
        } 
        saveCertificate(request);
    }

    return (
    <>
        <h4 className="sub-title"> Selecciones las balanzas a calibrar de {client} </h4>

        <Table rowSelection={rowSelection} columns={colums} dataSource={items} />

         {/* <Form
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
        </Form>  */}
    </>
  );
}

// const Demo = () => {
//   const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

//   return (
//     <div>
//       <Radio.Group
//         onChange={({ target: { value } }) => {
//           setSelectionType(value);
//         }}
//         value={selectionType}
//       >
//         <Radio value="checkbox">Checkbox</Radio>
//         <Radio value="radio">radio</Radio>
//       </Radio.Group>

//       <Divider />

//       <Table
//         rowSelection={{
//           type: selectionType,
//           ...rowSelection,
//         }}
//         columns={columns}
//         dataSource={data}
//       />
//     </div>
//   );
// };
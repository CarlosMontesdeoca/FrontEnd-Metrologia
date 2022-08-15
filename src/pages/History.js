import React, {useState, useEffect} from "react";

import { DatePicker } from 'antd';
import { Table } from 'react-bootstrap';

export default function History ( { token, url } ) {

    let date = new Date();

    const [ history, setHistory ] = useState([]);
    const [ year, setYear ] = useState(date.getFullYear());

    const getHistory = async (yr) =>{
        const response = await fetch(`${url}history/to-${yr}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const historyArray = await response.json();
        setHistory(historyArray);
    }

    useEffect(() => {
        getHistory(2022);
    }, []);

    const handleSelectYear = (date, dateString) => {
        setYear(dateString);
        getHistory(dateString);
    }

    return (
        <section className="Register">
            <br/>
            <h2 className='title'>  Resumen de Código, Año {year} </h2>
            <br/>
            
            <DatePicker onChange={handleSelectYear} picker="year" />
            { history.length === 0 ?(
                <h1> No hay Datos</h1>
            ) : (
                <>
                <Table striped bordered hover >
                    <thead>
                        <th> N° </th>
                        <th> Fecha </th>
                        <th> Código </th>
                        <th title="Fecha de Calibración"> Fec Cal. </th>
                        <th> Cliente </th>
                        <th> Metrólogo </th>
                        <th title="Total de Balanzas Tipo III(Camionera)"> Camioneras </th>
                        <th title="Total de Balanzas Tipo II, III, IIII"> Balanzas </th>
                        <th title="Fecha de Próxima Calibración"> Fec Prox. </th>
                        <th title="Industria del Cliente" style={{width: "200px"}}> Tipo </th>
                    </thead>
                    <tbody>
                    { history.map ((data, index) => (
                        <tr key={index} >
                            <th> {index + 1}</th>
                            <td> {data.created_at.slice(0,10)} </td>
                            <td> {data.id} </td>
                            <td> -- </td>
                            <td> {data.client} </td>
                            <td> {data.metrologist} </td>
                            <td> -- </td>
                            <td> -- </td>
                            <td> -- </td>
                            <td> {data.industry} </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </>
            )}
            {/* <div className="card-container">
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
            </div> */}

        </section>
    );

    return (
        <section className="history">
            <br/>            
            <h2 className="title"> RESUMEN DE CÓDIGO {year} </h2>
            
            <DatePicker onChange={handleSelectYear} picker="year" />
            <br/>
            <Table striped bordered hover>
                <thead>
                    <th> N° </th>
                    <th> Fecha </th>
                    <th> Código </th>
                    <th> Fecha Cal. </th>
                    <th> Cliente </th>
                    <th> Metrólogo </th>
                    <th> Camioneras </th>
                    <th> Balanzas </th>
                    <th> Fecha Prox. </th>
                    <th> Tipo </th>
                </thead>
                <tbody>

                </tbody>
            </Table>
        </section>
    );
}
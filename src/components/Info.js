import React from 'react';

export default function Info() {

    return(
        <div>
            <h2 className="title"> Sistema de Metrología </h2> 
            <h4 className="sub-title"> Versión: 2.0.0 </h4>

            <p style={{ marginLeft: '25px', fontSize: '20px'}}> 
                <b> Lanzamiento: </b> 28 de Agosto del 2022 
            </p>

            <p style={{ marginLeft: '25px', fontSize: '20px'}}> 
                <b> Caracteristicas: </b> 
                <br/> 
            </p>

            <p style={{ marginLeft: '25px', fontSize: '20px'}}> 
                <b> Cambios: </b> 
                <br/> 
                <ul> 
                    <li> Rediseño grafico del Sistema. </li>
                    <li> Cambio de Motor de Base de Datos (MySQL). </li>
                    <li> Rediseño y Restructuración de Base de Datos. </li>
                    <li> Integración del nuevo formato de Certificados V11. </li>
                    <li> Separación de microservicios:  
                        <ul>
                            <ol> - Nuevo Motor de Calculo. </ol>
                            <ol> - Generador de Certificados. </ol>
                            <ol> - Codificación de Front-End. </ol>
                            <ol> - Codificación de Back-end. </ol>
                        </ul>
                    </li>
                    
                </ul>
            </p>

            {/* <p style={{ marginLeft: '25px', fontSize: '20px'}}> 
                <b> Correcciones: </b> 
                <br/> 
                <ul> 
                    <li></li>
                </ul>
            </p> */}
        </div>
    )
}
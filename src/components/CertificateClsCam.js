import React from 'react';

import { QuestionCircleFilled } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import '../styles/Certificate.css';

export default function CertificateClsCam({data, user}) {

    // const [ validate, setValidate ] = useState(false);
  
    const cfr = '"Evaluación de datos de medición \n- El papel de la incertidumbre de medidas en la evaluación de la conformidad" \n JCGM 106:version vigente en literal 7.4 para intervalos de tolerancia bilaterales con FDP normales';
    if ( data.certificate ){
        return(
            <section className="cam">
                <h3 class="text-center"> HOJA DE CÁLCULO PARA BALANZA CLASE III (CAMIONERA)</h3>
                <br/>
    
                <table className="table table-sm table-bordered ">
                    <tbody>
                        <tr>
                            <th colspan="4" className="bg-primary head"> HOJA DE CALCULO </th>
                        </tr>
                        <tr>
                            <th> CERTIFICADO: </th>
                            <td> {data.certificate.codPro} </td>
                            <th> FECHA DE CALIBRACIÓN: </th>
                            <td> {data.certificate.fecCal} </td>
                        </tr>
                        <tr>
                            <th colspan="4" className="bg-primary head"> IDENTIFICACIÓN DEL CLIENTE</th>
                        </tr>
                        <tr>
                            <th>NOMBRE:</th>
                            <td> {data.item.plant.client.nom} </td>
                            <th>RUC:</th>
                            <td> {data.item.plant.client.id} </td>
                        </tr>
                        <tr>
                            <th>DIRECCIÓN:</th>
                            <td> {data.item.plant.dir} </td>
                            <th>LUGAR DE CALIBRACIÓN:</th>
                            <td> {data.certificate.luCal} </td>
                        </tr>
                        <tr>
                            <th>CIUDAD:</th>
                            <td> {data.item.plant.ciu} </td>
                            <th>SOLICITADO POR:</th>
                            <td> {data.contact.nom} </td>
                        </tr>
                        <tr>
                            <th>TELÉFONO:</th>
                            <td> {data.contact.telf} </td>
                            <th>RECIBIDO POR:</th>
                            <td><span>--Data!--</span></td>
                        </tr>
                        <tr>
                            <th colspan="4" className="bg-primary head">IDENTIFICACIÓN DE LA BALANZA</th>
                        </tr>
                        <tr>
                            <th>DESCRIPCIÓN:</th>
                            <td> {data.item.tip} </td>
                            <th>IDENTIFICACIÓN:</th>
                            <td> {data.item.tip} </td>
                        </tr>
                        <tr>
                            <th>MARCA:</th>
                            <td> {data.item.marc} </td>
                            <th>MODELO:</th>
                            <td> {data.item.modl} </td>
                        </tr>
                        <tr>
                            <th>SERIE:</th>
                            <td> {data.item.ser} </td>
                            <th>CAPACIDAD MÁXIMA:</th>
                            <td> {data.item.maxCap} </td>
                        </tr>
                        <tr>
                            <th>UBICACIÓN:</th>
                            <td> {data.certificate.ubi} </td>
                            <th>CAPACIDAD USO:</th>
                            <td> {data.item.usCap} </td>
                        </tr>
                        <tr>
                            <th>CAPACIDAD CALIBRADA:</th>
                            <td><span>--Data!--</span></td>
                            <td colspan="2" style={{background: "#bebcbc"}}></td>
                        </tr>
    
                        <tr>
                            <th colspan="4" className="bg-primary head">CONDICIONES AMBIENTALES</th>
                        </tr>
                        <tr>
                            <th>TEMPERATURA INICIAL:</th>
                            <td> {data.environment.tempIn} </td>
                            <th>HUMEDAD RELATIVA INICIAL:</th>
                            <td> {data.environment.humIn} </td>
                        </tr>
                        <tr>
                            <th>TEMPERATURA FINAL:</th>
                            <td> {data.environment.tempFn} </td>
                            <th>HUMEDAD RELATIVA FINAL:</th>
                            <td> {data.environment.humFn} </td>
                        </tr>
                    </tbody>
                </table>
                <br/>{/*---------------------------------------------------------------------------------*/}
                <table className="table table-sm table-bordered">
                    <tbody>
                        <tr>
                            <th colspan="4" className="bg-primary head">CERTIFICADO UTILIZADOS</th>
                        </tr>
                        <tr className="txcenter">
                            <th>CERTIFICADO</th>
                            <th>FECHA</th>
                        </tr>
                        <tr className="txcenter">
                            <td>--Data!--</td>
                            <td>--Data!--</td>
                        </tr>
                    </tbody>
                </table>
                <br/>{/*---------------------------------------------------------------------------------*/}
                <div className="row">
                    <div className="col">
                        <table className="table table-sm table-bordered">
                            <tbody className="txcenter">
                                <tr>
                                    <th colspan="3" className="bg-primary head">DIVISIÓN DE ESCALA</th>
                                </tr>
                                <tr>
                                    <th title="Capacidad de Uso en kilogramos">Cap. Uso [kg]</th>
                                    <th title="Divición de Escala"> d [U] </th>
                                    <th title="Divición de Escala Certificable"> e [U] </th>
                                </tr>
                                <tr>
                                    <td>--Data!--</td>
                                    <td>--Data!--</td>
                                    <td>--Data!--</td>
                                </tr>
                                <tr>
                                    <th>CLASE:</th>
                                    <td colspan="2"> III (Camionera) </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col">
                        <table className="table table-sm table-bordered">
                            <tbody className="txcenter">
                                <tr>
                                    <th colspan="3" className="bg-primary head">PUNTOS HASTA CAMBIO DEL ERROR</th>
                                </tr>
                                <tr title="Basado en la O.I.R.M. (R 76-1)">
                                    <th>±1e</th>
                                    <th>±2e</th>
                                    <th>±3e</th>
                                </tr>
                                <tr>
                                    <td><span>--Data!--</span></td>
                                    <td><span>--Data!--</span></td>
                                    <td><span>--Data!--</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* <button onClick={() => setValidate(true)}> Validar</button> */}
                <br/>{/*-------------------------------------------------------------------------*/}
                {/* { validate && ( */}
                    <>
                    <table className="table table-bordered table-sm">
                    <tbody className="txcenter">
                        <tr>
                            <th colspan="10" className="bg-primary head">PRUEBA DE EXCENTRICIDAD (Exc.)</th>
                        </tr>
                        <tr>
                            <td rowspan="2">
                                <b>Carga [U]: <span style={{color: "#11801e"}}>--Data!--</span> </b>
                            </td>
                            <td rowspan="2"><b>Entrada</b></td>
                            <td rowspan="2"><b>Retorno</b></td>
                            <td title="Excentricidad Máxima"><b>Exct. máx.</b></td>
                            <td title="Error Máximo Permitido"><b>e.m.p</b></td>
                            <td title="Evaluación de la Prueba"><b>cumplimiento</b></td>
                        </tr>
                        <tr>
                            <td rowspan="2"> --Data!-- </td>
                            <td rowspan="2"> --Data!-- </td>
                            <td rowspan="2"> --Data!-- </td>
                        </tr>
                        <tr>
                            <th>INICIO</th>
                            <td>--Data!--</td>
                            <td>--Data!--</td>
                        </tr>
                        <tr>
                            <th>CENTRO</th>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td colspan="3"><b>Verificación de resultados por recálculo</b></td>
                        </tr>
                        <tr>
                            <th>FINAL</th>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                        </tr>
                        <tr>
                            <th colspan="3"> INCERTIDUMBRE TOTAL DE EXCENTRICIDAD  </th>
                            <th title="Incertidumbre de Excentricidad" colspan="3"> w(Exc)= <span style={{color: "#11801e"}}> --Data!-- </span></th>
                        </tr>
                        <tr>
                            <td colspan="3" style={{backgroundColor: "#bebcbc"}}></td>
                            <th title={cfr} colspan="2"> Conformidad %</th>
                            <th style={{color: "#11801e"}}> --Data!-- </th>
                        </tr>
                    </tbody>
                </table>
                <br/>{/*--------------------------------------------------------------------------------------------*/}
                <table className="table table-bordered table-sm">
                    <tbody className="txcenter">
                        <tr>
                            <th colspan="8" className="bg-primary head">PRUEBA DE REPETIBILIDAD</th>
                        </tr>
                        <tr>
                            <th>Carga 80%</th>
                            <td colspan="3">--Data!-- [U]</td>
                            <td colspan="3" style={{backgroundColor: "#bebcbc"}}></td>
                        </tr>
                        <tr>
                            <th># Lectura</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th title="Diferencia Máxima ">Dif. Max.</th>
                            <th title="Error Máximo Permitido">e.m.p.</th>
                            <th title="Evaluación de la Prueba">Cumplimiento</th>
                        </tr>
                        <tr>
                            <th>Indicación</th>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                        </tr>
                        <tr>
                            <th title="Lectura con Carga 0">Lectura Cero</th>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <th colspan="3">Verificación de resultados por recálculo</th>
                            </tr>
                            <tr>
                            <th colspan="3">INCERTIDUMBRE TOTAL DE REPETIBILIDAD</th>
                            <th title="Incertidumbre de Repetibilidad">µ(rept) = --Data!--</th>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                        </tr>
                        <tr>
                            <td colspan="4" style={{backgroundColor: "#bebcbc"}}></td>
                            <th title={cfr} colspan="2"> Conformidad %</th>
                            <th style={{color: "#11801e"}}> --Data!-- </th>
                        </tr>
                    </tbody>
                </table>
                <br/>{/*---------------------------------------------------------------------------------------------*/}
                <table className="table table-bordered table-sm">
                    <tbody className="txcenter">
                        <tr className="bg-primary head">
                            <td colspan="14">PRUEBA DE CARGA</td>
                        </tr>
                        <tr>
                            <th>N°</th>
                            <th title="Carga Nominal en kilogramos">Carga Nominal [U]</th>
                            <th title="Lectura Ascendente">L. Asc.</th>
                            <th title="Lectura Descendente">L. Dsc.</th>
                            <th title="Error Ascendente">Error Asc.</th>
                            <th title="Error Descendente">Error Dsc.</th>
                            <th title="Histéresis">Histéresis</th>
                            <th title="Histéresis Máxima">Hmax</th>
                            <th title="Carga de Histéresis Máxima">carga de Hmax</th>
                            <th title="Evaluación de Error Máximo Permitido">evaluación de e.m.p</th>
                            <th title="Evaluación de la Prueba">Cumplimiento</th>
                            <th title="Incertidumbre de Histéresis en kilogramos.">Incertidumbre de Histéresis [U]</th>
                            <th title="Evaluación de Error Máximo Permitido Recalculo">eval. e.m.p (recálculo)</th>
                            <th title="Evaluación de la Prueba">Cumplimiento (recálculo)</th>
                        </tr>
                        <tr>
                            <th>n</th>
                            <td>--Data!--</td>
                            <td>--Data!--</td>
                            <td>--Data!--</td>
                            <td>--Data!--</td>
                            <td>--Data!--</td>
                            <td>--Data!--</td>
                            <td>--Data!--</td>
                            <td>--Data!--</td>
                            <td>--Data!--</td>
                            <td>--Data!--</td>
                            <td>--Data!--</td>
                            <td>--Data!--</td>
                            <td>--Data!--</td>
                        </tr>
                    </tbody>
                </table> 
                {/*-------------------------------------------------------------------------------*/}
                <table className="table table-bordered table-sm">
                    <tbody className="">
                        <tr>
                            <th>INCERTIDUMBRE TOTAL DE HISTÉRESIS</th>
                            <th title="Incertidumbre de Histéresis">w(Hist) = --Data!-- </th>
                            <th title="Incertidumbre Expandida Máxima deHistéresis">U(Hist) Max= --Data!--</th>
                            <th>PRUEBA DE CARGA: </th>
                            <th>--Data!--</th>
                        </tr>
                        <tr>
                            <td colspan="3" style={{backgroundColor: "#bebcbc"}}></td>
                            <th title={cfr}> Conformidad %</th>
                            <th style={{color: "#11801e"}}> --Data!-- </th>
                        </tr>
                    </tbody>
                </table>  
                <br/> {/*-------------------------------------------------------------------------------------*/}
                <table className="table table-bordered table-sm">
                    <tbody className="txcenter">
                        <tr className="bg-primary head">
                            <td colspan="7">INCERTIDUMBRE DE INDICACIÓN</td>
                            <td colspan="6">INCERTIDUMBRE DEL PATRÓN</td>
                        </tr>
                        <tr>
                            <th>N°</th>
                            <th title="Carga Nominal en kilogramos">C. Nominal [kg]</th>
                            <th title="incertidumbre de Resolución" >µ(Res)</th>
                            <th title="incertidumbre de Repetibilidad" >µ(Rept)</th>
                            <th title="incertidumbre de Exentricidad" >µ(Exc)</th>
                            <th title="incertidumbre de Histéresis" >µ(Hist)</th>
                            <th title="incertidumbre de Resolucion en 0" >µ(Res cero)</th>
                            <th title="incertidumbre de Patron" >µ(pat)</th>
                            <th title="Error Máximo Permitido" >e.m.p</th>
                            <th title="incertidumbre de ---" >μ(mB )</th>
                            <th title="incertidumbre de ---" >μ(δm<b style={{fontSize: "10px"}}>p</b>)</th>
                            <th title="incertidumbre de ---" >∆m<b style={{fontSize: "10px"}}>conv</b></th>
                            <th title="incertidumbre de ---" >μ(δm<b style={{fontSize: "10px"}}>conv</b>)</th>
                        </tr>
                        <tr>
                            <th> n </th>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                        </tr>
                    </tbody>
                </table>
                <br/>{/*-------------------------------------------------------------------------------------------*/}
                <table className="table table-bordered table-sm">
                    <tbody className="txcenter">
                        <tr className="bg-primary head">
                            <td colspan="10">INCERTIDUMBRES COMBINADAS <QuestionCircleFilled onClick={() =>console.log("info")} className="inf" /></td>
                        </tr>
                        <tr>
                            <th>N°</th>
                            <th>Carga Nominal [ kg ]</th>
                            <th title="Incertidumbre ---"> μ(I) </th>
                            <th title="Incertidumbre de Masa de Referencia"> μ(m<b style={{fontSize: "10px"}}>ref</b>) </th>
                            <th title="Incertidumbre de Error"> μ(Er) </th>
                            <th title="Grados de Libertad"> Ә<b style={{fontSize: "10px"}}>eff</b> </th>
                            <th title="Factor de Seguridad"> k </th>
                            <th title="Incertidumbre Expandida"> U </th>
                        </tr>
                        <tr>
                            <th> n </th>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                        </tr>
                    </tbody>
                </table>
                <br/>{/*------------------------------------------------------------------------------------------------*/}
                <table className="table table-bordered table-sm">
                    <tbody className="txcenter">
                        <tr className="bg-primary head">
                            <td colspan="8">REPORTE</td>
                        </tr>
                        <tr>
                            <th>N°</th>
                            <th title="Carga Nominal en kilogramos">Carga Nominal [kg]</th>
                            <th title="Lectura Ascendente">Lectura Asc. [U]</th>
                            <th title="Lectura Descendente">Error Asc [U]</th>
                            <th title="Error Ascendente">Lectura Dsc [U]</th>
                            <th title="Error Descendente">Error Dsc [U]</th>
                            <th title="Factor de Seguridad">k</th>
                            <th title="Incertidumbre Expandida en kilogramos">U [kg]</th>
                        </tr>
                        <tr>
                            <th> n </th>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                        </tr>
                    </tbody>
                </table>
                <table className="table table-sm table-bordered">
                    <tbody className="txcenter">
                        <tr>
                            <th colspan="7" className="bg-primary head">INCERTIDUMBRE DE INDICACIÓN</th>
                        </tr>
                        <tr>
                            <th>N°</th>
                            <th title="Carga Nominal en kilogramos">Carga Nominal [kg]</th>
                            <th title="incertidumbre de Resolución" >µ(Res)</th>
                            <th title="incertidumbre de Repetibilidad" >µ(rept)</th>
                            <th title="incertidumbre de Exentricidad" >µ(Exc)</th>
                            <th title="incertidumbre de Histéresis" >µ(Hist)</th>
                            <th title="incertidumbre de Resolucion en 0" >µ(Res cero)</th>
                        </tr>
                        <tr>
                            <th>1</th>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                            <td> --Data!-- </td>
                        </tr>
                    </tbody>
                </table>
                <br/> {/*-----------------------------------------------------------------------------------------------*/}
                <table className="table table-sm table-bordered">
                    <tbody className="txcenter">
                        <tr>
                            <th colspan="4" className="bg-primary head">INCERTIDUMBRE DEL PATRÓN</th>
                        </tr>
                        <tr>
                            <th>Carga</th>
                            <th>Incertidumbre Patrón (1era. carga de sustitución)</th>
                        </tr>
                        <tr>
                            <td><span> --Data!-- </span></td>
                            <td><span> --Data!-- </span></td>
                        </tr>
                    </tbody>
                </table>
                <br/> {/*-----------------------------------------------------------------------------------------------*/}
                <table className="table table-sm table-bordered">
                    <tbody className="txcenter">
                        <tr>
                            <th colspan="8" className="head" style={{ background: "#00CC66"}}> PERSONAL INVOLUCRADO </th>
                        </tr>
                        <tr>
                            <th rowspan="2">Realizado Por:</th>
                            <td rowspan="2"> {data.metrologist} </td>
                            <th>Revisado Por:</th>
                            {data.certificate.revNom !== null ? (<td> {data.certificate.revNom} </td>) : (<td> {user.nom} </td>)}
                        </tr>
                        <tr>
                            <th>Cargo:</th>
                            {data.certificate.revCarg !== null ? (<td> {data.certificate.revCarg} </td>) : (<td> {user.rol} </td>)}
                        </tr>
                    </tbody>
                </table>
                </>
                {/* <table className="table table-sm table-bordered">
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
                </table> */}
            </section>
        );
    } else {
        <h1><Icon icon="line-md:loading-twotone-loop" /> Cargando...</h1>
    }
}
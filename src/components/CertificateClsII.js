import React from 'react';

import { QuestionCircleFilled } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import '../styles/Certificate.css';

export default function CertificateClsII({data, user}) {

  if (data.certificate) {
    return(
      <section className="cam">
        <h3 class="text-center"> HOJA DE CÁLCULO PARA BALANZA CLASE II (Dos).</h3>
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
                  <th><span>Max i [U]</span></th>
                  <th><span>d [U]</span></th>
                  <th><span>e [U]</span></th>
                </tr>
                <tr>
                  <td>
                    <b>Cap. Uso: </b>
                    <span>--Data!--</span>
                  </td>
                  <td><span>--Data!--</span></td>
                  <td><span>--Data!--</span></td>
                </tr>
                <tr>
                  <th>CLASE:</th>
                  <td colspan="2"><span>Camionera</span></td>
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
                <tr>
                  <th>±1e</th>
                  <th><span>±2e</span></th>
                  <th><span>±3e</span></th>
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
        <br/>{/*-------------------------------------------------------------------------*/}
        <table className="table table-bordered table-sm">
          <tbody className="txcenter">
            <tr>
              <th colspan="10" className="bg-primary head">PRUEBA DE EXCENTRICIDAD (Exc.)</th>
            </tr>
            <tr>
              <th> Carga [U] </th>
              <th> Indicación </th>
              <th> Pos 1 </th>
              <th> Pos 2 </th>
              <th> Pos 3 </th>
              <th> Pos 4 </th>
              <th> Pos 5 </th>
              <th> Exct. máx. </th>
              <th> e.m.p </th>
              <th> cumplimiento </th>
            </tr>
            <tr>
              <td rowspan="2"> --Data!-- </td>
              <th> Mesurado </th>
              <td> --Data!-- </td>
              <td> --Data!-- </td>
              <td> --Data!-- </td>
              <td> --Data!-- </td>
              <td> --Data!-- </td>
              <td> --Data!-- </td>
              <td> --Data!-- </td>
              <td> --Data!-- </td>
            </tr>
            <tr>
              <th> Diferencia </th>
              <td> --Data!-- </td>
              <td> --Data!-- </td>
              <td> --Data!-- </td>
              <td> --Data!-- </td>
              <td> --Data!-- </td>
              <td colspan="3"><b>Verificación de resultados por recálculo</b></td>
            </tr>
            <tr>
              <th colspan="3"> INCERTIDUMBRE TOTAL DE EXCENTRICIDAD </th>
              <th colspan="4"> <b> w(Exc)= </b><span style={{color: "#11801e"}}> -- Data!--</span></th>
              <td> --Data!-- </td>
              <td> --Data!-- </td>
              <td> --Data!-- </td>
            </tr>
            <tr>
                <td colspan="7" style={{backgroundColor: "#bebcbc"}}></td>
                <th title="Porcenaje de acierto del cumplimiento de la Prueba" colspan="2"> Certeza %</th>
                <th style={{color: "#11801e"}}> --Data!-- </th>
            </tr>
          </tbody>
        </table>
        <br/>{/*--------------------------------------------------------------------------------------------*/}
        <table className="table table-bordered table-sm">
          <tbody className="txcenter">
            <tr>
              <th colspan="10" className="bg-primary head">PRUEBA DE REPETIBILIDAD</th>
            </tr>
            <tr>
              <th>Carga 80%</th>
              <td colspan="9">
                <span>--Data!-- [U]</span>
              </td>
            </tr>
            <tr>
              <th># Lectura</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>Dif. Max.</th>
              <th>e.m.p.</th>
              <th>Cumplimiento</th>
            </tr>
            <tr>
              <th>Indicación</th>
              <td><span>--Data!--</span></td>
              <td><span>--Data!--</span></td>
              <td><span>--Data!--</span></td>
              <td><span>--Data!--</span></td>
              <td><span>--Data!--</span></td>
              <td><span>--Data!--</span></td>
              <td><span>--Data!--</span></td>
              <td><span>--Data!--</span></td>
              <td><span>--Data!--</span></td>
            </tr>
            <tr>
              <th>Lectura Cero</th>
              <td><span>--Data!--</span></td>
              <td><span>--Data!--</span></td>
              <td><span>--Data!--</span></td>
              <td><span>--Data!--</span></td>
              <td><span>--Data!--</span></td>
              <td><span>--Data!--</span></td>
              <td colspan="3"><b>Verificación de resultados por recálculo</b></td>
            </tr>
            <tr>
              <th colspan="4">INCERTIDUMBRE TOTAL DE REPETIBILIDAD</th>
              <th colspan="3">µ(rept) = <span style={{color: "#11801e"}}> -- Data!--</span></th>
              <td><span>--Data!--</span></td>
              <td><span>--Data!--</span></td>
              <td><span>--Data!--</span></td>
            </tr>
            <tr>
                <td colspan="7" style={{backgroundColor: "#bebcbc"}}></td>
                <th title="Porcenaje de acierto del cumplimiento de la Prueba" colspan="2"> Certeza %</th>
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
              <th>Carga Nominal [U]</th>
              <th>L. Asc.</th>
              <th>L. Dsc.</th>
              <th>Error Asc.</th>
              <th>Error Dsc.</th>
              <th>Histéresis</th>
              <th>Hmax</th>
              <th>carga de Hmax</th>
              <th>evaluación de e.m.p</th>
              <th>Cumplimiento</th>
              <th>Incertidumbre de Histéresis [U]</th>
              <th>eval. e.m.p (recálculo)</th>
              <th>Cumplimiento (recálculo)</th>
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
          <tbody className="txcenter">
            <tr>
              <th>INCERTIDUMBRE TOTAL DE HISTÉRESIS</th>
              <th>w(Hist) = <span>--Data!--</span> </th>
              <th>U(Hist) Max= <span>--Data!--</span></th>
              <th>PRUEBA DE CARGA: </th>
              <th><span>--Data!--</span></th>
            </tr>
            <tr>
                <td colspan="3" style={{backgroundColor: "#bebcbc"}}></td>
                <th title="Porcenaje de acierto del cumplimiento de la Prueba"> Certeza %</th>
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
              <th>C. Nominal [U]</th>
              <th>µ(Res)</th>
              <th>µ(Rept)</th>
              <th>µ(Exc)</th>
              <th>µ(Hist)</th>
              <th>µ(Res cero)</th>
              <th>µ(pat)</th>
              <th>e.m.p</th>
              <th>μ(mB )</th>
              <th>μ(δm<b style={{fontSize: "10px"}}>p</b>)</th>
              <th>∆m<b style={{fontSize: "10px"}}>conv</b></th>
              <th>μ(δm<b style={{fontSize: "10px"}}>conv</b>)</th>
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
            <td colspan="10">INCERTIDUMBRES COMBINADAS <QuestionCircleFilled onClick={() =>console.log("info")} className="inf"/></td>
            </tr>
            <tr>
              <th>N°</th>
              <th>Carga Nominal [ kg ]</th>
              <th> μ(I) </th>
              <th> μ(m<b style={{fontSize: "10px"}}>ref</b>) </th>
              <th> μ(Er) </th>
              <th> Ә<b style={{fontSize: "10px"}}>eff</b> </th>
              <th> k </th>
              <th> U </th>
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
                    <Button shape="circle"  htmlType="submit"> <Icon icon="flat-color-icons:add-database"/> </Button>
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
    return (
      <h1><Icon icon="line-md:loading-twotone-loop" /> Cargando...</h1>
    );
  }
  
}
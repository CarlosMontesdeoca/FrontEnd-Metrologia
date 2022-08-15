import React, {useState, useEffect} from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../styles/App.css';

import CertificatesPDF from '../pages/CertificatesPDF';
import CertItems from '../pages/CertItems';
import CertRelease from '../pages/CertRelease';
import CertReview from '../pages/CertReview';
import Clients from '../pages/Clients';
import CreateProject from '../pages/CreateProject';
import History from '../pages/History';
import Login from '../pages/Login';
import NavApp from './Nav';
import Projects from '../pages/Projects';
import Register from '../pages/Register';
import useToken from '../custom/useToken';

function App() {

  const { token, setToken } = useToken();

  // const url = 'http://192.168.0.128:85/ApiMetrologia/public/api/';
  const url = 'http://127.0.0.1:8000/api/';
  // const url = 'http://192.168.0.128:85/Test/public/';

  // const [ user, setUser ] = useState({});

  // const getMyUser = async () => {
  //   const response = await fetch(`${url}user`, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   })
  //   const myUser = await response.json();
  //   setUser(myUser);
  //   if (myUser.error === "token_expired"){
  //     sessionStorage.clear();
  //     window.location.reload();
  //   }
  // }

  // useEffect(() => {
  //   getMyUser();
  // }, {});

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div id="page">
      <div id="head">
        <h4>Precisión y control</h4>
        <h2>Precitrol S.A.</h2>
      </div>
      <div style={{display: "flex"}}>
        <div id="menu"> <NavApp /> </div>
        <div id="app">
        <Router>
            <Routes>
              <Route path='/clients' element={<Clients token={token} url={url}/>} />

              <Route path='/createProjects' element={<CreateProject token={token} url={url}/>} />
              <Route path='/viewProjects' element={<Projects token={token} url={url}/>} />

              <Route path='/users' element={<Register token={token} url={url}/>} />
              <Route path='/certificateItems' element={<CertItems token={token} url={url}/>} />

              <Route path='/certificatesToReview' element={<CertReview token={token} url={url}/>} />
              <Route path='/certificatesToRelease' element={<CertRelease token={token} url={url}/>} />
              
              <Route path='/history' element={ <History token={token} url={url}/>}/>

              <Route path='/explorer' element={ <CertificatesPDF/> }/>
              {/* <Route path='/cam' element={ <CertificateClsCam token={token} url={url}/>} />
              <Route path='/ii' element={ <CertificateClsII token={token} url={url}/>} />
              <Route path='/iii' element={ <CertificateClsIII token={token} url={url}/>} />          */}
            </Routes>
          </Router>
        </div>
      </div>
    </div>
    
  );
}

export default App;


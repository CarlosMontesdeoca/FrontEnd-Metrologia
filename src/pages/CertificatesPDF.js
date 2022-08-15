import React, {useState} from 'react';

import Swal from 'sweetalert2'

// const path = require('path');
// const fs = require('fs');

export default function CertificatesPDF(){

    const [ folders, setFolders ] = useState(null);
    

    // const directoryPath = path.join('C:\\Informes');

    // fs.readdir(directoryPath, function (err, files) {
    //     if (err) {
    //         return (Swal.fire({
    //             icon: 'error',
    //             text: 'Ocurrio un Error al encontrar la ruta ' + process.cwd()
    //         }));
    //     }
    //     setFolders(files);
    // });

    return (
        <section className="Register">
            <br/>
            <h2 className='title'> Certificados PDF </h2>
            <br/>
            <button onClick={() => console.log(folders)}> files </button>
            <input name="file1" type="file" accept=".pdf" />
        </section>
    )
}
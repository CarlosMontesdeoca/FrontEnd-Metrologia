import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if ( userToken ) {
      return userToken.token
      // return(Swal.fire({
      //   icon: 'success',
      //   title: 'Balanza agregada con exito',
      //   toast: true,
      //   position: 'top-end',
      //   showConfirmButton: false,
      //   timer: 3500,
      // }))
    }
    // return 'mpt tpke'
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}
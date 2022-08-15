import { useState } from 'react';

export default function useAcount() {
  const getAcount = () => {
    const acountString = sessionStorage.getItem('userFound');
    const userAcount = JSON.parse(acountString);
    return userAcount?.acount
  };

  const [acount, setAcount] = useState(getAcount());

  const saveAcount = userAcount => {
    sessionStorage.setItem('userFound', JSON.stringify(userAcount));
    setAcount(userAcount.acount);
  };

  return {
    setAcount: saveAcount,
    acount
  }
}
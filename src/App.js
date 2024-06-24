import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/js files/home_page';
import Login from './pages/js files/log_in_page';
import Signup from './pages/js files/sign_up_page';
import Geninfo from './pages/js files/info_page';
import Addpatient from './pages/js files/info_docs/add_patients';
import Pricingpage from './pages/js files/pricing_page';
import Passchange from './pages/js files/changinf_passsword';
import Appointments from './components/appointments';

function App() {
  const [cookie] = useCookies(["AccessToken"]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = cookie.AccessToken;
      try {
        const fetchedData = await fetch('http://localhost:5000/tstfun', {
          method: 'get',
          headers: { 'Authorization': "Bearer",token }
        });
        const data = await fetchedData.json();
        if (data.ID_user !== undefined) {
          setUser(data.ID_user);
        } else {
          console.log('err:', data.error);
        }
      } catch (error) {
        console.log('err:', error);
      }
    };
  
    fetchData();
  }, [cookie.AccessToken]);
  


  return (
          <BrowserRouter>
        <Routes>
          <Route path='*' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign_up' element={<Signup />} />
          <Route path='/gen_info/:id' element={  user!==null?<Geninfo user={user} />:<HomePage/>} />
          <Route path='/gen_info/add_patient' element={user!==null?<Addpatient />:<HomePage/>} />
          <Route path='/changepass/:token' element={<Passchange />} />
          <Route path='/offers' element={<Pricingpage user={user}/>}/>
          <Route path='/app' element={<Appointments />} />
          <Route path='/header' element={<Passchange/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

import {Department} from './components/Department/Department';
import {Employee} from './components/Employee/Employee';
import {Vacation} from './components/Vacation/Vacation';
import Navigation from './components/Navigation/Navigation';
import {BusinessTrip} from './components/BusinessTrip/BusinessTrip';

import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
     <div className="container">
      <h3 className='m-3 d-flex justify-content-center'>
        Учёт сотрудников в организации
      </h3>
      <Navigation/>

      <Routes>
        <Route path='/' element={<Employee />} exact/>
        <Route path='/department' element={<Department />}/>
        <Route path='/vacation' element={<Vacation />}/>
        <Route path='/businesstrip' element={<BusinessTrip />}/>
     </Routes>
    </div>
    </BrowserRouter>
   
  );
}

export default App;

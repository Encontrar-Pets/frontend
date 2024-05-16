import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "pages/home";
import PetList from "pages/petlist";
import Playbook from 'pages/playbook';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/find-pet' element={<PetList />} />
        <Route path='/playbook' element={<Playbook />} />
      </Routes>
    </Router>
  )
}
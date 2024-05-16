import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/home";
import Playbook from './pages/playbook';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/playbook' element={<Playbook />} />
      </Routes>
    </Router>
  )
}
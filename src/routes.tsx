import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "pages/home";
import PetList from "pages/petlist";
import Playbook from "pages/playbook";
import ShelterManagement from "pages/shelter-management";
import AddShelter from "pages/add-shelter";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-pet" element={<PetList />} />
        <Route path="/playbook" element={<Playbook />} />
        <Route path="/shelter-management" element={<ShelterManagement />} />
        <Route path="/shelter" element={<AddShelter />} />
      </Routes>
    </Router>
  );
}

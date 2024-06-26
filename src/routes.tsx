import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "pages/home";
import PetList from "pages/pet-list";
import PetDetails from "pages/pet-details";
import Playbook from "pages/playbook";
import ShelterManagement from "pages/shelter-management";
import AddShelter from "pages/add-shelter";
import RecoverPet from "pages/recover-pet";
import AddPet from "pages/add-pet";
import { InfoPet } from "pages/info-pet";
import PetListManagement from "pages/pet-list-management";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-pet" element={<PetList />} />
        <Route path="/pet-details/:id" element={<PetDetails />} />
        <Route path="/playbook" element={<Playbook />} />
        <Route path="/shelter-management" element={<ShelterManagement />} />
        <Route path="/pets-list-management" element={<PetListManagement />} />
        <Route path="/shelter" element={<AddShelter />} />
        <Route path="/recover-pet" element={<RecoverPet />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/info-pet" element={<InfoPet />} />
      </Routes>
    </Router>
  );
}

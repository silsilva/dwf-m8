import { Routes, Route } from "react-router-dom";
// import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/LogIn";
import Subscribe from "../pages/subscribe";
import Profile from "../pages/Profile";
import MyPets from "../pages/myPets";
import LostPets from "../pages/LostPets";
import CreatePet from "../pages/CreatePet";
import EditPet from "../pages/EditPet";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/my-pets" element={<MyPets />}></Route>
      <Route path="/create-pet" element={<CreatePet />}></Route>
      <Route path="/edit-pet/:petId" element={<EditPet />}></Route>
      <Route path="/lost-pets" element={<LostPets />}></Route>
      <Route path="/subscribe" element={<Subscribe />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
    </Routes>
  );
}

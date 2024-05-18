import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  CreateContactPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ViewContactPage,
} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />}>
        <Route index element={<ViewContactPage />} />
        <Route path="create" element={<CreateContactPage />} />
      </Route>
    </Routes>
  );
};

export default App;

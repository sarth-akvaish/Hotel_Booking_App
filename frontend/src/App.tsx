import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>} />
    </Routes>
  );
};

export default App;

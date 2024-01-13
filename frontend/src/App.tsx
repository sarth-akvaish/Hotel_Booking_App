import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <p>Home Page</p>
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout>
            <p>Search Page</p>
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/sign-in"
        element={
          <Layout>
            <SignIn />
          </Layout>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
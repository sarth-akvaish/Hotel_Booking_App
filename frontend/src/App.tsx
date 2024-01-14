import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/Appcontext";
import AddHotel from "./pages/AddHotel";
import MyHotel from "./pages/MyHotel";
import EditHotel from "./pages/EditHotel";

const App = () => {
  const { isLoggedin } = useAppContext();

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
      {isLoggedin && (
        <>
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
          <Route
            path="/my-hotel"
            element={
              <Layout>
                <MyHotel />
              </Layout>
            }
          />
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotel />
              </Layout>
            }
          />
        </>
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;

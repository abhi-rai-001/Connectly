import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Call from "./pages/Call";
import Onboarding from "./pages/Onboarding";
import Notifications from "./pages/Notifications";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useTheme } from "./store/useTheme.js";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import ChatPage from "./pages/ChatPage.jsx";
const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  const {theme} = useTheme();

  if (isLoading) return <PageLoader />;
  return (
    <div className="min-h-screen" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar>
                <Home/>
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/call/:id"
          element={isAuthenticated && isOnboarded? (<Call />) : (<Navigate to={!isAuthenticated?"/login":"/onboarding"} />)}
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <Onboarding />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/chat/:id"
 element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage/>
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }        />
        <Route
          path="/update-profile"
          element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar>
                <Notifications /> 
              </Layout>
          ): (
          <Navigate to={!isAuthenticated?"/login":"/onboarding"} />
        )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

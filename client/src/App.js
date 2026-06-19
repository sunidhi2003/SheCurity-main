
import "@mui/material";
import "react-icons";
import "react-router-dom";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import theme from "./theme";
import MainNavbar from "./components/MainNavbar";
import ThemeToggle from "./components/ThemeToggle";
import Highlight from "./components/views/Highlight";
import "./styles/global.css";
import PostView from "./components/views/PostView";
import CreatePostView from "./components/views/CreatePostView";
import ProfileView from "./components/views/ProfileView";
import LoginView from "./components/views/LoginView";
import SignupView from "./components/views/SignupView";
import ExploreView from "./components/views/ExploreView";
import PrivateRoute from "./components/PrivateRoute";
import SearchView from "./components/views/SearchView";
import MessengerView from "./components/views/MessengerView";
import HomeView from "./components/views/HomeView";

import { initiateSocketConnection } from "./helpers/socketHelper";
import SelfDefenseSection from "./components/views/SelfDefenceSection";
import ComplaintForm from "./pages/ComplaintForm";
import CallerInput from "./pages/CallerInput";
import Contact from "./pages/Contact";
import SafetyInfo from "./pages/SafetyInfo";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import AuthorityAnalytics from "./pages/AuthorityAnalytics";
import RedAlertRecorder from "./pages/RedAlertRecorder";
import EmergencyContacts from "./pages/ContactsforEm";
import SelfDefense from "./pages/selfDefeseTechnique";
import Resources from "./pages/resources";
import OurAbout from "./pages/ourAbout";

function App() {
  initiateSocketConnection();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <MainNavbar />
        <ThemeToggle />

        <Routes>
          <Route path="/home" element={<HomeView />} />
          <Route path="/shieldup" element={<SelfDefenseSection />} />

          {/* Correctly render the ExploreView component */}
          <Route path="/explore" element={<ExploreView />} />

          {/* Ensure the Community link opens an external page */}
          <Route
            path="/community"
            element={
              <Navigate
                to="http://localhost:3000"
                target="_blank"
                replace
              />
            }
          />

          <Route path="/posts/:id" element={<PostView />} />
          <Route
            path="/posts/create"
            element={
              <PrivateRoute>
                <CreatePostView />
              </PrivateRoute>
            }
          />
          <Route
            path="/messenger"
            element={
              <PrivateRoute>
                <MessengerView />
              </PrivateRoute>
            }
          />
          <Route path="/search" element={<SearchView />} />
          <Route path="/ourAbout" element={<OurAbout />} />
          <Route path="/users/:id" element={<ProfileView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="/complaint-form" element={<ComplaintForm />} />
          <Route path="/caller-input" element={<CallerInput />}/>
          <Route path="/Contact-us" element={<Contact/>}/>
          <Route path="/alert" element={<Highlight/>}/>
          <Route path="/law" element={<SafetyInfo/>}/>
          <Route path="/emer-contact" element={<EmergencyContacts/>}/>
          <Route path="/red-alert" element={<RedAlertRecorder />} />
          <Route path="/self-defense" element={<SelfDefense/>}/>
          <Route path="/resources" element={<Resources/>}/>
          <Route path="/authority-dashboard" element={
    <PrivateRoute role="authority">
      <AuthorityDashboard />
    </PrivateRoute>
  }
/>
          <Route path="/authority-analytics" element={
    <PrivateRoute role="authority">
      <AuthorityAnalytics />
    </PrivateRoute>
  }
/>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;




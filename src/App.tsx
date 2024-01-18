import { Route, Routes } from "react-router-dom";
import { Accounts, Campaigns, Profiles } from "./routes";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Accounts />} />
          <Route path="/profile/:accountId" element={<Profiles />} />
          <Route path="/campaign/:profileId" element={<Campaigns />} />
        </Routes>
    </>
  )
}

export default App

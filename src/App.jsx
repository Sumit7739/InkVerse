import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Bookmarks from './pages/Bookmarks';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import StoryDetail from './pages/StoryDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/discover" element={<Layout><Discover /></Layout>} />
        <Route path="/bookmarks" element={<Layout><Bookmarks /></Layout>} />
        <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/story/:id" element={<Layout><StoryDetail /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;

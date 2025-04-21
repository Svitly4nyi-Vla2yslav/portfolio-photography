import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import Home from './pages/HomePage/HomePage';
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import Work from './pages/Work/Work';
import Photo from './pages/Photo/Photo';
import Info from './pages/Info/Info';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/photo" element={<Photo />} />
        <Route path="/info" element={<Info />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

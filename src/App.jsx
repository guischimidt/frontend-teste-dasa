import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Container from './components/layout/Container';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Message from './components/layout/Message.jsx';
import Loading from './components/layout/Loading.jsx';

import Login from './components/pages/Login';
import Edit from './components/pages/Edit';
import Register from './components/pages/Register';

import { UserProvider } from './context/UserContext';

function App() {

  return (
    <Router>
      <UserProvider>
        <Loading />
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path='/edit' element={<Edit />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Login />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  )
};

export default App

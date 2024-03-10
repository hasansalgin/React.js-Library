import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './services/PrivateRoute'
import Forms from './components/Forms'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'


function App() {
  //buradaki yapılar context'e taşındı!
  return (
    <AuthProvider>
      <BrowserRouter>
      <ToastContainer/>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/' element={<Home/>}>
            <Route path='/' element={<PrivateRoute element={<Forms/>}/>}/>
          </Route>
        </Routes>  
      </BrowserRouter>
      
    </AuthProvider>
  )
}

export default App

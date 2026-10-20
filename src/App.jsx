import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import {Route, Routes} from 'react-router'
import Home from './pages/Home/Home.jsx'
import Book from './pages/Book/Book.jsx'

export default function App({ children }) {
  return (
    <>
      <Header />
      <Routes>
        <Route index path='/' element={<Home />}/>
        <Route path='/book/:id' element={<Book />}/>
      </Routes>
      <Footer />
    </>
  )
}

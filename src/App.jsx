import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Room from './pages/Room'
import { About, Services, Offers, News, Contact } from './pages/Pages'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="phong/:id?" element={<Room />} />
        <Route path="gioi-thieu" element={<About />} />
        <Route path="dich-vu" element={<Services />} />
        <Route path="uu-dai" element={<Offers />} />
        <Route path="tin-tuc" element={<News />} />
        <Route path="lien-he" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

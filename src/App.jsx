import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Search from './pages/Search'
import Hotel from './pages/Hotel'
import { Services, News } from './pages/Content'
import Contact from './pages/Contact'
import { MemberRegister, MemberOffers } from './pages/Member'
import Partners from './pages/Partners'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dat-phong" element={<Search />} />
        <Route path="khach-san/:id" element={<Hotel />} />
        <Route path="dich-vu" element={<Services />} />
        <Route path="tin-tuc" element={<News />} />
        <Route path="thanh-vien/dang-ky" element={<MemberRegister />} />
        <Route path="thanh-vien/uu-dai" element={<MemberOffers />} />
        <Route path="doi-tac" element={<Partners />} />
        <Route path="lien-he" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

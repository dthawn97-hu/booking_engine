import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { CITIES, HOTELS } from '../data'

const top = ({ isActive }) => `block py-3.5 xl:py-8 xl:px-3 tracking-wide text-[13.5px] whitespace-nowrap transition-colors hover:text-white ${isActive ? 'text-white' : 'text-[#b9b4ae]'}`
const subA = 'flex justify-between items-center gap-4 px-6 py-4 border-b border-line text-sm tracking-wide text-[#2a2a2a] hover:bg-mist hover:text-sand-d hover:pl-7 transition-all'
const reveal = 'xl:group-hover:visible xl:group-hover:opacity-100 xl:group-hover:translate-y-0 xl:group-focus-within:visible xl:group-focus-within:opacity-100 xl:group-focus-within:translate-y-0'

function Drop({ to, label, children, end = true }) {
  return (
    <li className="group relative">
      <NavLink to={to} end={end} className={top}>{label}</NavLink>
      <ul className={`xl:invisible xl:opacity-0 xl:translate-y-1.5 ${reveal} transition xl:absolute xl:top-[88px] xl:left-0 xl:min-w-[260px] bg-[#fcfcfc] xl:shadow-2xl xl:rounded-b-2xl overflow-hidden`}>{children}</ul>
    </li>
  )
}
const Sub = ({ to, children }) => <li><Link className={subA} to={to}>{children}</Link></li>

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur-md shadow-lg shadow-black/10">
      <div className="mx-auto max-w-[1320px] px-6 h-[88px] flex items-center justify-between">
        <Link to="/" className="text-white text-center leading-none shrink-0 whitespace-nowrap">
          <b className="block font-normal tracking-[.28em] text-xl">HOTEL BOOKING</b>
          <small className="text-[8px] tracking-[.35em] text-[#9a958f]">KHÁCH SẠN &amp; NGHỈ DƯỠNG</small>
        </Link>
        <button className="xl:hidden text-white text-3xl" aria-label="Mở menu" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
        <ul className={`${open ? 'flex' : 'hidden'} xl:flex absolute xl:static top-[88px] inset-x-0 bg-ink xl:bg-transparent flex-col xl:flex-row xl:items-center px-6 pb-7 xl:p-0 xl:gap-1.5 max-h-[calc(100vh-88px)] overflow-auto xl:overflow-visible`}>
          <Drop to="/" label="Trang chủ">{CITIES.map(c => <Sub key={c} to={`/?city=${encodeURIComponent(c)}#diem-den`}>{c}</Sub>)}</Drop>
          <Drop to="/dat-phong" label="Đặt phòng">{HOTELS.map(h => <Sub key={h.id} to={`/khach-san/${h.id}`}>{h.name}{h.hot && <em className="not-italic text-[10px] tracking-widest bg-sand text-white px-2">HOT</em>}</Sub>)}</Drop>
          <li><NavLink to="/dich-vu" className={top}>Dịch vụ</NavLink></li>
          <li><NavLink to="/tin-tuc" className={top}>Tin tức</NavLink></li>
          <Drop to="/thanh-vien/uu-dai" label="Khuyến mãi thành viên" end={false}>
            <Sub to="/thanh-vien/dang-ky">Đăng ký thành viên</Sub>
            <Sub to="/thanh-vien/uu-dai">Ưu đãi thành viên</Sub>
          </Drop>
          <li><NavLink to="/doi-tac" className={top}>Đối tác</NavLink></li>
          <li><NavLink to="/lien-he" className={top}>Liên hệ</NavLink></li>
          <li><Link to="/dat-phong" className="block mt-3.5 xl:mt-0 xl:ml-7 bg-white text-black text-center font-bold text-xs tracking-[.14em] uppercase px-5 py-2.5 rounded-full hover:bg-sand hover:text-white transition-colors">Đặt phòng</Link></li>
        </ul>
      </div>
    </header>
  )
}

const SOC = {
  Instagram: 'M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zM17.3 5.5a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0 2A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9a3.5 3.5 0 003.5-3.5v-9A3.5 3.5 0 0016.5 4z',
  Facebook: 'M12 2a10 10 0 00-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0012 2z',
  YouTube: 'M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8C22 15.2 22 12 22 12s0-3.2-.4-4.8zM10 15V9l5.2 3z',
}

function Footer() {
  const [done, setDone] = useState(false)
  return (
    <footer className="bg-[#1f1f1f] text-white rounded-t-[2.5rem] overflow-hidden">
      <div className="mx-auto max-w-[1180px] px-6 py-16 grid gap-10 lg:grid-cols-3 lg:gap-12">
        <div><h3 className="text-[28px] font-normal">Hỗ trợ qua điện thoại</h3><p className="text-mute tracking-[.14em] text-xs uppercase mt-1.5 mb-5">Hoạt động 24/7</p><a className="text-2xl tracking-wider" href="tel:+84345647745">+84 345 647 745</a></div>
        <div><h3 className="text-[28px] font-normal">Kết nối với chúng tôi</h3><p className="text-mute tracking-[.14em] text-xs uppercase mt-1.5 mb-5">Mạng xã hội</p>
          <div className="flex gap-5">{Object.entries(SOC).map(([n, p]) => <a key={n} href="#" aria-label={n} className="w-[22px] h-[22px] fill-white hover:fill-sand"><svg viewBox="0 0 24 24" className="w-full h-full fill-inherit"><path d={p} /></svg></a>)}</div></div>
        <div><h3 className="text-[28px] font-normal">Nhận ưu đãi</h3><p className="text-mute tracking-[.14em] text-xs uppercase mt-1.5 mb-5">Giá riêng cho thành viên</p>
          {done ? <p>Cảm ơn bạn đã đăng ký.</p> : (
            <form className="flex gap-3" onSubmit={e => { e.preventDefault(); setDone(true) }}>
              <input type="email" required placeholder="Nhập email của bạn" aria-label="Email" className="flex-1 min-w-0 bg-ink2 px-6 h-[50px] rounded-full placeholder:text-[#9a958f]" />
              <button className="bg-sand hover:bg-sand-d text-white font-bold text-xs tracking-[.16em] uppercase px-7 h-[50px] rounded-full">Đăng ký</button>
            </form>)}
        </div>
      </div>
      <div className="bg-[#181818]"><div className="mx-auto max-w-[1180px] px-6 py-6 flex flex-wrap gap-4 justify-between items-center">
        <nav className="flex flex-wrap gap-x-10 gap-y-2 font-serif tracking-widest">{[['/', 'Trang chủ'], ['/dat-phong', 'Đặt phòng'], ['/dich-vu', 'Dịch vụ'], ['/tin-tuc', 'Tin tức'], ['/lien-he', 'Liên hệ']].map(([t, l]) => <Link key={l} to={t} className="hover:text-sand">{l}</Link>)}</nav>
        <div className="flex gap-10 font-serif text-xl tracking-[.12em] text-mute"><span>Eighty Eight</span><span>Alsona</span><span>Willmont</span></div>
      </div></div>
    </footer>
  )
}

export default function Layout() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 50)
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return <><Header /><main><Outlet /></main><Footer /></>
}

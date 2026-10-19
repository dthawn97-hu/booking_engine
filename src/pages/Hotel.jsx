import { useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { HOTELS, ROOMS, img, vnd } from '../data'
import { Btn, Wrap, iso } from '../components/ui'

const MON = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12']
const box = 'bg-ink2 px-[18px] py-3.5 mb-3.5 block [&_small]:block [&_small]:text-[11px] [&_small]:tracking-[.14em] [&_small]:uppercase [&_small]:text-[#9a958f] [&_select]:w-full [&_input]:w-full [&_select]:bg-transparent [&_input]:bg-transparent [&_select]:text-base [&_input]:text-base [&_select]:py-1 [&_input]:py-1 [&_option]:text-black'
const TABS = [['chon-phong', 'Chọn phòng'], ['mo-ta', 'Mô tả'], ['tien-nghi', 'Tiện nghi'], ['vi-tri', 'Vị trí']]
const price = (h, r) => h.p * r.m

function DateBox({ label, value, min, onChange }) {
  const d = new Date(value)
  return (
    <label className="relative block bg-ink2 p-[18px] text-center focus-within:outline-2 focus-within:outline-sand">
      <small className="block text-xs tracking-[.12em] uppercase font-normal">{label}</small>
      <span className="block font-serif text-[54px] leading-[1.1] text-sand mt-2">{d.getDate()}</span>
      <span className="block text-[13px] text-sand tracking-wide -mt-0.5">{MON[d.getMonth()]} {d.getFullYear()}</span>
      <input type="date" aria-label={label} min={min} value={value} onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
    </label>
  )
}

function Engine({ hotel, roomId, setRoomId, init }) {
  const room = ROOMS.find(r => r.id === roomId)
  const [cin, setCin] = useState(init.in)
  const [cout, setCout] = useState(init.out)
  const [guests, setGuests] = useState(init.guests)
  const [bf, setBf] = useState(false)
  const [c, setC] = useState({ name: '', phone: '' })
  const [err, setErr] = useState('')
  const [ok, setOk] = useState(false)

  const next = s => iso(new Date(new Date(s).getTime() + 864e5))
  const changeIn = e => { setCin(e.target.value); if (cout <= e.target.value) setCout(next(e.target.value)) }
  const nights = Math.max(1, Math.round((new Date(cout) - new Date(cin)) / 864e5))
  const unit = price(hotel, room)
  const extra = bf ? 180000 * nights * guests : 0
  const total = unit * nights + extra

  const submit = e => {
    e.preventDefault()
    if (!c.name.trim() || !/^[0-9+\s]{9,}$/.test(c.phone)) return setErr('Nhập họ tên và số điện thoại hợp lệ để chúng tôi giữ phòng.')
    setErr(''); setOk(true)
  }

  if (ok) return (
    <aside className="bg-ink text-white p-9 text-center lg:sticky lg:top-28">
      <h2 className="text-3xl text-sand">Đã nhận yêu cầu</h2>
      <p className="text-[#cfcac4] my-3 mb-6">{room.name} · {hotel.name} · {nights} đêm · {vnd(total)}. Chúng tôi sẽ gọi {c.phone} để xác nhận.</p>
      <Link to="/" className="inline-flex items-center bg-sand hover:bg-sand-d text-white font-bold text-xs tracking-[.16em] uppercase px-7 h-[50px]">Về trang chủ</Link>
    </aside>
  )

  return (
    <aside className="bg-ink text-white p-9 lg:sticky lg:top-28 order-first lg:order-none">
      <form id="dat-phong" onSubmit={submit} noValidate className="scroll-mt-28">
        <h2 className="text-3xl font-normal mb-5">Đặt phòng</h2>
        <div className="grid grid-cols-2 gap-3.5 mb-3.5">
          <DateBox label="Nhận phòng" value={cin} min={iso(new Date())} onChange={changeIn} />
          <DateBox label="Trả phòng" value={cout} min={next(cin)} onChange={e => setCout(e.target.value)} />
        </div>
        <label className={box}><small>Hạng phòng</small><select value={roomId} onChange={e => setRoomId(e.target.value)}>{ROOMS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select></label>
        <label className={box}><small>Số khách</small><select value={guests} onChange={e => setGuests(+e.target.value)}>{[1, 2, 3, 4, 5, 6].map(n => <option key={n}>{n}</option>)}</select></label>
        <label className={box}><small>Họ tên</small><input autoComplete="name" value={c.name} onChange={e => setC({ ...c, name: e.target.value })} /></label>
        <label className={box}><small>Số điện thoại</small><input type="tel" autoComplete="tel" value={c.phone} onChange={e => setC({ ...c, phone: e.target.value })} /></label>
        <label className="flex gap-2.5 items-center mb-4 text-sm text-[#cfcac4] cursor-pointer"><input type="checkbox" className="accent-sand size-4" checked={bf} onChange={e => setBf(e.target.checked)} />Thêm bữa sáng (180.000₫/người/đêm)</label>
        <dl className="border-t border-[#333] pt-4 mb-5 text-sm text-[#cfcac4] [&>div]:flex [&>div]:justify-between [&>div]:py-1">
          <div><dt>Giá phòng / đêm</dt><dd>{vnd(unit)}</dd></div>
          <div><dt>Số đêm</dt><dd>{nights}</dd></div>
          <div><dt>Bữa sáng</dt><dd>{vnd(extra)}</dd></div>
          <div className="!pt-3 font-serif text-[26px] text-white"><dt>Tổng</dt><dd>{vnd(total)}</dd></div>
        </dl>
        {err && <p role="alert" className="text-[#e59a8f] text-[13px] mb-3">{err}</p>}
        <Btn className="w-full">Đặt phòng</Btn>
        <p className="text-xs text-mute text-center mt-3">Chưa thanh toán ngay. Hủy miễn phí trước 48 giờ.</p>
      </form>
    </aside>
  )
}

export default function Hotel() {
  const { id } = useParams()
  const [q] = useSearchParams()
  const hotel = HOTELS.find(h => h.id === id)
  const [roomId, setRoomId] = useState(ROOMS.some(r => r.id === q.get('room')) ? q.get('room') : 'deluxe')
  const [pic, setPic] = useState(0)
  if (!hotel) return <Navigate to="/dat-phong" replace />

  const room = ROOMS.find(r => r.id === roomId)
  const photos = [hotel.img, ...room.imgs.slice(0, 3)]
  const init = { in: q.get('in') || iso(new Date()), out: q.get('out') || iso(new Date(Date.now() + 864e5)), guests: +q.get('guests') || 2 }
  const sec = 'mt-11 scroll-mt-28 [&_h2]:text-4xl [&_h2]:mb-3.5 [&_p]:text-[#5b564f] [&_p]:max-w-[62ch]'

  return (
    <>
      <section className="relative h-[300px] lg:h-[400px] bg-[#3a3a3a] bg-cover bg-center text-white flex items-end" style={{ backgroundImage: `url(${img(hotel.img, 2000)})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
        <Wrap className="relative pb-9 w-full flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <nav className="flex flex-wrap gap-x-10 gap-y-2 text-[13px] tracking-[.14em] uppercase">{TABS.map(([h, l]) => <a key={h} href={`#${h}`} className="pb-2 border-b-2 border-transparent hover:border-white">{l}</a>)}</nav>
          <div className="font-serif text-5xl lg:text-7xl leading-none"><span className="font-sans text-sm tracking-[.14em] uppercase mr-2.5">Từ</span>{vnd(hotel.p)}<span className="font-sans text-sm tracking-[.14em] uppercase ml-2.5">/ đêm</span></div>
        </Wrap>
      </section>
      <Wrap>
        <div className="pt-11 pb-7">
          <h1 className="text-5xl lg:text-6xl font-normal">{hotel.name}</h1>
          <p className="text-[#777] tracking-wide text-sm mt-2">{hotel.addr}<span className="ml-3 tracking-widest text-[#999]" aria-label="5 sao">★★★★★</span></p>
        </div>
        <div className="grid lg:grid-cols-[1fr_400px] gap-9 items-start pb-24">
          <div>
            <div className="aspect-[3/2] bg-[#cfc8bf]"><img src={img(photos[pic])} alt={hotel.name} className="w-full h-full object-cover" /></div>
            <div className="grid grid-cols-4 gap-2.5 mt-2.5">{photos.map((m, i) => <button key={m + i} aria-label={`Ảnh ${i + 1}`} aria-pressed={i === pic} onClick={() => setPic(i)} className={`aspect-[3/2] bg-[#cfc8bf] hover:opacity-100 ${i === pic ? '' : 'opacity-60'}`}><img src={img(m, 400)} alt="" className="w-full h-full object-cover" /></button>)}</div>

            <div id="chon-phong" className={sec}><h2>Chọn phòng</h2>
              <ul className="border-t border-line">{ROOMS.map(r => (
                <li key={r.id} className={`flex flex-wrap items-center justify-between gap-3 py-4 border-b border-line ${r.id === roomId ? 'bg-mist -mx-3 px-3' : ''}`}>
                  <div><b className="font-serif text-2xl font-medium">{r.name}</b><p className="!text-sm text-mute">{r.size} m² · {r.bed}</p></div>
                  <div className="flex items-center gap-4"><span>{vnd(price(hotel, r))}<span className="text-xs text-mute"> / đêm</span></span>
                    <a href="#dat-phong" onClick={() => setRoomId(r.id)} className={`px-5 py-2 text-sm font-medium transition-colors ${r.id === roomId ? 'bg-ink text-white' : 'bg-[#d9531e] hover:bg-[#b94416] text-white'}`}>{r.id === roomId ? 'Đã chọn' : 'Chọn phòng'}</a></div>
                </li>))}</ul>
            </div>
            <div id="mo-ta" className={sec}><h2>Mô tả</h2><p>{hotel.d} {room.name} rộng {room.size} m², {room.bed}, cửa sổ lớn đón sáng tự nhiên và phòng tắm riêng với vòi sen đứng.</p></div>
            <div id="tien-nghi" className={sec}><h2>Tiện nghi</h2><ul className="grid sm:grid-cols-2 gap-x-7 max-w-[560px]">{[...hotel.am, 'Điều hòa', 'Smart TV', 'Két an toàn'].map(t => <li key={t} className="py-2.5 border-b border-line">{t}</li>)}</ul></div>
            <div id="vi-tri" className={sec}><h2>Vị trí</h2><p>{hotel.addr}. Gần nhà hàng, quán cà phê và các điểm tham quan chính của khu {hotel.area}.</p></div>
          </div>
          <Engine key={hotel.id} hotel={hotel} roomId={roomId} setRoomId={setRoomId} init={init} />
        </div>
      </Wrap>
    </>
  )
}

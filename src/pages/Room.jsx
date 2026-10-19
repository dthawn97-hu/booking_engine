import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { HOTELS, ROOMS, img, vnd } from '../data'
import { Btn, Wrap } from '../components/ui'

const iso = d => d.toISOString().slice(0, 10)
const MON = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12']
const box = 'bg-ink2 px-[18px] py-3.5 mb-3.5 block [&_small]:block [&_small]:text-[11px] [&_small]:tracking-[.14em] [&_small]:uppercase [&_small]:text-[#9a958f] [&_select]:w-full [&_input]:w-full [&_select]:bg-transparent [&_input]:bg-transparent [&_select]:text-base [&_input]:text-base [&_select]:py-1 [&_input]:py-1 [&_option]:text-black'
const TABS = [['mo-ta', 'Mô tả'], ['tien-nghi', 'Tiện nghi'], ['xung-quanh', 'Xung quanh'], ['tuong-tu', 'Phòng tương tự']]

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

function Engine({ room, hotelId, setHotelId, init }) {
  const hotel = HOTELS.find(h => h.id === hotelId)
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
  const unit = room.p * hotel.f
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
        <h2 className="text-3xl font-normal mb-5">Đặt phòng này</h2>
        <div className="grid grid-cols-2 gap-3.5 mb-3.5">
          <DateBox label="Nhận phòng" value={cin} min={iso(new Date())} onChange={changeIn} />
          <DateBox label="Trả phòng" value={cout} min={next(cin)} onChange={e => setCout(e.target.value)} />
        </div>
        <label className={box}><small>Khách sạn</small><select value={hotelId} onChange={e => setHotelId(e.target.value)}>{HOTELS.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}</select></label>
        <label className={box}><small>Số khách</small><select value={guests} onChange={e => setGuests(+e.target.value)}>{[1, 2, 3, 4].map(n => <option key={n}>{n}</option>)}</select></label>
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

export default function Room() {
  const { id } = useParams()
  const [q] = useSearchParams()
  const room = ROOMS.find(r => r.id === id) || ROOMS[1]
  const [hotelId, setHotelId] = useState(HOTELS.some(h => h.id === q.get('hotel')) ? q.get('hotel') : HOTELS[0].id)
  const [pic, setPic] = useState(0)
  const hotel = HOTELS.find(h => h.id === hotelId)
  const today = iso(new Date())
  const init = { in: q.get('in') || today, out: q.get('out') || iso(new Date(Date.now() + 864e5)), guests: +q.get('guests') || 2 }
  const sec = 'mt-11 scroll-mt-28 [&_h2]:text-4xl [&_h2]:mb-3.5 [&_p]:text-[#5b564f] [&_p]:max-w-[62ch]'

  return (
    <>
      <section className="relative h-[300px] lg:h-[400px] bg-[#3a3a3a] bg-cover bg-center text-white flex items-end" style={{ backgroundImage: `url(${img(room.imgs[0], 2000)})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
        <Wrap className="relative pb-9 w-full flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <nav className="flex flex-wrap gap-x-10 gap-y-2 text-[13px] tracking-[.14em] uppercase">{TABS.map(([h, l], i) => <a key={h} href={`#${h}`} className={`pb-2 border-b-2 hover:border-white ${i ? 'border-transparent' : 'border-white'}`}>{l}</a>)}</nav>
          <div className="font-serif text-5xl lg:text-7xl leading-none">{vnd(room.p * hotel.f)}<span className="font-sans text-sm tracking-[.14em] uppercase ml-2.5">/ đêm</span></div>
        </Wrap>
      </section>
      <Wrap>
        <div className="pt-11 pb-7">
          <h1 className="text-5xl lg:text-6xl font-normal">{room.name}</h1>
          <p className="text-[#777] tracking-[.14em] uppercase text-sm mt-2">{hotel.name}<span className="ml-3 tracking-widest text-[#999]" aria-label="5 sao">★★★★★</span></p>
        </div>
        <div className="grid lg:grid-cols-[1fr_400px] gap-9 items-start pb-24">
          <div>
            <div className="aspect-[3/2] bg-[#cfc8bf]"><img src={img(room.imgs[pic])} alt={room.name} className="w-full h-full object-cover" /></div>
            <div className="grid grid-cols-4 gap-2.5 mt-2.5">{room.imgs.map((m, i) => <button key={m + i} aria-label={`Ảnh ${i + 1}`} aria-pressed={i === pic} onClick={() => setPic(i)} className={`aspect-[3/2] bg-[#cfc8bf] hover:opacity-100 ${i === pic ? '' : 'opacity-60'}`}><img src={img(m, 400)} alt="" className="w-full h-full object-cover" /></button>)}</div>
            <div id="mo-ta" className={sec}><h2>Mô tả</h2><p>{room.name} rộng {room.size} m², {room.bed}. Cửa sổ lớn đón sáng tự nhiên, nội thất gỗ sồi và vải lanh màu trung tính. Phòng tắm riêng với vòi sen đứng.</p></div>
            <div id="tien-nghi" className={sec}><h2>Tiện nghi</h2><ul className="grid sm:grid-cols-2 gap-x-7 max-w-[560px]">{['Wi-Fi tốc độ cao', 'Điều hòa', 'Smart TV', 'Minibar', 'Két an toàn', 'Ấm đun nước, trà và cà phê'].map(t => <li key={t} className="py-2.5 border-b border-line">{t}</li>)}</ul></div>
            <div id="xung-quanh" className={sec}><h2>Xung quanh</h2><p>Cách trung tâm 5 phút đi bộ, gần nhà hàng, quán cà phê và điểm tham quan chính.</p></div>
            <div id="tuong-tu" className={sec}><h2>Phòng tương tự</h2>
              <div className="grid sm:grid-cols-3 gap-4">{ROOMS.filter(r => r !== room).slice(0, 3).map(r => (
                <Link key={r.id} to={`/phong/${r.id}?hotel=${hotelId}`}><div className="aspect-[3/2] bg-[#cfc8bf]"><img src={img(r.imgs[0], 500)} alt="" loading="lazy" className="w-full h-full object-cover" /></div><b className="block font-serif text-[22px] font-medium mt-2.5">{r.name}</b><span className="text-mute text-sm">{vnd(r.p * hotel.f)}/đêm</span></Link>))}</div></div>
          </div>
          <Engine key={room.id} room={room} hotelId={hotelId} setHotelId={setHotelId} init={init} />
        </div>
      </Wrap>
    </>
  )
}

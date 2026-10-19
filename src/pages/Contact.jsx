import { useState } from 'react'
import { CITIES, HOTELS } from '../data'
import { Btn, PageHero, Section, inp } from '../components/ui'

const MODES = [['call', 'Tôi gọi khách sạn'], ['callback', 'Khách sạn gọi lại tôi']]
const SLOTS = ['Bất kỳ lúc nào', 'Sáng (8:00–12:00)', 'Chiều (12:00–18:00)', 'Tối (18:00–21:00)']

export default function Contact() {
  const [city, setCity] = useState(HOTELS[0].city)
  const [hid, setHid] = useState(HOTELS[0].id)
  const [mode, setMode] = useState('call')
  const [sent, setSent] = useState(false)
  const hotel = HOTELS.find(h => h.id === hid)
  const cities = CITIES.filter(c => HOTELS.some(h => h.city === c))
  const pick = c => { setCity(c); setHid(HOTELS.find(h => h.city === c).id); setSent(false) }

  return (
    <>
      <PageHero title="Liên hệ" text="Chọn chi nhánh, rồi chọn gọi cho chúng tôi hoặc để chúng tôi gọi lại." photo="1566073771259-6a8506099945" />
      <Section>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
          {/* Bước 1: chọn chi nhánh, nhóm theo thành phố */}
          <div>
            <h2 className="text-3xl mb-4">1. Chọn chi nhánh</h2>
            <div role="tablist" className="flex flex-wrap gap-2 mb-4">
              {cities.map(c => <button key={c} role="tab" aria-selected={c === city} onClick={() => pick(c)} className={`px-4 py-2 rounded-full text-sm border transition-colors ${c === city ? 'bg-ink text-white border-ink' : 'bg-white border-line hover:border-sand'}`}>{c}</button>)}
            </div>
            <ul className="grid gap-3 max-h-[420px] overflow-y-auto pr-1">
              {HOTELS.filter(h => h.city === city).map(h => (
                <li key={h.id}><label className={`flex gap-3 items-start p-4 rounded-2xl border cursor-pointer transition ${h.id === hid ? 'border-sand bg-white shadow-soft' : 'border-line bg-white hover:border-sand'}`}>
                  <input type="radio" name="branch" className="mt-1.5 accent-sand size-4" checked={h.id === hid} onChange={() => { setHid(h.id); setSent(false) }} />
                  <span><b className="block font-serif text-2xl font-medium">{h.name}</b><span className="block text-sm text-mute">{h.addr}</span></span>
                </label></li>
              ))}
            </ul>
          </div>

          {/* Bước 2: thông tin chi nhánh trước, rồi đến thông tin khách */}
          <div className="rounded-3xl bg-white shadow-soft overflow-hidden lg:sticky lg:top-28">
            <div className="bg-ink text-white p-7">
              <p className="text-xs tracking-[.14em] uppercase text-[#8fa3b8]">Chi nhánh đã chọn</p>
              <h3 className="text-4xl mt-1">{hotel.name}</h3>
              <p className="text-sm text-[#c3d1de] mt-1">{hotel.addr}</p>
              <a href={`tel:${hotel.phone.replace(/\s/g, '')}`} className="inline-block mt-4 text-2xl tracking-wider text-sand hover:text-white transition-colors">{hotel.phone}</a>
              <p className="text-xs text-[#8fa3b8]">Lễ tân phục vụ 24/7</p>
            </div>
            <div className="p-7">
              <h2 className="text-3xl mb-4">2. Cách liên hệ</h2>
              <div className="grid grid-cols-2 p-1 rounded-full bg-mist mb-6" role="tablist">
                {MODES.map(([k, l]) => <button key={k} role="tab" aria-selected={mode === k} onClick={() => { setMode(k); setSent(false) }} className={`py-2.5 text-sm rounded-full transition ${mode === k ? 'bg-ink text-white shadow-md' : 'hover:text-sand-d'}`}>{l}</button>)}
              </div>

              {mode === 'call' ? (
                <div className="text-center py-4">
                  <p className="text-[#51647a] mb-4">Gọi trực tiếp cho lễ tân {hotel.name} để đặt phòng hoặc hỏi thông tin.</p>
                  <a href={`tel:${hotel.phone.replace(/\s/g, '')}`} className="inline-flex items-center justify-center bg-sand hover:bg-[#14a39b] text-ink font-bold text-sm tracking-[.14em] uppercase px-10 h-[54px] rounded-full shadow-md transition-colors">Gọi {hotel.phone}</a>
                </div>
              ) : sent ? (
                <div className="py-4"><h3 className="text-3xl">Đã gửi yêu cầu</h3><p className="text-[#51647a] mt-2">{hotel.name} sẽ gọi lại cho bạn theo khung giờ đã chọn. Cần gấp, gọi {hotel.phone}.</p></div>
              ) : (
                <form className="grid gap-4" onSubmit={e => { e.preventDefault(); setSent(true) }}>
                  <input className={inp} required autoComplete="name" placeholder="Họ tên" aria-label="Họ tên" />
                  <input className={inp} required type="tel" pattern="[0-9+\s]{9,}" autoComplete="tel" placeholder="Số điện thoại của bạn" aria-label="Số điện thoại của bạn" />
                  <input className={inp} type="email" placeholder="Email (không bắt buộc)" aria-label="Email" />
                  <select className={inp} aria-label="Thời gian gọi lại">{SLOTS.map(s => <option key={s}>{s}</option>)}</select>
                  <textarea className={`${inp} h-28 py-3`} placeholder="Bạn cần hỗ trợ gì?" aria-label="Nội dung" />
                  <Btn className="justify-self-start">Gửi yêu cầu gọi lại</Btn>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

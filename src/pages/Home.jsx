import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HOTELS, ROOMS, img, vnd } from '../data'
import { Btn, Head, Section, Wrap } from '../components/ui'

const iso = d => d.toISOString().slice(0, 10)
const field = 'block px-6 py-4 border-r border-[#333] [&_small]:block [&_small]:text-[11px] [&_small]:tracking-[.14em] [&_small]:uppercase [&_small]:text-[#9a958f] [&_select]:w-full [&_input]:w-full [&_select]:bg-transparent [&_input]:bg-transparent [&_select]:text-base [&_input]:text-base [&_select]:py-1 [&_input]:py-1 [&_option]:text-black'

function Finder() {
  const nav = useNavigate()
  const [f, setF] = useState({ hotel: HOTELS[0].id, in: iso(new Date()), out: iso(new Date(Date.now() + 864e5)), guests: 2 })
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const go = e => { e.preventDefault(); nav(`/phong/deluxe?${new URLSearchParams(f)}`) }
  return (
    <div className="lg:absolute inset-x-0 bottom-0 bg-ink text-white">
      <Wrap>
        <form onSubmit={go} className="grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <label className={`${field} col-span-2 lg:col-span-1`}><small>Khách sạn</small><select value={f.hotel} onChange={set('hotel')}>{HOTELS.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}</select></label>
          <label className={field}><small>Nhận phòng</small><input type="date" required min={iso(new Date())} value={f.in} onChange={set('in')} /></label>
          <label className={field}><small>Trả phòng</small><input type="date" required min={f.in} value={f.out} onChange={set('out')} /></label>
          <label className={`${field} col-span-2 lg:col-span-1`}><small>Số khách</small><select value={f.guests} onChange={set('guests')}>{[1, 2, 3, 4].map(n => <option key={n}>{n}</option>)}</select></label>
          <Btn className="col-span-2 lg:col-span-1 h-14 lg:h-auto lg:px-11">Tìm phòng</Btn>
        </form>
      </Wrap>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <section className="relative lg:min-h-[calc(100vh-88px)] flex flex-col justify-end bg-[#2b2b2b] bg-cover bg-center text-white" style={{ backgroundImage: `url(${img('1566073771259-6a8506099945', 2000)})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/75" />
        <Wrap className="relative pt-40 pb-10 lg:pb-40 w-full">
          <h1 className="text-5xl lg:text-8xl font-normal max-w-[12ch]">Ở lại đủ lâu để thấy thành phố chậm lại</h1>
          <p className="max-w-[46ch] mt-5 text-lg text-[#e6e1db]">Ba khách sạn, ba nhịp sống. Chọn nơi bạn muốn thức dậy và đặt phòng trong vài bước.</p>
        </Wrap>
        <Finder />
      </section>

      <Section>
        <Head title="Các khách sạn của chúng tôi" text="Chọn một hạng phòng để vào thẳng trang đặt phòng." />
        <div className="grid gap-16">
          {HOTELS.map((h, i) => (
            <article key={h.id} id={h.id} className="group grid lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-14 items-center scroll-mt-28">
              <div className={`aspect-[4/3] bg-[#cfc8bf] overflow-hidden ${i % 2 ? 'lg:order-2' : ''}`}><img src={img(h.img, 1000)} alt={h.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <div>
                <h3 className="text-4xl lg:text-[42px] font-normal">{h.name}</h3>
                <p className="text-sand-d tracking-wide mt-1.5 mb-3.5">{h.city}</p>
                <p className="text-[#6b665f] max-w-[44ch]">{h.d}</p>
                <ul className="mt-6 border-t border-line">
                  {ROOMS.map(r => (
                    <li key={r.id}><Link to={`/phong/${r.id}?hotel=${h.id}`} className="flex justify-between py-3.5 border-b border-line hover:pl-2.5 hover:text-sand-d transition-all">
                      <b className="font-serif text-xl font-normal">{r.name}</b><span>{vnd(r.p * h.f)}/đêm</span>
                    </Link></li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section alt>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[['Giá tốt nhất', 'Đặt trực tiếp luôn rẻ hơn các kênh trung gian.'], ['Hủy miễn phí', 'Hủy trước 48 giờ, không mất phí.'], ['Nhận phòng linh hoạt', 'Gửi hành lý sớm, trả phòng muộn khi còn trống.'], ['Hỗ trợ 24/7', 'Gọi hoặc nhắn, luôn có người trả lời.']].map(([t, d]) => (
            <div key={t}><h3 className="text-2xl mb-2">{t}</h3><p className="text-sm text-[#6b665f]">{d}</p></div>
          ))}
        </div>
      </Section>
    </>
  )
}

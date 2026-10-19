import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CITIES, HOTELS, TYPES, img } from '../data'
import { Section, Wrap } from '../components/ui'
import StayBar from '../components/StayBar'

const PER_PAGE = 6
const TYPE_INFO = {
  Resort: ['Nghỉ dưỡng', 'Hồ bơi, spa và không gian xanh cho kỳ nghỉ dài.', '1576013551627-0cc20b96c2a7'],
  Boutique: ['Boutique', 'Ít phòng, thiết kế riêng, dấu ấn của từng địa phương.', '1631049307264-da0ec9d70304'],
  Business: ['Công tác', 'Vị trí trung tâm, phòng họp và chỗ làm việc yên tĩnh.', '1497366216548-37526070297c'],
  Express: ['Express', 'Phòng gọn, sạch, giá tốt cho chuyến đi ngắn.', '1578683010236-d716f9a3f461'],
}
const pill = on => `px-5 py-2 rounded-full text-sm transition-colors ${on ? 'bg-ink text-white' : 'hover:text-sand-d'}`

export default function Home() {
  const [q, setQ] = useSearchParams()
  const city = CITIES.includes(q.get('city')) ? q.get('city') : CITIES[0]
  const [area, setArea] = useState('')
  const [type, setType] = useState('')
  const [page, setPage] = useState(0)

  const inCity = HOTELS.filter(h => h.city === city)
  const areas = [...new Set(inCity.map(h => h.area))]
  const list = inCity.filter(h => (!areas.includes(area) || h.area === area) && (!type || h.type === type))
  const pages = Math.ceil(list.length / PER_PAGE)
  const cur = Math.min(page, Math.max(pages - 1, 0))
  const reset = fn => v => { fn(v); setPage(0) }

  return (
    <>
      <section className="relative lg:min-h-[calc(100vh-88px)] flex flex-col justify-end bg-[#1b3a5c] bg-cover bg-center text-white" style={{ backgroundImage: `url(${img('1566073771259-6a8506099945', 2000)})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/10 to-[#06182b]/80" />
        <Wrap className="relative pt-40 pb-8 lg:pb-52 w-full">
          <h1 className="text-5xl lg:text-8xl font-normal max-w-[12ch] [text-shadow:0_2px_30px_rgb(0_0_0/.35)]">Ở lại đủ lâu để thấy thành phố chậm lại</h1>
        </Wrap>
        <div className="lg:absolute inset-x-0 bottom-12 pb-6 lg:pb-0"><Wrap><StayBar dark /></Wrap></div>
      </section>

      <Section>
        <h2 className="text-center text-4xl lg:text-5xl mb-12">Trải nghiệm lưu trú đa dạng</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {TYPES.map(t => (
            <button key={t} onClick={() => { reset(setType)(t); document.getElementById('diem-den')?.scrollIntoView({ behavior: 'smooth' }) }} className="group text-center">
              <span className="block mx-auto size-36 lg:size-44 rounded-full overflow-hidden bg-[#c9d6e0] ring-4 ring-white shadow-soft group-hover:shadow-lift group-hover:-translate-y-1 transition-all duration-300"><img src={img(TYPE_INFO[t][2], 500)} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" /></span>
              <b className="block font-serif text-2xl font-semibold mt-4">{TYPE_INFO[t][0]}</b>
              <span className="block text-sm text-[#51647a] mt-1 max-w-[24ch] mx-auto">{TYPE_INFO[t][1]}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section alt id="diem-den">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
          <h2 className="text-4xl lg:text-5xl">Điểm đến tiếp theo</h2>
          <div role="tablist" className="flex flex-wrap border border-line rounded-full p-1 bg-white shadow-soft">
            {CITIES.map(c => <button key={c} role="tab" aria-selected={c === city} className={pill(c === city)} onClick={() => { setQ({ city: c }); setArea(''); setPage(0) }}>{c}</button>)}
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 mb-8 lg:ml-[272px] text-sm">
          {['', ...areas].map(a => <button key={a} onClick={() => reset(setArea)(a)} className={`py-1 ${(area === a || (!areas.includes(area) && !a)) ? 'text-[#0e8c86] font-medium' : 'hover:text-sand-d'}`}>{a || 'Tất cả'}</button>)}
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          <div className="flex lg:flex-col gap-3 overflow-x-auto">
            {['', ...TYPES].map(t => (
              <button key={t} onClick={() => reset(setType)(t)} aria-pressed={type === t} className={`shrink-0 px-6 py-5 border rounded-2xl bg-white text-center font-serif text-xl transition-colors ${type === t ? 'border-[#0e8c86]' : 'border-line hover:border-sand'}`}>{t || 'Tất cả loại'}</button>
            ))}
          </div>
          <div>
            {list.length === 0 ? <p className="py-16 text-center text-[#51647a]">Chưa có khách sạn loại này tại {city}.</p> : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {list.slice(cur * PER_PAGE, (cur + 1) * PER_PAGE).map(h => (
                  <Link key={h.id} to={`/khach-san/${h.id}`} className="group block bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300">
                    <div className="aspect-[16/10] bg-[#c9d6e0] overflow-hidden"><img src={img(h.img, 700)} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                    <div className="p-5"><h3 className="font-sans font-medium text-lg leading-snug min-h-[3.2rem]">{h.name}</h3><span className="inline-block mt-1 text-[#0e8c86] font-medium">Đặt phòng <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span></span></div>
                  </Link>
                ))}
              </div>
            )}
            {pages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-8 text-sm">
                <button aria-label="Trang trước" disabled={cur === 0} onClick={() => setPage(cur - 1)} className="px-3 py-1 disabled:opacity-30">‹</button>
                <span>{cur + 1} / {pages}</span>
                <button aria-label="Trang sau" disabled={cur === pages - 1} onClick={() => setPage(cur + 1)} className="px-3 py-1 disabled:opacity-30">›</button>
              </div>
            )}
            <div className="text-center mt-8"><Link to="/dat-phong" className="inline-block border border-ink rounded-full px-9 py-3 text-sm hover:shadow-lg hover:bg-ink hover:text-white transition-colors">Xem tất cả</Link></div>
          </div>
        </div>
      </Section>
    </>
  )
}

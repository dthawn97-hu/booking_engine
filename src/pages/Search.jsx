import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CITIES, HOTELS, PURPOSES, TYPES, img, vnd } from '../data'
import { Wrap } from '../components/ui'
import StayBar from '../components/StayBar'

const MIN = 500000, MAX = 4000000
const AREAS = [...new Set(HOTELS.map(h => h.area))]

function Group({ title, children }) {
  return <details open className="group py-4 border-b border-line last:border-0"><summary className="flex justify-between cursor-pointer font-medium list-none">{title}<span className="transition group-open:rotate-180">⌄</span></summary><div className="mt-3 grid gap-2.5">{children}</div></details>
}
function Check({ label, set }) {
  const [list, setList] = set
  return <label className="flex gap-2.5 items-center text-sm cursor-pointer"><input type="checkbox" className="accent-sand size-4" checked={list.includes(label)} onChange={() => setList(list.includes(label) ? list.filter(x => x !== label) : [...list, label])} />{label}</label>
}

export default function Search() {
  const [q] = useSearchParams()
  const city = q.get('city') || ''
  const [price, setPrice] = useState([MIN, MAX])
  const [types, setTypes] = useState([])
  const [purposes, setPurposes] = useState([])
  const [areas, setAreas] = useState([])
  const [sort, setSort] = useState('hot')
  const reset = () => { setPrice([MIN, MAX]); setTypes([]); setPurposes([]); setAreas([]) }

  const list = useMemo(() => HOTELS
    .filter(h => (!city || h.city === city) && h.p >= price[0] && h.p <= price[1]
      && (!types.length || types.includes(h.type)) && (!purposes.length || purposes.some(p => h.tags.includes(p))) && (!areas.length || areas.includes(h.area)))
    .sort((a, b) => sort === 'asc' ? a.p - b.p : sort === 'desc' ? b.p - a.p : (b.hot ? 1 : 0) - (a.hot ? 1 : 0)), [city, price, types, purposes, areas, sort])

  const hq = new URLSearchParams([...q].filter(([k]) => k !== 'city'))
  return (
    <>
      <div className="border-b border-line bg-white sticky top-[88px] z-30"><Wrap className="!px-0 lg:!px-6"><StayBar key={q.toString()} /></Wrap></div>
      <Wrap className="py-8">
        <div className="relative h-36 lg:h-44 bg-[#1b3a5c] bg-cover bg-center text-white flex items-center px-8 mb-6 rounded-3xl overflow-hidden" style={{ backgroundImage: `url(${img('1566073771259-6a8506099945', 1600)})` }}>
          <div className="absolute inset-0 bg-black/50" /><p className="relative font-serif text-3xl lg:text-5xl max-w-[18ch]">{city ? `Khách sạn tại ${city}` : 'Chọn nơi bạn muốn ở'}</p>
        </div>
        <div className="grid lg:grid-cols-[1fr_300px] gap-7 items-start">
          <div>
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-line text-sm">
              <span><b className="font-medium">{list.length}</b> lựa chọn</span>
              <label className="flex gap-2 items-center">Sắp xếp<select className="border border-line rounded-full h-9 px-3" value={sort} onChange={e => setSort(e.target.value)}><option value="hot">Phổ biến nhất</option><option value="asc">Giá thấp đến cao</option><option value="desc">Giá cao đến thấp</option></select></label>
            </div>
            <p className="bg-[#eaf8f7] border border-[#bfe8e5] rounded-xl px-5 py-3 text-sm mb-5">Đặt nhiều phòng? Gọi <a className="text-sand-d font-medium" href="tel:+84345647745">+84 345 647 745</a> hoặc <Link to="/lien-he" className="text-sand-d font-medium underline">gửi email</Link>, chúng tôi báo giá đoàn trong ngày.</p>
            {list.length === 0 && <div className="py-16 text-center"><p className="font-serif text-3xl">Không có khách sạn phù hợp</p><p className="text-[#51647a] mt-2">Nới rộng khoảng giá hoặc bỏ bớt bộ lọc.</p><button onClick={reset} className="mt-4 text-sand-d underline">Xóa bộ lọc</button></div>}
            <div className="grid gap-5">
              {list.map(h => (
                <article key={h.id} className="grid sm:grid-cols-[260px_1fr_170px] rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-lift transition-shadow">
                  <div className="relative bg-[#c9d6e0] min-h-44"><img src={img(h.img, 600)} alt={h.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />{h.hot && <span className="absolute top-3 left-3 bg-[#0F2B4A] text-white text-xs px-3 py-1 rounded-full">{h.hot}</span>}</div>
                  <div className="p-5">
                    <p className="text-xs text-sand-d mb-1">{h.area} · {h.type}</p>
                    <h3 className="text-2xl"><Link to={`/khach-san/${h.id}?${hq}`} className="hover:text-sand-d">{h.name}</Link></h3>
                    <p className="text-sm text-mute mt-1">{h.addr}</p>
                    <p className="text-xs text-[#0e8c86] mt-2.5">{h.tags.map(t => `✓ ${t}`).join('   ')}</p>
                    <p className="text-xs text-[#51647a] mt-2">{h.am.join(' · ')}</p>
                  </div>
                  <div className="p-5 sm:text-right flex sm:flex-col justify-between sm:justify-end items-end gap-2 border-t sm:border-t-0 sm:border-l border-line">
                    <div><p className="text-xs text-mute">Chỉ từ</p><p className="font-serif text-3xl text-[#0e8c86] leading-none">{vnd(h.p).replace('₫', '')}</p><p className="text-xs text-mute">₫ / đêm</p></div>
                    <Link to={`/khach-san/${h.id}?${hq}`} className="bg-[#1FB9B1] hover:bg-[#14a39b] text-ink text-sm font-medium px-6 py-2.5 rounded-full shadow-md transition-colors">Chọn phòng</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl shadow-soft bg-white px-5 lg:sticky lg:top-[200px]" aria-label="Bộ lọc">
            <Group title="Khoảng giá">
              <p className="text-xs text-mute">1 phòng, 1 đêm</p>
              <label className="text-sm">Từ {vnd(price[0])}<input type="range" min={MIN} max={MAX} step={100000} value={price[0]} onChange={e => setPrice([Math.min(+e.target.value, price[1]), price[1]])} className="w-full accent-sand" /></label>
              <label className="text-sm">Đến {vnd(price[1])}<input type="range" min={MIN} max={MAX} step={100000} value={price[1]} onChange={e => setPrice([price[0], Math.max(+e.target.value, price[0])])} className="w-full accent-sand" /></label>
              <button onClick={reset} className="text-xs text-sand-d text-left underline">Xóa bộ lọc</button>
            </Group>
            <Group title="Loại khách sạn">{TYPES.map(t => <Check key={t} label={t} set={[types, setTypes]} />)}</Group>
            <Group title="Kế hoạch chuyến đi">{PURPOSES.map(t => <Check key={t} label={t} set={[purposes, setPurposes]} />)}</Group>
            <Group title="Khu vực">{AREAS.map(t => <Check key={t} label={t} set={[areas, setAreas]} />)}</Group>
          </aside>
        </div>
      </Wrap>
    </>
  )
}

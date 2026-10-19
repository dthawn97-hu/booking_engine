import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CITIES } from '../data'
import { Btn, iso } from './ui'

// Thanh chọn điểm đến / ngày / khách. Dùng chung cho trang chủ (dark) và trang đặt phòng (light).
export default function StayBar({ dark }) {
  const nav = useNavigate()
  const [q] = useSearchParams()
  const [f, setF] = useState({ city: q.get('city') || '', in: q.get('in') || iso(new Date()), out: q.get('out') || iso(new Date(Date.now() + 864e5)), guests: q.get('guests') || '2' })
  const set = k => e => setF(s => ({ ...s, [k]: e.target.value, ...(k === 'in' && s.out <= e.target.value ? { out: iso(new Date(new Date(e.target.value).getTime() + 864e5)) } : {}) }))
  const go = e => { e.preventDefault(); nav(`/dat-phong?${new URLSearchParams(f)}`) }
  const cell = `block px-6 py-4 lg:border-r ${dark ? 'border-[#333] [&_small]:text-[#9a958f] [&_input]:[color-scheme:dark]' : 'border-line [&_small]:text-mute'} [&_small]:block [&_small]:text-[11px] [&_small]:tracking-[.14em] [&_small]:uppercase [&_select]:w-full [&_input]:w-full [&_select]:bg-transparent [&_input]:bg-transparent [&_select]:py-1 [&_input]:py-1 [&_option]:text-black`
  return (
    <form onSubmit={go} className={`grid grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_.8fr_auto] items-stretch ${dark ? 'bg-ink text-white' : 'bg-white text-ink'}`}>
      <label className={`${cell} col-span-2 lg:col-span-1`}><small>Điểm đến</small><select value={f.city} onChange={set('city')}><option value="">Tất cả điểm đến</option>{CITIES.map(c => <option key={c}>{c}</option>)}</select></label>
      <label className={cell}><small>Nhận phòng</small><input type="date" required min={iso(new Date())} value={f.in} onChange={set('in')} /></label>
      <label className={cell}><small>Trả phòng</small><input type="date" required min={f.in} value={f.out} onChange={set('out')} /></label>
      <label className={`${cell} col-span-2 lg:col-span-1`}><small>Khách</small><select value={f.guests} onChange={set('guests')}>{[1, 2, 3, 4, 5, 6].map(n => <option key={n}>{n}</option>)}</select></label>
      <Btn className="col-span-2 lg:col-span-1 h-14 lg:h-auto lg:px-11">Tìm phòng</Btn>
    </form>
  )
}

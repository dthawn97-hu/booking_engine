import { useState } from 'react'
import { HOTELS, NEWS, NEWS_CATS, SERVICES, SMALL_SERVICES, img } from '../data'
import { Btn, Card, Head, PageHero, Section, Wrap, inp } from '../components/ui'

export function Services() {
  return (
    <>
      <PageHero title="Dịch vụ" text="Mọi thứ bạn cần cho kỳ nghỉ, có ngay trong khách sạn." photo="1540555700478-4be289fbecef" />
      <Section>
        <Head title="Dịch vụ nổi bật" />
        <div className="grid gap-14">
          {SERVICES.map((s, i) => (
            <article key={s.n} className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className={`aspect-[3/2] bg-[#cfc8bf] rounded-3xl overflow-hidden shadow-soft ${i % 2 ? 'lg:order-2' : ''}`}><img src={img(s.img, 1000)} alt="" loading="lazy" className="w-full h-full object-cover" /></div>
              <div><h3 className="text-4xl lg:text-5xl">{s.n}</h3><p className="text-[#6b665f] mt-3 max-w-[44ch]">{s.d}</p></div>
            </article>
          ))}
        </div>
      </Section>
      <Section alt>
        <Head title="Dịch vụ khác" text="Gọi lễ tân hoặc đặt khi nhận phòng." />
        <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
          {SMALL_SERVICES.map(([n, d]) => <div key={n} className="bg-white rounded-2xl shadow-soft p-5 border-t-4 border-sand"><dt className="font-serif text-2xl">{n}</dt><dd className="text-sm text-[#6b665f] mt-1">{d}</dd></div>)}
        </dl>
      </Section>
    </>
  )
}

export function News() {
  const [cat, setCat] = useState('Tất cả')
  const list = NEWS.filter(n => cat === 'Tất cả' || n.cat === cat)
  const [lead, ...rest] = list
  const top = NEWS.filter(n => n.top)
  return (
    <>
      <PageHero title="Tin tức" text="Gợi ý địa phương và thông tin mới từ các khách sạn." photo="1495474472287-4d71bcdd2085" />
      <Wrap className="pt-10">
        <div role="tablist" className="flex flex-wrap gap-2 border-b border-line pb-4">
          {['Tất cả', ...NEWS_CATS].map(c => <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`px-5 py-2 text-sm border rounded-full transition-colors ${cat === c ? 'bg-ink text-white border-ink' : 'border-line hover:border-sand'}`}>{c}</button>)}
        </div>
      </Wrap>
      <Section>
        {!lead ? <p>Chưa có bài viết trong nhóm này.</p> : (
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            <div>
              <Card photo={lead.img}><p className="mt-4 text-sm text-sand-d">{lead.cat} · {lead.date}</p><h2 className="text-4xl lg:text-5xl mt-1 mb-2">{lead.n}</h2><p className="text-[#6b665f]">{lead.d}</p></Card>
              <div className="grid sm:grid-cols-2 gap-8 mt-12">
                {rest.map(n => <Card key={n.id} photo={n.img}><p className="mt-3 text-xs text-sand-d">{n.cat} · {n.date}</p><h3 className="text-2xl mt-1 mb-1.5">{n.n}</h3><p className="text-sm text-[#6b665f]">{n.d}</p></Card>)}
              </div>
            </div>
            <aside><h3 className="text-3xl pb-3 mb-4 border-b border-line">Tin nổi bật</h3>
              <ol className="grid gap-5">{top.map(n => <li key={n.id} className="flex gap-4"><img src={img(n.img, 200)} alt="" className="size-20 object-cover shrink-0 rounded-xl bg-[#cfc8bf]" /><div><p className="text-xs text-mute">{n.date}</p><p className="font-serif text-xl leading-snug">{n.n}</p></div></li>)}</ol>
            </aside>
          </div>
        )}
      </Section>
    </>
  )
}

export function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <PageHero title="Liên hệ" text="Gọi, nhắn hoặc ghé lễ tân. Chúng tôi trả lời trong ngày." photo="1566073771259-6a8506099945" />
      <Section>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14">
          <div className="space-y-7">
            {HOTELS.map(h => <div key={h.id}><h3 className="text-2xl">{h.name}</h3><p className="text-sm text-[#6b665f]">{h.addr}</p></div>)}
            <div><p className="text-mute text-sm">Điện thoại 24/7</p><a href="tel:+84345647745" className="text-2xl tracking-wider">+84 345 647 745</a></div>
          </div>
          {sent ? <div><h2 className="text-4xl">Đã gửi tin nhắn</h2><p className="text-[#6b665f] mt-2">Cảm ơn bạn. Chúng tôi sẽ trả lời qua email trong ngày làm việc.</p></div> : (
            <form className="grid gap-4 content-start" onSubmit={e => { e.preventDefault(); setSent(true) }}>
              <h2 className="text-4xl mb-2">Gửi tin nhắn</h2>
              <input className={inp} required placeholder="Họ tên" aria-label="Họ tên" />
              <input className={inp} required type="email" placeholder="Email" aria-label="Email" />
              <select className={inp} aria-label="Khách sạn">{HOTELS.map(h => <option key={h.id}>{h.name}</option>)}</select>
              <textarea className={`${inp} h-36 py-3`} required placeholder="Nội dung" aria-label="Nội dung" />
              <Btn className="justify-self-start">Gửi</Btn>
            </form>)}
        </div>
      </Section>
    </>
  )
}

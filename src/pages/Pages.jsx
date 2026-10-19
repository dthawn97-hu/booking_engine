import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HOTELS, NEWS, OFFERS, ROOMS, SERVICES, img } from '../data'
import { Btn, Card, Head, PageHero, Section, Wrap } from '../components/ui'

export function About() {
  return (
    <>
      <PageHero title="Giới thiệu" text="Một chuỗi nhỏ, làm kỹ từng căn phòng." photo="1564501049412-61c2a3083791" />
      <Section>
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl mb-5">Mở cửa từ năm 2012</h2>
            <div className="space-y-4 text-[#5b564f] max-w-[56ch]">
              <p>Chúng tôi bắt đầu với một khách sạn mười hai phòng ở phố cổ Hà Nội. Ngày nay, chuỗi có ba khách sạn, vẫn giữ một nguyên tắc: nhân viên nhớ tên khách và căn phòng sạch, yên tĩnh.</p>
              <p>Mỗi khách sạn do người địa phương quản lý, dùng nguyên liệu và đồ thủ công của vùng đó.</p>
            </div>
          </div>
          <div className="aspect-[4/3] bg-[#cfc8bf]"><img src={img('1542314831-068cd1dbfeeb')} alt="" className="w-full h-full object-cover" /></div>
        </div>
      </Section>
      <Section alt>
        <div className="grid sm:grid-cols-3 gap-10">
          {[['3', 'khách sạn'], ['96', 'phòng'], ['4,8/5', 'điểm đánh giá trung bình']].map(([n, l]) => <div key={l}><div className="font-serif text-6xl">{n}</div><p className="text-[#6b665f]">{l}</p></div>)}
        </div>
      </Section>
    </>
  )
}

export function Services() {
  return (
    <>
      <PageHero title="Dịch vụ" text="Mọi thứ bạn cần cho kỳ nghỉ, có ngay trong khách sạn." photo="1540555700478-4be289fbecef" />
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {SERVICES.map(s => <Card key={s.n} photo={s.img}><h3 className="text-3xl mt-4 mb-1.5">{s.n}</h3><p className="text-sm text-[#6b665f]">{s.d}</p></Card>)}
        </div>
      </Section>
    </>
  )
}

export function Offers() {
  return (
    <>
      <PageHero title="Ưu đãi" text="Đặt trực tiếp trên website để nhận giá tốt nhất." photo="1631049307264-da0ec9d70304" />
      <Section>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-14">
          {OFFERS.map(o => (
            <Card key={o.n} photo={o.img}>
              <span className="inline-block mt-4 bg-sand text-white text-xs tracking-widest px-2.5 py-0.5">{o.tag}</span>
              <h3 className="text-3xl mt-2 mb-1.5">{o.n}</h3>
              <p className="text-sm text-[#6b665f] max-w-[52ch]">{o.d}</p>
              <Link to={`/phong/${o.room}`} className="inline-block mt-3 text-sand-d tracking-wide border-b border-sand-d hover:text-ink hover:border-ink">Đặt {ROOMS.find(r => r.id === o.room).name}</Link>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}

export function News() {
  return (
    <>
      <PageHero title="Tin tức" text="Gợi ý địa phương và thông tin mới từ các khách sạn." photo="1495474472287-4d71bcdd2085" />
      <Section>
        <div className="grid md:grid-cols-3 gap-8">
          {NEWS.map(n => <Card key={n.n} photo={n.img}><time className="block mt-4 text-sm text-mute">{n.date}</time><h3 className="text-2xl mt-1 mb-2">{n.n}</h3><p className="text-sm text-[#6b665f]">{n.d}</p></Card>)}
        </div>
      </Section>
    </>
  )
}

const inp = 'w-full border border-line px-4 h-12 bg-white'

export function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <PageHero title="Liên hệ" text="Gọi, nhắn hoặc ghé lễ tân. Chúng tôi trả lời trong ngày." photo="1566073771259-6a8506099945" />
      <Section>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14">
          <div className="space-y-8">
            {HOTELS.map(h => <div key={h.id}><h3 className="text-3xl">{h.name}</h3><p className="text-[#6b665f]">{h.city}</p></div>)}
            <div><p className="text-mute text-sm">Điện thoại 24/7</p><a href="tel:+84345647745" className="text-2xl tracking-wider">+84 345 647 745</a></div>
          </div>
          {sent ? <div><h2 className="text-4xl">Đã gửi tin nhắn</h2><p className="text-[#6b665f] mt-2">Cảm ơn bạn. Chúng tôi sẽ trả lời qua email trong ngày làm việc.</p></div> : (
            <form className="grid gap-4" onSubmit={e => { e.preventDefault(); setSent(true) }}>
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

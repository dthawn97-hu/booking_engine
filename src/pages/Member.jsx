import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MEMBER_OFFERS, PARTNERS, PARTNER_OFFERS, TIERS } from '../data'
import { Btn, Card, Head, PageHero, Section, inp } from '../components/ui'

const Tiers = () => (
  <div className="grid md:grid-cols-3 gap-6">
    {TIERS.map(t => (
      <article key={t.n} className={`p-8 border ${t.hot ? 'bg-ink text-white border-ink' : 'border-line bg-white'}`}>
        <h3 className="text-4xl">{t.n}</h3><p className={`text-sm mb-5 ${t.hot ? 'text-sand' : 'text-sand-d'}`}>{t.pt}</p>
        <ul className="grid gap-2.5 text-sm">{t.perks.map(p => <li key={p} className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:size-1.5 before:bg-sand">{p}</li>)}</ul>
      </article>
    ))}
  </div>
)

function Form({ title, done, children, onDone }) {
  const [sent, setSent] = useState(false)
  if (sent) return <div><h2 className="text-4xl">{done}</h2><p className="text-[#6b665f] mt-2">Chúng tôi sẽ liên hệ qua email trong 1 ngày làm việc.</p></div>
  return (
    <form className="grid gap-4 content-start" onSubmit={e => { e.preventDefault(); setSent(true) }}>
      <h2 className="text-4xl mb-2">{title}</h2>{children}
      <Btn className="justify-self-start">Gửi đăng ký</Btn>
    </form>
  )
}

export function MemberRegister() {
  return (
    <>
      <PageHero title="Đăng ký thành viên" text="Miễn phí, nhận giá riêng ngay từ lần đặt đầu tiên." photo="1582719478250-c89cae4dc85b" />
      <Section>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14">
          <div><h2 className="text-4xl mb-4">Quyền lợi khi đăng ký</h2><ul className="grid gap-3 text-[#5b564f]"><li>Giảm 5% khi đặt trực tiếp trên website</li><li>Tích điểm, đổi thành đêm nghỉ</li><li>Ưu đãi sinh nhật hằng năm</li></ul>
            <Link to="/thanh-vien/uu-dai" className="inline-block mt-6 text-sand-d border-b border-sand-d">Xem các hạng thành viên</Link></div>
          <Form title="Tạo tài khoản" done="Đăng ký thành công">
            <input className={inp} required placeholder="Họ tên" aria-label="Họ tên" />
            <input className={inp} required type="email" placeholder="Email" aria-label="Email" />
            <input className={inp} required type="tel" pattern="[0-9+\s]{9,}" placeholder="Số điện thoại" aria-label="Số điện thoại" />
            <label className="text-sm text-mute">Ngày sinh (để nhận ưu đãi sinh nhật)<input className={`${inp} mt-1`} type="date" /></label>
            <label className="flex gap-2.5 text-sm"><input type="checkbox" required className="accent-sand size-4 mt-0.5" />Tôi đồng ý với điều khoản thành viên</label>
          </Form>
        </div>
      </Section>
    </>
  )
}

export function MemberOffers() {
  return (
    <>
      <PageHero title="Ưu đãi thành viên" text="Ở càng nhiều, ưu đãi càng lớn." photo="1611892440504-42a792e24d32" />
      <Section><Head title="Hạng thành viên" /><Tiers /></Section>
      <Section alt>
        <Head title="Ưu đãi đang áp dụng" />
        <div className="grid md:grid-cols-3 gap-8">
          {MEMBER_OFFERS.map(o => (
            <Card key={o.n} photo={o.img}><span className="inline-block mt-4 bg-sand text-white text-xs tracking-widest px-2.5 py-0.5">{o.tag}</span><h3 className="text-3xl mt-2 mb-1.5">{o.n}</h3><p className="text-sm text-[#6b665f]">{o.d}</p></Card>
          ))}
        </div>
        <Link to="/dat-phong" className="inline-block mt-10 text-sand-d border-b border-sand-d">Đặt phòng để nhận ưu đãi</Link>
      </Section>
    </>
  )
}

export function Partners() {
  return (
    <>
      <PageHero title="Đối tác hợp tác" text="Cùng đưa khách đến với những kỳ nghỉ tốt hơn." photo="1497366216548-37526070297c" />
      <Section id="chien-luoc"><Head title="Đối tác chiến lược" />
        <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">{PARTNERS.map(p => <div key={p.n} className="border-t-2 border-sand pt-3"><dt className="font-serif text-2xl">{p.n}</dt><dd className="text-sm text-[#6b665f] mt-1">{p.d}</dd></div>)}</dl>
      </Section>
      <Section alt id="uu-dai"><Head title="Ưu đãi đối tác" />
        <div className="grid md:grid-cols-3 gap-6">{PARTNER_OFFERS.map(o => <article key={o.n} className="bg-white p-8"><h3 className="text-3xl mb-2">{o.n}</h3><p className="text-sm text-[#6b665f]">{o.d}</p></article>)}</div>
      </Section>
      <Section id="dang-ky">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14">
          <div><h2 className="text-4xl lg:text-5xl mb-4">Trở thành đối tác</h2><p className="text-[#6b665f] max-w-[44ch]">Để lại thông tin, bộ phận kinh doanh sẽ gửi bảng giá và điều kiện hợp tác.</p></div>
          <Form title="Đăng ký hợp tác" done="Đã nhận đăng ký">
            <input className={inp} required placeholder="Tên công ty" aria-label="Tên công ty" />
            <input className={inp} required placeholder="Người liên hệ" aria-label="Người liên hệ" />
            <input className={inp} required type="email" placeholder="Email" aria-label="Email" />
            <select className={inp} aria-label="Loại đối tác">{['Hãng hàng không', 'Ngân hàng & thẻ', 'Đơn vị lữ hành', 'Doanh nghiệp', 'Khác'].map(t => <option key={t}>{t}</option>)}</select>
            <textarea className={`${inp} h-28 py-3`} placeholder="Đề xuất hợp tác" aria-label="Đề xuất hợp tác" />
          </Form>
        </div>
      </Section>
    </>
  )
}

import { PARTNERS, PARTNER_OFFERS } from '../data'
import { Head, PageHero, Section, inp } from '../components/ui'
import { Form } from './Member'

export default function Partners() {
  return (
    <>
      <PageHero title="Đối tác hợp tác" text="Cùng đưa khách đến với những kỳ nghỉ tốt hơn." photo="1497366216548-37526070297c" />
      <Section id="chien-luoc"><Head title="Đối tác chiến lược" />
        <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">{PARTNERS.map(p => <div key={p.n} className="bg-white rounded-2xl shadow-soft p-5 border-t-4 border-sand"><dt className="font-serif text-2xl">{p.n}</dt><dd className="text-sm text-[#51647a] mt-1">{p.d}</dd></div>)}</dl>
      </Section>
      <Section alt id="uu-dai"><Head title="Ưu đãi đối tác" />
        <div className="grid md:grid-cols-3 gap-6">{PARTNER_OFFERS.map(o => <article key={o.n} className="bg-white p-8 rounded-3xl shadow-soft"><h3 className="text-3xl mb-2">{o.n}</h3><p className="text-sm text-[#51647a]">{o.d}</p></article>)}</div>
      </Section>
      <Section id="dang-ky">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14">
          <div><h2 className="text-4xl lg:text-5xl mb-4">Trở thành đối tác</h2><p className="text-[#51647a] max-w-[44ch]">Để lại thông tin, bộ phận kinh doanh sẽ gửi bảng giá và điều kiện hợp tác.</p></div>
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

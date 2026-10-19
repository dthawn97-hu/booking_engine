import { Link } from 'react-router-dom'
import { CITIES, HOTELS, SERVICES, img, slug, vnd } from '../data'
import { Head, Section, Wrap } from '../components/ui'
import StayBar from '../components/StayBar'

export default function Home() {
  return (
    <>
      {/* Hình ảnh sản phẩm + thanh đặt phòng */}
      <section className="relative lg:min-h-[calc(100vh-88px)] flex flex-col justify-end bg-[#2b2b2b] bg-cover bg-center text-white" style={{ backgroundImage: `url(${img('1566073771259-6a8506099945', 2000)})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/75" />
        <Wrap className="relative pt-40 pb-10 lg:pb-40 w-full">
          <h1 className="text-5xl lg:text-8xl font-normal max-w-[12ch]">Ở lại đủ lâu để thấy thành phố chậm lại</h1>
          <p className="max-w-[46ch] mt-5 text-lg text-[#e6e1db]">{HOTELS.length} khách sạn tại {CITIES.length} điểm đến. Chọn nơi bạn muốn thức dậy.</p>
        </Wrap>
        <div className="lg:absolute inset-x-0 bottom-0 bg-ink"><Wrap><StayBar dark /></Wrap></div>
      </section>

      {/* Nhóm khách sạn theo vị trí */}
      <Section>
        <Head title="Khách sạn của chúng tôi" text="Chọn điểm đến, rồi chọn khách sạn phù hợp với chuyến đi của bạn." />
        <div className="grid gap-16">
          {CITIES.map(c => {
            const list = HOTELS.filter(h => h.city === c)
            return list.length > 0 && (
              <div key={c} id={slug(c)} className="scroll-mt-28">
                <h3 className="text-3xl mb-5 pb-3 border-b border-line">{c}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {list.map(h => (
                    <Link key={h.id} to={`/khach-san/${h.id}`} className="group block">
                      <div className="aspect-[3/2] bg-[#cfc8bf] overflow-hidden"><img src={img(h.img, 800)} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                      <h4 className="font-serif text-2xl mt-3.5">{h.name}</h4>
                      <p className="text-sm text-mute">{h.type} · {h.area}</p>
                      <p className="mt-1">Từ <b className="font-medium">{vnd(h.p)}</b> / đêm</p>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Giới thiệu dịch vụ */}
      <Section alt>
        <Head title="Dịch vụ trong khách sạn" text="Nhà hàng, spa và hồ bơi mở cho khách lưu trú." />
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map(s => (
            <article key={s.n}><div className="aspect-[3/2] bg-[#cfc8bf]"><img src={img(s.img, 800)} alt="" loading="lazy" className="w-full h-full object-cover" /></div><h3 className="text-3xl mt-4 mb-1.5">{s.n}</h3><p className="text-sm text-[#6b665f]">{s.d}</p></article>
          ))}
        </div>
        <Link to="/dich-vu" className="inline-block mt-10 text-sand-d tracking-wide border-b border-sand-d hover:text-ink hover:border-ink">Xem tất cả dịch vụ</Link>
      </Section>
    </>
  )
}

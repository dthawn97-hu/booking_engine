import { img } from '../data'

export const iso = d => d.toISOString().slice(0, 10)
export const Btn = ({ className = '', ...p }) => <button className={`bg-sand hover:bg-sand-d text-white font-bold text-xs tracking-[.16em] uppercase px-7 h-[50px] rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all ${className}`} {...p} />
export const Wrap = ({ className = '', ...p }) => <div className={`mx-auto max-w-[1180px] px-6 ${className}`} {...p} />
export const Section = ({ alt, id, children }) => <section id={id} className={`py-20 scroll-mt-20 ${alt ? 'bg-mist' : ''}`}><Wrap>{children}</Wrap></section>
export const Head = ({ title, text }) => <div className="max-w-[620px] mb-12"><span className="block w-12 h-[3px] rounded bg-sand mb-5" /><h2 className="text-4xl lg:text-5xl">{title}</h2>{text && <p className="text-[#6b665f] mt-3.5">{text}</p>}</div>
export const inp = 'w-full border border-line rounded-xl px-4 h-12 bg-white focus:border-sand focus:outline-none focus:ring-4 focus:ring-sand/20 transition'

export function PageHero({ title, text, photo }) {
  return (
    <section className="relative h-[320px] bg-[#3a3a3a] bg-cover bg-center text-white flex items-end rounded-b-[2.5rem] overflow-hidden" style={{ backgroundImage: `url(${img(photo)})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/20 to-[#2a1a0a]/80" />
      <Wrap className="relative pb-9 w-full"><h1 className="text-5xl lg:text-7xl font-normal">{title}</h1>{text && <p className="mt-3 max-w-[52ch] text-[#e6e1db]">{text}</p>}</Wrap>
    </section>
  )
}

export const Card = ({ photo, children }) => (
  <article className="group">
    <div className="aspect-[3/2] bg-[#cfc8bf] overflow-hidden rounded-2xl shadow-soft group-hover:shadow-lift transition-shadow"><img src={img(photo, 800)} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
    {children}
  </article>
)

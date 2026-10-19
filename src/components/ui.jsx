import { img } from '../data'

export const Btn = ({ className = '', ...p }) => <button className={`bg-sand hover:bg-sand-d text-white font-bold text-xs tracking-[.16em] uppercase px-7 h-[50px] transition-colors ${className}`} {...p} />
export const Wrap = ({ className = '', ...p }) => <div className={`mx-auto max-w-[1180px] px-6 ${className}`} {...p} />
export const Section = ({ alt, children }) => <section className={`py-24 ${alt ? 'bg-mist' : ''}`}><Wrap>{children}</Wrap></section>
export const Head = ({ title, text }) => <div className="max-w-[620px] mb-14"><h2 className="text-4xl lg:text-6xl">{title}</h2>{text && <p className="text-[#6b665f] mt-3.5">{text}</p>}</div>

export function PageHero({ title, text, photo }) {
  return (
    <section className="relative h-[340px] bg-[#3a3a3a] bg-cover bg-center text-white flex items-end" style={{ backgroundImage: `url(${img(photo)})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70" />
      <Wrap className="relative pb-10 w-full"><h1 className="text-5xl lg:text-7xl font-normal">{title}</h1>{text && <p className="mt-3 max-w-[52ch] text-[#e6e1db]">{text}</p>}</Wrap>
    </section>
  )
}

export const Card = ({ photo, children }) => (
  <article className="group">
    <div className="aspect-[3/2] bg-[#cfc8bf] overflow-hidden"><img src={img(photo, 800)} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
    {children}
  </article>
)

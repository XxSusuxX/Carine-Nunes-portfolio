import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight, Check, Menu, MessageCircle, Send, X } from 'lucide-react';
import heroImage from '@assets/Screenshot_20260807_153312_Google_1786135790989.jpg';
import redEditorialImage from '@assets/20260719_104132_1786135790990.jpg';
import blackLookImage from '@assets/Screenshot_20260807_161457_Google_1786135790989.jpg';
import closeUpImage from '@assets/20260731_204715_1786135790990.jpg';

type GalleryImage = {
  src: string;
  title: string;
  category: string;
};

const galleryImages: GalleryImage[] = [
  { src: heroImage, title: 'Beauty', category: 'Olhar' },
  { src: redEditorialImage, title: 'Editorial', category: 'Vermelho' },
  { src: blackLookImage, title: 'Full Body', category: 'Presença' },
  { src: closeUpImage, title: 'Editorial', category: 'Estrutura' },
];

const details = [
  ['Nome', 'Carine Nunes da Silva'],
  ['Idade', '17 anos'],
  ['Cidade', 'Douradina, PR'],
  ['Altura', '—'],
  ['Cabelo', 'Castanho Escuro'],
  ['Olhos', 'Castanhos'],
  ['Manequim', '—'],
  ['Calçado', '—'],
  ['Disponibilidade', 'Comercial • Editorial'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}` : undefined;

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedImage) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  const closeMenu = () => setMenuOpen(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="wordmark" href="#apresentacao" onClick={closeMenu} data-testid="link-brand">
            Carine Nunes
            <span>modelo iniciante</span>
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a className="nav-link" href="#apresentacao" data-testid="link-apresentacao">Apresentação</a>
            <a className="nav-link" href="#galeria" data-testid="link-galeria">Galeria</a>
            <a className="nav-link" href="#sobre" data-testid="link-sobre">Sobre</a>
            <a className="nav-link" href="#contato" data-testid="link-contato">Contato</a>
          </nav>
          <span className="header-mark" aria-hidden="true">CN</span>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            data-testid="button-menu"
          >
            {menuOpen ? <X size={20} strokeWidth={1.4} /> : <Menu size={21} strokeWidth={1.4} />}
          </button>
        </div>
        <nav className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação mobile">
          <a className="nav-link" href="#apresentacao" onClick={closeMenu} data-testid="mobile-link-apresentacao">Apresentação</a>
          <a className="nav-link" href="#galeria" onClick={closeMenu} data-testid="mobile-link-galeria">Galeria</a>
          <a className="nav-link" href="#sobre" onClick={closeMenu} data-testid="mobile-link-sobre">Sobre</a>
          <a className="nav-link" href="#contato" onClick={closeMenu} data-testid="mobile-link-contato">Contato</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="apresentacao" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow reveal">MODELO INICIANTE • DOURADINA, PR</div>
            <h1 className="hero-title reveal" id="hero-title">Carine<span>Nunes</span></h1>
            <p className="hero-intro reveal">Beleza autêntica. Presença que transforma marcas e conecta audiências.</p>
            <a className="hero-cta reveal" href="#galeria" data-testid="link-view-portfolio">
              Portfólio
              <ArrowUpRight size={15} strokeWidth={1.5} />
            </a>
            <div className="hero-side-note">scroll para explorar</div>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="Carine Nunes usando vestido vermelho diante do espelho" />
            <span className="hero-caption">01 — Douradina, PR</span>
          </div>
        </section>

        <section className="intro-band" aria-label="Apresentação">
          <div className="container intro-grid">
            <p className="intro-statement reveal">Uma presença <em>natural</em>, um olhar que permanece.</p>
            <p className="intro-aside reveal">Cada imagem é um primeiro passo. Um espaço para experimentar, aprender e transformar autenticidade em linguagem visual.</p>
          </div>
        </section>

        <section className="gallery-section" id="galeria" aria-labelledby="gallery-title">
          <div className="container">
            <div className="section-topline reveal">
              <h2 className="eyebrow" id="gallery-title">Portfólio</h2>
              <span className="section-number">01 / 04</span>
            </div>
            <div className="gallery-grid">
              {galleryImages.map((image, index) => (
                <button
                  className="gallery-item reveal"
                  type="button"
                  key={image.title + image.category}
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Ampliar imagem ${image.title} / ${image.category}`}
                  data-testid={`button-gallery-${index + 1}`}
                >
                  <img src={image.src} alt={`${image.title} / ${image.category}`} />
                  <span className="gallery-overlay">
                    <span className="gallery-label">
                      {image.title}
                      <span>{image.category}</span>
                    </span>
                    <span className="gallery-arrow"><ArrowUpRight size={15} strokeWidth={1.3} /></span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section" id="sobre" aria-labelledby="about-title">
          <div className="container about-grid">
            <div className="about-heading reveal">
              <div className="eyebrow">02 — Sobre</div>
              <h2 className="section-heading" id="about-title">Feita de <em>verdade.</em></h2>
            </div>
            <div className="about-body">
              <p className="about-lead reveal">Carine Nunes da Silva é uma modelo iniciante de 17 anos, natural de Douradina. Com uma beleza única e autêntica, busca sua primeira oportunidade no mundo da moda. Possui facilidade de comunicação, responsabilidade e dedicação — pronta para aprender e crescer profissionalmente.</p>
              <div className="comp-card reveal">
                <div className="comp-card-title">
                  <span className="eyebrow">Comp card</span>
                  <span>Perfil</span>
                </div>
                <div className="details-grid">
                  {details.map(([label, value]) => (
                    <div className="detail" key={label} data-testid={`detail-${label.toLowerCase().replaceAll(' ', '-')}`}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contato" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <div className="contact-heading">
              <div className="eyebrow reveal">03 — Contato</div>
              <h2 className="section-heading reveal" id="contact-title">Vamos trabalhar <em>juntos.</em></h2>
              <p className="contact-copy reveal">Interessado em trabalhar com a Carine? Entre em contato para solicitar disponibilidade, rates e propostas de parceria.</p>
              {whatsappHref ? (
                <a className="whatsapp-link reveal" href={whatsappHref} target="_blank" rel="noreferrer" data-testid="link-whatsapp">
                  <MessageCircle size={17} strokeWidth={1.4} />
                  WhatsApp — Resposta rápida
                  <ArrowUpRight size={14} strokeWidth={1.4} />
                </a>
              ) : (
                <span className="whatsapp-link reveal" aria-label="WhatsApp — Resposta rápida">
                  <MessageCircle size={17} strokeWidth={1.4} />
                  WhatsApp — Resposta rápida
                </span>
              )}
            </div>
            <form className="contact-form reveal" onSubmit={handleSubmit} data-testid="form-contact">
              <div className="field">
                <label htmlFor="name">Nome *</label>
                <input id="name" name="name" type="text" required placeholder="Seu nome" data-testid="input-name" />
              </div>
              <div className="field">
                <label htmlFor="company">Empresa / Agência</label>
                <input id="company" name="company" type="text" placeholder="Como podemos te encontrar" data-testid="input-company" />
              </div>
              <div className="field">
                <label htmlFor="message">Mensagem *</label>
                <textarea id="message" name="message" required placeholder="Conte um pouco sobre a proposta" data-testid="input-message" />
              </div>
              <button className="submit-button" type="submit" data-testid="button-submit">
                Enviar Mensagem
                <Send size={15} strokeWidth={1.5} />
              </button>
              {submitted && (
                <p className="form-success" role="status" data-testid="status-form-success">
                  <Check size={16} strokeWidth={1.6} />
                  Obrigada pela mensagem. Em breve entraremos em contato.
                </p>
              )}
              {!whatsappHref && <p className="whatsapp-notice">WhatsApp disponível mediante configuração de contato.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="footer-mark">Carine Nunes</span>
          <span>© {new Date().getFullYear()} — Portfólio autoral</span>
          <a className="footer-back" href="#apresentacao" data-testid="link-back-top">
            Voltar ao início <ArrowUp size={14} strokeWidth={1.4} />
          </a>
        </div>
      </footer>

      {selectedImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Imagem ampliada: ${selectedImage.title}`} onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close" type="button" onClick={() => setSelectedImage(null)} aria-label="Fechar imagem" data-testid="button-close-lightbox">
            <X size={19} strokeWidth={1.3} />
          </button>
          <img
            className="lightbox-image"
            src={selectedImage.src}
            alt={`${selectedImage.title} / ${selectedImage.category}`}
            onClick={(event) => event.stopPropagation()}
          />
          <span className="lightbox-caption">{selectedImage.title} / {selectedImage.category}</span>
        </div>
      )}
    </div>
  );
}

export default App;
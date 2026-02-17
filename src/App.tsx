import "./styles.css";
import StreamingCompare from "./components/StreamingCompare";
import PixLeadForm from "./components/PixLeadForm";

export default function App() {
  const BRAND = "Filmes e Cia";
  const SUPPORT_WA = "79988012359";
  const DELIVERY = "5 a 10 minutos";

  const PIX_COPIA_E_COLA = "00020126360014BR.GOV.BCB.PIX0114+55799880123595204000053039865802BR5923Leandro de Jesus Santos6009SAO PAULO62140510CPPyzIBAWb6304CDA5";

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div className="topbarRow">
            <div className="brand">{BRAND}</div>
            <div className="subBrand">Entrega {DELIVERY} • Suporte WhatsApp</div>
            <div className="nav">
              <a href="#beneficios">Benefícios</a>
              <a href="#planos">Planos</a>
              <a href="#comparacao">Comparação</a>
              <a className="btn btnPrimary" href="#pix">Assinar agora</a>
            </div>
          </div>
        </div>
      </div>

      <header className="hero">
        <div className="wrap">
          <div className="heroGrid">
            <div>
              <span className="badge">Entrega rápida • Suporte de verdade • Uso simples</span>
              <h1 className="h1">Assine hoje e comece a assistir em minutos</h1>
              <p className="lead">
                Com o <b>{BRAND}</b>, você tem uma experiência organizada e prática: instalação guiada,
                suporte via WhatsApp e entrega rápida em <b>{DELIVERY}</b>.
              </p>

              <div className="heroCTA">
                <a className="btn btnPrimary" href="#pix">Quero assinar agora</a>
                <a className="btn btnGhost" href="#planos">Ver planos</a>
                <a className="btn btnPink" href={`https://wa.me/55${SUPPORT_WA}`} target="_blank" rel="noreferrer">
                  Suporte no WhatsApp
                </a>
              </div>

              <div className="kpis">
                <div className="kpi"><b>Entrega</b><span>{DELIVERY}</span></div>
                <div className="kpi"><b>Suporte</b><span>(79) 98801-2359</span></div>
                <div className="kpi"><b>Planos</b><span>Mensal / Trimestral / Anual</span></div>
              </div>
            </div>

            <div className="heroCard">
              <div className="heroImg" />
              <div className="heroCardBody">
                <b>Ativação rápida</b>
                <div className="muted" style={{ marginTop: 6 }}>
                  Preencha seus dados, gere o Pix e finalize em poucos passos.
                </div>
                <div style={{ marginTop: 12 }}>
                  <a className="btn btnPrimary" href="#pix">Ir para o Pix</a>
                </div>
                <div className="mutedSmall" style={{ marginTop: 10 }}>
                  Dica: após pagar, clique em “Falar no WhatsApp” para agilizar.
                </div>
              </div>
            </div>
          </div>

          <section id="beneficios" className="card">
            <div className="sectionTitleRow">
              <div>
                <h2 className="h2">Por que o {BRAND} é a escolha certa?</h2>
                <p className="muted">
                  Você não precisa quebrar a cabeça: aqui o foco é <b>praticidade</b>, <b>organização</b> e <b>suporte</b>.
                </p>
              </div>
              <div className="securePill">
                <span className="dot" />
                <span>Suporte ativo</span>
              </div>
            </div>

            <div className="grid3">
              {[
                ["Entrega em minutos", `Após o pagamento, entregamos em ${DELIVERY}.`],
                ["Suporte no WhatsApp", "Ajuda para instalação e dúvidas rapidamente."],
                ["Passo a passo", "Orientação para configurar sem estresse."],
                ["Planos acessíveis", "Mensal, trimestral e anual para você escolher."],
                ["Renovação fácil", "Você renova sem complicação quando quiser."],
                ["Atendimento humanizado", "Nada de robô: fale com uma pessoa."],
              ].map(([t, d]) => (
                <div className="mini" key={t}>
                  <div style={{ fontWeight: 1100 }}>{t}</div>
                  <div className="muted" style={{ marginTop: 6 }}>{d}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="planos" className="card">
            <div className="sectionTitleRow">
              <div>
                <h2 className="h2">Planos e valores</h2>
                <p className="muted">Escolha o plano ideal e finalize via Pix.</p>
              </div>
            </div>

            <div className="plans">
              <div className="plan planHot">
                <span className="pill">Mais vendido</span>
                <div style={{ fontWeight: 1100, fontSize: 18, marginTop: 10 }}>Mensal</div>
                <div className="price">R$ 25,00</div>
                <ul>
                  <li>Entrega em {DELIVERY}</li>
                  <li>Suporte via WhatsApp</li>
                  <li>Renovação simples</li>
                </ul>
                <div style={{ marginTop: 14 }}>
                  <a className="btn btnPrimary" href="#pix">Assinar mensal</a>
                </div>
              </div>

              <div className="plan">
                <span className="pill pillGreen">Economia</span>
                <div style={{ fontWeight: 1100, fontSize: 18, marginTop: 10 }}>Trimestral</div>
                <div className="price">R$ 70,00</div>
                <ul>
                  <li>3 meses de acesso</li>
                  <li>Suporte via WhatsApp</li>
                  <li>Melhor custo-benefício</li>
                </ul>
                <div style={{ marginTop: 14 }}>
                  <a className="btn btnPrimary" href="#pix">Assinar trimestral</a>
                </div>
              </div>

              <div className="plan">
                <span className="pill pillPink">Desconto máximo</span>
                <div style={{ fontWeight: 1100, fontSize: 18, marginTop: 10 }}>Anual</div>
                <div className="price">R$ 280,00</div>
                <ul>
                  <li>12 meses de acesso</li>
                  <li>Suporte via WhatsApp</li>
                  <li>Menor preço por mês</li>
                </ul>
                <div style={{ marginTop: 14 }}>
                  <a className="btn btnPrimary" href="#pix">Assinar anual</a>
                </div>
              </div>
            </div>

    
          </section>

          <StreamingCompare />

          <PixLeadForm
            brand={BRAND}
            pixCopyPaste={PIX_COPIA_E_COLA}
            supportWhatsapp={SUPPORT_WA}
            deliveryMinutes={DELIVERY}
          />

          <section className="card">
            <h2 className="h2">FAQ</h2>
            <div className="muted" style={{ marginTop: 6 }}>
              Respostas rápidas para acelerar a decisão.
            </div>

            <div className="grid3" style={{ marginTop: 14 }}>
              {[
                ["Quanto tempo para receber?", `Em média ${DELIVERY} após confirmação.`],
                ["Como recebo o acesso?", "Enviamos as instruções e ativação no WhatsApp."],
                ["Tem suporte para instalar?", "Sim. Você chama no WhatsApp e ajudamos no passo a passo."],
              ].map(([q, a]) => (
                <div className="mini" key={q}>
                  <div style={{ fontWeight: 1100 }}>{q}</div>
                  <div className="muted" style={{ marginTop: 6 }}>{a}</div>
                </div>
              ))}
            </div>
          
          </section>

          <div className="footerRow">
            <div>© {new Date().getFullYear()} • {BRAND}</div>
          </div>
        </div>
      </header>
    </>
  );
}

import { useMemo, useState } from "react";
import QRCode from "qrcode";

function onlyDigits(s: string) {
  return (s ?? "").replace(/\D/g, "");
}

function formatBRPhone(s: string) {
  const d = onlyDigits(s).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

type Props = {
  pixCopyPaste: string;
  supportWhatsapp: string;
  deliveryMinutes: string;
  brand: string;
};

export default function PixLeadForm({
  pixCopyPaste,
  supportWhatsapp,
  deliveryMinutes,
  brand,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [pix, setPix] = useState(pixCopyPaste);
  const [qr, setQr] = useState<string | null>(null);

  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [msg, setMsg] = useState<string | null>(null);

  const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL as string | undefined;

  const canSubmit = useMemo(() => {
    const okName = name.trim().length >= 3;
    const okEmail = email.includes("@") && email.includes(".");
    const okPhone = onlyDigits(phone).length >= 10;
    const okPix = pix.trim().length > 10;
    return okName && okEmail && okPhone && okPix;
  }, [name, email, phone, pix]);

  const waLink = `https://wa.me/55${supportWhatsapp}?text=${encodeURIComponent(
    `Olá! Acabei de gerar o Pix no site ${brand}. Meu nome é ${name || "—"}.`
  )}`;

  function buildPayload(source: string) {
    return {
      event: "NEW_LEAD",
      brand,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: onlyDigits(phone),
      createdAt: new Date().toISOString(),
      delivery: deliveryMinutes,
      source,
      pixCopyPaste: pix,
    };
  }

  async function sendLead(source: string) {
    if (!WEBHOOK_URL) return;

    const payload = buildPayload(source);

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const t = await res.text().catch(() => "");
      throw new Error(`Webhook falhou (${res.status}). ${t}`.trim());
    }
  }

  /** ✅ Mostra erro e retorna false se faltar preencher os 3 campos obrigatórios */
  function validateRequiredFields(): boolean {
    const okName = name.trim().length >= 3;
    const okEmail = email.includes("@") && email.includes(".");
    const okPhone = onlyDigits(phone).length >= 10;

    if (okName && okEmail && okPhone) return true;

    setState("err");
    setMsg("Preencha Nome, E-mail e WhatsApp para continuar.");
    return false;
  }

  async function generate() {
    setMsg(null);

    if (!validateRequiredFields()) return;

    // também exige pix válido (se quiser)
    if (pix.trim().length <= 10) {
      setState("err");
      setMsg("Código Pix inválido. Verifique e tente novamente.");
      return;
    }

    setState("sending");
    try {
      const dataUrl = await QRCode.toDataURL(pix, { margin: 1, width: 360 });
      setQr(dataUrl);

      await sendLead("github-pages:generate-qr");

      setState("ok");
      setMsg(WEBHOOK_URL ? "QR gerado e dados enviados! ✅" : "QR gerado! ✅");
      document.getElementById("qrbox")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e: any) {
      setState("err");
      setMsg(e?.message ?? "Falha ao gerar/enviar. Tente novamente.");
    }
  }

  async function copyPix() {
    setMsg(null);

    if (!validateRequiredFields()) return;

    if (pix.trim().length <= 10) {
      setState("err");
      setMsg("Código Pix inválido. Verifique e tente novamente.");
      return;
    }

    setState("sending");
    try {
      await navigator.clipboard.writeText(pix);
      await sendLead("github-pages:copy-pix");

      setState("ok");
      setMsg("Código Pix copiado e dados enviados ✅");
    } catch (e: any) {
      setState("err");
      setMsg(e?.message ?? "Falhou ao copiar/enviar. Tente novamente.");
    }
  }

  return (
    <section id="pix" className="card">
      <div className="sectionTitleRow">
        <div>
          <h2 className="h2">Finalizar via Pix</h2>
          <p className="muted">
            Entrega em <b>{deliveryMinutes}</b>. Suporte no WhatsApp: <b>(79) 98801-2359</b>.
          </p>
        </div>
        <div className="securePill">
          <span className="dot" />
          <span>Entrega rápida</span>
        </div>
      </div>

      <div className="formGrid">
        <div className="field">
          <label className="label">Nome completo</label>
          <input
            className="input"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="label">E-mail</label>
          <input
            className="input"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="label">WhatsApp</label>
          <input
            className="input"
            placeholder="(DD) 9xxxx-xxxx"
            value={phone}
            onChange={(e) => setPhone(formatBRPhone(e.target.value))}
          />
        </div>
      </div>

      <div className="field" style={{ marginTop: 12 }}>
        <label className="label">Pix “copia e cola”</label>
        <textarea className="textarea" value={pix} onChange={(e) => setPix(e.target.value)} />

        <div className="row" style={{ marginTop: 10 }}>
          {/* Botões continuam "habilitados", mas ao clicar valida e mostra erro */}
          <button className="btn btnGreen" disabled={state === "sending"} onClick={generate}>
            {state === "sending" ? "Gerando..." : "Gerar QR"}
          </button>

          <button className="btn btnGhost" type="button" disabled={state === "sending"} onClick={copyPix}>
            {state === "sending" ? "Enviando..." : "Copiar Pix"}
          </button>

          <a className="btn btnPink" href={waLink} target="_blank" rel="noreferrer">
            Falar no WhatsApp
          </a>
        </div>

        {msg && <div className={state === "err" ? "msgErr" : "msgOk"}>{msg}</div>}
      </div>

      {qr && (
        <div id="qrbox" className="qrBox">
          <img className="qrImg" src={qr} alt="QR Pix" />
          <div className="qrInfo">
            <div className="qrTitle">Como pagar</div>
            <ol className="qrSteps">
              <li>Abra o app do banco</li>
              <li>Pix → Pagar com QR Code</li>
              <li>Aponte para o QR ou use “copia e cola”</li>
            </ol>
            <div className="mutedSmall" style={{ marginTop: 10 }}>
              Após o pagamento, clique em <b>“Falar no WhatsApp”</b> para agilizar a entrega.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

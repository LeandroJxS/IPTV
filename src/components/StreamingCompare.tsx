import { useMemo, useState } from "react";
import { STREAMING } from "../data/streaming";

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type PickMap = Record<string, number>;

export default function StreamingCompare() {
  const [pick, setPick] = useState<PickMap>(() => {
    const initial: PickMap = {};
    for (const s of STREAMING) initial[s.name] = 0;
    return initial;
  });

  const total = useMemo(() => {
    let sum = 0;
    for (const s of STREAMING) {
      const idx = pick[s.name] ?? 0;
      sum += s.plans[idx]?.monthly ?? 0;
    }
    return sum;
  }, [pick]);

  return (
    <section id="comparacao" className="card">
      <div className="sectionTitleRow">
        <div>
          <h2 className="h2">Quanto custa assinar tudo separado?</h2>
          <p className="muted">
            Selecione os planos e veja o custo mensal estimado
          </p>
        </div>
        <div className="totalPill">
          <div className="totalPillLabel">Total mensal estimado</div>
          <div className="totalPillValue">{brl(total)}</div>
        </div>
      </div>

      <div className="gridCompare">
        {STREAMING.map((s) => (
          <div key={s.name} className="compareItem">
            <div className="compareTop">
              <div className="logoText">{s.logoText}</div>
              <div className="compareName">{s.name}</div>
            </div>

            <label className="label">Plano</label>
            <select
              className="select"
              value={pick[s.name] ?? 0}
              onChange={(e) => setPick((p) => ({ ...p, [s.name]: Number(e.target.value) }))}
            >
              {s.plans.map((p, idx) => (
                <option key={p.label} value={idx}>
                  {p.label} — {p.monthly ? brl(p.monthly) : "ajustar valor"}
                </option>
              ))}
            </select>

            <div className="compareBottom">
              <span className="mutedSmall">Mês</span>
              <b>{(s.plans[pick[s.name] ?? 0]?.monthly ?? 0) ? brl(s.plans[pick[s.name] ?? 0]!.monthly) : "—"}</b>
            </div>
          </div>
        ))}
      </div>

      <div className="note">
        Valores mudam com promoções e reajustes.
      </div>
    </section>
  );
}

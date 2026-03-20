import { useState } from "react";

const G = {
  bg:"#080808", bg2:"#0f0f0f", bg3:"#161616",
  gold:"#C9A84C", goldDim:"#8A6D28",
  white:"#F5F0E8", muted:"rgba(245,240,232,0.42)",
  faint:"rgba(245,240,232,0.08)", border:"rgba(201,168,76,0.22)",
  green:"#4CAF7D", blue:"#5B9BD5", pink:"#D5748A", red:"#E05555",
};
const F = { d:"'Playfair Display',Georgia,serif", m:"'DM Mono',monospace", s:"'DM Sans',system-ui,sans-serif" };

const TABS = [
  { id:"treino",    icon:"▦", label:"Treino Personalizado" },
  { id:"postural",  icon:"◈", label:"Avaliação Postural" },
  { id:"calorias",  icon:"◆", label:"Calorias & Macros" },
  { id:"imc",       icon:"◉", label:"Calculadora de IMC" },
  { id:"ebook",     icon:"★", label:"Ebook Nutricional" },
];

// ── SHARED ────────────────────────────────────────────────────────────────────
const Input = ({ label, ...props }) => (
  <div style={{marginBottom:"14px"}}>
    <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2.5px",color:G.muted,marginBottom:"6px"}}>{label}</div>
    <input {...props} style={{width:"100%",background:G.faint,border:`1px solid rgba(201,168,76,0.15)`,borderRadius:"8px",
      padding:"11px 14px",color:G.white,fontSize:"14px",fontFamily:F.s,outline:"none",boxSizing:"border-box"}}/>
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div style={{marginBottom:"14px"}}>
    <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2.5px",color:G.muted,marginBottom:"6px"}}>{label}</div>
    <select {...props} style={{width:"100%",background:G.bg3,border:`1px solid rgba(201,168,76,0.15)`,borderRadius:"8px",
      padding:"11px 14px",color:G.white,fontSize:"14px",fontFamily:F.s,outline:"none",cursor:"pointer"}}>
      <option value="">Selecione...</option>
      {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  </div>
);

const Btn = ({ onClick, children, secondary }) => (
  <button onClick={onClick} style={{
    background: secondary ? "transparent" : `linear-gradient(135deg,${G.gold},${G.goldDim})`,
    border: secondary ? `1px solid ${G.border}` : "none",
    borderRadius:"8px", padding:"13px 24px",
    color: secondary ? G.gold : "#080808",
    fontFamily:F.m, fontSize:"11px", letterSpacing:"2px",
    cursor:"pointer", fontWeight:"500",
  }}>{children}</button>
);

const ResultBox = ({ children }) => (
  <div style={{background:`rgba(201,168,76,0.06)`,border:`1px solid ${G.border}`,
    borderRadius:"12px",padding:"24px",marginTop:"20px"}}>
    {children}
  </div>
);

const StatCard = ({ label, value, sub, color }) => (
  <div style={{background:G.bg3,border:`1px solid ${G.faint}`,borderRadius:"10px",
    padding:"16px",textAlign:"center"}}>
    <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2px",color:G.muted,marginBottom:"6px"}}>{label}</div>
    <div style={{fontFamily:F.m,fontSize:"24px",fontWeight:"500",color:color||G.gold,letterSpacing:"-0.5px"}}>{value}</div>
    {sub && <div style={{fontFamily:F.s,fontSize:"11px",color:G.muted,marginTop:"4px"}}>{sub}</div>}
  </div>
);

const LockBanner = () => (
  <div style={{background:`rgba(201,168,76,0.08)`,border:`1px solid ${G.border}`,
    borderLeft:`3px solid ${G.gold}`,borderRadius:"0 10px 10px 0",
    padding:"16px 20px",marginTop:"20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"12px"}}>
    <div>
      <div style={{fontFamily:F.d,fontSize:"15px",fontWeight:"700",color:G.white,marginBottom:"3px"}}>
        🔒 Resultado completo disponível para clientes
      </div>
      <div style={{fontFamily:F.s,fontSize:"13px",color:G.muted}}>
        Adquira um programa e desbloqueie análise detalhada + recomendações personalizadas.
      </div>
    </div>
    <Btn>VER PROGRAMAS →</Btn>
  </div>
);

// ── TREINO ────────────────────────────────────────────────────────────────────
function Treino({ isClient }) {
  const [form, setForm] = useState({ objetivo:"", nivel:"", dias:"", local:"", genero:"" });
  const [result, setResult] = useState(null);

  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const PLANOS = {
    "hipertrofia-iniciante-3": {
      dias: ["Seg: Peito + Tríceps","Qua: Costas + Bíceps","Sex: Pernas + Ombros"],
      dicas: ["Foque na execução antes do peso","Descanse 60-90s entre séries","Progrida 2,5kg por semana"]
    },
    "hipertrofia-intermediario-4": {
      dias: ["Seg: Peito","Ter: Costas","Qui: Pernas","Sex: Ombros + Braços"],
      dicas: ["Use periodização ondulatória","Inclua drop sets nas últimas séries","Priorize compostos"]
    },
    "emagrecimento-iniciante-3": {
      dias: ["Seg: Circuito Full Body","Qua: HIIT + Core","Sex: Circuito Full Body"],
      dicas: ["Mantenha frequência cardíaca elevada","Intervalos de 30s entre exercícios","Combine com déficit calórico"]
    },
    "emagrecimento-intermediario-4": {
      dias: ["Seg: Superior + HIIT","Ter: Inferior + Cardio","Qui: Superior + HIIT","Sex: Inferior + Cardio"],
      dicas: ["Varie a intensidade do cardio","Fasting cardio opcional pela manhã","Monitore o déficit semanal"]
    },
    "forca-iniciante-3": {
      dias: ["Seg: Squat + Acessórios","Qua: Bench + Acessórios","Sex: Deadlift + Acessórios"],
      dicas: ["Trabalhe com 80-85% do 1RM","Foco total em técnica","Progrida semanalmente"]
    },
  };

  const gerar = () => {
    if (!form.objetivo || !form.nivel || !form.dias) return;
    const key = `${form.objetivo}-${form.nivel}-${form.dias}`;
    const plano = PLANOS[key] || PLANOS[`${form.objetivo}-iniciante-3`];
    setResult(plano);
  };

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
        <Select label="OBJETIVO" value={form.objetivo} onChange={e=>set("objetivo",e.target.value)}
          options={[{v:"hipertrofia",l:"Hipertrofia — Ganhar massa"},{v:"emagrecimento",l:"Emagrecimento — Perder gordura"},{v:"forca",l:"Força — Ficar mais forte"},{v:"condicionamento",l:"Condicionamento — Melhorar preparo"},{v:"qualidade",l:"Qualidade de vida"}]}/>
        <Select label="NÍVEL" value={form.nivel} onChange={e=>set("nivel",e.target.value)}
          options={[{v:"iniciante",l:"Iniciante — menos de 1 ano"},{v:"intermediario",l:"Intermediário — 1 a 3 anos"},{v:"avancado",l:"Avançado — mais de 3 anos"}]}/>
        <Select label="DIAS POR SEMANA" value={form.dias} onChange={e=>set("dias",e.target.value)}
          options={[{v:"3",l:"3 dias"},{v:"4",l:"4 dias"},{v:"5",l:"5 dias"}]}/>
        <Select label="LOCAL DE TREINO" value={form.local} onChange={e=>set("local",e.target.value)}
          options={[{v:"academia",l:"Academia completa"},{v:"casa",l:"Casa com equipamentos"},{v:"sem",l:"Sem equipamentos"}]}/>
      </div>
      <Select label="GÊNERO" value={form.genero} onChange={e=>set("genero",e.target.value)}
        options={[{v:"m",l:"Masculino"},{v:"f",l:"Feminino"}]}/>

      <Btn onClick={gerar}>GERAR MEU TREINO →</Btn>

      {result && (
        <ResultBox>
          <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"3px",color:G.gold,marginBottom:"16px"}}>
            SEU PLANO DE TREINO
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"10px",marginBottom:"20px"}}>
            {result.dias.map((d,i) => (
              <div key={i} style={{background:G.bg3,borderRadius:"8px",padding:"12px",border:`1px solid ${G.faint}`}}>
                <div style={{fontFamily:F.m,fontSize:"9px",color:G.gold,letterSpacing:"1px",marginBottom:"4px"}}>DIA {i+1}</div>
                <div style={{fontFamily:F.s,fontSize:"13px",color:G.white,lineHeight:1.4}}>{d}</div>
              </div>
            ))}
          </div>
          {isClient ? (
            <>
              <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"3px",color:G.gold,marginBottom:"12px"}}>DICAS DO DANIEL</div>
              {result.dicas.map((d,i) => (
                <div key={i} style={{display:"flex",gap:"10px",marginBottom:"8px"}}>
                  <span style={{color:G.green,fontSize:"13px",flexShrink:0}}>✓</span>
                  <span style={{fontFamily:F.s,fontSize:"13px",color:G.muted}}>{d}</span>
                </div>
              ))}
            </>
          ) : <LockBanner/>}
        </ResultBox>
      )}
    </div>
  );
}

// ── POSTURAL ──────────────────────────────────────────────────────────────────
function Postural({ isClient }) {
  const [step, setStep] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [result, setResult] = useState(null);

  const PERGUNTAS = [
    { id:"dor_costas", texto:"Você sente dor nas costas com frequência?", opts:["Nunca","Às vezes","Frequentemente","Sempre"] },
    { id:"postura_trabalho", texto:"Qual é sua postura predominante no trabalho?", opts:["Sentado por muitas horas","Em pé por muitas horas","Alternado","Ativo / em movimento"] },
    { id:"dor_pescoco", texto:"Sente dor ou tensão no pescoço/ombros?", opts:["Nunca","Às vezes","Frequentemente","Sempre"] },
    { id:"joelhos", texto:"Tem algum desconforto nos joelhos?", opts:["Não","Leve","Moderado","Intenso"] },
    { id:"mobilidade", texto:"Como você avalia sua mobilidade/flexibilidade?", opts:["Muito boa","Boa","Regular","Ruim"] },
  ];

  const responder = (id, val) => {
    const novo = {...respostas, [id]: val};
    setRespostas(novo);
    if (step < PERGUNTAS.length - 1) {
      setStep(step + 1);
    } else {
      const problemas = [];
      if (novo.dor_costas === "Frequentemente" || novo.dor_costas === "Sempre") problemas.push("Lordose lombar acentuada");
      if (novo.postura_trabalho === "Sentado por muitas horas") problemas.push("Encurtamento de flexores do quadril");
      if (novo.dor_pescoco === "Frequentemente" || novo.dor_pescoco === "Sempre") problemas.push("Protrusão cervical / postura de cabeça anterior");
      if (novo.joelhos === "Moderado" || novo.joelhos === "Intenso") problemas.push("Possível desequilíbrio muscular nos membros inferiores");
      if (novo.mobilidade === "Ruim" || novo.mobilidade === "Regular") problemas.push("Mobilidade reduzida — risco aumentado de lesão");
      setResult({ problemas, score: Math.max(0, 5 - problemas.length) });
    }
  };

  const reset = () => { setStep(0); setRespostas({}); setResult(null); };

  if (result) return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"20px"}}>
        <StatCard label="SCORE POSTURAL" value={`${result.score}/5`}
          color={result.score >= 4 ? G.green : result.score >= 2 ? G.gold : G.red}
          sub={result.score >= 4 ? "Boa postura" : result.score >= 2 ? "Atenção necessária" : "Correção urgente"}/>
        <StatCard label="PONTOS DE ATENÇÃO" value={result.problemas.length}
          color={result.problemas.length === 0 ? G.green : G.red}
          sub="áreas identificadas"/>
      </div>

      {result.problemas.length > 0 && (
        <div style={{background:G.bg3,borderRadius:"10px",padding:"16px 18px",marginBottom:"16px",border:`1px solid ${G.faint}`}}>
          <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"3px",color:G.gold,marginBottom:"12px"}}>PONTOS IDENTIFICADOS</div>
          {result.problemas.map((p,i) => (
            <div key={i} style={{display:"flex",gap:"10px",marginBottom:"8px"}}>
              <span style={{color:G.red,fontSize:"13px",flexShrink:0}}>!</span>
              <span style={{fontFamily:F.s,fontSize:"13px",color:G.muted}}>{p}</span>
            </div>
          ))}
        </div>
      )}

      {isClient ? (
        <ResultBox>
          <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"3px",color:G.gold,marginBottom:"12px"}}>RECOMENDAÇÕES PERSONALIZADAS</div>
          {[
            "Inclua 10 min de mobilidade matinal diariamente",
            "Priorize exercícios de fortalecimento do core",
            "Corrija a posição do monitor — altura dos olhos",
            "A cada 1h sentado, levante e caminhe por 5 min",
            "Alongamento de psoas e isquiotibiais 3x por semana",
          ].map((r,i) => (
            <div key={i} style={{display:"flex",gap:"10px",marginBottom:"8px"}}>
              <span style={{color:G.green,fontSize:"13px",flexShrink:0}}>✓</span>
              <span style={{fontFamily:F.s,fontSize:"13px",color:G.muted}}>{r}</span>
            </div>
          ))}
        </ResultBox>
      ) : <LockBanner/>}

      <div style={{marginTop:"16px"}}><Btn secondary onClick={reset}>REFAZER AVALIAÇÃO</Btn></div>
    </div>
  );

  const q = PERGUNTAS[step];
  return (
    <div>
      <div style={{display:"flex",gap:"6px",marginBottom:"24px"}}>
        {PERGUNTAS.map((_,i) => (
          <div key={i} style={{flex:1,height:"3px",borderRadius:"2px",
            background: i < step ? G.gold : i === step ? G.gold : G.faint,
            opacity: i === step ? 1 : i < step ? 0.7 : 0.3}}/>
        ))}
      </div>
      <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"3px",color:G.muted,marginBottom:"8px"}}>
        PERGUNTA {step+1} DE {PERGUNTAS.length}
      </div>
      <div style={{fontFamily:F.d,fontSize:"20px",fontWeight:"700",color:G.white,marginBottom:"20px",lineHeight:1.3}}>
        {q.texto}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        {q.opts.map(o => (
          <button key={o} onClick={() => responder(q.id, o)} style={{
            background:G.faint, border:`1px solid rgba(201,168,76,0.15)`,
            borderRadius:"8px", padding:"13px 18px",
            color:G.white, fontFamily:F.s, fontSize:"14px",
            cursor:"pointer", textAlign:"left",
            transition:"all 0.2s",
          }}
          onMouseEnter={e=>{e.target.style.background=`rgba(201,168,76,0.1)`;e.target.style.borderColor=G.border}}
          onMouseLeave={e=>{e.target.style.background=G.faint;e.target.style.borderColor="rgba(201,168,76,0.15)"}}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── CALORIAS ──────────────────────────────────────────────────────────────────
function Calorias({ isClient }) {
  const [form, setForm] = useState({ peso:"", altura:"", idade:"", sexo:"", atividade:"", objetivo:"" });
  const [result, setResult] = useState(null);
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const calcular = () => {
    const { peso, altura, idade, sexo, atividade, objetivo } = form;
    if (!peso || !altura || !idade || !sexo || !atividade || !objetivo) return;
    const p = parseFloat(peso), h = parseFloat(altura), i = parseFloat(idade);
    const tmb = sexo === "m"
      ? 88.36 + (13.4 * p) + (4.8 * h) - (5.7 * i)
      : 447.6 + (9.2 * p) + (3.1 * h) - (4.3 * i);
    const fatores = { sedentario:1.2, leve:1.375, moderado:1.55, intenso:1.725, muito_intenso:1.9 };
    const tdee = Math.round(tmb * (fatores[atividade] || 1.55));
    const ajuste = objetivo === "ganho" ? 300 : objetivo === "perda" ? -400 : 0;
    const meta = tdee + ajuste;
    const prot = Math.round(p * (objetivo === "ganho" ? 2.2 : 2.0));
    const gord = Math.round((meta * 0.25) / 9);
    const carb = Math.round((meta - (prot * 4) - (gord * 9)) / 4);
    setResult({ tmb: Math.round(tmb), tdee, meta, prot, gord, carb });
  };

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
        <Input label="PESO (kg)" type="number" placeholder="Ex: 75" value={form.peso} onChange={e=>set("peso",e.target.value)}/>
        <Input label="ALTURA (cm)" type="number" placeholder="Ex: 175" value={form.altura} onChange={e=>set("altura",e.target.value)}/>
        <Input label="IDADE" type="number" placeholder="Ex: 28" value={form.idade} onChange={e=>set("idade",e.target.value)}/>
        <Select label="SEXO" value={form.sexo} onChange={e=>set("sexo",e.target.value)}
          options={[{v:"m",l:"Masculino"},{v:"f",l:"Feminino"}]}/>
      </div>
      <Select label="NÍVEL DE ATIVIDADE" value={form.atividade} onChange={e=>set("atividade",e.target.value)}
        options={[{v:"sedentario",l:"Sedentário — sem exercício"},{v:"leve",l:"Leve — 1-3x por semana"},{v:"moderado",l:"Moderado — 3-5x por semana"},{v:"intenso",l:"Intenso — 6-7x por semana"},{v:"muito_intenso",l:"Muito intenso — 2x por dia"}]}/>
      <Select label="OBJETIVO" value={form.objetivo} onChange={e=>set("objetivo",e.target.value)}
        options={[{v:"ganho",l:"Ganhar massa muscular"},{v:"manutencao",l:"Manter peso"},{v:"perda",l:"Emagrecer"}]}/>

      <Btn onClick={calcular}>CALCULAR →</Btn>

      {result && (
        <ResultBox>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:"10px",marginBottom:"20px"}}>
            <StatCard label="METABOLISMO BASAL" value={result.tmb} sub="kcal/dia"/>
            <StatCard label="GASTO TOTAL" value={result.tdee} sub="kcal/dia" color={G.white}/>
            <StatCard label="META CALÓRICA" value={result.meta} sub="kcal/dia" color={G.green}/>
          </div>

          {isClient ? (
            <>
              <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"3px",color:G.gold,marginBottom:"12px"}}>DISTRIBUIÇÃO DE MACROS</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px"}}>
                <StatCard label="PROTEÍNA" value={`${result.prot}g`} sub={`${result.prot*4} kcal`} color={G.blue}/>
                <StatCard label="CARBOIDRATO" value={`${result.carb}g`} sub={`${result.carb*4} kcal`} color={G.gold}/>
                <StatCard label="GORDURA" value={`${result.gord}g`} sub={`${result.gord*9} kcal`} color={G.pink}/>
              </div>
            </>
          ) : <LockBanner/>}
        </ResultBox>
      )}
    </div>
  );
}

// ── IMC ───────────────────────────────────────────────────────────────────────
function IMC({ isClient }) {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [result, setResult] = useState(null);

  const calcular = () => {
    const p = parseFloat(peso), h = parseFloat(altura) / 100;
    if (!p || !h) return;
    const imc = p / (h * h);
    const imcR = parseFloat(imc.toFixed(1));
    let cat, cor, desc;
    if      (imc < 18.5) { cat="Abaixo do peso"; cor=G.blue; desc="Considere aumentar a ingestão calórica com qualidade nutricional." }
    else if (imc < 25)   { cat="Peso normal"; cor=G.green; desc="Parabéns! Mantenha os bons hábitos de treino e alimentação." }
    else if (imc < 30)   { cat="Sobrepeso"; cor=G.gold; desc="Atenção: um déficit calórico moderado com treino pode ajudar." }
    else if (imc < 35)   { cat="Obesidade grau I"; cor="#E08030"; desc="Recomenda-se acompanhamento profissional para emagrecimento saudável." }
    else                  { cat="Obesidade grau II+"; cor=G.red; desc="Procure acompanhamento médico e nutricional especializado." }
    const pesoIdealMin = Math.round(18.5 * h * h);
    const pesoIdealMax = Math.round(24.9 * h * h);
    setResult({ imc: imcR, cat, cor, desc, pesoIdealMin, pesoIdealMax });
  };

  const pct = result ? Math.min(100, Math.max(0, ((result.imc - 15) / (40 - 15)) * 100)) : 0;

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
        <Input label="PESO (kg)" type="number" placeholder="Ex: 75" value={peso} onChange={e=>setPeso(e.target.value)}/>
        <Input label="ALTURA (cm)" type="number" placeholder="Ex: 175" value={altura} onChange={e=>setAltura(e.target.value)}/>
      </div>
      <Btn onClick={calcular}>CALCULAR IMC →</Btn>

      {result && (
        <ResultBox>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"20px"}}>
            <StatCard label="SEU IMC" value={result.imc} color={result.cor} sub={result.cat}/>
            <StatCard label="PESO IDEAL" value={`${result.pesoIdealMin}–${result.pesoIdealMax}kg`} sub="faixa saudável" color={G.green}/>
          </div>

          {/* Bar */}
          <div style={{marginBottom:"20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
              {["Abaixo","Normal","Sobrepeso","Obesidade"].map(l=>(
                <span key={l} style={{fontFamily:F.m,fontSize:"9px",color:G.muted,letterSpacing:"0.5px"}}>{l}</span>
              ))}
            </div>
            <div style={{height:"8px",borderRadius:"4px",background:G.faint,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",left:0,top:0,bottom:0,width:"20%",background:G.blue,opacity:0.5}}/>
              <div style={{position:"absolute",left:"20%",top:0,bottom:0,width:"26%",background:G.green,opacity:0.5}}/>
              <div style={{position:"absolute",left:"46%",top:0,bottom:0,width:"22%",background:G.gold,opacity:0.5}}/>
              <div style={{position:"absolute",left:"68%",top:0,bottom:0,width:"32%",background:G.red,opacity:0.5}}/>
              <div style={{position:"absolute",top:"-2px",width:"12px",height:"12px",borderRadius:"50%",
                background:result.cor,border:"2px solid #080808",
                left:`calc(${pct}% - 6px)`,transition:"left 0.5s"}}/>
            </div>
          </div>

          <p style={{fontFamily:F.s,fontSize:"14px",color:G.muted,lineHeight:1.7,margin:0}}>
            {result.desc}
          </p>

          {!isClient && <LockBanner/>}
        </ResultBox>
      )}
    </div>
  );
}

// ── EBOOK ─────────────────────────────────────────────────────────────────────
function Ebook({ isClient }) {
  const [form, setForm] = useState({ objetivo:"", restricoes:"", refeicoes:"", cozinha:"" });
  const [result, setResult] = useState(null);
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const PLANOS = {
    hipertrofia: {
      titulo:"Protocolo de Ganho de Massa",
      resumo:"Superávit calórico controlado com foco em proteína alta e carboidratos estratégicos.",
      refeicoes:[
        {nome:"Café da manhã",ex:"Ovos mexidos (3) + aveia com banana + café"},
        {nome:"Pré-treino",ex:"Batata doce + frango grelhado"},
        {nome:"Pós-treino",ex:"Whey protein + fruta"},
        {nome:"Almoço",ex:"Arroz integral + feijão + carne + salada"},
        {nome:"Jantar",ex:"Salmão + legumes no vapor + ovo"},
      ]
    },
    emagrecimento: {
      titulo:"Protocolo de Emagrecimento Inteligente",
      resumo:"Déficit calórico de 400kcal com alta proteína para preservar massa muscular.",
      refeicoes:[
        {nome:"Café da manhã",ex:"Iogurte grego + frutas vermelhas + chia"},
        {nome:"Lanche",ex:"Ovo cozido + castanhas"},
        {nome:"Almoço",ex:"Frango + legumes refogados + salada verde"},
        {nome:"Pré-treino",ex:"Banana + whey"},
        {nome:"Jantar",ex:"Omelete de claras + legumes"},
      ]
    },
  };

  const gerar = () => {
    if (!form.objetivo) return;
    setResult(PLANOS[form.objetivo] || PLANOS.hipertrofia);
  };

  return (
    <div>
      <Select label="OBJETIVO NUTRICIONAL" value={form.objetivo} onChange={e=>set("objetivo",e.target.value)}
        options={[{v:"hipertrofia",l:"Ganhar massa muscular"},{v:"emagrecimento",l:"Emagrecer com saúde"},{v:"manutencao",l:"Manter o peso"}]}/>
      <Select label="RESTRIÇÕES ALIMENTARES" value={form.restricoes} onChange={e=>set("restricoes",e.target.value)}
        options={[{v:"nenhuma",l:"Nenhuma"},{v:"lactose",l:"Intolerância à lactose"},{v:"gluten",l:"Intolerância ao glúten"},{v:"vegetariano",l:"Vegetariano"},{v:"vegano",l:"Vegano"}]}/>
      <Select label="REFEIÇÕES POR DIA" value={form.refeicoes} onChange={e=>set("refeicoes",e.target.value)}
        options={[{v:"3",l:"3 refeições"},{v:"4",l:"4 refeições"},{v:"5",l:"5 refeições"},{v:"6",l:"6 refeições"}]}/>
      <Select label="HABILIDADE NA COZINHA" value={form.cozinha} onChange={e=>set("cozinha",e.target.value)}
        options={[{v:"basico",l:"Básico — receitas simples"},{v:"intermediario",l:"Intermediário"},{v:"avancado",l:"Avançado"}]}/>

      <Btn onClick={gerar}>GERAR MEU EBOOK →</Btn>

      {result && (
        <ResultBox>
          <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"3px",color:G.gold,marginBottom:"8px"}}>EBOOK GERADO</div>
          <div style={{fontFamily:F.d,fontSize:"20px",fontWeight:"700",color:G.white,marginBottom:"8px"}}>{result.titulo}</div>
          <p style={{fontFamily:F.s,fontSize:"14px",color:G.muted,lineHeight:1.7,margin:"0 0 20px"}}>{result.resumo}</p>

          {isClient ? (
            <>
              <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"3px",color:G.gold,marginBottom:"12px"}}>PLANO DE REFEIÇÕES</div>
              {result.refeicoes.map((r,i) => (
                <div key={i} style={{display:"flex",gap:"14px",alignItems:"flex-start",marginBottom:"12px",
                  background:G.bg3,borderRadius:"8px",padding:"12px 14px",border:`1px solid ${G.faint}`}}>
                  <div style={{fontFamily:F.m,fontSize:"9px",color:G.gold,letterSpacing:"1px",
                    minWidth:"80px",paddingTop:"2px"}}>{r.nome.toUpperCase()}</div>
                  <div style={{fontFamily:F.s,fontSize:"13px",color:G.muted,lineHeight:1.5}}>{r.ex}</div>
                </div>
              ))}
              <div style={{marginTop:"16px"}}>
                <Btn>⬇ BAIXAR EBOOK PDF</Btn>
              </div>
            </>
          ) : <LockBanner/>}
        </ResultBox>
      )}
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("treino");
  const [isClient] = useState(false); // true quando logado

  const TOOLS = { treino: Treino, postural: Postural, calorias: Calorias, imc: IMC, ebook: Ebook };
  const Tool = TOOLS[activeTab];

  return (
    <div style={{minHeight:"100vh",background:G.bg,color:G.white,fontFamily:F.s}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <style>{`*{box-sizing:border-box} ::-webkit-scrollbar{display:none} select option{background:#161616;color:#F5F0E8}`}</style>

      {/* Header */}
      <div style={{padding:"32px clamp(16px,4vw,60px) 0",borderBottom:`1px solid ${G.faint}`}}>
        <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"4px",color:G.gold,marginBottom:"6px"}}>FERRAMENTAS TEAMDR</div>
        <h1 style={{margin:"0 0 24px",fontFamily:F.d,fontSize:"clamp(24px,4vw,36px)",fontWeight:"700",color:G.white,letterSpacing:"-0.5px"}}>
          Suas ferramentas gratuitas
        </h1>

        {/* Tabs */}
        <div style={{display:"flex",gap:"4px",flexWrap:"wrap",paddingBottom:"0"}}>
          {TABS.map(t => (
            <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{
              fontFamily:F.m, fontSize:"10px", letterSpacing:"1px",
              background: activeTab===t.id ? `linear-gradient(135deg,${G.gold},${G.goldDim})` : "transparent",
              border: activeTab===t.id ? "none" : `1px solid ${G.faint}`,
              borderBottom: "none",
              borderRadius:"8px 8px 0 0",
              padding:"10px 18px",
              color: activeTab===t.id ? "#080808" : G.muted,
              cursor:"pointer", transition:"all 0.2s",
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{padding:"32px clamp(16px,4vw,60px)"}}>
        <Tool isClient={isClient}/>
      </div>
    </div>
  );
}

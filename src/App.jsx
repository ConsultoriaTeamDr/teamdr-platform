import { useState } from "react";

const G = {
  bg:"#080808", bg2:"#0f0f0f", bg3:"#161616",
  gold:"#C9A84C", goldDim:"#8A6D28",
  white:"#F5F0E8", muted:"rgba(245,240,232,0.42)",
  faint:"rgba(245,240,232,0.08)", border:"rgba(201,168,76,0.22)",
  green:"#4CAF7D", blue:"#5B9BD5", pink:"#D5748A", red:"#E05555",
};
const F = {
  d:"'Playfair Display',Georgia,serif",
  m:"'DM Mono',monospace",
  s:"'DM Sans',system-ui,sans-serif",
};

// ── PRODUTOS ─────────────────────────────────────────────────────────────────
const TREINOS = [
  { id:"hm1",  obj:"hipertrofia",     gen:"Homem",  title:"Hipertrofia Máxima",         sub:"12 semanas · 5x/sem · Volume progressivo",      price:97,  badge:"MAIS VENDIDO", kiwify:"#" },
  { id:"hf1",  obj:"hipertrofia",     gen:"Mulher", title:"Hipertrofia Feminina",        sub:"10 semanas · 4x/sem · Glúteo e posterior",      price:97,  badge:null,           kiwify:"#" },
  { id:"hm4",  obj:"hipertrofia",     gen:"Ambos",  title:"Massa Total 16 Semanas",      sub:"Treino + dieta + suplementação + suporte",      price:247, badge:"PREMIUM",       kiwify:"#" },
  { id:"em1",  obj:"emagrecimento",   gen:"Homem",  title:"Cutting Inteligente",         sub:"8 semanas · Preservação muscular máxima",       price:97,  badge:null,           kiwify:"#" },
  { id:"ef1",  obj:"emagrecimento",   gen:"Mulher", title:"Emagrecimento Definitivo",    sub:"10 semanas · Funcional + HIIT",                 price:97,  badge:"NOVO",          kiwify:"#" },
  { id:"em3",  obj:"emagrecimento",   gen:"Ambos",  title:"Transformação Total 12 Sem",  sub:"Treino + dieta + acompanhamento semanal",       price:297, badge:"PREMIUM",       kiwify:"#" },
  { id:"fm1",  obj:"forca",           gen:"Homem",  title:"Força Bruta — Powerlifting",  sub:"16 semanas · Squat, Bench, Deadlift",           price:97,  badge:null,            kiwify:"#" },
  { id:"ff1",  obj:"forca",           gen:"Mulher", title:"Mulher Forte",                sub:"12 semanas · Base de força funcional",          price:97,  badge:"NOVO",          kiwify:"#" },
  { id:"cm1",  obj:"condicionamento", gen:"Homem",  title:"Condicionamento Extremo",     sub:"8 semanas · HIIT + corrida + metabólico",       price:87,  badge:null,            kiwify:"#" },
  { id:"cf1",  obj:"condicionamento", gen:"Mulher", title:"Cardio & Tônus",              sub:"8 semanas · Funcional + resistência",           price:87,  badge:null,            kiwify:"#" },
  { id:"cm2",  obj:"condicionamento", gen:"Ambos",  title:"Atleta do Dia a Dia",         sub:"Performance, disposição e saúde cardiovascular",price:197, badge:null,            kiwify:"#" },
  { id:"qm1",  obj:"qualidade",       gen:"Homem",  title:"Executivo Ativo",             sub:"3x/sem · Alta eficiência · Pouco tempo",        price:77,  badge:"DESTAQUE",      kiwify:"#" },
  { id:"qf1",  obj:"qualidade",       gen:"Mulher", title:"Bem-Estar Feminino Total",    sub:"3x/sem · Mobilidade + força + saúde",           price:77,  badge:null,            kiwify:"#" },
  { id:"qa1",  obj:"qualidade",       gen:"Ambos",  title:"Protocolo Longevidade Ativa", sub:"Treino + hábitos + mindset — para a vida toda", price:197, badge:null,            kiwify:"#" },
];

const DIETAS = [
  { id:"d-hiper",  nome:"Dieta para Hipertrofia",    desc:"Superávit calórico inteligente com alta proteína. Ideal para quem quer ganhar massa preservando a definição.",        preco:67,  badge:null,      kiwify:"#" },
  { id:"d-emag",   nome:"Dieta de Emagrecimento",    desc:"Déficit calórico sem sofrimento. Receitas práticas, lista de compras e calculadora de macros inclusa.",              preco:67,  badge:"MAIS PEDIDO", kiwify:"#" },
  { id:"d-manut",  nome:"Dieta de Manutenção",       desc:"Equilíbrio calórico com foco em qualidade nutricional e hábitos sustentáveis a longo prazo.",                       preco:47,  badge:null,      kiwify:"#" },
  { id:"d-veg",    nome:"Dieta Vegetariana Fit",     desc:"Plano 100% vegetariano com todas as proteínas e nutrientes necessários para treinar com alta performance.",          preco:67,  badge:null,      kiwify:"#" },
  { id:"d-compl",  nome:"Plano Nutricional Completo",desc:"O mais completo: anamnese nutricional + plano personalizado pela nutricionista parceira do Daniel. Atendimento individual.", preco:197, badge:"PREMIUM", kiwify:"#" },
];

const POSTURAL = {
  id:"post-1", nome:"Avaliação Postural Completa",
  desc:"Questionário detalhado + análise posicional + plano de correção personalizado. Identifica desequilíbrios que sabotam seus resultados no treino.",
  preco:47, kiwify:"#",
  motivos:[
    "Treinar com desequilíbrios posturais aumenta o risco de lesão",
    "Má postura reduz a eficiência dos exercícios e o ganho muscular",
    "Dores nas costas, pescoço e joelhos têm origem postural em 70% dos casos",
    "Corrigir a postura melhora performance, estética e qualidade de vida",
  ],
};

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────
const FBtn = ({ onClick, children, secondary, disabled, full }) => (
  <button onClick={onClick} disabled={disabled} style={{
    background: disabled ? G.faint : secondary ? "transparent" : `linear-gradient(135deg,${G.gold},${G.goldDim})`,
    border: secondary ? `1px solid ${G.border}` : disabled ? `1px solid ${G.faint}` : "none",
    borderRadius:"8px", padding:"13px 24px",
    color: disabled ? G.muted : secondary ? G.gold : "#080808",
    fontFamily:F.m, fontSize:"11px", letterSpacing:"2px",
    cursor: disabled ? "not-allowed" : "pointer", fontWeight:"500",
    width: full ? "100%" : "auto",
    transition:"all 0.2s",
  }}>{children}</button>
);

const FSelect = ({ label, options, ...props }) => (
  <div style={{marginBottom:"14px"}}>
    <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2.5px",color:G.muted,marginBottom:"6px"}}>{label}</div>
    <select {...props} style={{width:"100%",background:G.bg3,border:`1px solid rgba(201,168,76,0.15)`,
      borderRadius:"8px",padding:"11px 14px",color:G.white,fontSize:"14px",fontFamily:F.s,outline:"none",cursor:"pointer"}}>
      <option value="">Selecione...</option>
      {options.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  </div>
);

const FInput = ({ label, ...props }) => (
  <div style={{marginBottom:"14px"}}>
    <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2.5px",color:G.muted,marginBottom:"6px"}}>{label}</div>
    <input {...props} style={{width:"100%",background:G.faint,border:`1px solid rgba(201,168,76,0.15)`,
      borderRadius:"8px",padding:"11px 14px",color:G.white,fontSize:"14px",fontFamily:F.s,outline:"none",boxSizing:"border-box"}}/>
  </div>
);

const FStatCard = ({ label, value, sub, color }) => (
  <div style={{background:G.bg3,border:`1px solid ${G.faint}`,borderRadius:"10px",padding:"16px",textAlign:"center"}}>
    <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2px",color:G.muted,marginBottom:"6px"}}>{label}</div>
    <div style={{fontFamily:F.m,fontSize:"24px",fontWeight:"500",color:color||G.gold,letterSpacing:"-0.5px"}}>{value}</div>
    {sub && <div style={{fontFamily:F.s,fontSize:"11px",color:G.muted,marginTop:"4px"}}>{sub}</div>}
  </div>
);

// ── PRODUCT CARD ──────────────────────────────────────────────────────────────
function ProductCard({ item, inCart, onToggle, type }) {
  const [hov, setHov] = useState(false);
  const nome = item.title || item.nome;
  const desc = item.sub || item.desc;
  const price = item.price || item.preco;
  const accent = type==="dieta" ? G.pink : type==="postural" ? G.blue : G.gold;

  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        border:`1px solid ${inCart ? G.gold : hov ? G.border : "rgba(245,240,232,0.08)"}`,
        borderRadius:"12px", background: inCart ? "rgba(201,168,76,0.06)" : G.bg2,
        padding:"18px 20px", cursor:"pointer",
        transition:"all 0.25s", position:"relative",
        boxShadow: inCart ? `0 0 0 1px ${G.gold}` : "none",
      }}>
      {item.badge && (
        <div style={{position:"absolute",top:12,right:12,
          background:item.badge==="PREMIUM"?G.gold:"rgba(8,8,8,0.9)",
          color:item.badge==="PREMIUM"?"#080808":G.gold,
          border:item.badge==="PREMIUM"?"none":`1px solid ${G.border}`,
          fontFamily:F.m,fontSize:"9px",letterSpacing:"1.5px",padding:"3px 8px",borderRadius:"3px"}}>
          {item.badge}
        </div>
      )}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"12px",marginBottom:"8px"}}>
        <div style={{fontFamily:F.d,fontSize:"16px",fontWeight:"700",color:G.white,lineHeight:1.3,paddingRight:"60px"}}>
          {nome}
        </div>
      </div>
      <p style={{fontFamily:F.s,fontSize:"13px",color:G.muted,lineHeight:1.65,margin:"0 0 16px"}}>{desc}</p>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{fontFamily:F.m,fontSize:"20px",fontWeight:"500",color:accent}}>
          R${price}
        </div>
        <button onClick={onToggle} style={{
          background: inCart ? G.gold : "transparent",
          border:`1px solid ${inCart ? G.gold : G.border}`,
          borderRadius:"7px",padding:"8px 16px",
          color: inCart ? "#080808" : G.gold,
          fontFamily:F.m,fontSize:"10px",letterSpacing:"1.5px",
          cursor:"pointer",transition:"all 0.2s",fontWeight:"500",
        }}>
          {inCart ? "✓ ADICIONADO" : "+ ADICIONAR"}
        </button>
      </div>
    </div>
  );
}

// ── STEP HEADER ───────────────────────────────────────────────────────────────
function StepHeader({ num, total, title, subtitle }) {
  return (
    <div style={{marginBottom:"28px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
        <div style={{width:"28px",height:"28px",borderRadius:"50%",
          background:`linear-gradient(135deg,${G.gold},${G.goldDim})`,
          display:"flex",alignItems:"center",justifyContent:"center",
          fontFamily:F.m,fontSize:"11px",color:"#080808",fontWeight:"500",flexShrink:0}}>
          {num}
        </div>
        <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"3px",color:G.muted}}>
          ETAPA {num} DE {total}
        </div>
      </div>
      <h2 style={{margin:"0 0 8px",fontFamily:F.d,fontSize:"clamp(22px,3vw,30px)",
        fontWeight:"700",color:G.white,letterSpacing:"-0.5px",lineHeight:1.2}}>{title}</h2>
      {subtitle && <p style={{margin:0,fontFamily:F.s,fontSize:"14px",color:G.muted,lineHeight:1.75,maxWidth:"560px"}}>{subtitle}</p>}
    </div>
  );
}

// ── PROGRESS BAR ──────────────────────────────────────────────────────────────
function ProgressBar({ step, total, labels }) {
  return (
    <div style={{display:"flex",gap:"0",marginBottom:"40px"}}>
      {labels.map((l,i)=>{
        const done=i<step; const active=i===step;
        return (
          <div key={l} style={{flex:1}}>
            <div style={{height:"3px",background:done||active?G.gold:G.faint,
              opacity:active?1:done?0.6:0.3,transition:"all 0.4s"}}/>
            <div style={{display:"flex",alignItems:"center",gap:"4px",padding:"7px 4px 0"}}>
              <div style={{width:"6px",height:"6px",borderRadius:"50%",flexShrink:0,
                background:done?"#4CAF7D":active?G.gold:G.faint,
                opacity:done||active?1:0.4}}/>
              <span style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"0.5px",
                color:active?G.white:done?"rgba(245,240,232,0.5)":"rgba(245,240,232,0.2)"}}>
                {l.toUpperCase()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── CART BADGE ────────────────────────────────────────────────────────────────
function CartBadge({ count, total, onClick }) {
  if (count===0) return null;
  return (
    <div onClick={onClick} style={{
      position:"fixed",bottom:"24px",right:"24px",zIndex:300,
      background:`linear-gradient(135deg,${G.gold},${G.goldDim})`,
      borderRadius:"12px",padding:"12px 20px",cursor:"pointer",
      boxShadow:"0 8px 30px rgba(201,168,76,0.4)",
      display:"flex",alignItems:"center",gap:"12px",
    }}>
      <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"1px",color:"#080808"}}>
        CARRINHO
      </div>
      <div style={{background:"#080808",borderRadius:"6px",padding:"4px 10px",
        fontFamily:F.m,fontSize:"11px",color:G.gold}}>
        {count} item{count>1?"s":""}
      </div>
      <div style={{fontFamily:F.m,fontSize:"12px",color:"#080808",fontWeight:"500"}}>
        R${total}
      </div>
    </div>
  );
}

// ── MAIN FUNNEL ───────────────────────────────────────────────────────────────
export default function Funnel() {
  const [step, setStep] = useState(0);
  const [cart, setCart]  = useState([]);

  // IMC state
  const [imcPeso, setImcPeso]     = useState("");
  const [imcAltura, setImcAltura] = useState("");
  const [imcResult, setImcResult] = useState(null);

  // Treino filters
  const [objetivo, setObjetivo] = useState("");
  const [genero, setGenero]     = useState("");
  const [dias, setDias]         = useState("");
  const [local, setLocal]       = useState("");

  const STEPS = ["IMC","Treino","Postural","Alimentação","Carrinho"];

  const toggleCart = (item) => {
    const id = item.id;
    setCart(prev => prev.find(i=>i.id===id) ? prev.filter(i=>i.id!==id) : [...prev, item]);
  };
  const inCart = (id) => cart.some(i=>i.id===id);
  const cartTotal = cart.reduce((s,i)=>s+(i.price||i.preco),0);

  const goNext = () => { setStep(s=>Math.min(s+1,4)); window.scrollTo({top:0,behavior:"smooth"}); };
  const goBack = () => { setStep(s=>Math.max(s-1,0)); window.scrollTo({top:0,behavior:"smooth"}); };

  // IMC calc
  const calcIMC = () => {
    const p=parseFloat(imcPeso),h=parseFloat(imcAltura)/100;
    if(!p||!h) return;
    const imc=parseFloat((p/(h*h)).toFixed(1));
    let cat,cor,desc,obj;
    if(imc<18.5){cat="Abaixo do peso";cor=G.blue;desc="Você pode se beneficiar de um programa de ganho de massa com dieta supervisionada.";obj="hipertrofia"}
    else if(imc<25){cat="Peso normal";cor="#4CAF7D";desc="Ótimo ponto de partida! Foque em ganho de massa ou definição conforme seu objetivo.";obj="hipertrofia"}
    else if(imc<30){cat="Sobrepeso";cor=G.gold;desc="Um programa de emagrecimento combinado com treino de força é o caminho ideal.";obj="emagrecimento"}
    else{cat="Obesidade";cor:G.red;desc="Um protocolo de emagrecimento progressivo com acompanhamento fará toda a diferença.";obj="emagrecimento"}
    const min=Math.round(18.5*h*h),max=Math.round(24.9*h*h);
    setImcResult({imc,cat,cor,desc,min,max,obj,pct:Math.min(100,Math.max(0,((imc-15)/(40-15))*100))});
  };

  // Filter treinos
  const treinosFiltrados = TREINOS.filter(t => {
    if (objetivo && t.obj!==objetivo) return false;
    if (genero && t.gen!=="Ambos" && t.gen!==genero) return false;
    return true;
  });

  return (
    <div style={{minHeight:"100vh",background:G.bg,color:G.white,fontFamily:F.s}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <style>{`*{box-sizing:border-box} ::-webkit-scrollbar{display:none} select option{background:#161616;color:#F5F0E8}`}</style>

      {/* NAV */}
      <nav style={{padding:"0 clamp(16px,4vw,60px)",height:"62px",display:"flex",
        alignItems:"center",justifyContent:"space-between",
        borderBottom:`1px solid ${G.faint}`,background:G.bg}}>
        <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
          <div style={{fontFamily:F.m,fontSize:"8px",letterSpacing:"5px",color:G.gold}}>TEAM</div>
          <div style={{fontFamily:F.d,fontSize:"24px",fontWeight:"900",color:G.white,lineHeight:1,letterSpacing:"-1px"}}>DR</div>
        </div>
        {cart.length>0 && (
          <button onClick={()=>setStep(4)} style={{
            background:"transparent",border:`1px solid ${G.border}`,borderRadius:"8px",
            padding:"7px 16px",color:G.gold,fontFamily:F.m,fontSize:"10px",letterSpacing:"1.5px",cursor:"pointer",
            display:"flex",alignItems:"center",gap:"8px",
          }}>
            ◆ CARRINHO
            <span style={{background:G.gold,color:"#080808",borderRadius:"4px",padding:"2px 7px",fontSize:"10px"}}>
              {cart.length}
            </span>
          </button>
        )}
      </nav>

      <div style={{maxWidth:"780px",margin:"0 auto",padding:"40px clamp(16px,4vw,40px) 100px"}}>

        <ProgressBar step={step} total={5} labels={STEPS}/>

        {/* ── STEP 0: IMC ───────────────────────────────────────────────── */}
        {step===0 && (
          <div>
            <StepHeader num={1} total={4}
              title="Vamos começar pelo básico."
              subtitle="Calcule seu IMC — é rápido e gratuito. O resultado vai nos ajudar a recomendar o programa ideal para você."/>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
              <FInput label="PESO (kg)" type="number" placeholder="Ex: 75" value={imcPeso} onChange={e=>setImcPeso(e.target.value)}/>
              <FInput label="ALTURA (cm)" type="number" placeholder="Ex: 175" value={imcAltura} onChange={e=>setImcAltura(e.target.value)}/>
            </div>
            <FBtn onClick={calcIMC}>CALCULAR IMC →</FBtn>

            {imcResult && (
              <div style={{background:`rgba(201,168,76,0.06)`,border:`1px solid ${G.border}`,
                borderRadius:"12px",padding:"24px",marginTop:"20px"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"18px"}}>
                  <FStatCard label="SEU IMC" value={imcResult.imc} color={imcResult.cor} sub={imcResult.cat}/>
                  <FStatCard label="PESO IDEAL" value={`${imcResult.min}–${imcResult.max}kg`} sub="faixa saudável" color="#4CAF7D"/>
                </div>
                <div style={{height:"8px",borderRadius:"4px",background:G.faint,position:"relative",marginBottom:"16px"}}>
                  <div style={{position:"absolute",left:0,top:0,bottom:0,width:"20%",background:G.blue,opacity:0.4,borderRadius:"4px 0 0 4px"}}/>
                  <div style={{position:"absolute",left:"20%",top:0,bottom:0,width:"26%",background:"#4CAF7D",opacity:0.4}}/>
                  <div style={{position:"absolute",left:"46%",top:0,bottom:0,width:"22%",background:G.gold,opacity:0.4}}/>
                  <div style={{position:"absolute",left:"68%",top:0,bottom:0,width:"32%",background:G.red,opacity:0.4,borderRadius:"0 4px 4px 0"}}/>
                  <div style={{position:"absolute",top:"-2px",width:"12px",height:"12px",borderRadius:"50%",
                    background:imcResult.cor,border:"2px solid #080808",left:`calc(${imcResult.pct}% - 6px)`}}/>
                </div>
                <p style={{fontFamily:F.s,fontSize:"14px",color:G.muted,lineHeight:1.75,margin:"0 0 20px"}}>{imcResult.desc}</p>

                <div style={{background:G.bg3,border:`1px solid ${G.faint}`,borderRadius:"8px",
                  padding:"14px 16px",marginBottom:"20px"}}>
                  <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2px",color:G.gold,marginBottom:"4px"}}>
                    RECOMENDAÇÃO BASEADA NO SEU IMC
                  </div>
                  <div style={{fontFamily:F.s,fontSize:"13px",color:G.white}}>
                    Programa de <strong style={{color:G.gold}}>
                      {imcResult.obj==="hipertrofia"?"Hipertrofia — Ganho de Massa":"Emagrecimento — Perda de Gordura"}
                    </strong>
                  </div>
                </div>

                <FBtn onClick={()=>{ if(imcResult.obj) setObjetivo(imcResult.obj); goNext(); }}>
                  MONTAR MEU TREINO →
                </FBtn>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 1: TREINO ─────────────────────────────────────────────── */}
        {step===1 && (
          <div>
            <StepHeader num={2} total={4}
              title="Escolha seu programa de treino."
              subtitle="Filtre pelos seus critérios e adicione ao carrinho o programa que mais combina com você. Todos os programas são estruturados com a metodologia do Daniel."/>

            {/* Filters */}
            <div style={{background:G.bg2,border:`1px solid ${G.faint}`,borderRadius:"12px",
              padding:"20px",marginBottom:"24px"}}>
              <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"3px",color:G.gold,marginBottom:"14px"}}>
                FILTRAR PROGRAMAS
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"0 20px"}}>
                <FSelect label="OBJETIVO" value={objetivo} onChange={e=>setObjetivo(e.target.value)}
                  options={[{v:"hipertrofia",l:"Hipertrofia — Ganhar massa"},{v:"emagrecimento",l:"Emagrecimento"},{v:"forca",l:"Força"},{v:"condicionamento",l:"Condicionamento / HIIT"},{v:"qualidade",l:"Qualidade de Vida"}]}/>
                <FSelect label="GÊNERO" value={genero} onChange={e=>setGenero(e.target.value)}
                  options={[{v:"Homem",l:"Masculino"},{v:"Mulher",l:"Feminino"}]}/>
                <FSelect label="DIAS/SEMANA" value={dias} onChange={e=>setDias(e.target.value)}
                  options={[{v:"3",l:"3 dias"},{v:"4",l:"4 dias"},{v:"5",l:"5 dias"}]}/>
                <FSelect label="LOCAL" value={local} onChange={e=>setLocal(e.target.value)}
                  options={[{v:"academia",l:"Academia"},{v:"casa",l:"Em casa"},{v:"misto",l:"Meio a meio"}]}/>
              </div>
            </div>

            {/* Products */}
            <div style={{display:"flex",flexDirection:"column",gap:"12px",marginBottom:"28px"}}>
              {(treinosFiltrados.length>0 ? treinosFiltrados : TREINOS).map(t=>(
                <ProductCard key={t.id} item={t} inCart={inCart(t.id)}
                  onToggle={()=>toggleCart({...t,price:t.price,tipo:"treino"})} type="treino"/>
              ))}
            </div>

            <div style={{display:"flex",gap:"12px",justifyContent:"space-between",flexWrap:"wrap"}}>
              <FBtn secondary onClick={goBack}>← VOLTAR</FBtn>
              <FBtn onClick={goNext}>
                {cart.filter(i=>i.tipo==="treino").length>0
                  ? "PRÓXIMO: AVALIAÇÃO POSTURAL →"
                  : "PULAR ESTA ETAPA →"}
              </FBtn>
            </div>
          </div>
        )}

        {/* ── STEP 2: POSTURAL ───────────────────────────────────────────── */}
        {step===2 && (
          <div>
            <StepHeader num={3} total={4}
              title="Você conhece sua postura?"
              subtitle="Treinar com desequilíbrios posturais não corrigidos é um dos maiores erros que comprometem resultados e causam lesões. A avaliação postural do Daniel identifica exatamente onde você precisa de atenção."/>

            {/* Por que importa */}
            <div style={{background:G.bg2,border:`1px solid ${G.faint}`,borderRadius:"12px",
              padding:"20px 22px",marginBottom:"24px"}}>
              <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"3px",color:G.gold,marginBottom:"14px"}}>
                POR QUE A AVALIAÇÃO POSTURAL É ESSENCIAL
              </div>
              {POSTURAL.motivos.map((m,i)=>(
                <div key={i} style={{display:"flex",gap:"12px",alignItems:"flex-start",
                  marginBottom:i<POSTURAL.motivos.length-1?"10px":0}}>
                  <span style={{color:G.gold,fontSize:"12px",flexShrink:0,marginTop:"2px"}}>◆</span>
                  <span style={{fontFamily:F.s,fontSize:"13px",color:G.muted,lineHeight:1.6}}>{m}</span>
                </div>
              ))}
            </div>

            <ProductCard item={{
              id:POSTURAL.id,
              title:POSTURAL.nome,
              sub:POSTURAL.desc,
              price:POSTURAL.preco,
              badge:null,
            }} inCart={inCart(POSTURAL.id)}
              onToggle={()=>toggleCart({id:POSTURAL.id,title:POSTURAL.nome,price:POSTURAL.preco,tipo:"postural"})}
              type="postural"/>

            <div style={{display:"flex",gap:"12px",justifyContent:"space-between",flexWrap:"wrap",marginTop:"24px"}}>
              <FBtn secondary onClick={goBack}>← VOLTAR</FBtn>
              <FBtn onClick={goNext}>PRÓXIMO: ALIMENTAÇÃO →</FBtn>
            </div>
          </div>
        )}

        {/* ── STEP 3: ALIMENTAÇÃO ────────────────────────────────────────── */}
        {step===3 && (
          <div>
            <StepHeader num={4} total={4}
              title="Complete com a dieta certa."
              subtitle="Os planos nutricionais do TeamDR são desenvolvidos por nutricionistas parceiras do Daniel — com foco em resultado real, sem dietas impossíveis de seguir."/>

            {/* Credencial */}
            <div style={{background:`rgba(201,168,76,0.06)`,border:`1px solid ${G.border}`,
              borderLeft:`3px solid ${G.gold}`,borderRadius:"0 10px 10px 0",
              padding:"16px 20px",marginBottom:"24px"}}>
              <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2px",color:G.gold,marginBottom:"4px"}}>
                NUTRIÇÃO COM RESPALDO PROFISSIONAL
              </div>
              <p style={{fontFamily:F.s,fontSize:"13px",color:G.muted,margin:0,lineHeight:1.7}}>
                Todos os planos alimentares são elaborados por nutricionistas parceiras certificadas, integradas à metodologia de treinamento do Daniel. Não são dietas genéricas — cada plano considera seu objetivo, restrições alimentares e rotina.
              </p>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:"12px",marginBottom:"28px"}}>
              {DIETAS.map(d=>(
                <ProductCard key={d.id} item={{id:d.id,title:d.nome,sub:d.desc,price:d.preco,badge:d.badge}}
                  inCart={inCart(d.id)}
                  onToggle={()=>toggleCart({id:d.id,title:d.nome,price:d.preco,tipo:"dieta"})}
                  type="dieta"/>
              ))}
            </div>

            <div style={{display:"flex",gap:"12px",justifyContent:"space-between",flexWrap:"wrap"}}>
              <FBtn secondary onClick={goBack}>← VOLTAR</FBtn>
              <FBtn onClick={goNext}>
                {cart.length>0 ? "VER MEU CARRINHO →" : "PULAR ESTA ETAPA →"}
              </FBtn>
            </div>
          </div>
        )}

        {/* ── STEP 4: CARRINHO ───────────────────────────────────────────── */}
        {step===4 && (
          <div>
            <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"4px",color:G.gold,marginBottom:"8px"}}>RESUMO DO PEDIDO</div>
            <h2 style={{margin:"0 0 24px",fontFamily:F.d,fontSize:"clamp(24px,4vw,36px)",
              fontWeight:"700",color:G.white,letterSpacing:"-0.5px"}}>
              {cart.length>0 ? "Seu carrinho está pronto." : "Seu carrinho está vazio."}
            </h2>

            {cart.length===0 ? (
              <div style={{textAlign:"center",padding:"40px 20px"}}>
                <div style={{fontFamily:F.m,fontSize:"40px",color:G.faint,marginBottom:"16px"}}>◎</div>
                <p style={{fontFamily:F.s,fontSize:"14px",color:G.muted,marginBottom:"20px"}}>
                  Volte e adicione os produtos que deseja.
                </p>
                <FBtn onClick={()=>setStep(0)}>MONTAR MEU PEDIDO →</FBtn>
              </div>
            ) : (
              <>
                {/* Items */}
                <div style={{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"24px"}}>
                  {cart.map(item=>(
                    <div key={item.id} style={{background:G.bg2,border:`1px solid ${G.faint}`,
                      borderRadius:"10px",padding:"14px 18px",
                      display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:F.s,fontSize:"14px",color:G.white,marginBottom:"2px"}}>{item.title}</div>
                        <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"1px",
                          color:item.tipo==="treino"?G.gold:item.tipo==="postural"?G.blue:G.pink}}>
                          {item.tipo.toUpperCase()}
                        </div>
                      </div>
                      <div style={{fontFamily:F.m,fontSize:"16px",color:G.gold,flexShrink:0}}>R${item.price||item.preco}</div>
                      <button onClick={()=>toggleCart(item)} style={{
                        background:"transparent",border:`1px solid rgba(255,100,100,0.3)`,
                        borderRadius:"6px",padding:"5px 10px",
                        color:"rgba(255,100,100,0.7)",fontFamily:F.m,fontSize:"9px",
                        cursor:"pointer",letterSpacing:"1px",
                      }}>REMOVER</button>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div style={{background:`rgba(201,168,76,0.06)`,border:`1px solid ${G.border}`,
                  borderRadius:"12px",padding:"20px 22px",marginBottom:"20px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}}>
                    <div>
                      <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"3px",color:G.muted,marginBottom:"4px"}}>
                        TOTAL DO PEDIDO
                      </div>
                      <div style={{fontFamily:F.m,fontSize:"32px",fontWeight:"500",color:G.gold,letterSpacing:"-1px"}}>
                        R${cartTotal}
                      </div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:F.s,fontSize:"12px",color:G.muted,marginBottom:"4px"}}>
                        {cart.length} produto{cart.length>1?"s":""}
                      </div>
                      <div style={{fontFamily:F.s,fontSize:"12px",color:G.muted}}>
                        Pagamento via Kiwify
                      </div>
                    </div>
                  </div>

                  <button style={{
                    width:"100%",
                    background:`linear-gradient(135deg,${G.gold},${G.goldDim})`,
                    border:"none",borderRadius:"10px",
                    padding:"18px",color:"#080808",
                    fontFamily:F.m,fontSize:"13px",letterSpacing:"2.5px",fontWeight:"500",
                    cursor:"pointer",
                    boxShadow:`0 8px 30px rgba(201,168,76,0.3)`,
                  }}>
                    FINALIZAR COMPRA →
                  </button>
                  <p style={{fontFamily:F.s,fontSize:"11px",color:G.muted,textAlign:"center",
                    margin:"12px 0 0",lineHeight:1.6}}>
                    Pagamento 100% seguro · Acesso imediato após confirmação · Suporte via WhatsApp
                  </p>
                </div>

                {/* VIP no carrinho */}
                <div style={{borderTop:`1px solid ${G.faint}`,paddingTop:"28px",marginTop:"8px"}}>
                  <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"3px",
                    color:G.muted,marginBottom:"14px",textAlign:"center"}}>
                    QUER IR ALÉM DE TUDO ISSO?
                  </div>
                  <div style={{background:G.bg2,border:`1px solid ${G.border}`,
                    borderRadius:"12px",overflow:"hidden",position:"relative",minHeight:"200px"}}>
                    <img src="/public/daniel-vip.jpg" alt="Daniel Rezende"
                      style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(105deg,rgba(8,8,8,0.96) 0%,rgba(8,8,8,0.8) 60%,rgba(8,8,8,0.4) 100%)"}}/>
                    <div style={{position:"relative",padding:"28px 32px",display:"flex",
                      alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"20px"}}>
                      <div style={{flex:1,minWidth:"220px"}}>
                        <div style={{display:"inline-block",fontFamily:F.m,fontSize:"9px",letterSpacing:"3px",
                          color:"#080808",background:G.gold,padding:"3px 10px",borderRadius:"3px",marginBottom:"10px"}}>
                          CONSULTORIA VIP — 1:1
                        </div>
                        <h3 style={{margin:"0 0 8px",fontFamily:F.d,fontSize:"clamp(18px,3vw,24px)",
                          fontWeight:"900",color:G.white,lineHeight:1.1}}>
                          Chega de adivinhar.<br/>
                          <em style={{color:G.gold}}>Daniel no seu lado.</em>
                        </h3>
                        <p style={{fontFamily:F.s,fontSize:"13px",color:G.muted,margin:"0",lineHeight:1.7,maxWidth:"360px"}}>
                          Programa 100% individual, vídeo chamadas semanais e suporte diário no WhatsApp. Vagas limitadas por mês.
                        </p>
                      </div>
                      <button onClick={()=>window.open("https://wa.me/5521999999999?text=Olá Daniel! Quero saber mais sobre a Consultoria VIP 1:1","_blank")} style={{
                        background:`linear-gradient(135deg,${G.gold},${G.goldDim})`,
                        border:"none",borderRadius:"10px",
                        padding:"14px 24px",color:"#080808",
                        fontFamily:F.m,fontSize:"11px",letterSpacing:"2px",fontWeight:"500",
                        cursor:"pointer",flexShrink:0,
                        boxShadow:`0 8px 30px rgba(201,168,76,0.3)`,
                      }}>AGENDAR CHAMADA →</button>
                    </div>
                  </div>
                </div>

                <div style={{marginTop:"20px"}}>
                  <FBtn secondary onClick={goBack}>← ADICIONAR MAIS PRODUTOS</FBtn>
                </div>
              </>
            )}
          </div>
        )}

      </div>

      <CartBadge count={cart.length} total={cartTotal} onClick={()=>setStep(4)}/>
    </div>
  );
}

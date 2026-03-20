import { useState, useEffect, useRef } from "react";

const G = {
  bg:"#080808", bg2:"#0f0f0f", bg3:"#161616",
  gold:"#C9A84C", goldDim:"#8A6D28",
  white:"#F5F0E8", muted:"rgba(245,240,232,0.42)",
  faint:"rgba(245,240,232,0.08)", border:"rgba(201,168,76,0.22)",
  green:"#4CAF7D", blue:"#5B9BD5", pink:"#D5748A",
};
const F = {
  d:"'Playfair Display',Georgia,serif",
  m:"'DM Mono',monospace",
  s:"'DM Sans',system-ui,sans-serif",
};

// ── MOCK DATA ────────────────────────────────────────────────────────────────
const USERS = [
  { id:"u1", name:"João Silva",   email:"joao@email.com",  pass:"123456", buys:["hm1","hm4","mvip","em3"] },
  { id:"u2", name:"Maria Santos", email:"maria@email.com", pass:"123456", buys:["hf1","ef1","qf1","mgrp"] },
  { id:"u3", name:"Demo TeamDR",  email:"demo@teamdr.com", pass:"teamdr", buys:["hm1","em2","fm1","cm2","qm1","mgrp","hf1"] },
];

const PRODUCTS = [
  { id:"hm1",  cat:"Hipertrofia",       type:"Planilha",  gen:"Homem",  title:"Hipertrofia Máxima",        sub:"12 semanas · 5x/sem · Volume progressivo",      price:97,  badge:"MAIS VENDIDO", col:G.blue,
    desc:"Protocolo de 12 semanas com periodização ondulatória diária. Inclui tabela de cargas, progressão semanal e guia de execução.",
    inc:["Planilha Excel interativa","Vídeo-aulas de execução","Guia de aquecimento específico","Suporte WhatsApp 30 dias"] },
  { id:"hf1",  cat:"Hipertrofia",       type:"Planilha",  gen:"Mulher", title:"Hipertrofia Feminina",       sub:"10 semanas · 4x/sem · Glúteo e posterior",      price:97,  badge:null,           col:G.pink,
    desc:"Foco total no desenvolvimento do glúteo e cadeia posterior com técnicas de ativação, drop sets e séries gigantes.",
    inc:["Planilha Excel interativa","Protocolo de ativação pré-treino","Banco de exercícios alternativos","Calculadora de cargas"] },
  { id:"hm4",  cat:"Hipertrofia",       type:"Programa",  gen:"Homem",  title:"Massa Total 16 Semanas",     sub:"Treino + dieta + suplementação + suporte",      price:247, badge:"PREMIUM",       col:G.gold,
    desc:"O programa mais completo da TeamDR. 16 semanas de treino periodizado, plano nutricional e acompanhamento semanal com Daniel.",
    inc:["Planilha de treino 16 semanas","Plano nutricional personalizado","Protocolo de suplementação","4 check-ins com Daniel","Grupo privado VIP"] },
  { id:"em3",  cat:"Emagrecimento",     type:"Programa",  gen:"Ambos",  title:"Transformação Total 12 Sem", sub:"Treino + dieta + acompanhamento semanal",       price:297, badge:"PREMIUM",       col:G.gold,
    desc:"Transformação completa em 12 semanas. Déficit calórico inteligente com preservação máxima de massa muscular.",
    inc:["Planilha de treino 12 semanas","Plano nutricional de corte","Calculadora de macros","Acompanhamento semanal","Grupo exclusivo"] },
  { id:"ef1",  cat:"Emagrecimento",     type:"Planilha",  gen:"Mulher", title:"Emagrecimento Definitivo",   sub:"10 semanas · Funcional + HIIT",                 price:97,  badge:"NOVO",          col:G.pink,
    desc:"Protocolo feminino com treino funcional, circuitos HIIT e resistência. Máximo gasto calórico sem sacrificar músculo.",
    inc:["Planilha 10 semanas","Protocolo HIIT semanal","Guia nutricional","Banco de receitas fit"] },
  { id:"em2",  cat:"Emagrecimento",     type:"Dieta",     gen:"Ambos",  title:"Déficit Sem Sofrer",         sub:"Plano com receitas e lista de compras",         price:67,  badge:null,            col:G.gold,
    desc:"Guia nutricional completo para déficit calórico com receitas práticas e lista de compras semanal.",
    inc:["Calculadora de macros","30 receitas práticas","Lista de compras semanal","Guia de substituições"] },
  { id:"fm1",  cat:"Força",             type:"Planilha",  gen:"Homem",  title:"Força Bruta — Powerlifting", sub:"16 semanas · Squat, Bench, Deadlift",           price:97,  badge:null,            col:G.blue,
    desc:"Periodização para os três movimentos do powerlifting. Do iniciante ao intermediário, com progressão clara.",
    inc:["Planilha 16 semanas","Calculadora de 1RM","Manual de técnica","Protocolo de aquecimento"] },
  { id:"cm2",  cat:"Condicionamento",   type:"Programa",  gen:"Ambos",  title:"Atleta do Dia a Dia",        sub:"Performance, disposição e saúde cardiovascular",price:197, badge:null,            col:G.gold,
    desc:"Combina treino resistido, cardio intervalado e mobilidade em uma rotina eficiente de 8 semanas.",
    inc:["Planilha 8 semanas","Protocolo de cardio","Rotina de mobilidade diária","Guia de recuperação"] },
  { id:"qf1",  cat:"Qualidade de Vida", type:"Planilha",  gen:"Mulher", title:"Bem-Estar Feminino Total",   sub:"3x/sem · Mobilidade + força + saúde",           price:77,  badge:null,            col:G.pink,
    desc:"3x por semana para a mulher moderna: mobilidade funcional, força acessível e bem-estar integral.",
    inc:["Planilha 12 semanas","Rotina de mobilidade","Guia anti-inflamatório","Protocolo de sono"] },
  { id:"qm1",  cat:"Qualidade de Vida", type:"Planilha",  gen:"Homem",  title:"Executivo Ativo",            sub:"3x/sem · Alta eficiência · Pouco tempo",        price:77,  badge:"DESTAQUE",      col:G.blue,
    desc:"3 treinos de 45 min por semana. Máxima eficiência para quem tem agenda cheia.",
    inc:["Planilha 12 semanas","Guia para treinar em viagem","10 min de mobilidade matinal","Nutrição para executivos"] },
  { id:"mvip",  cat:"Mentorias",        type:"Mentoria",  gen:"Ambos",  title:"Mentoria VIP com Daniel",    sub:"4 semanas · Vídeo chamadas + suporte diário",   price:997, badge:"EXCLUSIVO",     col:G.gold,
    desc:"O nível mais alto. Anamnese completa, programa 100% individual, vídeo chamadas semanais e suporte no WhatsApp todos os dias.",
    inc:["Anamnese completa 90min","4 vídeo chamadas com Daniel","Suporte diário WhatsApp","Programa 100% personalizado","Acesso vitalício ao material"] },
  { id:"mgrp",  cat:"Mentorias",        type:"Grupo",     gen:"Ambos",  title:"Grupo Elite TeamDR",         sub:"Mensal · Comunidade + lives + treinos",         price:197, badge:null,            col:G.gold, monthly:true,
    desc:"A comunidade dos alunos sérios da TeamDR. Lives mensais, treinos novos todo mês e arquivo completo de conteúdos.",
    inc:["Lives mensais com Daniel","2 treinos novos/mês","Grupo WhatsApp exclusivo","Arquivo de conteúdos","Desconto em produtos"] },
];

const CATS = ["Hipertrofia","Emagrecimento","Força","Condicionamento","Qualidade de Vida","Mentorias"];
const GC = { Homem:G.blue, Mulher:G.pink, Ambos:G.gold };

// ── THUMB ────────────────────────────────────────────────────────────────────
function Thumb({ p }) {
  const ac = p.col || G.gold;
  const id = p.id;
  const shapes = {
    Planilha: (
      <svg width="100%" height="100%" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id={"g"+id} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={ac} stopOpacity="0.22"/><stop offset="100%" stopColor={ac} stopOpacity="0.03"/></linearGradient></defs>
        <rect width="200" height="140" fill={"url(#g"+id+")"}/>
        {[0,1,2,3,4,5].map(i=><rect key={i} x="14" y={14+i*19} width={68+i*14} height="9" rx="2" fill={ac} opacity={0.07+i*0.045}/>)}
        <rect x="132" y="12" width="54" height="116" rx="4" fill={ac} opacity="0.06"/>
        {[0,1,2,3,4].map(i=><rect key={i} x="140" y={22+i*20} width="38" height="9" rx="2" fill={ac} opacity="0.17"/>)}
      </svg>
    ),
    Dieta: (
      <svg width="100%" height="100%" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
        <defs><radialGradient id={"g"+id} cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor={ac} stopOpacity="0.22"/><stop offset="100%" stopColor={ac} stopOpacity="0.01"/></radialGradient></defs>
        <rect width="200" height="140" fill={"url(#g"+id+")"}/>
        <circle cx="100" cy="70" r="50" fill="none" stroke={ac} strokeWidth="1" opacity="0.2"/>
        <circle cx="100" cy="70" r="32" fill="none" stroke={ac} strokeWidth="1" opacity="0.14"/>
        <circle cx="100" cy="70" r="16" fill={ac} opacity="0.12"/>
        {[0,1,2,3].map(i=>{const a=(i/4)*Math.PI*2-Math.PI/2;return<line key={i} x1="100" y1="70" x2={100+50*Math.cos(a)} y2={70+50*Math.sin(a)} stroke={ac} strokeWidth="1.5" opacity="0.3"/>})}
      </svg>
    ),
    Programa: (
      <svg width="100%" height="100%" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
        <defs><radialGradient id={"g"+id} cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor={ac} stopOpacity="0.28"/><stop offset="100%" stopColor={ac} stopOpacity="0.02"/></radialGradient></defs>
        <rect width="200" height="140" fill={"url(#g"+id+")"}/>
        {[2.2,1.5,0.85].map((sc,i)=><polygon key={i} points="100,12 175,115 25,115" fill="none" stroke={ac} strokeWidth={2-i*0.5} opacity={0.06+i*0.09} transform={`translate(${100*(1-sc)},${70*(1-sc)}) scale(${sc})`}/>)}
        <circle cx="100" cy="70" r="9" fill={ac} opacity="0.75"/>
        <circle cx="100" cy="70" r="18" fill="none" stroke={ac} strokeWidth="1" opacity="0.22"/>
      </svg>
    ),
    Mentoria: (
      <svg width="100%" height="100%" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
        <defs><radialGradient id={"g"+id} cx="50%" cy="40%" r="65%"><stop offset="0%" stopColor="#fff" stopOpacity="0.1"/><stop offset="100%" stopColor={ac} stopOpacity="0.03"/></radialGradient></defs>
        <rect width="200" height="140" fill={"url(#g"+id+")"}/>
        <circle cx="100" cy="48" r="28" fill={ac} opacity="0.08"/>
        <circle cx="100" cy="48" r="16" fill={ac} opacity="0.18"/>
        <circle cx="100" cy="48" r="8"  fill={ac} opacity="0.65"/>
        <path d="M38 120 Q100 88 162 120" fill="none" stroke={ac} strokeWidth="2" opacity="0.3"/>
      </svg>
    ),
    Grupo: (
      <svg width="100%" height="100%" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
        <defs><radialGradient id={"g"+id} cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor={ac} stopOpacity="0.18"/><stop offset="100%" stopColor={ac} stopOpacity="0.02"/></radialGradient></defs>
        <rect width="200" height="140" fill={"url(#g"+id+")"}/>
        {[[66,46],[100,40],[134,46],[52,68],[148,68]].map(([x,y],i)=>(
          <g key={i}><circle cx={x} cy={y} r="13" fill={ac} opacity="0.1"/><circle cx={x} cy={y} r="7" fill={ac} opacity="0.22"/></g>
        ))}
        <path d="M30 112 Q100 90 170 112" fill="none" stroke={ac} strokeWidth="1.5" opacity="0.28"/>
      </svg>
    ),
  };
  return <div style={{width:"100%",height:"100%",background:G.bg,overflow:"hidden"}}>{shapes[p.type]||shapes.Planilha}</div>;
}

// ── CARD ─────────────────────────────────────────────────────────────────────
function Card({ p, onOpen }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={()=>onOpen(p)} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ flex:"0 0 200px", borderRadius:"10px", overflow:"hidden", cursor:"pointer",
        border:`1px solid ${hov?G.border:"rgba(245,240,232,0.07)"}`, background:G.bg2,
        transform:hov?"translateY(-6px) scale(1.03)":"none",
        boxShadow:hov?`0 24px 60px rgba(0,0,0,0.7)`:"0 4px 20px rgba(0,0,0,0.45)",
        transition:"all 0.3s cubic-bezier(0.23,1,0.32,1)" }}>
      <div style={{height:"120px",position:"relative"}}>
        <Thumb p={p}/>
        {p.badge && <div style={{position:"absolute",top:8,left:8,
          background:p.badge==="PREMIUM"||p.badge==="EXCLUSIVO"?G.gold:"rgba(8,8,8,0.9)",
          color:p.badge==="PREMIUM"||p.badge==="EXCLUSIVO"?"#080808":G.gold,
          border:p.badge==="PREMIUM"||p.badge==="EXCLUSIVO"?"none":`1px solid ${G.border}`,
          fontFamily:F.m,fontSize:"9px",letterSpacing:"1.6px",padding:"3px 7px",borderRadius:"3px"}}>{p.badge}</div>}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"2px",
          opacity:hov?1:0,transition:"opacity 0.3s",
          background:`linear-gradient(to right,transparent,${p.col||G.gold},transparent)`}}/>
      </div>
      <div style={{padding:"13px 13px 15px"}}>
        <div style={{display:"flex",gap:"5px",alignItems:"center",marginBottom:"6px"}}>
          <span style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"1px",color:GC[p.gen]||G.gold}}>{p.gen.toUpperCase()}</span>
          <span style={{color:G.faint,fontSize:"9px"}}>·</span>
          <span style={{fontFamily:F.m,fontSize:"9px",color:G.muted}}>{p.type}</span>
        </div>
        <div style={{fontFamily:F.d,fontSize:"14px",fontWeight:"700",color:G.white,lineHeight:1.25,marginBottom:"5px",
          display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.title}</div>
        <div style={{fontFamily:F.s,fontSize:"11px",color:G.muted,lineHeight:1.5,marginBottom:"10px",
          display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.sub}</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontFamily:F.s,fontSize:"11px",color:G.green}}>✓ Seu produto</span>
          <span style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"1px",
            color:hov?"#080808":G.gold,background:hov?G.gold:"transparent",
            border:`1px solid ${G.border}`,padding:"4px 9px",borderRadius:"4px",transition:"all 0.2s"}}>ABRIR</span>
        </div>
      </div>
    </div>
  );
}

// ── ROW ──────────────────────────────────────────────────────────────────────
function Row({ label, ps, onOpen }) {
  const ref = useRef(null);
  if (!ps.length) return null;
  const scroll = d => ref.current?.scrollBy({left:d*460,behavior:"smooth"});
  return (
    <div style={{marginBottom:"44px"}}>
      <div style={{padding:"0 clamp(16px,4vw,60px)",marginBottom:"16px",display:"flex",alignItems:"center",gap:"16px"}}>
        <h3 style={{margin:0,fontFamily:F.d,fontSize:"22px",fontWeight:"700",color:G.white}}>{label}</h3>
        <div style={{flex:1,height:"1px",background:`linear-gradient(to right,${G.border},transparent)`}}/>
        <span style={{fontFamily:F.m,fontSize:"10px",color:G.muted}}>{ps.length} produto{ps.length>1?"s":""}</span>
      </div>
      <div style={{position:"relative"}}>
        <button onClick={()=>scroll(-1)} style={{position:"absolute",left:"6px",top:"50%",transform:"translateY(-50%)",zIndex:10,
          width:"36px",height:"36px",borderRadius:"50%",background:"rgba(8,8,8,0.9)",border:`1px solid ${G.border}`,
          color:G.gold,cursor:"pointer",fontSize:"18px",display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
        <div ref={ref} style={{display:"flex",gap:"12px",overflowX:"auto",
          padding:"6px clamp(16px,4vw,60px)",scrollbarWidth:"none"}}>
          {ps.map(p=><Card key={p.id} p={p} onOpen={onOpen}/>)}
        </div>
        <button onClick={()=>scroll(1)} style={{position:"absolute",right:"6px",top:"50%",transform:"translateY(-50%)",zIndex:10,
          width:"36px",height:"36px",borderRadius:"50%",background:"rgba(8,8,8,0.9)",border:`1px solid ${G.border}`,
          color:G.gold,cursor:"pointer",fontSize:"18px",display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
      </div>
    </div>
  );
}

// ── VIEWER MODAL ─────────────────────────────────────────────────────────────
function Viewer({ p, onClose }) {
  if (!p) return null;
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.9)",
      backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:"560px",
        background:G.bg2,border:`1px solid ${G.border}`,borderRadius:"16px",overflow:"hidden",
        boxShadow:"0 40px 100px rgba(0,0,0,0.9)"}}>
        <div style={{height:"180px",position:"relative"}}>
          <Thumb p={p}/>
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:"2px",
            background:`linear-gradient(to right,transparent,${p.col||G.gold},transparent)`}}/>
          <button onClick={onClose} style={{position:"absolute",top:12,right:12,
            width:"32px",height:"32px",borderRadius:"50%",background:"rgba(8,8,8,0.85)",
            border:`1px solid ${G.faint}`,color:G.muted,cursor:"pointer",fontSize:"18px",
            display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          {p.badge && <div style={{position:"absolute",top:12,left:12,
            background:p.badge==="PREMIUM"||p.badge==="EXCLUSIVO"?G.gold:"rgba(8,8,8,0.9)",
            color:p.badge==="PREMIUM"||p.badge==="EXCLUSIVO"?"#080808":G.gold,
            fontFamily:F.m,fontSize:"10px",letterSpacing:"1.8px",padding:"4px 10px",borderRadius:"3px"}}>{p.badge}</div>}
        </div>
        <div style={{padding:"26px 28px 30px"}}>
          <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"12px"}}>
            {[p.type,p.gen,p.cat].map((t,i)=>(
              <span key={i} style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"1px",
                border:`1px solid ${i===1?(GC[p.gen]||G.gold)+"50":G.border}`,
                color:i===1?(GC[p.gen]||G.gold):G.muted,
                background:i===1?`${GC[p.gen]||G.gold}12`:G.faint,
                padding:"4px 12px",borderRadius:"20px"}}>{t}</span>
            ))}
          </div>
          <h2 style={{margin:"0 0 8px",fontFamily:F.d,fontSize:"26px",fontWeight:"700",color:G.white,lineHeight:1.2}}>{p.title}</h2>
          <p style={{margin:"0 0 18px",fontFamily:F.s,fontSize:"14px",color:G.muted,lineHeight:1.75}}>{p.desc}</p>
          <div style={{background:G.bg3,border:`1px solid ${G.faint}`,borderRadius:"10px",padding:"16px 18px",marginBottom:"22px"}}>
            <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"3px",color:G.gold,marginBottom:"10px"}}>O QUE ESTÁ INCLUÍDO</div>
            {p.inc?.map((item,i)=>(
              <div key={i} style={{display:"flex",gap:"10px",marginBottom:i<p.inc.length-1?"8px":0}}>
                <span style={{color:G.green,fontSize:"13px",flexShrink:0}}>✓</span>
                <span style={{fontFamily:F.s,fontSize:"13px",color:G.muted,lineHeight:1.5}}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
            <button style={{flex:1,minWidth:"160px",
              background:`linear-gradient(135deg,${G.gold},${G.goldDim})`,
              border:"none",borderRadius:"8px",padding:"14px 20px",color:"#080808",
              fontFamily:F.m,fontSize:"11px",letterSpacing:"2px",cursor:"pointer",
              boxShadow:`0 8px 30px rgba(201,168,76,0.22)`}}>⬇ BAIXAR ARQUIVO</button>
            <button style={{background:"transparent",border:`1px solid ${G.border}`,borderRadius:"8px",
              padding:"14px 18px",color:G.gold,fontFamily:F.m,fontSize:"11px",letterSpacing:"2px",cursor:"pointer"}}>
              💬 SUPORTE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [mode, setMode]     = useState("login");
  const [email, setEmail]   = useState("");
  const [pass, setPass]     = useState("");
  const [name, setName]     = useState("");
  const [err, setErr]       = useState("");
  const [ok, setOk]         = useState("");
  const [loading, setLoad]  = useState(false);
  const [show, setShow]     = useState(false);

  useEffect(()=>{setTimeout(()=>setShow(true),60);},[]);
  const fade = d => ({opacity:show?1:0,transform:show?"none":"translateY(20px)",transition:`all 0.8s ease ${d}ms`});

  const submit = async () => {
    setErr(""); setOk("");
    if (!email) return setErr("Insira seu e-mail.");
    if (mode !== "reset" && !pass) return setErr("Insira sua senha.");
    setLoad(true);
    await new Promise(r=>setTimeout(r,800));
    if (mode === "login") {
      const u = USERS.find(u=>u.email===email && u.pass===pass);
      if (!u) { setErr("E-mail ou senha incorretos."); setLoad(false); return; }
      onLogin(u);
    } else if (mode === "signup") {
      if (!name) { setErr("Insira seu nome."); setLoad(false); return; }
      if (pass.length < 6) { setErr("Senha mínima de 6 caracteres."); setLoad(false); return; }
      if (USERS.find(u=>u.email===email)) { setErr("E-mail já cadastrado."); setLoad(false); return; }
      const u = { id:"u"+Date.now(), name, email, pass, buys:[] };
      USERS.push(u);
      onLogin(u);
    } else {
      setOk("E-mail de recuperação enviado! Verifique sua caixa de entrada.");
      setLoad(false);
    }
  };

  const DEMOS = ["demo@teamdr.com / teamdr","joao@email.com / 123456","maria@email.com / 123456"];

  return (
    <div style={{minHeight:"100vh",background:G.bg,display:"flex",alignItems:"stretch",fontFamily:F.s}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <style>{`*{box-sizing:border-box} ::-webkit-scrollbar{display:none} input{outline:none}`}</style>

      {/* Left */}
      <div style={{flex:"0 0 400px",display:"flex",flexDirection:"column",justifyContent:"space-between",
        padding:"48px",background:"#0a0a0a",borderRight:`1px solid ${G.faint}`,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(rgba(201,168,76,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.03) 1px,transparent 1px)`,backgroundSize:"60px 60px"}}/>
        <div style={{position:"absolute",bottom:"-20%",left:"-20%",width:"500px",height:"500px",background:`radial-gradient(ellipse,rgba(201,168,76,0.12) 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <div style={{...fade(0),position:"relative"}}>
          <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"5px",color:G.gold,marginBottom:"4px"}}>TEAM</div>
          <div style={{fontFamily:F.d,fontSize:"56px",fontWeight:"900",color:G.white,lineHeight:0.85,letterSpacing:"-2px"}}>DR</div>
          <div style={{height:"2px",width:"48px",marginTop:"14px",background:`linear-gradient(to right,${G.gold},transparent)`}}/>
        </div>
        <div style={{...fade(200),position:"relative"}}>
          <div style={{fontFamily:F.d,fontSize:"26px",fontWeight:"400",fontStyle:"italic",color:G.white,lineHeight:1.35,marginBottom:"14px",letterSpacing:"-0.5px"}}>
            "Seu corpo é o reflexo da sua <em style={{color:G.gold}}>disciplina.</em>"
          </div>
          <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"3px",color:G.muted}}>— DANIEL REZENDE</div>
        </div>
        <div style={{...fade(400),position:"relative",display:"flex",gap:"28px"}}>
          {[["1000+","alunos transformados"],["8+","anos de experiência"],["100%","online"]].map(([n,l])=>(
            <div key={n}>
              <div style={{fontFamily:F.m,fontSize:"22px",fontWeight:"500",color:G.gold,letterSpacing:"-1px"}}>{n}</div>
              <div style={{fontFamily:F.s,fontSize:"11px",color:G.muted}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px clamp(24px,5vw,80px)"}}>
        <div style={{width:"100%",maxWidth:"380px"}}>
          <div style={{...fade(100),marginBottom:"32px"}}>
            <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"4px",color:G.gold,marginBottom:"8px"}}>
              {mode==="login"?"ACESSE SUA CONTA":mode==="signup"?"CRIAR CONTA":"RECUPERAR SENHA"}
            </div>
            <h2 style={{margin:0,fontFamily:F.d,fontSize:"36px",fontWeight:"700",color:G.white,letterSpacing:"-1px"}}>
              {mode==="login"?"Bem-vindo de volta.":mode==="signup"?"Comece agora.":"Esqueceu a senha?"}
            </h2>
          </div>

          <div style={fade(200)}>
            {mode==="signup" && (
              <div style={{marginBottom:"12px"}}>
                <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2.5px",color:G.muted,marginBottom:"6px"}}>NOME COMPLETO</div>
                <input value={name} onChange={e=>{setName(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="Seu nome"
                  style={{width:"100%",background:G.faint,border:`1px solid ${G.faint}`,borderRadius:"8px",padding:"13px 16px",color:G.white,fontSize:"14px",fontFamily:F.s}}/>
              </div>
            )}
            <div style={{marginBottom:"12px"}}>
              <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2.5px",color:G.muted,marginBottom:"6px"}}>E-MAIL</div>
              <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="seu@email.com"
                style={{width:"100%",background:G.faint,border:`1px solid ${G.faint}`,borderRadius:"8px",padding:"13px 16px",color:G.white,fontSize:"14px",fontFamily:F.s}}/>
            </div>
            {mode!=="reset" && (
              <div style={{marginBottom: mode==="login"?"6px":"18px"}}>
                <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2.5px",color:G.muted,marginBottom:"6px"}}>SENHA</div>
                <input type="password" value={pass} onChange={e=>{setPass(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="••••••••"
                  style={{width:"100%",background:G.faint,border:`1px solid ${G.faint}`,borderRadius:"8px",padding:"13px 16px",color:G.white,fontSize:"14px",fontFamily:F.s}}/>
              </div>
            )}
            {mode==="login" && (
              <div style={{textAlign:"right",marginBottom:"18px"}}>
                <span onClick={()=>{setMode("reset");setErr("");setOk("");}} style={{fontFamily:F.m,fontSize:"10px",color:G.muted,cursor:"pointer",textDecoration:"underline"}}>Esqueci minha senha</span>
              </div>
            )}
            {err && <div style={{background:"rgba(255,100,100,0.08)",border:"1px solid rgba(255,100,100,0.2)",borderRadius:"8px",padding:"10px 14px",marginBottom:"14px",fontFamily:F.s,fontSize:"13px",color:"#ff7070"}}>{err}</div>}
            {ok  && <div style={{background:"rgba(76,175,125,0.08)",border:"1px solid rgba(76,175,125,0.2)",borderRadius:"8px",padding:"10px 14px",marginBottom:"14px",fontFamily:F.s,fontSize:"13px",color:G.green}}>{ok}</div>}

            <button onClick={submit} disabled={loading} style={{width:"100%",
              background:loading?"rgba(201,168,76,0.35)":`linear-gradient(135deg,${G.gold},${G.goldDim})`,
              border:"none",borderRadius:"8px",padding:"15px",color:"#080808",
              fontFamily:F.m,fontSize:"12px",letterSpacing:"2.5px",fontWeight:"500",
              cursor:loading?"not-allowed":"pointer",boxShadow:loading?"none":`0 8px 30px rgba(201,168,76,0.22)`}}>
              {loading?"AGUARDE...":mode==="login"?"ENTRAR":mode==="signup"?"CRIAR CONTA":"ENVIAR E-MAIL"}
            </button>

            <div style={{textAlign:"center",marginTop:"18px",fontFamily:F.s,fontSize:"13px",color:G.muted}}>
              {mode==="login" ? <>Não tem conta?{" "}<span onClick={()=>{setMode("signup");setErr("");setOk("");}} style={{color:G.gold,cursor:"pointer",fontWeight:"600"}}>Cadastre-se</span></> :
               <span onClick={()=>{setMode("login");setErr("");setOk("");}} style={{color:G.gold,cursor:"pointer",fontWeight:"600"}}>← Voltar para o login</span>}
            </div>

            {mode==="login" && (
              <div style={{marginTop:"24px",background:G.bg3,border:`1px solid ${G.faint}`,borderRadius:"8px",padding:"14px 16px"}}>
                <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2px",color:G.muted,marginBottom:"10px"}}>CONTAS DE DEMONSTRAÇÃO</div>
                {DEMOS.map((d,i)=>{
                  const [e,p] = d.split(" / ");
                  return (
                    <div key={i} onClick={()=>{setEmail(e);setPass(p);setErr("");}} style={{fontFamily:F.m,fontSize:"11px",color:G.gold,cursor:"pointer",
                      padding:"6px 8px",borderRadius:"4px",background:"rgba(201,168,76,0.05)",border:"1px solid rgba(201,168,76,0.1)",
                      marginBottom:i<DEMOS.length-1?"6px":0}}>{d}</div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ user, onLogout }) {
  const [myProds, setMyProds] = useState([]);
  const [loading, setLoad]    = useState(true);
  const [viewer,  setViewer]  = useState(null);
  const [scrolled,setScrolled]= useState(false);
  const [toolFilter, setToolFilter] = useState(null); // { cat, label }

  const OBJ_TO_CAT = {
    hipertrofia:"Hipertrofia", emagrecimento:"Emagrecimento",
    forca:"Força", condicionamento:"Condicionamento",
    qualidade:"Qualidade de Vida",
  };

  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",h);
    return ()=>window.removeEventListener("scroll",h);
  },[]);

  useEffect(()=>{
    setTimeout(()=>{
      setMyProds(PRODUCTS.filter(p=>user.buys.includes(p.id)));
      setLoad(false);
    },600);
  },[user]);

  const nm = user.name || "Atleta";

  return (
    <div style={{minHeight:"100vh",background:G.bg,color:G.white,fontFamily:F.s}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <style>{`*{box-sizing:border-box} ::-webkit-scrollbar{display:none} a{text-decoration:none} @keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,height:"62px",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"0 clamp(16px,4vw,60px)",
        background:scrolled?"rgba(8,8,8,0.96)":"transparent",
        backdropFilter:scrolled?"blur(16px)":"none",
        borderBottom:scrolled?`1px solid ${G.faint}`:"none",
        transition:"all 0.4s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <div>
            <div style={{fontFamily:F.m,fontSize:"8px",letterSpacing:"5px",color:G.gold,lineHeight:1.3}}>TEAM</div>
            <div style={{fontFamily:F.d,fontSize:"24px",fontWeight:"900",color:G.white,lineHeight:0.85,letterSpacing:"-1px"}}>DR</div>
          </div>
          <div style={{width:"1px",height:"26px",background:G.faint,margin:"0 6px"}}/>
          <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2px",color:G.muted}}>ÁREA DO CLIENTE</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px",padding:"6px 12px",
            border:`1px solid ${G.faint}`,borderRadius:"24px",background:G.faint}}>
            <div style={{width:"26px",height:"26px",borderRadius:"50%",
              background:`linear-gradient(135deg,${G.gold},${G.goldDim})`,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontFamily:F.m,fontSize:"11px",color:"#080808"}}>{nm[0].toUpperCase()}</div>
            <span style={{fontFamily:F.s,fontSize:"13px",color:G.white}}>{nm}</span>
          </div>
          <button onClick={onLogout} style={{background:"transparent",border:`1px solid ${G.faint}`,
            borderRadius:"6px",padding:"7px 14px",color:G.muted,fontFamily:F.m,
            fontSize:"9px",letterSpacing:"1.5px",cursor:"pointer"}}>SAIR</button>
        </div>
      </nav>

      {/* BOAS VINDAS */}
      <div style={{paddingTop:"86px",padding:"86px clamp(16px,4vw,60px) 32px",borderBottom:`1px solid ${G.faint}`}}>
        <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"4px",color:G.gold,marginBottom:"8px"}}>
          OLÁ, {nm.toUpperCase()}
        </div>
        <h1 style={{margin:"0 0 8px",fontFamily:F.d,fontSize:"clamp(28px,5vw,44px)",fontWeight:"700",
          color:G.white,letterSpacing:"-1px",lineHeight:1}}>
          Bem-vindo à sua área.
        </h1>
        <p style={{margin:0,fontFamily:F.s,fontSize:"15px",color:G.muted,maxWidth:"500px",lineHeight:1.7}}>
          Aqui você encontra tudo que adquiriu com o Daniel — suas planilhas, programas e ferramentas exclusivas. Role a página para explorar.
        </p>
      </div>

      {/* DANIEL SECTION */}
      <div style={{margin:"40px clamp(16px,4vw,60px)",borderRadius:"16px",overflow:"hidden",
        border:`1px solid ${G.border}`,background:G.bg2,display:"flex",flexWrap:"wrap",minHeight:"280px"}}>
        <div style={{flex:"0 0 260px",minHeight:"280px",position:"relative",overflow:"hidden"}}>
          <img src="/daniel.jpg" alt="Daniel Rezende"
            style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,transparent 60%,rgba(15,15,15,0.9) 100%)"}}/>
        </div>
        <div style={{flex:1,minWidth:"260px",padding:"32px 36px",display:"flex",flexDirection:"column",justifyContent:"center",position:"relative"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(ellipse at 80% 50%,rgba(201,168,76,0.06) 0%,transparent 70%)`,pointerEvents:"none"}}/>
          <div style={{position:"relative"}}>
            <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"4px",color:G.gold,marginBottom:"10px"}}>SEU COACH</div>
            <h2 style={{margin:"0 0 4px",fontFamily:F.d,fontSize:"clamp(26px,4vw,38px)",fontWeight:"900",color:G.white,lineHeight:0.95,letterSpacing:"-1px"}}>Daniel</h2>
            <h2 style={{margin:"0 0 14px",fontFamily:F.d,fontSize:"clamp(26px,4vw,38px)",fontWeight:"900",lineHeight:0.95,letterSpacing:"-1px",fontStyle:"italic",color:G.gold}}>Rezende.</h2>
            <div style={{borderLeft:`3px solid ${G.gold}`,paddingLeft:"14px",marginBottom:"16px"}}>
              <p style={{fontFamily:F.d,fontSize:"15px",fontStyle:"italic",color:G.white,lineHeight:1.5,margin:0}}>
                "Não importa se você nunca pisou numa academia ou se já treina há anos. Meu trabalho é te levar ao próximo nível."
              </p>
            </div>
            <div style={{display:"flex",gap:"24px",flexWrap:"wrap"}}>
              {[["10+","Anos competindo"],["NPC","Campeão Internacional"],["5+","Anos de Consultoria"],["1000+","Alunos"]].map(([n,l])=>(
                <div key={n}>
                  <div style={{fontFamily:F.m,fontSize:"18px",fontWeight:"500",color:G.gold,letterSpacing:"-0.5px"}}>{n}</div>
                  <div style={{fontFamily:F.s,fontSize:"11px",color:G.muted,marginTop:"2px"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FERRAMENTAS SECTION */}
      <div style={{padding:"0 clamp(16px,4vw,60px)",marginBottom:"48px"}}>
        <div style={{borderTop:`1px solid ${G.faint}`,paddingTop:"40px",marginBottom:"24px"}}>
          <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"4px",color:G.gold,marginBottom:"8px"}}>FERRAMENTAS EXCLUSIVAS</div>
          <h2 style={{margin:"0 0 10px",fontFamily:F.d,fontSize:"clamp(22px,3vw,32px)",fontWeight:"700",color:G.white,letterSpacing:"-0.5px"}}>
            Calcule, planeje e evolua.
          </h2>
          <p style={{margin:0,fontFamily:F.s,fontSize:"14px",color:G.muted,maxWidth:"560px",lineHeight:1.75}}>
            Ferramentas criadas pelo Daniel para te ajudar a tomar decisões mais inteligentes sobre seu treino e alimentação. A calculadora de IMC é gratuita — as demais são adquiridas separadamente e ficam disponíveis aqui assim que você compra.
          </p>
        </div>
        <ToolsPage user={user} onFilter={(obj)=>setToolFilter(obj ? {cat:OBJ_TO_CAT[obj], label:obj} : null)}/>
      </div>

      {/* MEUS PRODUTOS */}
      <div style={{borderTop:`1px solid ${G.faint}`,paddingTop:"40px",paddingBottom:"60px"}}>
        <div style={{padding:"0 clamp(16px,4vw,60px)",marginBottom:"28px"}}>
          <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"4px",color:G.gold,marginBottom:"8px"}}>MEUS PRODUTOS</div>
          <div style={{display:"flex",alignItems:"center",gap:"16px",flexWrap:"wrap"}}>
            <h2 style={{margin:0,fontFamily:F.d,fontSize:"clamp(22px,3vw,32px)",fontWeight:"700",color:G.white,letterSpacing:"-0.5px"}}>
              {toolFilter ? `Programas de ${toolFilter.cat}` : "Seus programas ativos"}
            </h2>
            {toolFilter && (
              <button onClick={()=>setToolFilter(null)} style={{
                fontFamily:F.m,fontSize:"9px",letterSpacing:"1.5px",
                background:"transparent",border:`1px solid ${G.faint}`,
                borderRadius:"20px",padding:"5px 14px",
                color:G.muted,cursor:"pointer",
              }}>VER TODOS ×</button>
            )}
          </div>
          {toolFilter && (
            <p style={{margin:"8px 0 0",fontFamily:F.s,fontSize:"13px",color:G.muted}}>
              Baseado na sua seleção nas ferramentas — mostrando programas de <strong style={{color:G.gold}}>{toolFilter.cat}</strong>.
            </p>
          )}
        </div>
        {loading ? (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"200px",gap:"16px"}}>
            <div style={{width:"38px",height:"38px",borderRadius:"50%",border:`2px solid ${G.faint}`,borderTop:`2px solid ${G.gold}`,animation:"spin 0.8s linear infinite"}}/>
            <div style={{fontFamily:F.m,fontSize:"11px",letterSpacing:"3px",color:G.muted}}>CARREGANDO...</div>
          </div>
        ) : myProds.length===0 ? (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"40px 20px",gap:"16px"}}>
            <div style={{fontFamily:F.m,fontSize:"40px",color:G.faint}}>◎</div>
            <h3 style={{fontFamily:F.d,fontSize:"22px",fontWeight:"700",color:G.white,margin:0}}>Nenhum produto ainda</h3>
            <p style={{fontFamily:F.s,fontSize:"14px",color:G.muted,maxWidth:"300px",lineHeight:1.7,margin:0}}>
              Explore o catálogo e comece sua transformação.
            </p>
            <div style={{fontFamily:F.m,fontSize:"11px",letterSpacing:"2px",
              background:`linear-gradient(135deg,${G.gold},${G.goldDim})`,
              color:"#080808",padding:"13px 24px",borderRadius:"8px",cursor:"pointer"}}>
              VER CATÁLOGO →
            </div>
          </div>
        ) : (
          (() => {
            const filtered = toolFilter
              ? myProds.filter(p=>p.cat===toolFilter.cat)
              : myProds;
            if (filtered.length===0) return (
              <div style={{padding:"0 clamp(16px,4vw,60px)"}}>
                <div style={{background:`rgba(201,168,76,0.06)`,border:`1px solid ${G.border}`,
                  borderRadius:"12px",padding:"28px",textAlign:"center"}}>
                  <div style={{fontFamily:F.d,fontSize:"18px",color:G.white,marginBottom:"8px"}}>
                    Você ainda não tem programas de {toolFilter.cat}
                  </div>
                  <p style={{fontFamily:F.s,fontSize:"14px",color:G.muted,margin:"0 0 20px",lineHeight:1.7}}>
                    Que tal dar o próximo passo e adquirir um programa de {toolFilter.cat}?
                  </p>
                  <div style={{display:"inline-block",fontFamily:F.m,fontSize:"11px",letterSpacing:"2px",
                    background:`linear-gradient(135deg,${G.gold},${G.goldDim})`,
                    color:"#080808",padding:"13px 24px",borderRadius:"8px",cursor:"pointer"}}>
                    VER PROGRAMAS DE {toolFilter.cat.toUpperCase()} →
                  </div>
                </div>
              </div>
            );
            const cats = toolFilter
              ? [toolFilter.cat]
              : CATS;
            return cats.map(cat=>{
              const ps = filtered.filter(p=>p.cat===cat);
              return ps.length ? <Row key={cat} label={cat} ps={ps} onOpen={setViewer}/> : null;
            });
          })()
        )}
      </div>

      {viewer && <Viewer p={viewer} onClose={()=>setViewer(null)}/>}
    </div>
  );
}

// ── TOOLS PAGE (inline — sem import externo) ──────────────────────────────────
const TOOL_ACCESS = {
  calorias: ["tool-cal","mvip"],
  treino:   ["hm1","hf1","fm1","cm2","qm1","qf1","hm4","em3","ef1","tool-treino","mvip"],
  postural: ["tool-post","mvip"],
  ebook:    ["tool-ebook","mvip"],
};

// ── Shared UI components — definidos FORA do ToolsPage pra evitar re-mount a cada keystroke
const TBtn = ({ onClick, children, secondary }) => (
  <button onClick={onClick} style={{
    background: secondary?"transparent":`linear-gradient(135deg,${G.gold},${G.goldDim})`,
    border: secondary?`1px solid ${G.border}`:"none",
    borderRadius:"8px",padding:"13px 24px",
    color: secondary?G.gold:"#080808",
    fontFamily:F.m,fontSize:"11px",letterSpacing:"2px",cursor:"pointer",fontWeight:"500",
  }}>{children}</button>
);

const TSelect = ({ label, options, ...props }) => (
  <div style={{marginBottom:"14px"}}>
    <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2.5px",color:G.muted,marginBottom:"6px"}}>{label}</div>
    <select {...props} style={{width:"100%",background:G.bg3,border:`1px solid rgba(201,168,76,0.15)`,borderRadius:"8px",
      padding:"11px 14px",color:G.white,fontSize:"14px",fontFamily:F.s,outline:"none",cursor:"pointer"}}>
      <option value="">Selecione...</option>
      {options.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  </div>
);

const TInput = ({ label, ...props }) => (
  <div style={{marginBottom:"14px"}}>
    <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2.5px",color:G.muted,marginBottom:"6px"}}>{label}</div>
    <input {...props} style={{width:"100%",background:G.faint,border:`1px solid rgba(201,168,76,0.15)`,borderRadius:"8px",
      padding:"11px 14px",color:G.white,fontSize:"14px",fontFamily:F.s,outline:"none",boxSizing:"border-box"}}/>
  </div>
);

const TStatCard = ({ label, value, sub, color }) => (
  <div style={{background:G.bg3,border:`1px solid ${G.faint}`,borderRadius:"10px",padding:"16px",textAlign:"center"}}>
    <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2px",color:G.muted,marginBottom:"6px"}}>{label}</div>
    <div style={{fontFamily:F.m,fontSize:"24px",fontWeight:"500",color:color||G.gold,letterSpacing:"-0.5px"}}>{value}</div>
    {sub && <div style={{fontFamily:F.s,fontSize:"11px",color:G.muted,marginTop:"4px"}}>{sub}</div>}
  </div>
);

const TResultBox = ({ children }) => (
  <div style={{background:`rgba(201,168,76,0.06)`,border:`1px solid ${G.border}`,borderRadius:"12px",padding:"24px",marginTop:"20px"}}>{children}</div>
);

function ToolsPage({ user, onFilter }) {
  const buys = user?.buys || [];
  const hasAccess = (tool) => (TOOL_ACCESS[tool]||[]).some(id=>buys.includes(id));

  const TABS = [
    { id:"imc",      icon:"◉", label:"IMC" },
    { id:"calorias", icon:"◆", label:"Calorias" },
    { id:"treino",   icon:"▦", label:"Treino" },
    { id:"postural", icon:"◈", label:"Postural" },
    { id:"ebook",    icon:"★", label:"Ebook" },
  ];
  const [tab, setTab] = useState("imc");

  const Btn = TBtn;
  const Select = TSelect;
  const Input = TInput;
  const StatCard = TStatCard;
  const ResultBox = TResultBox;

  const VipBanner = () => (
    <div style={{marginTop:"24px",borderRadius:"16px",overflow:"hidden",position:"relative",minHeight:"320px"}}>
      {/* Background image */}
      <img src="/public/daniel-vip.jpg" alt="Daniel Rezende"
        style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
      {/* Dark overlay */}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(105deg, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.85) 50%, rgba(8,8,8,0.4) 100%)"}}/>
      {/* Gold top border */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(to right,${G.gold},transparent)`}}/>

      {/* Content */}
      <div style={{position:"relative",padding:"36px 40px",display:"flex",flexWrap:"wrap",gap:"32px",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{flex:"1",minWidth:"260px"}}>
          <div style={{display:"inline-block",fontFamily:F.m,fontSize:"9px",letterSpacing:"3px",
            color:"#080808",background:G.gold,padding:"4px 12px",borderRadius:"4px",marginBottom:"16px"}}>
            CONSULTORIA VIP — 1:1 COM DANIEL
          </div>
          <h3 style={{margin:"0 0 12px",fontFamily:F.d,fontSize:"clamp(22px,3vw,34px)",
            fontWeight:"900",color:G.white,lineHeight:1.1,letterSpacing:"-0.5px"}}>
            Chega de adivinhar.<br/>
            <em style={{color:G.gold,fontStyle:"italic"}}>Daniel no seu lado.</em>
          </h3>
          <p style={{margin:"0 0 20px",fontFamily:F.s,fontSize:"14px",color:G.muted,lineHeight:1.8,maxWidth:"420px"}}>
            Na consultoria 1:1 você não recebe um plano genérico — você recebe <strong style={{color:G.white}}>atenção total do Daniel</strong>, que analisa seu histórico, seus objetivos e monta tudo do zero pra você. Vídeo chamadas semanais, suporte no WhatsApp todos os dias e ajustes em tempo real conforme seu progresso.
          </p>

          {/* Includes */}
          <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"24px"}}>
            {[
              "Anamnese completa em vídeo chamada de 90min",
              "Programa de treino 100% individualizado",
              "Plano nutricional personalizado",
              "4 vídeo chamadas semanais com Daniel",
              "Suporte diário no WhatsApp",
              "Ajustes em tempo real conforme evolução",
            ].map((item,i)=>(
              <div key={i} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
                <span style={{color:G.gold,fontSize:"12px",flexShrink:0,marginTop:"2px"}}>◆</span>
                <span style={{fontFamily:F.s,fontSize:"13px",color:G.muted,lineHeight:1.5}}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{display:"flex",alignItems:"center",gap:"20px",flexWrap:"wrap"}}>
            <div>
              <div style={{fontFamily:F.m,fontSize:"11px",letterSpacing:"2px",color:G.muted,marginBottom:"4px"}}>VAGAS LIMITADAS POR MÊS</div>
              <div style={{fontFamily:F.s,fontSize:"13px",color:G.muted,maxWidth:"260px",lineHeight:1.6}}>
                Daniel acompanha um número reduzido de alunos por vez para garantir atenção total a cada um.
              </div>
            </div>
            <button onClick={()=>window.open("https://wa.me/5521999999999?text=Olá Daniel! Quero saber mais sobre a Consultoria VIP 1:1","_blank")} style={{
              background:`linear-gradient(135deg,${G.gold},${G.goldDim})`,
              border:"none",borderRadius:"10px",
              padding:"18px 36px",color:"#080808",
              fontFamily:F.m,fontSize:"12px",letterSpacing:"2px",fontWeight:"500",
              cursor:"pointer",
              boxShadow:`0 8px 30px rgba(201,168,76,0.35)`,
            }}>AGENDAR MINHA CHAMADA →</button>
          </div>
        </div>

        {/* Studio image on right */}
        <div style={{flex:"0 0 200px",height:"280px",borderRadius:"12px",overflow:"hidden",
          border:`1px solid ${G.border}`,display:"none"}}>
          <img src="/public/daniel-studio.jpg" alt="Daniel Rezende"
            style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}/>
        </div>
      </div>
    </div>
  );

  const LockBanner = ({ tool, nome, preco }) => (
    <div style={{marginTop:"20px"}}>
      <div style={{background:`rgba(201,168,76,0.08)`,border:`1px solid ${G.border}`,
        borderLeft:`3px solid ${G.gold}`,borderRadius:"0 10px 10px 0",
        padding:"16px 20px",marginBottom:"12px",
        display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"12px"}}>
        <div>
          <div style={{fontFamily:F.d,fontSize:"15px",fontWeight:"700",color:G.white,marginBottom:"3px"}}>
            🔒 Desbloqueie {nome}
          </div>
          <div style={{fontFamily:F.s,fontSize:"13px",color:G.muted}}>
            Acesso completo por apenas <strong style={{color:G.gold}}>{preco}</strong>
          </div>
        </div>
        <Btn>COMPRAR →</Btn>
      </div>
      <VipBanner/>
    </div>
  );

  // IMC
  const [imcPeso,setImcPeso]=useState(""); const [imcAltura,setImcAltura]=useState(""); const [imcResult,setImcResult]=useState(null);
  const calcIMC = () => {
    const p=parseFloat(imcPeso),h=parseFloat(imcAltura)/100; if(!p||!h) return;
    const imc=parseFloat((p/(h*h)).toFixed(1));
    let cat,cor,desc;
    if(imc<18.5){cat="Abaixo do peso";cor=G.blue;desc="Considere aumentar a ingestão calórica com qualidade nutricional."}
    else if(imc<25){cat="Peso normal";cor="#4CAF7D";desc="Parabéns! Mantenha os bons hábitos de treino e alimentação."}
    else if(imc<30){cat="Sobrepeso";cor=G.gold;desc="Um déficit calórico moderado com treino pode ajudar."}
    else{cat="Obesidade";cor="#E05555";desc="Recomenda-se acompanhamento profissional."}
    const min=Math.round(18.5*h*h),max=Math.round(24.9*h*h);
    setImcResult({imc,cat,cor,desc,min,max,pct:Math.min(100,Math.max(0,((imc-15)/(40-15))*100))});
  };

  // CALORIAS
  const [calForm,setCalForm]=useState({peso:"",altura:"",idade:"",sexo:"",atividade:"",objetivo:""});
  const [calResult,setCalResult]=useState(null);
  const setCal=(k,v)=>setCalForm(p=>({...p,[k]:v}));
  const calcCal = () => {
    const {peso,altura,idade,sexo,atividade,objetivo}=calForm;
    if(!peso||!altura||!idade||!sexo||!atividade||!objetivo) return;
    const p=parseFloat(peso),h=parseFloat(altura),i=parseFloat(idade);
    const tmb=sexo==="m"?88.36+(13.4*p)+(4.8*h)-(5.7*i):447.6+(9.2*p)+(3.1*h)-(4.3*i);
    const fat={sedentario:1.2,leve:1.375,moderado:1.55,intenso:1.725};
    const tdee=Math.round(tmb*(fat[atividade]||1.55));
    const aj=objetivo==="ganho"?300:objetivo==="perda"?-400:0;
    const meta=tdee+aj;
    const prot=Math.round(p*(objetivo==="ganho"?2.2:2.0));
    const gord=Math.round((meta*0.25)/9);
    const carb=Math.round((meta-(prot*4)-(gord*9))/4);
    setCalResult({tmb:Math.round(tmb),tdee,meta,prot,gord,carb});
  };

  // TREINO
  const [trForm,setTrForm]=useState({objetivo:"",nivel:"",dias:"",genero:"",local:""});
  const [trResult,setTrResult]=useState(null);
  const setTr=(k,v)=>{
    setTrForm(p=>({...p,[k]:v}));
    if(k==="objetivo") onFilter?.(v||null);
  };
  const gerarTreino = () => {
    if(!trForm.objetivo||!trForm.dias||!trForm.local) return;
    const academia = trForm.local==="academia"||trForm.local==="misto";
    const casa = trForm.local==="casa"||trForm.local==="misto";
    const planos={
      "hipertrofia-3-academia":["Seg: Peito + Tríceps","Qua: Costas + Bíceps","Sex: Pernas + Ombros"],
      "hipertrofia-4-academia":["Seg: Peito","Ter: Costas","Qui: Pernas","Sex: Ombros + Braços"],
      "hipertrofia-3-casa":["Seg: Empurrar (flexões variadas)","Qua: Puxar (elástico/barra)","Sex: Pernas (agachamento + avanço)"],
      "hipertrofia-4-casa":["Seg: Peito + Tríceps (peso corporal)","Ter: Costas + Bíceps (elástico)","Qui: Pernas + Glúteos","Sex: Ombros + Core"],
      "hipertrofia-3-misto":["Seg: Peito + Tríceps (academia)","Qua: Pernas (academia)","Sex: Costas + Core (casa)"],
      "emagrecimento-3-academia":["Seg: Circuito Full Body + 20min cardio","Qua: HIIT 30min + Abdômen","Sex: Circuito Full Body + Corrida leve"],
      "emagrecimento-4-academia":["Seg: Superior + HIIT 20min","Ter: Corrida 40min + Core","Qui: Inferior + HIIT 20min","Sex: Full Body + Corrida 30min"],
      "emagrecimento-3-casa":["Seg: HIIT 30min (burpee, polichinelo, jump)","Qua: Circuito funcional + Corrida 20min","Sex: HIIT + Core (mountain climber, prancha)"],
      "emagrecimento-3-misto":["Seg: Musculação Full Body (academia)","Qua: Corrida 40min ao ar livre","Sex: HIIT em casa 30min"],
      "forca-3-academia":["Seg: Squat + Acessórios de pernas","Qua: Bench Press + Acessórios de peito","Sex: Deadlift + Acessórios de costas"],
      "forca-4-academia":["Seg: Squat + Acessórios","Ter: Bench + Acessórios","Qui: Deadlift + Acessórios","Sex: Overhead Press + Braços"],
      "forca-3-casa":["Seg: Agachamento búlgaro + Afundo com carga","Qua: Flexão com variações de pegada","Sex: Hip thrust + Remada elástico"],
      "condicionamento-3-academia":["Seg: Treino metabólico + Corrida 20min","Qua: HIIT na esteira + Core","Sex: Circuito aeróbico + Mobilidade"],
      "condicionamento-4-academia":["Seg: Corrida moderada 40min","Ter: HIIT + Força funcional","Qui: Corrida intervalada (tiro)","Sex: Circuito metabólico completo"],
      "condicionamento-3-casa":["Seg: HIIT 35min (jumping jack, burpee, sprint)","Qua: Corrida ao ar livre 30min + Core","Sex: Circuito funcional + Corrida 20min"],
      "condicionamento-3-misto":["Seg: Corrida ao ar livre 40min","Qua: HIIT em casa 30min","Sex: Treino metabólico (academia)"],
      "condicionamento-4-misto":["Seg: Corrida ao ar livre 40min","Ter: HIIT em casa 30min","Qui: Treino metabólico (academia)","Sex: Corrida leve + Mobilidade"],
    };
    const localKey = trForm.local==="misto"?"misto":trForm.local;
    const key=`${trForm.objetivo}-${trForm.dias}-${localKey}`;
    const fallback=`${trForm.objetivo}-3-${localKey==="academia"?"academia":"casa"}`;
    setTrResult(planos[key]||planos[fallback]||planos["hipertrofia-3-academia"]);
  };

  // POSTURAL
  const PERGS=[
    {id:"costas",txt:"Sente dor nas costas com frequência?",opts:["Nunca","Às vezes","Frequentemente","Sempre"]},
    {id:"trabalho",txt:"Sua postura predominante no trabalho?",opts:["Sentado por horas","Em pé por horas","Alternado","Ativo/em movimento"]},
    {id:"pescoco",txt:"Sente tensão no pescoço ou ombros?",opts:["Nunca","Às vezes","Frequentemente","Sempre"]},
    {id:"joelhos",txt:"Desconforto nos joelhos?",opts:["Não","Leve","Moderado","Intenso"]},
    {id:"mobilidade",txt:"Como avalia sua mobilidade?",opts:["Muito boa","Boa","Regular","Ruim"]},
  ];
  const [pStep,setPStep]=useState(0); const [pResp,setPResp]=useState({}); const [pResult,setPResult]=useState(null);
  const responder=(id,val)=>{
    const novo={...pResp,[id]:val};
    setPResp(novo);
    if(pStep<PERGS.length-1){setPStep(pStep+1);}
    else{
      const probs=[];
      if(novo.costas==="Frequentemente"||novo.costas==="Sempre") probs.push("Lordose lombar acentuada");
      if(novo.trabalho==="Sentado por horas") probs.push("Encurtamento de flexores do quadril");
      if(novo.pescoco==="Frequentemente"||novo.pescoco==="Sempre") probs.push("Protrusão cervical");
      if(novo.joelhos==="Moderado"||novo.joelhos==="Intenso") probs.push("Desequilíbrio nos membros inferiores");
      if(novo.mobilidade==="Ruim"||novo.mobilidade==="Regular") probs.push("Mobilidade reduzida");
      setPResult({probs,score:5-probs.length});
    }
  };


  const STEPS = [
    { id:"imc",      label:"IMC",      icon:"◉", free:true },
    { id:"treino",   label:"Treino",   icon:"▦", free:false },
    { id:"postural", label:"Postural", icon:"◈", free:false },
    { id:"calorias", label:"Calorias", icon:"◆", free:false },
    { id:"ebook",    label:"Ebook",    icon:"★", free:false },
  ];
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const advance = () => {
    if (!completedSteps.includes(STEPS[step].id)) setCompletedSteps(p=>[...p,STEPS[step].id]);
    if (step < STEPS.length-1) setStep(step+1);
    setTimeout(()=>window.scrollTo({top:document.getElementById("ferramentas-topo")?.offsetTop||0,behavior:"smooth"}),100);
  };

  const NextBtn = ({ disabled }) => (
    <button onClick={advance} disabled={disabled} style={{
      background: disabled ? G.faint : `linear-gradient(135deg,${G.gold},${G.goldDim})`,
      border:"none", borderRadius:"8px",
      padding:"14px 28px", marginTop:"20px",
      color: disabled ? G.muted : "#080808",
      fontFamily:F.m, fontSize:"11px", letterSpacing:"2px",
      cursor: disabled ? "not-allowed" : "pointer", fontWeight:"500",
    }}>{step<STEPS.length-1 ? `PRÓXIMO: ${STEPS[step+1]?.label?.toUpperCase()} →` : "CONCLUÍDO ✓"}</button>
  );

  return (
    <div id="ferramentas-topo">
      {/* Progress bar */}
      <div style={{display:"flex",gap:"0",marginBottom:"36px"}}>
        {STEPS.map((s,i)=>{
          const done=completedSteps.includes(s.id);
          const active=i===step;
          return (
            <div key={s.id} onClick={()=>{ if(done||i<=step) setStep(i); }}
              style={{flex:1,cursor:done||i<=step?"pointer":"default"}}>
              <div style={{height:"3px",background:done?G.gold:active?G.gold:G.faint,
                opacity:active?1:done?0.7:0.3,transition:"all 0.3s"}}/>
              <div style={{display:"flex",alignItems:"center",gap:"4px",padding:"7px 4px 0"}}>
                <span style={{fontFamily:F.m,fontSize:"11px",
                  color:active?G.gold:done?"rgba(201,168,76,0.6)":G.muted}}>{s.icon}</span>
                <span style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"1px",
                  color:active?G.white:done?G.muted:"rgba(245,240,232,0.25)"}}>{s.label.toUpperCase()}</span>
                {!s.free && !hasAccess(s.id) && (
                  <span style={{width:"5px",height:"5px",borderRadius:"50%",background:"#E05555",flexShrink:0}}/>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* STEP 1 — IMC */}
      {step===0 && (
        <div>
          <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2px",color:"#4CAF7D",marginBottom:"14px"}}>✓ GRATUITO — PONTO DE PARTIDA</div>
          <h3 style={{margin:"0 0 6px",fontFamily:F.d,fontSize:"22px",fontWeight:"700",color:G.white}}>Qual é o seu IMC?</h3>
          <p style={{margin:"0 0 20px",fontFamily:F.s,fontSize:"13px",color:G.muted,lineHeight:1.7}}>
            Comece calculando seu Índice de Massa Corporal. É rápido e gratuito — e vai guiar as próximas etapas.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
            <TInput label="PESO (kg)" type="number" placeholder="Ex: 75" value={imcPeso} onChange={e=>setImcPeso(e.target.value)}/>
            <TInput label="ALTURA (cm)" type="number" placeholder="Ex: 175" value={imcAltura} onChange={e=>setImcAltura(e.target.value)}/>
          </div>
          <TBtn onClick={calcIMC}>CALCULAR IMC →</TBtn>
          {imcResult && (
            <TResultBox>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"18px"}}>
                <TStatCard label="SEU IMC" value={imcResult.imc} color={imcResult.cor} sub={imcResult.cat}/>
                <TStatCard label="PESO IDEAL" value={`${imcResult.min}–${imcResult.max}kg`} sub="faixa saudável" color="#4CAF7D"/>
              </div>
              <div style={{height:"8px",borderRadius:"4px",background:G.faint,position:"relative",marginBottom:"14px"}}>
                <div style={{position:"absolute",left:0,top:0,bottom:0,width:"20%",background:G.blue,opacity:0.4,borderRadius:"4px 0 0 4px"}}/>
                <div style={{position:"absolute",left:"20%",top:0,bottom:0,width:"26%",background:"#4CAF7D",opacity:0.4}}/>
                <div style={{position:"absolute",left:"46%",top:0,bottom:0,width:"22%",background:G.gold,opacity:0.4}}/>
                <div style={{position:"absolute",left:"68%",top:0,bottom:0,width:"32%",background:"#E05555",opacity:0.4,borderRadius:"0 4px 4px 0"}}/>
                <div style={{position:"absolute",top:"-2px",width:"12px",height:"12px",borderRadius:"50%",
                  background:imcResult.cor,border:"2px solid #080808",left:`calc(${imcResult.pct}% - 6px)`}}/>
              </div>
              <p style={{fontFamily:F.s,fontSize:"14px",color:G.muted,lineHeight:1.7,margin:"0 0 4px"}}>{imcResult.desc}</p>
              <NextBtn/>
            </TResultBox>
          )}
        </div>
      )}

      {/* STEP 2 — TREINO */}
      {step===1 && (
        <div>
          <h3 style={{margin:"0 0 6px",fontFamily:F.d,fontSize:"22px",fontWeight:"700",color:G.white}}>Monte seu treino ideal</h3>
          <p style={{margin:"0 0 20px",fontFamily:F.s,fontSize:"13px",color:G.muted,lineHeight:1.7}}>
            Selecione seu objetivo, nível e disponibilidade. Estruturado com a metodologia do Daniel.
          </p>
          {!hasAccess("treino") ? (
            <LockBanner tool="treino" nome="Treino Personalizado" preco="R$97"/>
          ) : (
            <>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
                <TSelect label="OBJETIVO" value={trForm.objetivo} onChange={e=>setTr("objetivo",e.target.value)}
                  options={[{v:"hipertrofia",l:"Hipertrofia — Ganhar massa"},{v:"emagrecimento",l:"Emagrecimento"},{v:"forca",l:"Força"},{v:"condicionamento",l:"Condicionamento — HIIT + Corrida"}]}/>
                <TSelect label="NÍVEL" value={trForm.nivel} onChange={e=>setTr("nivel",e.target.value)}
                  options={[{v:"iniciante",l:"Iniciante"},{v:"intermediario",l:"Intermediário"},{v:"avancado",l:"Avançado"}]}/>
                <TSelect label="DIAS POR SEMANA" value={trForm.dias} onChange={e=>setTr("dias",e.target.value)}
                  options={[{v:"3",l:"3 dias"},{v:"4",l:"4 dias"},{v:"5",l:"5 dias"}]}/>
                <TSelect label="GÊNERO" value={trForm.genero} onChange={e=>setTr("genero",e.target.value)}
                  options={[{v:"m",l:"Masculino"},{v:"f",l:"Feminino"}]}/>
              </div>
              <TSelect label="LOCAL DE TREINO" value={trForm.local} onChange={e=>setTr("local",e.target.value)}
                options={[{v:"academia",l:"Academia"},{v:"casa",l:"Em casa — peso corporal / elástico"},{v:"misto",l:"Meio a meio — academia + rua / casa"}]}/>
              <TBtn onClick={gerarTreino}>GERAR TREINO →</TBtn>
              {trResult && (
                <TResultBox>
                  <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px",
                    background:"rgba(201,168,76,0.08)",border:`1px solid ${G.border}`,borderRadius:"8px",padding:"10px 14px"}}>
                    <span>◆</span>
                    <div>
                      <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2px",color:G.gold}}>METODOLOGIA DANIEL REZENDE</div>
                      <div style={{fontFamily:F.s,fontSize:"12px",color:G.muted,marginTop:"2px"}}>Estrutura baseada nos princípios de periodização aplicados pelo Daniel.</div>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:"10px",marginBottom:"12px"}}>
                    {trResult.map((d,i)=>(
                      <div key={i} style={{background:G.bg3,borderRadius:"8px",padding:"12px",border:`1px solid ${G.faint}`}}>
                        <div style={{fontFamily:F.m,fontSize:"9px",color:G.gold,marginBottom:"4px"}}>DIA {i+1}</div>
                        <div style={{fontFamily:F.s,fontSize:"13px",color:G.white,lineHeight:1.4}}>{d}</div>
                      </div>
                    ))}
                  </div>
                  <p style={{fontFamily:F.s,fontSize:"12px",color:G.muted,margin:"0 0 4px",lineHeight:1.6,fontStyle:"italic"}}>
                    * Esboço do plano. Exercícios, séries e cargas completos estão na sua planilha.
                  </p>
                  <NextBtn/>
                </TResultBox>
              )}
            </>
          )}
        </div>
      )}

      {/* STEP 3 — POSTURAL */}
      {step===2 && (
        <div>
          <h3 style={{margin:"0 0 6px",fontFamily:F.d,fontSize:"22px",fontWeight:"700",color:G.white}}>Como está sua postura?</h3>
          <p style={{margin:"0 0 20px",fontFamily:F.s,fontSize:"13px",color:G.muted,lineHeight:1.7}}>
            5 perguntas rápidas para identificar desequilíbrios e pontos de atenção no seu corpo.
          </p>
          {!hasAccess("postural") ? (
            <LockBanner tool="postural" nome="Avaliação Postural" preco="R$47"/>
          ) : !pResult ? (
            <>
              <div style={{display:"flex",gap:"6px",marginBottom:"24px"}}>
                {PERGS.map((_,i)=>(
                  <div key={i} style={{flex:1,height:"3px",borderRadius:"2px",
                    background:i<=pStep?G.gold:G.faint,opacity:i===pStep?1:i<pStep?0.7:0.3}}/>
                ))}
              </div>
              <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"3px",color:G.muted,marginBottom:"8px"}}>
                PERGUNTA {pStep+1} DE {PERGS.length}
              </div>
              <div style={{fontFamily:F.d,fontSize:"20px",fontWeight:"700",color:G.white,marginBottom:"20px",lineHeight:1.3}}>
                {PERGS[pStep].txt}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                {PERGS[pStep].opts.map(o=>(
                  <button key={o} onClick={()=>responder(PERGS[pStep].id,o)}
                    style={{background:G.faint,border:`1px solid rgba(201,168,76,0.15)`,borderRadius:"8px",
                      padding:"13px 18px",color:G.white,fontFamily:F.s,fontSize:"14px",cursor:"pointer",textAlign:"left"}}>
                    {o}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <TResultBox>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"18px"}}>
                <TStatCard label="SCORE POSTURAL" value={`${pResult.score}/5`}
                  color={pResult.score>=4?"#4CAF7D":pResult.score>=2?G.gold:"#E05555"}
                  sub={pResult.score>=4?"Boa postura":pResult.score>=2?"Atenção":"Correção urgente"}/>
                <TStatCard label="PONTOS DE ATENÇÃO" value={pResult.probs.length}
                  color={pResult.probs.length===0?"#4CAF7D":"#E05555"} sub="identificados"/>
              </div>
              {pResult.probs.map((p,i)=>(
                <div key={i} style={{display:"flex",gap:"10px",marginBottom:"8px"}}>
                  <span style={{color:"#E05555",flexShrink:0}}>!</span>
                  <span style={{fontFamily:F.s,fontSize:"13px",color:G.muted}}>{p}</span>
                </div>
              ))}
              {["10 min de mobilidade matinal","Fortaleça o core regularmente","Alongamento de psoas 3x/sem","A cada 1h sentado, levante 5 min"].map((r,i)=>(
                <div key={i} style={{display:"flex",gap:"10px",marginBottom:"8px"}}>
                  <span style={{color:"#4CAF7D",flexShrink:0}}>✓</span>
                  <span style={{fontFamily:F.s,fontSize:"13px",color:G.muted}}>{r}</span>
                </div>
              ))}
              <div style={{display:"flex",gap:"12px",marginTop:"16px",flexWrap:"wrap"}}>
                <TBtn secondary onClick={()=>{setPStep(0);setPResp({});setPResult(null);}}>REFAZER</TBtn>
                <NextBtn/>
              </div>
            </TResultBox>
          )}
        </div>
      )}

      {/* STEP 4 — CALORIAS */}
      {step===3 && (
        <div>
          <h3 style={{margin:"0 0 6px",fontFamily:F.d,fontSize:"22px",fontWeight:"700",color:G.white}}>Quantas calorias você precisa?</h3>
          <p style={{margin:"0 0 20px",fontFamily:F.s,fontSize:"13px",color:G.muted,lineHeight:1.7}}>
            Calcule seu gasto calórico total e a distribuição ideal de macronutrientes para o seu objetivo.
          </p>
          {!hasAccess("calorias") ? (
            <LockBanner tool="calorias" nome="Calculadora de Calorias" preco="R$47"/>
          ) : (
            <>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
                <TInput label="PESO (kg)" type="number" placeholder="Ex: 75" value={calForm.peso} onChange={e=>setCal("peso",e.target.value)}/>
                <TInput label="ALTURA (cm)" type="number" placeholder="Ex: 175" value={calForm.altura} onChange={e=>setCal("altura",e.target.value)}/>
                <TInput label="IDADE" type="number" placeholder="Ex: 28" value={calForm.idade} onChange={e=>setCal("idade",e.target.value)}/>
                <TSelect label="SEXO" value={calForm.sexo} onChange={e=>setCal("sexo",e.target.value)}
                  options={[{v:"m",l:"Masculino"},{v:"f",l:"Feminino"}]}/>
              </div>
              <TSelect label="NÍVEL DE ATIVIDADE" value={calForm.atividade} onChange={e=>setCal("atividade",e.target.value)}
                options={[{v:"sedentario",l:"Sedentário"},{v:"leve",l:"Leve — 1-3x/sem"},{v:"moderado",l:"Moderado — 3-5x/sem"},{v:"intenso",l:"Intenso — 6-7x/sem"}]}/>
              <TSelect label="OBJETIVO" value={calForm.objetivo} onChange={e=>setCal("objetivo",e.target.value)}
                options={[{v:"ganho",l:"Ganhar massa"},{v:"manutencao",l:"Manter peso"},{v:"perda",l:"Emagrecer"}]}/>
              <TBtn onClick={calcCal}>CALCULAR →</TBtn>
              {calResult && (
                <TResultBox>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px",marginBottom:"14px"}}>
                    <TStatCard label="METABOLISMO BASAL" value={calResult.tmb} sub="kcal/dia"/>
                    <TStatCard label="GASTO TOTAL" value={calResult.tdee} sub="kcal/dia" color={G.white}/>
                    <TStatCard label="META" value={calResult.meta} sub="kcal/dia" color="#4CAF7D"/>
                  </div>
                  <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"3px",color:G.gold,marginBottom:"10px"}}>MACROS DIÁRIOS</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px",marginBottom:"4px"}}>
                    <TStatCard label="PROTEÍNA" value={`${calResult.prot}g`} sub={`${calResult.prot*4}kcal`} color={G.blue}/>
                    <TStatCard label="CARBOIDRATO" value={`${calResult.carb}g`} sub={`${calResult.carb*4}kcal`} color={G.gold}/>
                    <TStatCard label="GORDURA" value={`${calResult.gord}g`} sub={`${calResult.gord*9}kcal`} color={G.pink}/>
                  </div>
                  <NextBtn/>
                </TResultBox>
              )}
            </>
          )}
        </div>
      )}

      {/* STEP 5 — EBOOK + VIP no final */}
      {step===4 && (
        <div>
          <h3 style={{margin:"0 0 6px",fontFamily:F.d,fontSize:"22px",fontWeight:"700",color:G.white}}>Seu guia nutricional personalizado</h3>
          <p style={{margin:"0 0 20px",fontFamily:F.s,fontSize:"13px",color:G.muted,lineHeight:1.7}}>
            Gere um plano alimentar completo com refeições, substituições e dicas práticas do Daniel.
          </p>
          {!hasAccess("ebook") ? (
            <LockBanner tool="ebook" nome="Ebook Nutricional" preco="R$67"/>
          ) : (
            <>
              <TSelect label="OBJETIVO NUTRICIONAL" options={[{v:"hipertrofia",l:"Ganhar massa"},{v:"emagrecimento",l:"Emagrecer"},{v:"manutencao",l:"Manter peso"}]}/>
              <TSelect label="RESTRIÇÕES" options={[{v:"nenhuma",l:"Nenhuma"},{v:"lactose",l:"Sem lactose"},{v:"vegetariano",l:"Vegetariano"},{v:"vegano",l:"Vegano"}]}/>
              <TSelect label="REFEIÇÕES POR DIA" options={[{v:"3",l:"3 refeições"},{v:"4",l:"4 refeições"},{v:"5",l:"5 refeições"}]}/>
              <TBtn>GERAR EBOOK →</TBtn>
            </>
          )}

          {/* Consultoria VIP — aparece só aqui, no final do funil */}
          <div style={{marginTop:"44px",paddingTop:"32px",borderTop:`1px solid ${G.faint}`}}>
            <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"3px",color:G.muted,marginBottom:"14px",textAlign:"center"}}>
              QUER IR ALÉM DE TUDO ISSO?
            </div>
            <VipBanner/>
          </div>
        </div>
      )}
    </div>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  return user ? <Dashboard user={user} onLogout={()=>setUser(null)}/> : <Login onLogin={setUser}/>;
}

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
          {[["8+","anos"],["500+","alunos"],["3×","campeão"]].map(([n,l])=>(
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
  const [filter,  setFilter]  = useState("Todos");
  const [scrolled,setScrolled]= useState(false);
  const [welcome, setWelcome] = useState(true);

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

  const filtered = filter==="Todos" ? myProds : myProds.filter(p=>p.cat===filter);
  const byCat = CATS.map(cat=>({cat,ps:filtered.filter(p=>p.cat===cat)})).filter(({ps})=>ps.length>0);
  const activeCats = CATS.filter(c=>myProds.some(p=>p.cat===c));
  const nm = user.name || "Atleta";

  return (
    <div style={{minHeight:"100vh",background:G.bg,color:G.white,fontFamily:F.s}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <style>{`*{box-sizing:border-box} ::-webkit-scrollbar{display:none} a{text-decoration:none}`}</style>

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

      {/* WELCOME */}
      {welcome && !loading && (
        <div style={{marginTop:"62px",background:"rgba(201,168,76,0.07)",
          borderLeft:`3px solid ${G.gold}`,
          padding:"16px clamp(16px,4vw,60px)",
          display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
          <div>
            <div style={{fontFamily:F.d,fontSize:"17px",fontWeight:"700",color:G.white,marginBottom:"2px"}}>
              Bem-vindo de volta, <em style={{color:G.gold,fontStyle:"italic"}}>{nm}</em>! 👋
            </div>
            <div style={{fontFamily:F.s,fontSize:"13px",color:G.muted}}>
              {myProds.length} produto{myProds.length!==1?"s":""} disponível{myProds.length!==1?"is":""}.
            </div>
          </div>
          <button onClick={()=>setWelcome(false)} style={{background:"transparent",border:"none",color:G.muted,cursor:"pointer",fontSize:"18px"}}>×</button>
        </div>
      )}

      {/* HEADER */}
      <div style={{paddingTop:welcome&&!loading?"24px":"86px",paddingBottom:"24px",
        padding:`${welcome&&!loading?"24px":"86px"} clamp(16px,4vw,60px) 24px`,
        borderBottom:`1px solid ${G.faint}`,
        display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"16px"}}>
        <div>
          <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"4px",color:G.gold,marginBottom:"6px"}}>MEUS PROGRAMAS</div>
          <h1 style={{margin:0,fontFamily:F.d,fontSize:"clamp(26px,5vw,42px)",fontWeight:"700",
            color:G.white,letterSpacing:"-1px",lineHeight:1}}>
            {loading?"Carregando...":`${myProds.length} produto${myProds.length!==1?"s":""} ativo${myProds.length!==1?"s":""}`}
          </h1>
        </div>
        {!loading && activeCats.length > 0 && (
          <div style={{display:"flex",gap:"7px",flexWrap:"wrap"}}>
            {["Todos",...activeCats].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{
                fontFamily:F.m,fontSize:"9px",letterSpacing:"1.5px",
                background:filter===f?`linear-gradient(135deg,${G.gold},${G.goldDim})`:G.faint,
                border:filter===f?"none":`1px solid ${G.faint}`,
                borderRadius:"20px",padding:"6px 14px",
                color:filter===f?"#080808":G.muted,cursor:"pointer",transition:"all 0.2s"}}>
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* DANIEL SECTION */}
      {!loading && (
        <div style={{
          margin:"40px clamp(16px,4vw,60px)",
          borderRadius:"16px",
          overflow:"hidden",
          border:`1px solid ${G.border}`,
          background:G.bg2,
          display:"flex",
          flexWrap:"wrap",
          minHeight:"320px",
        }}>
          <div style={{flex:"0 0 280px",minHeight:"320px",position:"relative",overflow:"hidden"}}>
            <img src="/daniel.jpg" alt="Daniel Rezende"
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}/>
            <div style={{position:"absolute",inset:0,
              background:"linear-gradient(to right,transparent 60%,rgba(15,15,15,0.9) 100%)"}}/>
          </div>
          <div style={{flex:1,minWidth:"280px",padding:"36px 40px",display:"flex",flexDirection:"column",justifyContent:"center",position:"relative"}}>
            <div style={{position:"absolute",inset:0,
              backgroundImage:`radial-gradient(ellipse at 80% 50%,rgba(201,168,76,0.06) 0%,transparent 70%)`,
              pointerEvents:"none"}}/>
            <div style={{position:"relative"}}>
              <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"4px",color:G.gold,marginBottom:"12px"}}>SEU COACH</div>
              <h2 style={{margin:"0 0 4px",fontFamily:F.d,fontSize:"clamp(28px,4vw,42px)",fontWeight:"900",color:G.white,lineHeight:0.95,letterSpacing:"-1px"}}>Daniel</h2>
              <h2 style={{margin:"0 0 20px",fontFamily:F.d,fontSize:"clamp(28px,4vw,42px)",fontWeight:"900",lineHeight:0.95,letterSpacing:"-1px",fontStyle:"italic",color:G.gold}}>Rezende.</h2>

              {/* Impact phrase */}
              <div style={{borderLeft:`3px solid ${G.gold}`,paddingLeft:"16px",marginBottom:"20px"}}>
                <p style={{fontFamily:F.d,fontSize:"17px",fontStyle:"italic",color:G.white,lineHeight:1.5,margin:0}}>
                  "Não importa se você nunca pisou numa academia ou se já treina há anos. Meu trabalho é te levar ao próximo nível — seja lá qual for."
                </p>
              </div>

              <p style={{fontFamily:F.s,fontSize:"14px",color:G.muted,lineHeight:1.85,maxWidth:"480px",margin:"0 0 24px"}}>
                Bacharel em Educação Física pela UERJ, pós graduado em Biomecânica e Cinesiologia, com Diploma internacional na área de Fitness Trainer e atleta de fisiculturismo, desenvolvi minha metodologia ao longo de mais de 8 anos competindo no Brasil e no exterior. Tudo que aprendi nos bastidores das competições — sobre treino, alimentação e mentalidade — transformei em programas práticos para pessoas reais alcançarem resultados reais. Já ajudei centenas de alunos em vários países. Agora é a sua vez.
              </p>
              <div style={{display:"flex",gap:"32px",flexWrap:"wrap"}}>
                {[["IFBB","Campeão Nacional"],["NPC","Campeão Internacional"],["5+","Anos de Consultoria"],["1000+","Alunos"]].map(([n,l])=>(
                  <div key={n}>
                    <div style={{fontFamily:F.m,fontSize:"20px",fontWeight:"500",color:G.gold,letterSpacing:"-0.5px"}}>{n}</div>
                    <div style={{fontFamily:F.s,fontSize:"11px",color:G.muted,marginTop:"2px"}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div style={{padding:"36px 0 60px"}}>
        {loading ? (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"300px",gap:"16px"}}>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <div style={{width:"38px",height:"38px",borderRadius:"50%",border:`2px solid ${G.faint}`,borderTop:`2px solid ${G.gold}`,animation:"spin 0.8s linear infinite"}}/>
            <div style={{fontFamily:F.m,fontSize:"11px",letterSpacing:"3px",color:G.muted}}>CARREGANDO...</div>
          </div>
        ) : myProds.length===0 ? (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"380px",textAlign:"center",padding:"0 20px"}}>
            <div style={{fontFamily:F.m,fontSize:"48px",color:G.faint,marginBottom:"20px"}}>◎</div>
            <h3 style={{fontFamily:F.d,fontSize:"26px",fontWeight:"700",color:G.white,margin:"0 0 10px"}}>Nenhum produto ainda</h3>
            <p style={{fontFamily:F.s,fontSize:"15px",color:G.muted,maxWidth:"320px",lineHeight:1.7,margin:"0 0 24px"}}>
              Explore o catálogo e comece sua transformação.
            </p>
            <div style={{fontFamily:F.m,fontSize:"11px",letterSpacing:"2px",
              background:`linear-gradient(135deg,${G.gold},${G.goldDim})`,
              color:"#080808",padding:"13px 24px",borderRadius:"8px",cursor:"pointer"}}>
              VER CATÁLOGO →
            </div>
          </div>
        ) : byCat.length===0 ? (
          <div style={{padding:"40px clamp(16px,4vw,60px)",fontFamily:F.s,fontSize:"15px",color:G.muted}}>Nenhum produto nessa categoria.</div>
        ) : (
          byCat.map(({cat,ps})=><Row key={cat} label={cat} ps={ps} onOpen={setViewer}/>)
        )}
      </div>

      {viewer && <Viewer p={viewer} onClose={()=>setViewer(null)}/>}
    </div>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  return user ? <Dashboard user={user} onLogout={()=>setUser(null)}/> : <Login onLogin={setUser}/>;
}

import { useState, useRef } from "react";

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

// ── PRODUTOS ──────────────────────────────────────────────────────────────────
const TREINOS = [
  { id:"hm1", cat:"Hipertrofia", gen:"Homem",  title:"Hipertrofia Máxima",        sub:"12 semanas · 5x/sem · Volume progressivo",       price:97,  badge:"MAIS VENDIDO" },
  { id:"hf1", cat:"Hipertrofia", gen:"Mulher", title:"Hipertrofia Feminina",       sub:"10 semanas · 4x/sem · Glúteo e posterior",       price:97,  badge:null },
  { id:"hm4", cat:"Hipertrofia", gen:"Ambos",  title:"Massa Total 16 Semanas",     sub:"Treino + dieta + suplementação + suporte",       price:247, badge:"PREMIUM" },
  { id:"em1", cat:"Emagrecimento", gen:"Homem",  title:"Cutting Inteligente",      sub:"8 semanas · Preservação muscular máxima",        price:97,  badge:null },
  { id:"ef1", cat:"Emagrecimento", gen:"Mulher", title:"Emagrecimento Definitivo", sub:"10 semanas · Funcional + HIIT",                  price:97,  badge:"NOVO" },
  { id:"em3", cat:"Emagrecimento", gen:"Ambos",  title:"Transformação Total",      sub:"Treino + dieta + acompanhamento semanal",        price:297, badge:"PREMIUM" },
  { id:"fm1", cat:"Força",        gen:"Homem",  title:"Força Bruta — Powerlifting",sub:"16 semanas · Squat, Bench, Deadlift",            price:97,  badge:null },
  { id:"ff1", cat:"Força",        gen:"Mulher", title:"Mulher Forte",              sub:"12 semanas · Base de força funcional",           price:97,  badge:"NOVO" },
  { id:"cm1", cat:"Condicionamento", gen:"Homem",  title:"Condicionamento Extremo",sub:"8 semanas · HIIT + corrida + metabólico",       price:87,  badge:null },
  { id:"cf1", cat:"Condicionamento", gen:"Mulher", title:"Cardio & Tônus",         sub:"8 semanas · Funcional + resistência",           price:87,  badge:null },
  { id:"cm2", cat:"Condicionamento", gen:"Ambos",  title:"Atleta do Dia a Dia",    sub:"Performance, disposição e saúde cardiovascular",price:197, badge:null },
  { id:"qm1", cat:"Qualidade de Vida", gen:"Homem",  title:"Executivo Ativo",      sub:"3x/sem · Alta eficiência · Pouco tempo",        price:77,  badge:"DESTAQUE" },
  { id:"qf1", cat:"Qualidade de Vida", gen:"Mulher", title:"Bem-Estar Feminino",   sub:"3x/sem · Mobilidade + força + saúde",           price:77,  badge:null },
  { id:"qa1", cat:"Qualidade de Vida", gen:"Ambos",  title:"Longevidade Ativa",    sub:"Treino + hábitos + mindset — para a vida toda", price:197, badge:null },
];

const DIETAS = [
  { id:"d1", title:"Dieta para Hipertrofia",     sub:"Superávit calórico · Alta proteína · Receitas práticas",                    price:67,  badge:null },
  { id:"d2", title:"Dieta de Emagrecimento",     sub:"Déficit sem sofrimento · Lista de compras · Calculadora de macros",         price:67,  badge:"MAIS PEDIDO" },
  { id:"d3", title:"Dieta de Manutenção",        sub:"Equilíbrio calórico · Foco em qualidade nutricional",                      price:47,  badge:null },
  { id:"d4", title:"Dieta Vegetariana Fit",      sub:"100% vegetariana · Alta proteína · Performance garantida",                 price:67,  badge:null },
  { id:"d5", title:"Plano Nutricional Completo", sub:"Anamnese + plano personalizado pela nutricionista parceira do Daniel",     price:197, badge:"PREMIUM" },
];

const OUTROS = [
  { id:"post1", title:"Avaliação Postural",      sub:"Questionário + análise posicional + plano de correção personalizado",      price:47,  badge:null, col:G.blue },
  { id:"mvip",  title:"Mentoria VIP 1:1",        sub:"4 semanas · Vídeo chamadas semanais · Suporte diário no WhatsApp",         price:null, badge:"EXCLUSIVO", col:G.gold, vip:true },
  { id:"mgrp",  title:"Grupo Elite TeamDR",      sub:"Acesso mensal · Lives + treinos novos + comunidade exclusiva",             price:197, badge:null, col:G.gold, monthly:true },
];

const CATS_TREINO = ["Hipertrofia","Emagrecimento","Força","Condicionamento","Qualidade de Vida"];
const GEN_COLOR   = { Homem:G.blue, Mulher:G.pink, Ambos:G.gold };

// ── THUMB ─────────────────────────────────────────────────────────────────────
function Thumb({ id, cat, col }) {
  const ac = col || (cat==="Hipertrofia"?G.blue:cat==="Emagrecimento"?G.gold:cat==="Força"?G.blue:cat==="Condicionamento"?G.green:G.pink);
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" style={{display:"block"}}>
      <defs>
        <linearGradient id={"tg"+id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={ac} stopOpacity="0.22"/>
          <stop offset="100%" stopColor={ac} stopOpacity="0.03"/>
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill={"url(#tg"+id+")"}/>
      {cat==="Hipertrofia" && <>
        {[0,1,2,3,4].map(i=><rect key={i} x="14" y={14+i*18} width={60+i*16} height="8" rx="2" fill={ac} opacity={0.07+i*0.05}/>)}
        <rect x="136" y="10" width="50" height="100" rx="4" fill={ac} opacity="0.06"/>
        {[0,1,2,3].map(i=><rect key={i} x="143" y={20+i*22} width="36" height="10" rx="2" fill={ac} opacity="0.18"/>)}
      </>}
      {cat==="Emagrecimento" && <>
        <circle cx="100" cy="60" r="44" fill="none" stroke={ac} strokeWidth="1" opacity="0.2"/>
        <circle cx="100" cy="60" r="28" fill="none" stroke={ac} strokeWidth="1" opacity="0.14"/>
        <circle cx="100" cy="60" r="14" fill={ac} opacity="0.12"/>
        {[0,1,2,3].map(i=>{const a=(i/4)*Math.PI*2-Math.PI/2;return<line key={i} x1="100" y1="60" x2={100+44*Math.cos(a)} y2={60+44*Math.sin(a)} stroke={ac} strokeWidth="1.5" opacity="0.3"/>})}
      </>}
      {cat==="Força" && <>
        {[2,1.4,0.8].map((sc,i)=><polygon key={i} points="100,10 175,105 25,105" fill="none" stroke={ac} strokeWidth={2-i*0.4} opacity={0.06+i*0.1} transform={`translate(${100*(1-sc)},${60*(1-sc)}) scale(${sc})`}/>)}
        <circle cx="100" cy="62" r="8" fill={ac} opacity="0.75"/>
      </>}
      {(cat==="Condicionamento"||cat==="Qualidade de Vida") && <>
        {[[66,38],[100,32],[134,38],[52,58],[148,58]].map(([x,y],i)=>(
          <g key={i}><circle cx={x} cy={y} r="11" fill={ac} opacity="0.1"/><circle cx={x} cy={y} r="6" fill={ac} opacity="0.22"/></g>
        ))}
        <path d="M28 100 Q100 78 172 100" fill="none" stroke={ac} strokeWidth="1.5" opacity="0.28"/>
      </>}
    </svg>
  );
}

// ── PRODUCT CARD ──────────────────────────────────────────────────────────────
function PCard({ item, inCart, onToggle, accent }) {
  const [hov, setHov] = useState(false);
  const ac = accent || G.gold;
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        borderRadius:"10px", overflow:"hidden", cursor:"pointer",
        border:`1px solid ${inCart ? G.gold : hov ? G.border : "rgba(245,240,232,0.07)"}`,
        background: inCart ? "rgba(201,168,76,0.05)" : G.bg2,
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? `0 16px 40px rgba(0,0,0,0.6)` : "0 4px 16px rgba(0,0,0,0.4)",
        transition:"all 0.28s cubic-bezier(0.23,1,0.32,1)",
        position:"relative",
      }}>
      {/* Thumb */}
      <div style={{height:"110px",background:G.bg,position:"relative"}}>
        <Thumb id={item.id} cat={item.cat} col={item.col}/>
        {item.badge && (
          <div style={{position:"absolute",top:8,left:8,
            background:item.badge==="PREMIUM"||item.badge==="EXCLUSIVO"?G.gold:"rgba(8,8,8,0.9)",
            color:item.badge==="PREMIUM"||item.badge==="EXCLUSIVO"?"#080808":G.gold,
            border:item.badge==="PREMIUM"||item.badge==="EXCLUSIVO"?"none":`1px solid ${G.border}`,
            fontFamily:F.m,fontSize:"9px",letterSpacing:"1.5px",padding:"3px 7px",borderRadius:"3px"}}>
            {item.badge}
          </div>
        )}
        {inCart && (
          <div style={{position:"absolute",top:8,right:8,width:"22px",height:"22px",
            borderRadius:"50%",background:G.gold,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontFamily:F.m,fontSize:"11px",color:"#080808",fontWeight:"500"}}>✓</div>
        )}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"2px",
          opacity:hov||inCart?1:0,transition:"opacity 0.3s",
          background:`linear-gradient(to right,transparent,${ac},transparent)`}}/>
      </div>

      {/* Info */}
      <div style={{padding:"13px 14px 15px"}}>
        {item.gen && (
          <div style={{display:"flex",gap:"5px",alignItems:"center",marginBottom:"5px"}}>
            <span style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"1px",
              color:GEN_COLOR[item.gen]||G.gold}}>{item.gen?.toUpperCase()}</span>
            {item.cat && <>
              <span style={{color:G.faint,fontSize:"9px"}}>·</span>
              <span style={{fontFamily:F.m,fontSize:"9px",color:G.muted}}>{item.cat}</span>
            </>}
          </div>
        )}
        <div style={{fontFamily:F.d,fontSize:"14px",fontWeight:"700",color:G.white,
          lineHeight:1.25,marginBottom:"5px",
          display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
          {item.title}
        </div>
        <div style={{fontFamily:F.s,fontSize:"11px",color:G.muted,lineHeight:1.5,
          marginBottom:"12px",display:"-webkit-box",WebkitLineClamp:2,
          WebkitBoxOrient:"vertical",overflow:"hidden"}}>
          {item.sub}
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontFamily:F.m,fontSize:"16px",fontWeight:"500",color:ac}}>
            {item.price ? `R$${item.price}${item.monthly?"/mês":""}` : "Sob consulta"}
          </div>
          {!item.vip && (
            <button onClick={e=>{e.stopPropagation();onToggle();}} style={{
              background: inCart ? G.gold : "transparent",
              border:`1px solid ${inCart ? G.gold : G.border}`,
              borderRadius:"6px",padding:"5px 12px",
              color: inCart ? "#080808" : G.gold,
              fontFamily:F.m,fontSize:"9px",letterSpacing:"1.5px",
              cursor:"pointer",transition:"all 0.2s",fontWeight:"500",
            }}>{inCart ? "✓ NO CARRINHO" : "+ ADICIONAR"}</button>
          )}
          {item.vip && (
            <button onClick={()=>window.open("https://wa.me/5521999999999?text=Olá Daniel! Quero saber mais sobre a Mentoria VIP","_blank")}
              style={{background:`linear-gradient(135deg,${G.gold},${G.goldDim})`,
                border:"none",borderRadius:"6px",padding:"5px 12px",
                color:"#080808",fontFamily:F.m,fontSize:"9px",letterSpacing:"1.5px",cursor:"pointer"}}>
              AGENDAR →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SECTION ROW ───────────────────────────────────────────────────────────────
function Section({ title, desc, badge, items, cart, onToggle, accent, cols=4 }) {
  return (
    <div style={{marginBottom:"56px"}}>
      <div style={{marginBottom:"20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"6px"}}>
          {badge && (
            <span style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"2px",
              background:`rgba(201,168,76,0.12)`,color:G.gold,
              border:`1px solid ${G.border}`,padding:"3px 10px",borderRadius:"20px"}}>
              {badge}
            </span>
          )}
          <h2 style={{margin:0,fontFamily:F.d,fontSize:"clamp(20px,3vw,28px)",
            fontWeight:"700",color:G.white,letterSpacing:"-0.3px"}}>{title}</h2>
          <div style={{flex:1,height:"1px",background:`linear-gradient(to right,${G.border},transparent)`}}/>
        </div>
        {desc && <p style={{margin:0,fontFamily:F.s,fontSize:"13px",color:G.muted,
          maxWidth:"560px",lineHeight:1.7}}>{desc}</p>}
      </div>
      <div style={{display:"grid",
        gridTemplateColumns:`repeat(auto-fill,minmax(200px,1fr))`,
        gap:"14px"}}>
        {items.map(item=>(
          <PCard key={item.id} item={item}
            inCart={cart.some(c=>c.id===item.id)}
            onToggle={()=>onToggle(item)}
            accent={accent}/>
        ))}
      </div>
    </div>
  );
}

// ── CART SIDEBAR ──────────────────────────────────────────────────────────────
function CartSidebar({ cart, onRemove, onClose, onCheckout }) {
  const total = cart.reduce((s,i)=>s+(i.price||0),0);
  return (
    <div style={{position:"fixed",inset:0,zIndex:500,display:"flex"}}>
      <div onClick={onClose} style={{flex:1,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)"}}/>
      <div style={{width:"min(420px,100vw)",background:G.bg2,
        borderLeft:`1px solid ${G.border}`,
        display:"flex",flexDirection:"column",
        boxShadow:"-20px 0 60px rgba(0,0,0,0.8)"}}>
        {/* Header */}
        <div style={{padding:"24px 24px 20px",borderBottom:`1px solid ${G.faint}`,
          display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"3px",color:G.gold,marginBottom:"2px"}}>
              CARRINHO
            </div>
            <div style={{fontFamily:F.s,fontSize:"13px",color:G.muted}}>
              {cart.length} produto{cart.length!==1?"s":""}
            </div>
          </div>
          <button onClick={onClose} style={{background:"transparent",border:`1px solid ${G.faint}`,
            borderRadius:"50%",width:"32px",height:"32px",color:G.muted,cursor:"pointer",fontSize:"16px",
            display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>

        {/* Items */}
        <div style={{flex:1,overflowY:"auto",padding:"16px 24px"}}>
          {cart.length===0 ? (
            <div style={{textAlign:"center",padding:"40px 0"}}>
              <div style={{fontFamily:F.m,fontSize:"32px",color:G.faint,marginBottom:"12px"}}>◎</div>
              <div style={{fontFamily:F.s,fontSize:"14px",color:G.muted}}>Carrinho vazio</div>
            </div>
          ) : cart.map(item=>(
            <div key={item.id} style={{display:"flex",gap:"12px",alignItems:"flex-start",
              padding:"12px 0",borderBottom:`1px solid ${G.faint}`}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:F.s,fontSize:"13px",color:G.white,
                  marginBottom:"3px",lineHeight:1.3}}>{item.title}</div>
                {item.cat && <div style={{fontFamily:F.m,fontSize:"9px",
                  letterSpacing:"1px",color:G.muted}}>{item.cat}</div>}
              </div>
              <div style={{fontFamily:F.m,fontSize:"14px",color:G.gold,flexShrink:0}}>
                R${item.price}
              </div>
              <button onClick={()=>onRemove(item.id)} style={{
                background:"transparent",border:"none",
                color:"rgba(255,100,100,0.5)",cursor:"pointer",
                fontSize:"16px",padding:"0 4px",flexShrink:0}}>×</button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length>0 && (
          <div style={{padding:"20px 24px",borderTop:`1px solid ${G.faint}`}}>
            <div style={{display:"flex",justifyContent:"space-between",
              alignItems:"center",marginBottom:"16px"}}>
              <div style={{fontFamily:F.m,fontSize:"10px",letterSpacing:"2px",color:G.muted}}>
                TOTAL
              </div>
              <div style={{fontFamily:F.m,fontSize:"26px",color:G.gold,letterSpacing:"-1px"}}>
                R${total}
              </div>
            </div>
            <button onClick={onCheckout} style={{
              width:"100%",
              background:`linear-gradient(135deg,${G.gold},${G.goldDim})`,
              border:"none",borderRadius:"10px",
              padding:"16px",color:"#080808",
              fontFamily:F.m,fontSize:"12px",letterSpacing:"2px",fontWeight:"500",
              cursor:"pointer",
              boxShadow:`0 8px 30px rgba(201,168,76,0.3)`,
            }}>FINALIZAR COMPRA →</button>
            <p style={{fontFamily:F.s,fontSize:"11px",color:G.muted,
              textAlign:"center",margin:"10px 0 0",lineHeight:1.5}}>
              Pagamento 100% seguro via Kiwify
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── FILTER BAR ────────────────────────────────────────────────────────────────
function FilterBar({ active, setActive }) {
  const opts = ["Todos","Hipertrofia","Emagrecimento","Força","Condicionamento","Qualidade de Vida"];
  return (
    <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"40px"}}>
      {opts.map(o=>(
        <button key={o} onClick={()=>setActive(o)} style={{
          fontFamily:F.m,fontSize:"9px",letterSpacing:"1.5px",
          background:active===o?`linear-gradient(135deg,${G.gold},${G.goldDim})`:G.faint,
          border:active===o?"none":`1px solid ${G.faint}`,
          borderRadius:"20px",padding:"7px 16px",
          color:active===o?"#080808":G.muted,
          cursor:"pointer",transition:"all 0.2s",
        }}>{o.toUpperCase()}</button>
      ))}
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Store({ onLogin }) {
  const [cart, setCart]       = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter]   = useState("Todos");
  const [scrolled, setScrolled] = useState(false);

  const toggle = (item) => {
    setCart(prev => prev.find(i=>i.id===item.id)
      ? prev.filter(i=>i.id!==item.id)
      : [...prev, item]);
  };
  const remove = (id) => setCart(prev=>prev.filter(i=>i.id!==id));
  const total  = cart.reduce((s,i)=>s+(i.price||0),0);

  const filteredTreinos = filter==="Todos"
    ? TREINOS
    : TREINOS.filter(t=>t.cat===filter);

  const showDietas   = filter==="Todos";
  const showOutros   = filter==="Todos";

  return (
    <div style={{minHeight:"100vh",background:G.bg,color:G.white,fontFamily:F.s}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <style>{`*{box-sizing:border-box} ::-webkit-scrollbar{display:none} select option{background:#161616}`}</style>

      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:200,height:"62px",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"0 clamp(16px,4vw,60px)",
        background:"rgba(8,8,8,0.96)",backdropFilter:"blur(16px)",
        borderBottom:`1px solid ${G.faint}`}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <div>
            <div style={{fontFamily:F.m,fontSize:"8px",letterSpacing:"5px",color:G.gold,lineHeight:1.3}}>TEAM</div>
            <div style={{fontFamily:F.d,fontSize:"24px",fontWeight:"900",color:G.white,lineHeight:0.85,letterSpacing:"-1px"}}>DR</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          {onLogin && (
            <button onClick={onLogin} style={{background:"transparent",border:"none",
              color:G.muted,fontFamily:F.m,fontSize:"10px",letterSpacing:"1.5px",cursor:"pointer"}}>
              JÁ SOU CLIENTE →
            </button>
          )}
          <button onClick={()=>setCartOpen(true)} style={{
            background: cart.length>0 ? `linear-gradient(135deg,${G.gold},${G.goldDim})` : "transparent",
            border: cart.length>0 ? "none" : `1px solid ${G.border}`,
            borderRadius:"8px",padding:"8px 16px",
            color: cart.length>0 ? "#080808" : G.gold,
            fontFamily:F.m,fontSize:"10px",letterSpacing:"1.5px",cursor:"pointer",
            display:"flex",alignItems:"center",gap:"8px",
            transition:"all 0.2s",
          }}>
            ◆ CARRINHO
            {cart.length>0 && (
              <span style={{background:"#080808",color:G.gold,
                borderRadius:"4px",padding:"2px 7px",fontSize:"10px"}}>
                {cart.length}
              </span>
            )}
            {total>0 && (
              <span style={{fontSize:"11px",fontWeight:"500"}}>R${total}</span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,pointerEvents:"none",
          backgroundImage:`linear-gradient(rgba(201,168,76,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.03) 1px,transparent 1px)`,
          backgroundSize:"80px 80px"}}/>
        <div style={{position:"absolute",top:"-10%",right:"-5%",width:"600px",height:"600px",
          background:`radial-gradient(ellipse,rgba(201,168,76,0.08) 0%,transparent 65%)`,pointerEvents:"none"}}/>

        <div style={{display:"flex",flexWrap:"wrap",alignItems:"stretch",minHeight:"480px",position:"relative"}}>
          {/* Photo */}
          <div style={{flex:"0 0 clamp(240px,34vw,380px)",position:"relative",overflow:"hidden"}}>
            <img src="/daniel.jpg" alt="Daniel Rezende"
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block",minHeight:"480px"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,transparent 55%,rgba(8,8,8,0.98) 100%)"}}/>
          </div>

          {/* Text */}
          <div style={{flex:1,minWidth:"280px",padding:"44px clamp(24px,4vw,56px)",
            display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"5px",color:G.gold,marginBottom:"12px"}}>
              DANIEL REZENDE · TEAMDR
            </div>
            <h1 style={{margin:"0 0 4px",fontFamily:F.d,fontSize:"clamp(34px,5vw,54px)",
              fontWeight:"900",color:G.white,lineHeight:0.9,letterSpacing:"-2px"}}>Transforme</h1>
            <h1 style={{margin:"0 0 18px",fontFamily:F.d,fontSize:"clamp(34px,5vw,54px)",
              fontWeight:"900",color:G.gold,lineHeight:0.9,letterSpacing:"-2px",fontStyle:"italic"}}>seu corpo.</h1>
            <div style={{borderLeft:`3px solid ${G.gold}`,paddingLeft:"14px",marginBottom:"16px"}}>
              <p style={{fontFamily:F.d,fontSize:"15px",fontStyle:"italic",color:G.white,lineHeight:1.5,margin:0}}>
                "Não importa se você nunca pisou numa academia ou se já treina há anos. Meu trabalho é te levar ao próximo nível."
              </p>
            </div>
            <p style={{fontFamily:F.s,fontSize:"13px",color:G.muted,lineHeight:1.85,margin:"0 0 22px",maxWidth:"440px"}}>
              Bacharel em Educação Física pela UERJ, pós graduado em Biomecânica e Cinesiologia, com Diploma internacional na área de Fitness Trainer. Atleta de fisiculturismo com mais de 10 anos competindo no Brasil e no exterior. Mais de 1000 alunos transformados em vários países.
            </p>
            <div style={{display:"flex",gap:"24px",flexWrap:"wrap"}}>
              {[["10+","anos competindo"],["1000+","alunos"],["NPC","campeão int."],["5+","anos consultoria"]].map(([n,l])=>(
                <div key={n}>
                  <div style={{fontFamily:F.m,fontSize:"18px",fontWeight:"500",color:G.gold,letterSpacing:"-0.5px"}}>{n}</div>
                  <div style={{fontFamily:F.s,fontSize:"11px",color:G.muted,marginTop:"2px"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{height:"2px",background:`linear-gradient(to right,transparent,${G.gold},transparent)`}}/>
      </div>

      {/* CATALOG */}
      <div style={{padding:"52px clamp(16px,4vw,60px) 80px"}}>

        {/* Intro */}
        <div style={{marginBottom:"36px"}}>
          <div style={{fontFamily:F.m,fontSize:"9px",letterSpacing:"5px",color:G.gold,marginBottom:"8px"}}>
            CATÁLOGO COMPLETO
          </div>
          <h2 style={{margin:"0 0 10px",fontFamily:F.d,fontSize:"clamp(24px,4vw,38px)",
            fontWeight:"700",color:G.white,letterSpacing:"-0.5px"}}>
            Escolha seus programas.
          </h2>
          <p style={{margin:0,fontFamily:F.s,fontSize:"14px",color:G.muted,maxWidth:"520px",lineHeight:1.75}}>
            Adicione quantos quiser ao carrinho e pague tudo de uma vez. Cada programa libera acesso imediato na sua área do cliente.
          </p>
        </div>

        <FilterBar active={filter} setActive={setFilter}/>

        {/* TREINOS */}
        {CATS_TREINO.filter(c=>filter==="Todos"||filter===c).map(cat=>(
          <Section key={cat} title={cat}
            desc={
              cat==="Hipertrofia"?"Programas de ganho de massa muscular com periodização testada em atletas de competição." :
              cat==="Emagrecimento"?"Protocolos de perda de gordura com preservação máxima de músculo." :
              cat==="Força"?"Levantamentos compostos, progressão de carga e técnica impecável." :
              cat==="Condicionamento"?"HIIT, corridas, metabólicos — performance e saúde cardiovascular." :
              "Treino eficiente para quem tem agenda cheia. Saúde e qualidade de vida."
            }
            badge="TREINOS"
            items={TREINOS.filter(t=>t.cat===cat)}
            cart={cart} onToggle={toggle}
            accent={cat==="Hipertrofia"?G.blue:cat==="Emagrecimento"?G.gold:cat==="Força"?G.blue:cat==="Condicionamento"?"#4CAF7D":G.pink}/>
        ))}

        {/* DIETAS */}
        {showDietas && (
          <Section title="Planos de Alimentação"
            desc="Desenvolvidos por nutricionistas parceiras do Daniel. Não são dietas genéricas — cada plano considera seu objetivo e rotina."
            badge="NUTRIÇÃO"
            items={DIETAS.map(d=>({...d,cat:null,gen:null}))}
            cart={cart} onToggle={toggle}
            accent={G.pink}/>
        )}

        {/* OUTROS */}
        {showOutros && (
          <Section title="Avaliação & Mentorias"
            desc="Do diagnóstico postural ao acompanhamento 1:1 direto com Daniel."
            badge="PREMIUM"
            items={OUTROS.map(o=>({...o,cat:null,gen:null}))}
            cart={cart} onToggle={toggle}
            accent={G.gold}/>
        )}

        {/* VIP BANNER */}
        {filter==="Todos" && (
          <div style={{marginTop:"16px",borderRadius:"16px",overflow:"hidden",position:"relative",minHeight:"280px"}}>
            <img src="/public/daniel-studio.jpg" alt="Daniel Rezende"
              style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(105deg,rgba(8,8,8,0.97) 0%,rgba(8,8,8,0.82) 55%,rgba(8,8,8,0.35) 100%)"}}/>
            <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",
              background:`linear-gradient(to right,${G.gold},transparent)`}}/>
            <div style={{position:"relative",padding:"36px 40px",display:"flex",
              alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"24px"}}>
              <div style={{flex:1,minWidth:"240px"}}>
                <div style={{display:"inline-block",fontFamily:F.m,fontSize:"9px",letterSpacing:"3px",
                  color:"#080808",background:G.gold,padding:"3px 10px",borderRadius:"3px",marginBottom:"12px"}}>
                  CONSULTORIA VIP — 1:1 COM DANIEL
                </div>
                <h3 style={{margin:"0 0 10px",fontFamily:F.d,fontSize:"clamp(20px,3vw,30px)",
                  fontWeight:"900",color:G.white,lineHeight:1.1}}>
                  Chega de adivinhar.<br/>
                  <em style={{color:G.gold}}>Daniel no seu lado.</em>
                </h3>
                <p style={{fontFamily:F.s,fontSize:"13px",color:G.muted,margin:"0 0 6px",lineHeight:1.75,maxWidth:"400px"}}>
                  Programa 100% individual, vídeo chamadas semanais e suporte diário no WhatsApp. Vagas limitadas por mês — Daniel acompanha poucos alunos por vez para garantir atenção total.
                </p>
              </div>
              <button onClick={()=>window.open("https://wa.me/5521999999999?text=Olá Daniel! Quero saber mais sobre a Consultoria VIP 1:1","_blank")} style={{
                background:`linear-gradient(135deg,${G.gold},${G.goldDim})`,
                border:"none",borderRadius:"10px",
                padding:"16px 28px",color:"#080808",
                fontFamily:F.m,fontSize:"11px",letterSpacing:"2px",fontWeight:"500",
                cursor:"pointer",flexShrink:0,
                boxShadow:`0 8px 30px rgba(201,168,76,0.3)`,
              }}>AGENDAR MINHA CHAMADA →</button>
            </div>
          </div>
        )}
      </div>

      {/* CART SIDEBAR */}
      {cartOpen && (
        <CartSidebar cart={cart} onRemove={remove}
          onClose={()=>setCartOpen(false)}
          onCheckout={()=>alert("Integrar com Kiwify!")}/>
      )}
    </div>
  );
}

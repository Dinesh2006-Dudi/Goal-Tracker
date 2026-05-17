import { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
  AreaChart, Area
} from "recharts";
import {
  Target, Users, Briefcase, Bell, LogOut, Plus, Clock, TrendingUp,
  Award, Calendar, Search, Download, CheckCircle, AlertCircle,
  Menu, X, Home, Mail, User, Code, Activity, Zap, Filter,
  ChevronDown, FileText, Send, RefreshCw, Edit, BarChart2, Shield,
  ArrowRight, ChevronRight, Check, Building2, Star, Cpu, Globe,
  Database
} from "lucide-react";

/* ─────────────────────────── GLOBAL STYLES ─────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Outfit',sans-serif;background:#040b18;color:#f1f5f9;overflow-x:hidden}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#070f1f}
::-webkit-scrollbar-thumb{background:linear-gradient(#1e40af,#7c3aed);border-radius:99px}
.glass{background:rgba(10,18,35,0.85);backdrop-filter:blur(20px);border:1px solid rgba(148,163,184,0.09)}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideIn{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(59,130,246,.4)}50%{box-shadow:0 0 0 8px rgba(59,130,246,0)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
.anim-up{animation:fadeUp .45s cubic-bezier(.22,1,.36,1) both}
.anim-in{animation:slideIn .35s cubic-bezier(.22,1,.36,1) both}
.grad-text{background:linear-gradient(135deg,#60a5fa 0%,#a78bfa 50%,#34d399 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-bg{background:radial-gradient(ellipse 80% 50% at 20% 40%,rgba(29,78,216,.18) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 80% 20%,rgba(124,58,237,.14) 0%,transparent 60%),radial-gradient(ellipse 50% 60% at 60% 90%,rgba(16,185,129,.09) 0%,transparent 60%),#040b18}
.card{transition:all .28s cubic-bezier(.22,1,.36,1);border:1px solid rgba(148,163,184,.08)}
.card:hover{transform:translateY(-4px);border-color:rgba(96,165,250,.35)!important;box-shadow:0 24px 48px rgba(0,0,0,.35)}
input,textarea,select{background:rgba(8,16,32,.9)!important;border:1px solid rgba(148,163,184,.15)!important;color:#f1f5f9!important;padding:11px 14px;border-radius:10px;width:100%;font-family:'Outfit',sans-serif;font-size:14px;outline:none;transition:border-color .2s;resize:vertical}
input:focus,textarea:focus,select:focus{border-color:rgba(96,165,250,.55)!important;box-shadow:0 0 0 3px rgba(59,130,246,.1)}
input::placeholder,textarea::placeholder{color:rgba(100,116,139,.6)}
option{background:#0a1628}
.btn{padding:10px 20px;border-radius:10px;border:none;cursor:pointer;font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;transition:all .2s;display:inline-flex;align-items:center;gap:7px}
.btn-p{background:linear-gradient(135deg,#2563eb,#7c3aed);color:#fff}
.btn-p:hover{opacity:.88;transform:translateY(-1px);box-shadow:0 8px 24px rgba(37,99,235,.35)}
.btn-s{background:rgba(148,163,184,.09);color:#94a3b8;border:1px solid rgba(148,163,184,.15)!important}
.btn-s:hover{background:rgba(148,163,184,.16);color:#f1f5f9}
.btn-d{background:rgba(239,68,68,.1);color:#f87171;border:1px solid rgba(239,68,68,.25)!important}
.badge{padding:3px 11px;border-radius:20px;font-size:11px;font-weight:700;display:inline-block;white-space:nowrap;letter-spacing:.02em}
.b-green{background:rgba(16,185,129,.15);color:#34d399;border:1px solid rgba(52,211,153,.3)}
.b-blue{background:rgba(59,130,246,.15);color:#60a5fa;border:1px solid rgba(96,165,250,.3)}
.b-amber{background:rgba(245,158,11,.15);color:#fbbf24;border:1px solid rgba(251,191,36,.3)}
.b-red{background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(248,113,113,.3)}
.b-purple{background:rgba(124,58,237,.15);color:#a78bfa;border:1px solid rgba(167,139,250,.3)}
.notif-dot{width:8px;height:8px;background:#ef4444;border-radius:50%;position:absolute;top:-1px;right:-1px;border:2px solid #040b18}
table{width:100%;border-collapse:collapse}
th{padding:11px 16px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#475569;border-bottom:1px solid rgba(148,163,184,.08)}
td{padding:13px 16px;font-size:14px;color:#cbd5e1;border-bottom:1px solid rgba(148,163,184,.04);vertical-align:middle}
tr:hover td{background:rgba(148,163,184,.025)}
.sidebar{width:252px;min-height:100vh;background:rgba(5,11,24,.97);border-right:1px solid rgba(148,163,184,.07);flex-shrink:0;display:flex;flex-direction:column}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.82);backdrop-filter:blur(10px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px}
input[type=range]{-webkit-appearance:none;height:6px;background:rgba(148,163,184,.2);border-radius:99px;width:100%;border:none!important;padding:0!important;cursor:pointer}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#2563eb,#7c3aed);cursor:pointer;box-shadow:0 0 8px rgba(59,130,246,.5)}
input[type=checkbox]{width:17px;height:17px;accent-color:#3b82f6;cursor:pointer}
`;

/* ─────────────────────────── MOCK DATA ─────────────────────────── */
const TECHS = ['React.js','Node.js','Python','PostgreSQL','MongoDB','AWS','Docker','Vue.js','Django','Redis','GraphQL','TypeScript'];

const COMPANIES = [
  {name:'Google',emoji:'🔵',projects:3,industry:'Technology',techs:['React.js','Python','Kubernetes','TensorFlow']},
  {name:'Microsoft',emoji:'🟦',projects:5,industry:'Technology',techs:['TypeScript','Azure','C#','.NET Core']},
  {name:'Amazon',emoji:'🟠',projects:4,industry:'E-Commerce',techs:['AWS','Java','DynamoDB','Lambda']},
  {name:'Meta',emoji:'🔷',projects:2,industry:'Social Media',techs:['React.js','GraphQL','Python','Cassandra']},
  {name:'Netflix',emoji:'🔴',projects:3,industry:'Streaming',techs:['Node.js','Java','Kafka','Redis']},
  {name:'Spotify',emoji:'🟢',projects:2,industry:'Music',techs:['Python','React.js','PostgreSQL','Kubernetes']},
];

const USERS = [
  {id:1,name:'Alex Morgan',   email:'admin@goaltracker.com',pw:'admin123',role:'admin',   av:'AM',dept:'Management',     skill:null},
  {id:2,name:'Sarah Chen',    email:'hr@goaltracker.com',   pw:'hr123',   role:'hr',      av:'SC',dept:'Human Resources',skill:null},
  {id:3,name:'James Wilson',  email:'emp@goaltracker.com',  pw:'emp123',  role:'employee',av:'JW',dept:'Engineering',    skill:'React.js'},
  {id:4,name:'Priya Sharma',  email:'priya@goaltracker.com',pw:'emp123',  role:'employee',av:'PS',dept:'Engineering',    skill:'Node.js'},
  {id:5,name:'Carlos Rivera', email:'carlos@example.com',   pw:'emp123',  role:'employee',av:'CR',dept:'Engineering',    skill:'Python'},
  {id:6,name:'Emma Davis',    email:'emma@example.com',     pw:'emp123',  role:'employee',av:'ED',dept:'Engineering',    skill:'PostgreSQL'},
  {id:7,name:'Liam Park',     email:'liam@example.com',     pw:'emp123',  role:'employee',av:'LP',dept:'Engineering',    skill:'AWS'},
  {id:8,name:'Nina Patel',    email:'nina@example.com',     pw:'emp123',  role:'employee',av:'NP',dept:'Engineering',    skill:'Docker'},
];

const PROJECTS = [
  {id:1,name:'E-Commerce Platform Redesign',client:'TechCorp Solutions',
   desc:'Complete redesign of client e-commerce platform with modern UI and improved performance.',
   status:'in-progress',priority:'high',start:'2024-01-15',deadline:'2024-06-30',progress:68,
   techs:['React.js','Node.js','PostgreSQL','AWS','Docker','Redis'],team:[3,4,5,6,7,8],hrId:2,planned:100,actual:68},
  {id:2,name:'Mobile Banking App',client:'FinanceFirst Bank',
   desc:'Develop a secure mobile banking application with real-time transaction capabilities.',
   status:'active',priority:'critical',start:'2024-02-01',deadline:'2024-08-31',progress:42,
   techs:['React.js','Python','PostgreSQL','AWS'],team:[3,5,6,7],hrId:2,planned:60,actual:42},
  {id:3,name:'Analytics Dashboard',client:'DataViz Corp',
   desc:'Build a comprehensive analytics dashboard for enterprise business intelligence.',
   status:'completed',priority:'medium',start:'2023-09-01',deadline:'2024-01-31',progress:100,
   techs:['React.js','Python','MongoDB'],team:[3,4,5],hrId:2,planned:100,actual:100},
  {id:4,name:'Healthcare Portal',client:'MediCare Plus',
   desc:'Patient management system with appointment scheduling and medical records.',
   status:'pending',priority:'high',start:'2024-04-01',deadline:'2024-10-30',progress:15,
   techs:['Vue.js','Django','PostgreSQL','Docker'],team:[4,5,6,8],hrId:2,planned:25,actual:15},
];

const CHECKINS = [
  {id:1,pid:1,eid:3,date:'2024-01-15',type:'assign', note:'Project assigned by HR Sarah Chen. You are responsible for React.js frontend.',prog:0},
  {id:2,pid:1,eid:3,date:'2024-02-01',type:'monthly',note:'Completed initial UI wireframes and component architecture. Set up Vite + Tailwind.',prog:15},
  {id:3,pid:1,eid:3,date:'2024-03-01',type:'monthly',note:'Frontend core components built. Navigation, dashboard layout, and auth flows done.',prog:35},
  {id:4,pid:1,eid:3,date:'2024-04-01',type:'monthly',note:'Product pages, cart, and checkout UI implemented. Integrated with backend APIs.',prog:55},
  {id:5,pid:1,eid:3,date:'2024-05-01',type:'monthly',note:'Payment integration and admin panel completed. Starting performance optimization.',prog:68},
  {id:6,pid:1,eid:4,date:'2024-01-15',type:'assign', note:'Assigned for Node.js backend API development. REST API architecture design.',prog:0},
  {id:7,pid:1,eid:4,date:'2024-02-01',type:'monthly',note:'API architecture designed. Auth endpoints with JWT, product CRUD APIs built.',prog:20},
  {id:8,pid:1,eid:4,date:'2024-03-01',type:'monthly',note:'Cart, order management endpoints complete. Middleware and rate limiting added.',prog:45},
  {id:9,pid:1,eid:4,date:'2024-04-01',type:'monthly',note:'Payment gateway integrated. Order tracking and email notification APIs done.',prog:65},
  {id:10,pid:1,eid:4,date:'2024-05-01',type:'monthly',note:'Redis caching layer and API optimization done. Reduced response time by 40%.',prog:72},
];

const ACH = [
  {month:'Jan',planned:15,actual:12},{month:'Feb',planned:30,actual:28},
  {month:'Mar',planned:50,actual:45},{month:'Apr',planned:65,actual:60},
  {month:'May',planned:80,actual:68},{month:'Jun',planned:100,actual:75},
];
const PIE_DATA = [
  {name:'Completed',value:1,color:'#10b981'},{name:'In Progress',value:2,color:'#3b82f6'},
  {name:'Active',value:1,color:'#a78bfa'},{name:'Pending',value:1,color:'#f59e0b'},
];
const AV_COLORS = ['#2563eb','#7c3aed','#0891b2','#059669','#d97706','#dc2626','#0e7490','#7c3aed'];

/* ─────────────────────────── HELPERS ─────────────────────────── */
const badgeClass = s => ({
  'in-progress':'b-blue','active':'b-purple','completed':'b-green','pending':'b-amber',
  'delayed':'b-red','high':'b-amber','critical':'b-red','medium':'b-blue','low':'b-green',
  'admin':'b-red','hr':'b-blue','employee':'b-green',
}[s] || 'b-blue');

const Av = ({s,z=36,c='#2563eb'}) => (
  <div style={{width:z,height:z,borderRadius:'50%',background:`linear-gradient(135deg,${c},${c}bb)`,
    display:'flex',alignItems:'center',justifyContent:'center',fontSize:z*.32,fontWeight:800,color:'#fff',flexShrink:0}}>
    {s}
  </div>
);

const PBar = ({v,h=6}) => {
  const col = v>=80?'#10b981':v>=50?'#3b82f6':v>=25?'#f59e0b':'#ef4444';
  return (
    <div style={{height:h,background:'rgba(148,163,184,.15)',borderRadius:99,overflow:'hidden',width:'100%'}}>
      <div style={{width:`${Math.min(v,100)}%`,height:'100%',background:`linear-gradient(90deg,${col},${col}cc)`,
        borderRadius:99,transition:'width 1s ease'}}/>
    </div>
  );
};

const KCard = ({icon:Icon,label,value,sub,chg,color='#3b82f6'}) => (
  <div className="glass card anim-up" style={{padding:22,borderRadius:16,display:'flex',flexDirection:'column',gap:12}}>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div style={{width:42,height:42,borderRadius:12,background:`${color}22`,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Icon size={19} color={color}/>
      </div>
      {chg !== undefined && (
        <span style={{fontSize:12,color:chg>=0?'#34d399':'#f87171',fontWeight:700}}>
          {chg>=0?'↑':'↓'} {Math.abs(chg)}%
        </span>
      )}
    </div>
    <div>
      <div style={{fontSize:26,fontWeight:900,color:'#f1f5f9',letterSpacing:'-1px'}}>{value}</div>
      <div style={{fontSize:13,color:'#64748b',marginTop:2}}>{label}</div>
      {sub && <div style={{fontSize:11,color:'#475569',marginTop:3}}>{sub}</div>}
    </div>
  </div>
);

const TT_STYLE = {contentStyle:{background:'#0a1628',border:'1px solid rgba(148,163,184,.2)',borderRadius:10,color:'#f1f5f9',fontSize:13}};

/* ─────────────────────────── LANDING PAGE ─────────────────────────── */
const Landing = ({onLogin}) => {
  const [sec,setSec] = useState('home');
  const [form,setForm] = useState({name:'',email:'',msg:''});
  const [sent,setSent] = useState(false);

  return (
    <div style={{minHeight:'100vh'}} className="hero-bg">
      {/* NAV */}
      <nav className="glass" style={{position:'sticky',top:0,zIndex:100,padding:'0 36px',height:66,
        display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid rgba(148,163,184,.07)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:38,height:38,borderRadius:11,background:'linear-gradient(135deg,#2563eb,#7c3aed)',
            display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Target size={19} color="#fff"/>
          </div>
          <span style={{fontSize:20,fontWeight:900,letterSpacing:'-0.5px'}}>
            Goal<span className="grad-text">Tracker</span>
          </span>
        </div>
        <div style={{display:'flex',gap:2,alignItems:'center'}}>
          {['Home','Features','Companies','Contact'].map(n=>(
            <button key={n} onClick={()=>setSec(n.toLowerCase())} style={{padding:'8px 16px',borderRadius:9,border:'none',
              background:sec===n.toLowerCase()?'rgba(59,130,246,.14)':'transparent',
              color:sec===n.toLowerCase()?'#60a5fa':'#64748b',cursor:'pointer',fontSize:14,fontWeight:500,
              fontFamily:'Outfit,sans-serif',transition:'all .2s'}}>
              {n}
            </button>
          ))}
        </div>
        <button className="btn btn-p" onClick={onLogin}><User size={14}/> Sign In</button>
      </nav>

      <div style={{maxWidth:1200,margin:'0 auto',padding:'72px 32px 60px'}}>
        {/* HERO */}
        <div style={{textAlign:'center',maxWidth:740,margin:'0 auto 64px'}} className="anim-up">
          <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 18px',borderRadius:20,
            background:'rgba(59,130,246,.1)',border:'1px solid rgba(59,130,246,.3)',marginBottom:22,fontSize:13,color:'#93c5fd',fontWeight:600}}>
            <Zap size={13}/> Enterprise Project Management Platform
          </div>
          <h1 style={{fontSize:'clamp(38px,5.5vw,68px)',fontWeight:900,lineHeight:1.05,marginBottom:20,letterSpacing:'-2.5px'}}>
            Track Goals,<br/><span className="grad-text">Drive Results</span>
          </h1>
          <p style={{fontSize:18,color:'#64748b',lineHeight:1.75,marginBottom:36,maxWidth:560,margin:'0 auto 36px'}}>
            A unified platform bridging HR assignment, employee execution, and Admin oversight — with real-time progress and achievement analytics.
          </p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn btn-p" onClick={onLogin} style={{padding:'14px 32px',fontSize:16}}>
              Get Started <ArrowRight size={16}/>
            </button>
            <button className="btn btn-s" style={{padding:'14px 32px',fontSize:16}}>
              View Demo
            </button>
          </div>
        </div>

        {/* STATS STRIP */}
        <div className="glass" style={{borderRadius:16,padding:'20px 32px',marginBottom:56,
          display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:20}}>
          {[['500+','Companies'],['12K+','Projects Tracked'],['98%','On-Time Rate'],['4.9★','User Rating']].map(([v,l])=>(
            <div key={l} style={{textAlign:'center'}}>
              <div style={{fontSize:28,fontWeight:900,background:'linear-gradient(135deg,#60a5fa,#a78bfa)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{v}</div>
              <div style={{fontSize:13,color:'#64748b',marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <div style={{marginBottom:64}}>
          <h2 style={{fontSize:32,fontWeight:800,textAlign:'center',marginBottom:8}}>Platform Features</h2>
          <p style={{color:'#64748b',textAlign:'center',marginBottom:36,fontSize:16}}>Built for every role in your organization</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:18}}>
            {[
              {icon:Shield,title:'Admin Control',color:'#7c3aed',
               desc:'Full visibility over all projects, teams, and KPIs. Manage user roles and generate consolidated reports.'},
              {icon:Users,title:'HR Management',color:'#2563eb',
               desc:'Assign client projects, map technologies to employees, set timelines, and push real-time updates.'},
              {icon:Activity,title:'Employee Tracking',color:'#059669',
               desc:'Submit monthly or quarterly progress updates, view check-in history, and track personal achievements.'},
              {icon:TrendingUp,title:'Achievement Reports',color:'#d97706',
               desc:'Planned vs. actual completion charts with team and individual breakdowns, exportable to PDF/Excel.'},
              {icon:Calendar,title:'Check-In Timeline',color:'#0891b2',
               desc:'Timestamped assignment and progress logs showing the complete lifecycle of every project.'},
              {icon:BarChart2,title:'Real-Time Dashboard',color:'#dc2626',
               desc:'Live KPIs, project completion rates, on-time delivery tracking, and active employee status.'},
            ].map(({icon:Icon,title,color,desc})=>(
              <div key={title} className="glass card" style={{padding:28,borderRadius:16}}>
                <div style={{width:46,height:46,borderRadius:13,background:`${color}20`,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}}>
                  <Icon size={21} color={color}/>
                </div>
                <h3 style={{fontSize:17,fontWeight:700,marginBottom:10}}>{title}</h3>
                <p style={{fontSize:14,color:'#64748b',lineHeight:1.65}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TOP COMPANIES */}
        <div style={{marginBottom:64}}>
          <h2 style={{fontSize:32,fontWeight:800,textAlign:'center',marginBottom:8}}>Top Companies on GoalTracker</h2>
          <p style={{color:'#64748b',textAlign:'center',marginBottom:36,fontSize:16}}>Trusted by the world's leading technology companies</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(310px,1fr))',gap:16}}>
            {COMPANIES.map(c=>(
              <div key={c.name} className="glass card" style={{padding:24,borderRadius:16}}>
                <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:14}}>
                  <span style={{fontSize:30}}>{c.emoji}</span>
                  <div>
                    <div style={{fontWeight:700,fontSize:16}}>{c.name}</div>
                    <div style={{fontSize:12,color:'#64748b'}}>{c.industry} · {c.projects} Active Projects</div>
                  </div>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                  {c.techs.map(t=>(
                    <span key={t} style={{padding:'4px 11px',borderRadius:6,fontSize:12,fontWeight:500,
                      background:'rgba(59,130,246,.09)',color:'#93c5fd',border:'1px solid rgba(59,130,246,.2)'}}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <div className="glass" style={{borderRadius:20,padding:48,textAlign:'center',border:'1px solid rgba(148,163,184,.09)'}}>
          <h2 style={{fontSize:28,fontWeight:800,marginBottom:10}}>Get in Touch</h2>
          <p style={{color:'#64748b',marginBottom:28,fontSize:16}}>Questions? Our team is ready to help you get started.</p>
          {sent ? (
            <div style={{padding:'16px 24px',borderRadius:12,background:'rgba(16,185,129,.15)',border:'1px solid rgba(52,211,153,.3)',
              color:'#34d399',fontSize:15,fontWeight:600,display:'inline-flex',alignItems:'center',gap:8}}>
              <CheckCircle size={18}/> Message sent! We'll get back to you shortly.
            </div>
          ) : (
            <div style={{maxWidth:560,margin:'0 auto'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
                <input placeholder="Your Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                <input placeholder="Your Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
              </div>
              <textarea rows={3} placeholder="Your message..." style={{marginBottom:16}} value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})}/>
              <button className="btn btn-p" style={{padding:'12px 32px',fontSize:15}} onClick={()=>setSent(true)}>
                <Send size={15}/> Send Message
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{textAlign:'center',padding:'24px',borderTop:'1px solid rgba(148,163,184,.07)',color:'#475569',fontSize:13}}>
        © 2024 GoalTracker · Enterprise Project Management Platform · Built with React + Recharts
      </div>
    </div>
  );
};

/* ─────────────────────────── AUTH MODAL ─────────────────────────── */
const Auth = ({onClose,onLogin}) => {
  const [mode,setMode] = useState('login');
  const [email,setEmail] = useState('');
  const [pw,setPw] = useState('');
  const [name,setName] = useState('');
  const [role,setRole] = useState('employee');
  const [err,setErr] = useState('');

  const handle = () => {
    const u = USERS.find(u=>u.email===email && u.pw===pw);
    if(u){onLogin(u);onClose();}
    else setErr('Invalid email or password. Try a quick login below.');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass anim-up" style={{width:'100%',maxWidth:450,borderRadius:22,padding:36,
        border:'1px solid rgba(148,163,184,.14)'}} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:26}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:4}}>
              <Target size={22} color="#3b82f6"/>
              <span style={{fontSize:20,fontWeight:900}}>GoalTracker</span>
            </div>
            <p style={{fontSize:13,color:'#64748b'}}>{mode==='login'?'Sign in to your account':'Create a new account'}</p>
          </div>
          <button onClick={onClose} style={{background:'rgba(148,163,184,.08)',border:'none',borderRadius:9,padding:8,cursor:'pointer',color:'#94a3b8'}}>
            <X size={17}/>
          </button>
        </div>

        {/* Quick logins */}
        {mode==='login' && (
          <div style={{marginBottom:18}}>
            <p style={{fontSize:11,color:'#475569',marginBottom:8,fontWeight:700,letterSpacing:'.06em'}}>QUICK DEMO LOGIN</p>
            <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
              {[{l:'👑 Admin',e:'admin@goaltracker.com',p:'admin123',c:'#7c3aed'},
                {l:'👩 HR',  e:'hr@goaltracker.com',   p:'hr123',   c:'#2563eb'},
                {l:'👨 Employee',e:'emp@goaltracker.com',p:'emp123',c:'#059669'}]
                .map(({l,e,p,c})=>(
                <button key={l} onClick={()=>{setEmail(e);setPw(p);}} style={{padding:'7px 14px',borderRadius:9,border:`1px solid ${c}44`,
                  background:`${c}12`,color:c,fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'Outfit,sans-serif',transition:'all .2s'}}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Toggle */}
        <div style={{display:'flex',background:'rgba(148,163,184,.07)',borderRadius:11,padding:4,marginBottom:22}}>
          {['login','register'].map(m=>(
            <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:9,borderRadius:9,border:'none',
              background:mode===m?'rgba(59,130,246,.2)':'transparent',
              color:mode===m?'#60a5fa':'#64748b',fontWeight:700,fontSize:14,cursor:'pointer',
              fontFamily:'Outfit,sans-serif',transition:'all .2s'}}>
              {m==='login'?'Sign In':'Register'}
            </button>
          ))}
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {mode==='register' && <input placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)}/>}
          <input placeholder="Email" type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr('')}}/>
          <input placeholder="Password" type="password" value={pw} onChange={e=>{setPw(e.target.value);setErr('')}}/>
          {mode==='register' && (
            <select value={role} onChange={e=>setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="hr">HR Manager</option>
              <option value="employee">Employee</option>
            </select>
          )}
        </div>

        {err && <div style={{marginTop:10,padding:'9px 13px',borderRadius:9,background:'rgba(239,68,68,.1)',
          border:'1px solid rgba(239,68,68,.25)',color:'#f87171',fontSize:13}}>{err}</div>}

        <button className="btn btn-p" onClick={handle} style={{width:'100%',marginTop:18,padding:13,fontSize:15,justifyContent:'center'}}>
          {mode==='login'?'Sign In →':'Create Account'}
        </button>

        <p style={{textAlign:'center',marginTop:14,fontSize:12,color:'#475569'}}>
          Demo: admin@goaltracker.com / admin123
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────── SIDEBAR ─────────────────────────── */
const Sidebar = ({user,tab,setTab,onOut,tabs}) => {
  const RC = {admin:'#7c3aed',hr:'#2563eb',employee:'#059669'};
  const C = RC[user.role]||'#2563eb';
  return (
    <div className="sidebar">
      <div style={{padding:'22px 18px 14px',borderBottom:'1px solid rgba(148,163,184,.07)'}}>
        <div style={{display:'flex',alignItems:'center',gap:9}}>
          <div style={{width:34,height:34,borderRadius:10,background:'linear-gradient(135deg,#2563eb,#7c3aed)',
            display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Target size={17} color="#fff"/>
          </div>
          <span style={{fontSize:17,fontWeight:900}}>GoalTracker</span>
        </div>
      </div>
      <div style={{padding:'14px 16px',borderBottom:'1px solid rgba(148,163,184,.07)'}}>
        <div style={{display:'flex',alignItems:'center',gap:11}}>
          <Av s={user.av} z={38} c={C}/>
          <div>
            <div style={{fontWeight:700,fontSize:14,color:'#f1f5f9'}}>{user.name}</div>
            <div style={{fontSize:11,color:'#64748b',textTransform:'capitalize',marginTop:1}}>{user.role}</div>
          </div>
        </div>
      </div>
      <nav style={{flex:1,padding:'10px 10px',display:'flex',flexDirection:'column',gap:2,overflowY:'auto'}}>
        {tabs.map(({id,label,icon:Icon})=>(
          <button key={id} onClick={()=>setTab(id)} style={{display:'flex',alignItems:'center',gap:11,
            padding:'10px 13px',borderRadius:10,border:'none',cursor:'pointer',
            background:tab===id?`${C}18`:'transparent',
            color:tab===id?C:'#64748b',
            fontFamily:'Outfit,sans-serif',fontSize:14,fontWeight:tab===id?700:400,
            transition:'all .2s',textAlign:'left',
            borderLeft:tab===id?`3px solid ${C}`:'3px solid transparent'}}>
            <Icon size={16}/>{label}
          </button>
        ))}
      </nav>
      <div style={{padding:'14px 10px',borderTop:'1px solid rgba(148,163,184,.07)'}}>
        <button onClick={onOut} style={{display:'flex',alignItems:'center',gap:11,
          padding:'10px 13px',borderRadius:10,border:'none',cursor:'pointer',
          background:'transparent',color:'#64748b',width:'100%',
          fontFamily:'Outfit,sans-serif',fontSize:14,transition:'all .2s'}}>
          <LogOut size={16}/>Sign Out
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────── DASH HEADER ─────────────────────────── */
const DHeader = ({title,sub,user,roleColor,notif=0}) => (
  <div style={{padding:'18px 30px',borderBottom:'1px solid rgba(148,163,184,.07)',
    display:'flex',alignItems:'center',justifyContent:'space-between',
    background:'rgba(5,11,24,.7)',backdropFilter:'blur(20px)'}}>
    <div>
      <h1 style={{fontSize:21,fontWeight:800,letterSpacing:'-0.5px'}}>{title}</h1>
      <p style={{fontSize:13,color:'#64748b',marginTop:1}}>{sub}</p>
    </div>
    <div style={{display:'flex',alignItems:'center',gap:10}}>
      {notif>0 && (
        <div style={{position:'relative'}}>
          <button style={{background:'rgba(148,163,184,.08)',border:'none',borderRadius:10,padding:9,cursor:'pointer',color:'#94a3b8'}}>
            <Bell size={17}/>
          </button>
          <div className="notif-dot"/>
        </div>
      )}
      <Av s={user.av} z={34} c={roleColor}/>
    </div>
  </div>
);

/* ─────────────────────────── CHECK-INS ─────────────────────────── */
const CheckIns = ({user}) => {
  const [pid,setPid] = useState(1);
  const [eid,setEid] = useState('all');
  const list = CHECKINS.filter(c=>c.pid===pid&&(eid==='all'||c.eid===Number(eid)));
  const proj = PROJECTS.find(p=>p.id===pid);
  return (
    <div className="anim-up">
      <div style={{display:'flex',gap:12,marginBottom:22,flexWrap:'wrap'}}>
        <select value={pid} onChange={e=>setPid(Number(e.target.value))} style={{maxWidth:280}}>
          {PROJECTS.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        {user.role!=='employee' && (
          <select value={eid} onChange={e=>setEid(e.target.value)} style={{maxWidth:220}}>
            <option value="all">All Employees</option>
            {USERS.filter(u=>u.role==='employee').map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        )}
      </div>
      {proj && (
        <div className="glass" style={{padding:18,borderRadius:13,marginBottom:20,border:'1px solid rgba(148,163,184,.08)'}}>
          <div style={{display:'flex',gap:24,flexWrap:'wrap'}}>
            {[['Project',proj.name],['Client',proj.client],['Progress',proj.progress+'%'],['Status',proj.status]].map(([k,v])=>(
              <div key={k}><div style={{fontSize:11,color:'#64748b',marginBottom:2}}>{k}</div>
                <div style={{fontWeight:700,fontSize:14,color:k==='Progress'?'#34d399':'#f1f5f9'}}>{v}</div></div>
            ))}
          </div>
        </div>
      )}
      {list.length===0?(
        <div className="glass" style={{padding:40,borderRadius:16,textAlign:'center',border:'1px solid rgba(148,163,184,.08)'}}>
          <Calendar size={36} color="#475569" style={{marginBottom:10}}/>
          <p style={{color:'#64748b'}}>No check-ins found for the selected filters.</p>
        </div>
      ):list.map((c,i)=>{
        const emp=USERS.find(u=>u.id===c.eid);
        const isA=c.type==='assign';
        const col=isA?'#7c3aed':'#3b82f6';
        return (
          <div key={c.id} style={{display:'flex',gap:14,paddingBottom:18,position:'relative'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',paddingTop:3}}>
              <div style={{width:30,height:30,borderRadius:'50%',background:`${col}20`,border:`2px solid ${col}`,
                display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,zIndex:1}}>
                {isA?<Send size={11} color={col}/>:<Check size={11} color={col}/>}
              </div>
              {i<list.length-1 && <div style={{width:2,flex:1,minHeight:18,background:'rgba(59,130,246,.15)',marginTop:4}}/>}
            </div>
            <div className="glass" style={{flex:1,padding:15,borderRadius:12,marginBottom:3,border:`1px solid ${col}18`}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:7,flexWrap:'wrap',gap:6}}>
                <div style={{display:'flex',alignItems:'center',gap:9}}>
                  {emp && <Av s={emp.av} z={26} c={AV_COLORS[emp.id%AV_COLORS.length]}/>}
                  <div>
                    <span style={{fontWeight:700,fontSize:14}}>{emp?.name}</span>
                    <span style={{fontSize:12,color:'#64748b',marginLeft:8}}>{isA?'🎯 Project Assigned':'📊 Monthly Check-In'}</span>
                  </div>
                </div>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  {!isA && <span style={{fontSize:13,fontWeight:800,color:'#34d399'}}>{c.prog}%</span>}
                  <span style={{fontSize:11,color:'#64748b',display:'flex',alignItems:'center',gap:3}}>
                    <Calendar size={10}/>{c.date}
                  </span>
                </div>
              </div>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.55}}>{c.note}</p>
              {!isA && <div style={{marginTop:9}}><PBar v={c.prog} h={4}/></div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ─────────────────────────── REPORTS ─────────────────────────── */
const Reports = () => (
  <div className="anim-up">
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:22,flexWrap:'wrap',gap:12}}>
      <div>
        <h2 style={{fontSize:19,fontWeight:800}}>Project Achievement Reports</h2>
        <p style={{color:'#64748b',fontSize:14,marginTop:2}}>Planned Goals vs. Actual Completion</p>
      </div>
      <div style={{display:'flex',gap:8}}>
        <button className="btn btn-s"><Download size={13}/> PDF</button>
        <button className="btn btn-s"><Download size={13}/> Excel</button>
      </div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:14,marginBottom:22}}>
      <KCard icon={Target} label="Tracked" value="4" color="#3b82f6"/>
      <KCard icon={CheckCircle} label="On Target" value="2" color="#10b981"/>
      <KCard icon={AlertCircle} label="Below Target" value="2" color="#f59e0b"/>
      <KCard icon={Award} label="Avg Rate" value="72%" color="#7c3aed"/>
    </div>
    <div className="glass" style={{padding:24,borderRadius:16,marginBottom:18,border:'1px solid rgba(148,163,184,.08)'}}>
      <h3 style={{fontSize:15,fontWeight:700,marginBottom:18}}>All Projects: Planned vs Actual Completion</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={PROJECTS.map(p=>({name:p.name.slice(0,14)+'…',Planned:p.planned,Actual:p.actual}))} barSize={26}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.07)"/>
          <XAxis dataKey="name" tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false}/>
          <YAxis tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false} unit="%"/>
          <Tooltip {...TT_STYLE} formatter={v=>`${v}%`}/>
          <Legend/>
          <Bar dataKey="Planned" fill="#3b82f6" radius={[5,5,0,0]} opacity={.7}/>
          <Bar dataKey="Actual"  fill="#10b981" radius={[5,5,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
    {PROJECTS.map(p=>(
      <div key={p.id} className="glass card" style={{padding:22,borderRadius:14,marginBottom:14,border:'1px solid rgba(148,163,184,.08)'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:14,flexWrap:'wrap',gap:8}}>
          <div>
            <h3 style={{fontWeight:700,fontSize:15}}>{p.name}</h3>
            <p style={{fontSize:13,color:'#64748b',marginTop:2}}>{p.client} · {p.start} → {p.deadline}</p>
          </div>
          <span className={`badge ${p.actual>=p.planned?'b-green':p.actual>=p.planned*.8?'b-blue':'b-amber'}`}>
            {p.actual>=p.planned?'On Target':p.actual>=p.planned*.8?'Near Target':'Below Target'}
          </span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:10}}>
          <div>
            <div style={{fontSize:12,color:'#64748b',marginBottom:5}}>Planned Goal: {p.planned}%</div>
            <PBar v={p.planned} h={8}/>
          </div>
          <div>
            <div style={{fontSize:12,color:'#64748b',marginBottom:5}}>Actual: {p.actual}%</div>
            <PBar v={p.actual} h={8}/>
          </div>
        </div>
        <div style={{display:'flex',gap:16,fontSize:13,color:'#94a3b8',flexWrap:'wrap'}}>
          <span>Team: {p.team.length} members</span>
          <span>Technologies: {p.techs.length}</span>
          <span style={{color:p.actual>=p.planned?'#34d399':'#fbbf24'}}>Gap: {p.planned-p.actual}%</span>
        </div>
      </div>
    ))}
  </div>
);

/* ─────────────────────────── REAL-TIME ─────────────────────────── */
const RealTime = () => {
  const [tick,setTick] = useState(0);
  useEffect(()=>{const t=setInterval(()=>setTick(x=>x+1),8000);return()=>clearInterval(t);},[]);
  return (
    <div className="anim-up">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:22,flexWrap:'wrap',gap:12}}>
        <div>
          <h2 style={{fontSize:19,fontWeight:800}}>Real-Time Project Overview</h2>
          <p style={{color:'#64748b',fontSize:14,marginTop:2}}>Live KPIs · Auto-refreshes every 8s</p>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:'#10b981',animation:'pulse 2s infinite'}}/>
          <span style={{fontSize:13,color:'#34d399',fontWeight:600}}>LIVE</span>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:14,marginBottom:22}}>
        <KCard icon={Activity}     label="Completion Rate"  value="56%" color="#10b981" chg={5}/>
        <KCard icon={Clock}        label="On-Time Delivery" value="75%" color="#3b82f6" chg={2}/>
        <KCard icon={AlertCircle}  label="Pending Tasks"    value="12"  color="#f59e0b" chg={-3}/>
        <KCard icon={Users}        label="Active Now"       value="4"   color="#7c3aed"/>
      </div>
      {/* Employee tracker */}
      <div className="glass" style={{padding:22,borderRadius:16,marginBottom:18,border:'1px solid rgba(148,163,184,.08)'}}>
        <h3 style={{fontSize:15,fontWeight:700,marginBottom:16}}>👥 Employee Progress Tracker</h3>
        {USERS.filter(u=>u.role==='employee').map((emp,i)=>{
          const prog=45+(i*13+tick)%50;
          const proj=PROJECTS.find(p=>p.team.includes(emp.id));
          return (
            <div key={emp.id} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',borderRadius:11,
              marginBottom:8,background:'rgba(148,163,184,.035)',border:'1px solid rgba(148,163,184,.07)',flexWrap:'wrap'}}>
              <Av s={emp.av} z={36} c={AV_COLORS[i]}/>
              <div style={{flex:1,minWidth:140}}>
                <div style={{fontWeight:700,fontSize:14}}>{emp.name}</div>
                <div style={{fontSize:12,color:'#64748b'}}>{emp.skill} · {proj?.name?.slice(0,20)}…</div>
              </div>
              <div style={{flex:2,minWidth:140}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#64748b',marginBottom:5}}>
                  <span>Progress</span><span style={{fontWeight:800,color:'#f1f5f9'}}>{prog}%</span>
                </div>
                <PBar v={prog} h={7}/>
              </div>
              <span className={`badge ${prog>=75?'b-green':prog>=50?'b-blue':'b-amber'}`}>
                {prog>=75?'On Track':prog>=50?'In Progress':'Needs Review'}
              </span>
            </div>
          );
        })}
      </div>
      {/* Project cards */}
      <div className="glass" style={{padding:22,borderRadius:16,border:'1px solid rgba(148,163,184,.08)'}}>
        <h3 style={{fontSize:15,fontWeight:700,marginBottom:16}}>📊 Project Completion Dashboard</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:14}}>
          {PROJECTS.map(p=>(
            <div key={p.id} style={{padding:18,borderRadius:12,background:'rgba(148,163,184,.03)',border:'1px solid rgba(148,163,184,.07)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:11}}>
                <h4 style={{fontSize:13,fontWeight:700,lineHeight:1.35,flex:1,marginRight:8}}>{p.name}</h4>
                <span className={`badge ${badgeClass(p.status)}`}>{p.status.replace('-',' ')}</span>
              </div>
              <div style={{fontSize:28,fontWeight:900,color:'#f1f5f9',letterSpacing:'-1px',marginBottom:8}}>{p.progress}%</div>
              <PBar v={p.progress} h={8}/>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#64748b',marginTop:10}}>
                <span>{p.team.length} members</span>
                <span style={{display:'flex',alignItems:'center',gap:3}}><Clock size={10}/>{p.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── ADMIN DASHBOARD ─────────────────────────── */
const AdminDash = ({user,onOut}) => {
  const [tab,setTab] = useState('overview');
  const tabs=[
    {id:'overview',   label:'Overview',    icon:Home},
    {id:'projects',   label:'All Projects',icon:Briefcase},
    {id:'teams',      label:'Teams & Users',icon:Users},
    {id:'checkins',   label:'Check-Ins',   icon:Calendar},
    {id:'reports',    label:'Reports',     icon:BarChart2},
    {id:'realtime',   label:'Real-Time',   icon:Activity},
    {id:'notif',      label:'Notifications',icon:Bell},
  ];
  return (
    <div style={{display:'flex',minHeight:'100vh'}}>
      <Sidebar user={user} tab={tab} setTab={setTab} onOut={onOut} tabs={tabs}/>
      <div style={{flex:1,overflowY:'auto',background:'#040b18'}}>
        <DHeader title={tabs.find(t=>t.id===tab)?.label} sub={`Admin · ${new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}`} user={user} roleColor="#7c3aed" notif={3}/>
        <div style={{padding:28}}>

          {/* OVERVIEW */}
          {tab==='overview' && (
            <div className="anim-up">
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:14,marginBottom:24}}>
                <KCard icon={Briefcase}    label="Total Projects"    value="4"   chg={12} color="#3b82f6" sub="2 In Progress"/>
                <KCard icon={Users}        label="Active Employees"  value="6"   chg={8}  color="#7c3aed" sub="Across 3 teams"/>
                <KCard icon={CheckCircle}  label="Completed Goals"   value="1"   chg={0}  color="#10b981" sub="This quarter"/>
                <KCard icon={TrendingUp}   label="Avg Progress"      value="56%" chg={5}  color="#f59e0b" sub="All projects"/>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,marginBottom:20}}>
                <div className="glass" style={{padding:22,borderRadius:16,border:'1px solid rgba(148,163,184,.08)'}}>
                  <h3 style={{fontSize:15,fontWeight:700,marginBottom:18}}>Monthly Progress Overview</h3>
                  <ResponsiveContainer width="100%" height={210}>
                    <AreaChart data={ACH}>
                      <defs>
                        <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                        <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.07)"/>
                      <XAxis dataKey="month" tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false}/>
                      <Tooltip {...TT_STYLE}/>
                      <Legend/>
                      <Area type="monotone" dataKey="planned" stroke="#3b82f6" fill="url(#gP)" strokeWidth={2} name="Planned %"/>
                      <Area type="monotone" dataKey="actual"  stroke="#10b981" fill="url(#gA)" strokeWidth={2} name="Actual %"/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass" style={{padding:22,borderRadius:16,border:'1px solid rgba(148,163,184,.08)'}}>
                  <h3 style={{fontSize:15,fontWeight:700,marginBottom:18}}>Project Status Distribution</h3>
                  <ResponsiveContainer width="100%" height={210}>
                    <PieChart>
                      <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                        {PIE_DATA.map((e,i)=><Cell key={i} fill={e.color}/>)}
                      </Pie>
                      <Tooltip {...TT_STYLE}/>
                      <Legend/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="glass" style={{borderRadius:16,border:'1px solid rgba(148,163,184,.08)',overflow:'hidden'}}>
                <div style={{padding:'18px 22px',borderBottom:'1px solid rgba(148,163,184,.07)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <h3 style={{fontSize:15,fontWeight:700}}>Project Overview</h3>
                  <button className="btn btn-s" style={{padding:'6px 12px',fontSize:12}} onClick={()=>setTab('projects')}>View All <ChevronRight size={13}/></button>
                </div>
                <div style={{overflowX:'auto'}}>
                  <table>
                    <thead><tr><th>Project</th><th>Client</th><th>Status</th><th>Priority</th><th>Progress</th><th>Deadline</th></tr></thead>
                    <tbody>{PROJECTS.map(p=>(
                      <tr key={p.id}>
                        <td><div style={{fontWeight:700,color:'#f1f5f9'}}>{p.name}</div></td>
                        <td style={{color:'#94a3b8',fontSize:13}}>{p.client}</td>
                        <td><span className={`badge ${badgeClass(p.status)}`}>{p.status.replace('-',' ')}</span></td>
                        <td><span className={`badge ${badgeClass(p.priority)}`}>{p.priority}</span></td>
                        <td><div style={{minWidth:120}}><div style={{fontSize:11,color:'#94a3b8',marginBottom:4}}>{p.progress}%</div><PBar v={p.progress}/></div></td>
                        <td style={{color:'#94a3b8',fontSize:13}}>{p.deadline}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ALL PROJECTS */}
          {tab==='projects' && (
            <div className="anim-up">
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:18,flexWrap:'wrap',gap:10}}>
                <div style={{position:'relative',flex:1,maxWidth:280}}>
                  <Search size={15} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#64748b'}}/>
                  <input placeholder="Search projects…" style={{paddingLeft:36}}/>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn btn-s"><Filter size={13}/>Filter</button>
                  <button className="btn btn-s"><Download size={13}/>Export</button>
                </div>
              </div>
              {PROJECTS.map(p=>(
                <div key={p.id} className="glass card" style={{padding:22,borderRadius:16,marginBottom:14,border:'1px solid rgba(148,163,184,.08)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:12,flexWrap:'wrap',gap:8}}>
                    <div>
                      <h3 style={{fontSize:16,fontWeight:700}}>{p.name}</h3>
                      <p style={{fontSize:13,color:'#64748b',marginTop:2}}>{p.client} · Start: {p.start}</p>
                    </div>
                    <div style={{display:'flex',gap:7}}><span className={`badge ${badgeClass(p.status)}`}>{p.status.replace('-',' ')}</span><span className={`badge ${badgeClass(p.priority)}`}>{p.priority}</span></div>
                  </div>
                  <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.6,marginBottom:14}}>{p.desc}</p>
                  <div style={{display:'flex',gap:5,flexWrap:'wrap',marginBottom:14}}>
                    {p.techs.map(t=><span key={t} style={{padding:'3px 10px',borderRadius:6,fontSize:12,background:'rgba(59,130,246,.09)',color:'#93c5fd',border:'1px solid rgba(59,130,246,.2)'}}>{t}</span>)}
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:14,flexWrap:'wrap'}}>
                    <div style={{flex:1,minWidth:180}}>
                      <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#64748b',marginBottom:5}}>
                        <span>Progress</span><span style={{fontWeight:800,color:'#f1f5f9'}}>{p.progress}%</span>
                      </div>
                      <PBar v={p.progress} h={8}/>
                    </div>
                    <div style={{display:'flex'}}>
                      {p.team.slice(0,5).map((eid,i)=>{
                        const emp=USERS.find(u=>u.id===eid);
                        return emp?<div key={eid} style={{marginLeft:i>0?-8:0,zIndex:5-i}}><Av s={emp.av} z={26} c={AV_COLORS[i]}/></div>:null;
                      })}
                    </div>
                    <span style={{fontSize:12,color:'#64748b',display:'flex',alignItems:'center',gap:3}}><Clock size={11}/>{p.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TEAMS */}
          {tab==='teams' && (
            <div className="anim-up">
              <div className="glass" style={{borderRadius:16,border:'1px solid rgba(148,163,184,.08)',overflow:'hidden',marginBottom:22}}>
                <div style={{padding:'18px 22px',borderBottom:'1px solid rgba(148,163,184,.07)'}}><h3 style={{fontSize:15,fontWeight:700}}>All Users & Role Assignments</h3></div>
                <div style={{overflowX:'auto'}}><table>
                  <thead><tr><th>Employee</th><th>Role</th><th>Department</th><th>Technology</th><th>Email</th><th>Status</th></tr></thead>
                  <tbody>{USERS.map((u,i)=>(
                    <tr key={u.id}>
                      <td><div style={{display:'flex',alignItems:'center',gap:10}}><Av s={u.av} z={30} c={AV_COLORS[i%8]}/><span style={{fontWeight:700,color:'#f1f5f9'}}>{u.name}</span></div></td>
                      <td><span className={`badge ${badgeClass(u.role)}`}>{u.role.toUpperCase()}</span></td>
                      <td style={{color:'#94a3b8'}}>{u.dept}</td>
                      <td>{u.skill&&<span style={{padding:'3px 10px',borderRadius:6,fontSize:12,background:'rgba(59,130,246,.09)',color:'#93c5fd',border:'1px solid rgba(59,130,246,.2)'}}>{u.skill}</span>}</td>
                      <td style={{color:'#64748b',fontSize:12}}>{u.email}</td>
                      <td><span className="badge b-green">Active</span></td>
                    </tr>
                  ))}</tbody>
                </table></div>
              </div>
            </div>
          )}

          {tab==='checkins' && <CheckIns user={user}/>}
          {tab==='reports'  && <Reports/>}
          {tab==='realtime' && <RealTime/>}

          {/* NOTIFICATIONS */}
          {tab==='notif' && (
            <div className="anim-up" style={{maxWidth:680}}>
              {[
                {t:'info',   msg:'James Wilson updated progress on E-Commerce Platform Redesign (68%)', time:'2 hours ago', icon:Activity},
                {t:'success',msg:'Analytics Dashboard project marked as COMPLETED by Sarah Chen',       time:'1 day ago',  icon:CheckCircle},
                {t:'warning',msg:'Healthcare Portal is behind schedule — 15% vs planned 25%',           time:'2 days ago', icon:AlertCircle},
                {t:'info',   msg:'Nina Patel assigned to Healthcare Portal — Docker specialist',        time:'3 days ago', icon:Users},
                {t:'success',msg:'Q1 Achievement Report generated and sent to all stakeholders',        time:'1 week ago', icon:FileText},
              ].map((n,i)=>{
                const Icon=n.icon;
                const col={info:'#3b82f6',success:'#10b981',warning:'#f59e0b'}[n.t];
                return(
                  <div key={i} className="glass" style={{padding:18,borderRadius:13,marginBottom:9,border:`1px solid ${col}1a`,display:'flex',gap:13,alignItems:'flex-start'}}>
                    <div style={{width:36,height:36,borderRadius:10,background:`${col}18`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <Icon size={16} color={col}/>
                    </div>
                    <div><p style={{fontSize:14,color:'#cbd5e1',lineHeight:1.5}}>{n.msg}</p><p style={{fontSize:12,color:'#475569',marginTop:3}}>{n.time}</p></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── HR DASHBOARD ─────────────────────────── */
const HRDash = ({user,onOut}) => {
  const [tab,setTab] = useState('overview');
  const [np,setNp] = useState({name:'',client:'',desc:'',deadline:'',techs:[]});
  const [ok,setOk] = useState(false);

  const tabs=[
    {id:'overview', label:'Overview',      icon:Home},
    {id:'assign',   label:'Assign Project',icon:Plus},
    {id:'projects', label:'My Projects',   icon:Briefcase},
    {id:'teams',    label:'Team Mapping',  icon:Users},
    {id:'checkins', label:'Check-Ins',     icon:Calendar},
    {id:'notif',    label:'Notifications', icon:Bell},
  ];

  const toggleTech = t => {
    const ts=[...np.techs];
    const i=ts.indexOf(t);
    i>=0?ts.splice(i,1):ts.push(t);
    setNp({...np,techs:ts});
  };

  const submit = ()=>{setOk(true);setNp({name:'',client:'',desc:'',deadline:'',techs:[]});setTimeout(()=>setOk(false),3500);};

  return (
    <div style={{display:'flex',minHeight:'100vh'}}>
      <Sidebar user={user} tab={tab} setTab={setTab} onOut={onOut} tabs={tabs}/>
      <div style={{flex:1,overflowY:'auto',background:'#040b18'}}>
        <DHeader title={tabs.find(t=>t.id===tab)?.label} sub="HR Manager · Human Resources" user={user} roleColor="#2563eb" notif={2}/>
        <div style={{padding:28}}>

          {/* OVERVIEW */}
          {tab==='overview' && (
            <div className="anim-up">
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:14,marginBottom:24}}>
                <KCard icon={Briefcase}   label="Projects Assigned" value="4" color="#2563eb"/>
                <KCard icon={Users}       label="Employees Managed" value="6" color="#7c3aed"/>
                <KCard icon={CheckCircle} label="Completed"         value="1" color="#10b981"/>
                <KCard icon={Clock}       label="Pending Reviews"   value="2" color="#f59e0b"/>
              </div>
              <div style={{display:'grid',gap:14}}>
                {PROJECTS.map(p=>(
                  <div key={p.id} className="glass card" style={{padding:22,borderRadius:15,border:'1px solid rgba(148,163,184,.08)'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:11,flexWrap:'wrap',gap:8}}>
                      <div><h3 style={{fontSize:16,fontWeight:700}}>{p.name}</h3><p style={{fontSize:13,color:'#64748b',marginTop:1}}>{p.client} · Deadline: {p.deadline}</p></div>
                      <div style={{display:'flex',gap:7}}><span className={`badge ${badgeClass(p.status)}`}>{p.status.replace('-',' ')}</span><span className={`badge ${badgeClass(p.priority)}`}>{p.priority}</span></div>
                    </div>
                    <div style={{marginBottom:11}}>
                      <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#64748b',marginBottom:5}}><span>Progress</span><span style={{fontWeight:800,color:'#f1f5f9'}}>{p.progress}%</span></div>
                      <PBar v={p.progress} h={8}/>
                    </div>
                    <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                      {p.techs.map(t=><span key={t} style={{padding:'3px 9px',borderRadius:6,fontSize:11,background:'rgba(59,130,246,.09)',color:'#93c5fd',border:'1px solid rgba(59,130,246,.2)'}}>{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ASSIGN PROJECT */}
          {tab==='assign' && (
            <div className="anim-up" style={{maxWidth:700}}>
              {ok && (
                <div style={{padding:'13px 18px',borderRadius:11,marginBottom:18,background:'rgba(16,185,129,.14)',
                  border:'1px solid rgba(52,211,153,.3)',color:'#34d399',display:'flex',alignItems:'center',gap:9,fontSize:14,fontWeight:700}}>
                  <CheckCircle size={17}/> Project assigned to team successfully!
                </div>
              )}
              <div className="glass" style={{padding:30,borderRadius:20,border:'1px solid rgba(148,163,184,.08)'}}>
                <h2 style={{fontSize:19,fontWeight:800,marginBottom:4}}>Assign New Project</h2>
                <p style={{color:'#64748b',fontSize:14,marginBottom:26}}>Define project details, technologies, and map employees to their responsibilities</p>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                  <div><label style={{fontSize:12,fontWeight:700,color:'#94a3b8',display:'block',marginBottom:5}}>Project Name *</label><input placeholder="E-Commerce Platform" value={np.name} onChange={e=>setNp({...np,name:e.target.value})}/></div>
                  <div><label style={{fontSize:12,fontWeight:700,color:'#94a3b8',display:'block',marginBottom:5}}>Client Name *</label><input placeholder="TechCorp Solutions" value={np.client} onChange={e=>setNp({...np,client:e.target.value})}/></div>
                </div>
                <div style={{marginBottom:14}}><label style={{fontSize:12,fontWeight:700,color:'#94a3b8',display:'block',marginBottom:5}}>Description</label><textarea rows={3} placeholder="Project scope, deliverables, and requirements…" value={np.desc} onChange={e=>setNp({...np,desc:e.target.value})}/></div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                  <div><label style={{fontSize:12,fontWeight:700,color:'#94a3b8',display:'block',marginBottom:5}}>Start Date</label><input type="date"/></div>
                  <div><label style={{fontSize:12,fontWeight:700,color:'#94a3b8',display:'block',marginBottom:5}}>Deadline *</label><input type="date" value={np.deadline} onChange={e=>setNp({...np,deadline:e.target.value})}/></div>
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:12,fontWeight:700,color:'#94a3b8',display:'block',marginBottom:8}}>Required Technologies</label>
                  <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
                    {TECHS.map(t=>(
                      <button key={t} onClick={()=>toggleTech(t)} style={{padding:'6px 13px',borderRadius:9,fontSize:13,cursor:'pointer',fontFamily:'Outfit,sans-serif',transition:'all .2s',
                        border:`1px solid ${np.techs.includes(t)?'rgba(59,130,246,.5)':'rgba(148,163,184,.15)'}`,
                        background:np.techs.includes(t)?'rgba(59,130,246,.18)':'rgba(148,163,184,.04)',
                        color:np.techs.includes(t)?'#60a5fa':'#64748b'}}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{marginBottom:14}}><label style={{fontSize:12,fontWeight:700,color:'#94a3b8',display:'block',marginBottom:5}}>Priority</label>
                  <select><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option></select>
                </div>
                <div style={{marginBottom:24}}>
                  <label style={{fontSize:12,fontWeight:700,color:'#94a3b8',display:'block',marginBottom:8}}>Assign Employees by Technology</label>
                  {USERS.filter(u=>u.role==='employee').map((emp,i)=>(
                    <div key={emp.id} style={{display:'flex',alignItems:'center',gap:11,padding:'10px 13px',borderRadius:10,marginBottom:6,
                      background:'rgba(148,163,184,.04)',border:'1px solid rgba(148,163,184,.09)'}}>
                      <Av s={emp.av} z={28} c={AV_COLORS[i]}/>
                      <span style={{flex:1,fontSize:14,fontWeight:600}}>{emp.name}</span>
                      <span style={{fontSize:12,color:'#60a5fa',padding:'3px 10px',borderRadius:6,background:'rgba(59,130,246,.09)',border:'1px solid rgba(59,130,246,.2)'}}>{emp.skill}</span>
                      <input type="checkbox" defaultChecked/>
                    </div>
                  ))}
                </div>
                <button className="btn btn-p" onClick={submit} style={{padding:'12px 26px',fontSize:15}}>
                  <Send size={15}/> Assign Project
                </button>
              </div>
            </div>
          )}

          {/* MY PROJECTS */}
          {tab==='projects' && (
            <div className="anim-up">
              {PROJECTS.map(p=>(
                <div key={p.id} className="glass card" style={{padding:22,borderRadius:15,marginBottom:14,border:'1px solid rgba(148,163,184,.08)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:11,flexWrap:'wrap',gap:8}}>
                    <div><h3 style={{fontSize:16,fontWeight:700}}>{p.name}</h3><p style={{fontSize:13,color:'#64748b',marginTop:1}}>{p.client}</p></div>
                    <div style={{display:'flex',gap:7}}><span className={`badge ${badgeClass(p.status)}`}>{p.status.replace('-',' ')}</span><span className={`badge ${badgeClass(p.priority)}`}>{p.priority}</span></div>
                  </div>
                  <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.6,marginBottom:14}}>{p.desc}</p>
                  <div style={{marginBottom:12}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#64748b',marginBottom:5}}><span>Progress</span><span style={{fontWeight:800,color:'#f1f5f9'}}>{p.progress}%</span></div>
                    <PBar v={p.progress} h={8}/>
                  </div>
                  <div style={{display:'flex',gap:5,flexWrap:'wrap',marginBottom:11}}>
                    {p.techs.map(t=><span key={t} style={{padding:'3px 9px',borderRadius:5,fontSize:11,background:'rgba(59,130,246,.09)',color:'#93c5fd',border:'1px solid rgba(59,130,246,.2)'}}>{t}</span>)}
                  </div>
                  <div style={{fontSize:12,color:'#64748b',display:'flex',gap:16,flexWrap:'wrap'}}>
                    <span style={{display:'flex',alignItems:'center',gap:3}}><Calendar size={11}/> Start: {p.start}</span>
                    <span style={{display:'flex',alignItems:'center',gap:3}}><Clock size={11}/> Deadline: {p.deadline}</span>
                    <span>Team: {p.team.length} members</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TEAM MAPPING */}
          {tab==='teams' && (
            <div className="anim-up">
              <h2 style={{fontSize:19,fontWeight:800,marginBottom:20}}>Employee–Technology Mapping</h2>
              {PROJECTS.map(p=>(
                <div key={p.id} className="glass" style={{padding:22,borderRadius:15,marginBottom:16,border:'1px solid rgba(148,163,184,.08)'}}>
                  <h3 style={{fontWeight:700,marginBottom:4}}>{p.name}</h3>
                  <p style={{fontSize:13,color:'#64748b',marginBottom:16}}>{p.client} · {p.techs.length} technologies</p>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(185px,1fr))',gap:10}}>
                    {p.techs.map((t,i)=>{
                      const emp=USERS.find(u=>u.id===p.team[i%p.team.length]);
                      return(
                        <div key={t} style={{padding:13,borderRadius:10,background:'rgba(148,163,184,.04)',border:'1px solid rgba(148,163,184,.08)'}}>
                          <div style={{fontSize:12,fontWeight:700,color:'#60a5fa',marginBottom:8}}>{t}</div>
                          {emp && <div style={{display:'flex',alignItems:'center',gap:8}}><Av s={emp.av} z={24} c={AV_COLORS[i]}/><span style={{fontSize:13,color:'#cbd5e1'}}>{emp.name}</span></div>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab==='checkins' && <CheckIns user={user}/>}

          {/* NOTIFICATIONS */}
          {tab==='notif' && (
            <div className="anim-up" style={{maxWidth:660}}>
              <div style={{marginBottom:18}}><button className="btn btn-p"><Plus size={14}/> Create Notification</button></div>
              {[
                {t:'info',   msg:'James Wilson submitted monthly check-in for E-Commerce Platform (68%)',   time:'1 hour ago',  icon:Activity},
                {t:'success',msg:'Priya Sharma completed Node.js backend milestone ahead of schedule',       time:'3 hours ago', icon:CheckCircle},
                {t:'warning',msg:'Healthcare Portal is behind planned schedule by 10% — follow up required',time:'1 day ago',   icon:AlertCircle},
                {t:'warning',msg:'Q2 progress reports due in 5 days — send reminder to team',               time:'2 days ago',  icon:Calendar},
              ].map((n,i)=>{
                const Icon=n.icon; const col={info:'#3b82f6',success:'#10b981',warning:'#f59e0b'}[n.t];
                return(
                  <div key={i} className="glass" style={{padding:18,borderRadius:12,marginBottom:9,border:`1px solid ${col}1a`,display:'flex',gap:12,alignItems:'flex-start'}}>
                    <div style={{width:35,height:35,borderRadius:10,background:`${col}18`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Icon size={15} color={col}/></div>
                    <div><p style={{fontSize:14,color:'#cbd5e1',lineHeight:1.5}}>{n.msg}</p><p style={{fontSize:12,color:'#475569',marginTop:3}}>{n.time}</p></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── EMPLOYEE DASHBOARD ─────────────────────────── */
const EmpDash = ({user,onOut}) => {
  const [tab,setTab] = useState('projects');
  const [prog,setProg] = useState(68);
  const [note,setNote] = useState('');
  const [ok,setOk] = useState(false);

  const mine = PROJECTS.filter(p=>p.team.includes(user.id));

  const tabs=[
    {id:'projects',    label:'My Projects',     icon:Briefcase},
    {id:'update',      label:'Update Progress',  icon:TrendingUp},
    {id:'checkins',    label:'My Check-Ins',     icon:Calendar},
    {id:'achievement', label:'Achievement Report',icon:Award},
  ];

  const submit = ()=>{setOk(true);setNote('');setTimeout(()=>setOk(false),3500);};

  return (
    <div style={{display:'flex',minHeight:'100vh'}}>
      <Sidebar user={user} tab={tab} setTab={setTab} onOut={onOut} tabs={tabs}/>
      <div style={{flex:1,overflowY:'auto',background:'#040b18'}}>
        <DHeader title={tabs.find(t=>t.id===tab)?.label} sub={`${user.name} · ${user.skill||'Engineer'} · ${user.dept}`} user={user} roleColor="#059669"/>
        <div style={{padding:28}}>

          {/* MY PROJECTS */}
          {tab==='projects' && (
            <div className="anim-up">
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:14,marginBottom:24}}>
                <KCard icon={Briefcase}  label="Assigned Projects" value={mine.length} color="#059669"/>
                <KCard icon={Code}       label="My Technology"     value={user.skill||'N/A'} color="#2563eb"/>
                <KCard icon={TrendingUp} label="Avg Completion"    value={`${Math.round(mine.reduce((a,p)=>a+p.progress,0)/(mine.length||1))}%`} color="#7c3aed"/>
                <KCard icon={Clock}      label="Next Deadline"     value="Jun 30" color="#f59e0b"/>
              </div>
              {mine.length===0?(
                <div className="glass" style={{padding:40,borderRadius:16,textAlign:'center',border:'1px solid rgba(148,163,184,.08)'}}>
                  <Briefcase size={36} color="#475569" style={{marginBottom:10}}/>
                  <p style={{color:'#64748b'}}>No projects assigned yet. Contact your HR manager.</p>
                </div>
              ):mine.map(p=>(
                <div key={p.id} className="glass card" style={{padding:22,borderRadius:15,marginBottom:14,border:'1px solid rgba(148,163,184,.08)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:11,flexWrap:'wrap',gap:8}}>
                    <div><h3 style={{fontSize:16,fontWeight:700}}>{p.name}</h3><p style={{fontSize:13,color:'#64748b',marginTop:1}}>{p.client}</p></div>
                    <div style={{display:'flex',gap:7}}><span className={`badge ${badgeClass(p.status)}`}>{p.status.replace('-',' ')}</span><span className={`badge ${badgeClass(p.priority)}`}>{p.priority}</span></div>
                  </div>
                  <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.6,marginBottom:14}}>{p.desc}</p>
                  <div style={{marginBottom:13}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#64748b',marginBottom:5}}><span>Project Progress</span><span style={{fontWeight:800,color:'#f1f5f9'}}>{p.progress}%</span></div>
                    <PBar v={p.progress} h={10}/>
                  </div>
                  <div style={{display:'flex',gap:5,flexWrap:'wrap',marginBottom:11}}>
                    {p.techs.map(t=>(
                      <span key={t} style={{padding:'3px 10px',borderRadius:6,fontSize:12,fontWeight:t===user.skill?700:400,
                        background:t===user.skill?'rgba(16,185,129,.15)':'rgba(59,130,246,.09)',
                        color:t===user.skill?'#34d399':'#93c5fd',
                        border:`1px solid ${t===user.skill?'rgba(52,211,153,.3)':'rgba(59,130,246,.2)'}`}}>
                        {t}{t===user.skill?' ✓':''}
                      </span>
                    ))}
                  </div>
                  <div style={{fontSize:12,color:'#64748b',display:'flex',gap:16,flexWrap:'wrap'}}>
                    <span style={{display:'flex',alignItems:'center',gap:3}}><Calendar size={11}/> {p.start}</span>
                    <span style={{display:'flex',alignItems:'center',gap:3}}><Clock size={11}/> {p.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* UPDATE PROGRESS */}
          {tab==='update' && (
            <div className="anim-up" style={{maxWidth:640}}>
              {ok && (
                <div style={{padding:'13px 18px',borderRadius:11,marginBottom:18,background:'rgba(16,185,129,.14)',
                  border:'1px solid rgba(52,211,153,.3)',color:'#34d399',display:'flex',alignItems:'center',gap:9,fontSize:14,fontWeight:700}}>
                  <CheckCircle size={17}/> Progress update submitted successfully!
                </div>
              )}
              <div className="glass" style={{padding:30,borderRadius:20,border:'1px solid rgba(148,163,184,.08)'}}>
                <h2 style={{fontSize:19,fontWeight:800,marginBottom:4}}>Submit Progress Update</h2>
                <p style={{color:'#64748b',fontSize:14,marginBottom:26}}>Report your monthly or quarterly task completion</p>
                <div style={{marginBottom:14}}><label style={{fontSize:12,fontWeight:700,color:'#94a3b8',display:'block',marginBottom:5}}>Select Project</label>
                  <select>{PROJECTS.filter(p=>p.team.includes(user.id)).map(p=><option key={p.id}>{p.name}</option>)}</select>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                  <div><label style={{fontSize:12,fontWeight:700,color:'#94a3b8',display:'block',marginBottom:5}}>Technology / Module</label>
                    <input value={user.skill||'Frontend'} readOnly style={{opacity:.7}}/></div>
                  <div><label style={{fontSize:12,fontWeight:700,color:'#94a3b8',display:'block',marginBottom:5}}>Update Period</label>
                    <select><option>Monthly — May 2024</option><option>Monthly — Apr 2024</option><option>Q2 2024</option><option>Q1 2024</option></select>
                  </div>
                </div>
                <div style={{marginBottom:18}}>
                  <label style={{fontSize:12,fontWeight:700,color:'#94a3b8',display:'block',marginBottom:8}}>
                    Completion: <span style={{color:'#60a5fa',fontSize:20,fontWeight:900}}>{prog}%</span>
                  </label>
                  <input type="range" min={0} max={100} value={prog} onChange={e=>setProg(Number(e.target.value))}/>
                  <div style={{marginTop:10}}><PBar v={prog} h={10}/></div>
                  <div style={{display:'flex',justifyContent:'space-between',marginTop:6,fontSize:12,color:'#475569'}}>
                    <span>0%</span><span>50%</span><span>100%</span>
                  </div>
                </div>
                <div style={{marginBottom:14}}><label style={{fontSize:12,fontWeight:700,color:'#94a3b8',display:'block',marginBottom:5}}>Progress Notes *</label>
                  <textarea rows={4} placeholder="Describe what you completed, challenges faced, and next steps…" value={note} onChange={e=>setNote(e.target.value)}/></div>
                <div style={{marginBottom:22}}><label style={{fontSize:12,fontWeight:700,color:'#94a3b8',display:'block',marginBottom:5}}>Status</label>
                  <select><option>On Track</option><option>Slightly Behind</option><option>Blocked — Need Help</option><option>Ahead of Schedule</option></select>
                </div>
                <button className="btn btn-p" onClick={submit} style={{padding:'12px 26px',fontSize:15}}>
                  <Send size={15}/> Submit Update
                </button>
              </div>
            </div>
          )}

          {tab==='checkins' && <CheckIns user={user}/>}

          {/* ACHIEVEMENT REPORT */}
          {tab==='achievement' && (
            <div className="anim-up">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:22,flexWrap:'wrap',gap:12}}>
                <div>
                  <h2 style={{fontSize:19,fontWeight:800}}>Personal Achievement Report</h2>
                  <p style={{color:'#64748b',fontSize:14,marginTop:2}}>Planned vs. Actual — 2024</p>
                </div>
                <button className="btn btn-s"><Download size={13}/> Export PDF</button>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:14,marginBottom:22}}>
                <KCard icon={Target}       label="Planned Goal"    value="100%" color="#3b82f6"/>
                <KCard icon={CheckCircle}  label="Actual Done"     value="68%"  color="#10b981"/>
                <KCard icon={TrendingUp}   label="Achievement"     value="68%"  color="#7c3aed"/>
                <KCard icon={AlertCircle}  label="Gap"             value="-32%" color="#f59e0b"/>
              </div>
              <div className="glass" style={{padding:22,borderRadius:16,marginBottom:18,border:'1px solid rgba(148,163,184,.08)'}}>
                <h3 style={{fontSize:15,fontWeight:700,marginBottom:18}}>Monthly: Planned vs Actual Progress</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={ACH} barSize={26}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.07)"/>
                    <XAxis dataKey="month" tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false}/>
                    <YAxis tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false} unit="%"/>
                    <Tooltip {...TT_STYLE} formatter={v=>`${v}%`}/>
                    <Legend/>
                    <Bar dataKey="planned" fill="#3b82f6" radius={[5,5,0,0]} opacity={.7} name="Planned %"/>
                    <Bar dataKey="actual"  fill="#10b981" radius={[5,5,0,0]}              name="Actual %"/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="glass" style={{padding:22,borderRadius:16,border:'1px solid rgba(148,163,184,.08)'}}>
                <h3 style={{fontSize:15,fontWeight:700,marginBottom:18}}>Achievement Timeline</h3>
                {ACH.map((d,i)=>(
                  <div key={i} style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:14,paddingBottom:14,
                    borderBottom:i<ACH.length-1?'1px solid rgba(148,163,184,.05)':'none'}}>
                    <div style={{width:38,height:38,borderRadius:10,flexShrink:0,
                      background:d.actual>=d.planned?'rgba(16,185,129,.14)':'rgba(245,158,11,.14)',
                      display:'flex',alignItems:'center',justifyContent:'center',
                      border:`1px solid ${d.actual>=d.planned?'rgba(52,211,153,.3)':'rgba(251,191,36,.3)'}`}}>
                      {d.actual>=d.planned?<CheckCircle size={16} color="#34d399"/>:<AlertCircle size={16} color="#fbbf24"/>}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,flexWrap:'wrap',gap:6}}>
                        <span style={{fontWeight:700,fontSize:14}}>{d.month} 2024</span>
                        <span style={{fontSize:13,color:d.actual>=d.planned?'#34d399':'#fbbf24',fontWeight:700}}>
                          {d.actual}% / {d.planned}% planned
                        </span>
                      </div>
                      <PBar v={d.actual} h={6}/>
                      <div style={{fontSize:11,color:'#64748b',marginTop:4}}>Gap: {d.planned-d.actual}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── ROOT APP ─────────────────────────── */
export default function App() {
  const [user,setUser] = useState(null);
  const [showAuth,setShowAuth] = useState(false);
  return (
    <>
      <style>{G}</style>
      {showAuth && <Auth onClose={()=>setShowAuth(false)} onLogin={u=>{setUser(u);setShowAuth(false);}}/>}
      {!user      ? <Landing onLogin={()=>setShowAuth(true)}/>
      :user.role==='admin'    ? <AdminDash user={user} onOut={()=>setUser(null)}/>
      :user.role==='hr'       ? <HRDash    user={user} onOut={()=>setUser(null)}/>
      :                         <EmpDash   user={user} onOut={()=>setUser(null)}/>}
    </>
  );
}

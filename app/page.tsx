'use client'

import { useState } from 'react'
import { 
  Dumbbell, Apple, MessageCircle, TrendingUp, Calendar, Trophy,
  Check, X, ChevronDown, ChevronRight, Zap, Shield, Clock,
  Smartphone, Globe, HeadphonesIcon, ArrowRight, Play, Star,
  Users, BarChart3, FileText, Bell, Palette, Code, Menu, XIcon
} from 'lucide-react'
import { motion } from 'framer-motion'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

// Pricing data
const plans = [
  {
    name: 'Starter',
    description: 'Perfetto per iniziare',
    priceAnnual: 99,
    priceMonthly: 9.90,
    clients: '10',
    popular: false,
    features: [
      'Fino a 10 clienti',
      'Schede allenamento',
      'Piani alimentari',
      'Calendario',
      'Messaggistica',
      'Landing page inclusa',
    ]
  },
  {
    name: 'Professional',
    description: 'Per chi fa sul serio',
    priceAnnual: 199,
    priceMonthly: 19.90,
    clients: '50',
    popular: true,
    features: [
      'Fino a 50 clienti',
      'Tutto di Starter, più:',
      'Check-in settimanali',
      'Tracciamento progressi',
      'Foto progressi',
      'Gamification',
      'Report base',
      'Landing page inclusa',
    ]
  },
  {
    name: 'Business',
    description: 'Per professionisti affermati',
    priceAnnual: 349,
    priceMonthly: 34.90,
    clients: '200',
    popular: false,
    features: [
      'Fino a 200 clienti',
      'Tutto di Professional, più:',
      'Multi-coach (fino a 5)',
      'Report avanzati',
      'Notifiche push',
      'Contenuti educativi',
      'White label base',
      'Landing page inclusa',
    ]
  },
  {
    name: 'Enterprise',
    description: 'Per centri e team',
    priceAnnual: 599,
    priceMonthly: 59.90,
    clients: 'Illimitati',
    popular: false,
    features: [
      'Clienti illimitati',
      'Coach illimitati',
      'Tutto di Business, più:',
      'White label completo',
      'Accesso API',
      'Supporto prioritario',
      'Landing page inclusa',
    ]
  }
]

// Features data
const features = [
  {
    icon: Dumbbell,
    title: 'Schede Allenamento',
    description: 'Crea schede personalizzate in pochi minuti. Esercizi con video, serie, ripetizioni e note. Il cliente le vede sempre aggiornate sul suo telefono.',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    icon: Apple,
    title: 'Piani Alimentari',
    description: 'Costruisci piani alimentari giorno per giorno. Database con migliaia di alimenti già pronti. Calcolo automatico di calorie e macronutrienti.',
    color: 'from-green-500 to-emerald-400'
  },
  {
    icon: MessageCircle,
    title: 'Messaggi Privati',
    description: 'Chatta con i tuoi clienti senza dare il numero personale. Tutto resta salvato e organizzato. Notifiche push per non perdere nessun messaggio.',
    color: 'from-purple-500 to-pink-400'
  },
  {
    icon: TrendingUp,
    title: 'Tracciamento Progressi',
    description: 'Peso, misure, foto e check-in settimanali. Grafici automatici per vedere i miglioramenti. Motiva i clienti mostrando i loro risultati.',
    color: 'from-orange-500 to-amber-400'
  },
  {
    icon: Calendar,
    title: 'Calendario Appuntamenti',
    description: 'I clienti prenotano direttamente dalla piattaforma. Sincronizzazione con Google Calendar. Promemoria automatici prima degli appuntamenti.',
    color: 'from-rose-500 to-red-400'
  },
  {
    icon: Trophy,
    title: 'Gamification',
    description: 'Punti, badge e classifiche per tenere alta la motivazione. I clienti competono (in modo sano) tra loro. Tu premi chi si impegna di più.',
    color: 'from-yellow-500 to-orange-400'
  }
]

// FAQ data
const faqs = [
  {
    q: 'Ho bisogno di competenze tecniche per usarlo?',
    a: "Assolutamente no. Se sai usare Facebook, sai usare Coaching Hub. L'installazione la facciamo insieme in videochiamata se serve, e l'interfaccia è pensata per essere semplice e intuitiva."
  },
  {
    q: 'Funziona su telefono?',
    a: "Sì! I tuoi clienti possono accedere da qualsiasi dispositivo: telefono, tablet o computer. Tu puoi gestire tutto anche dal telefono, ma per creare schede e piani è più comodo il computer."
  },
  {
    q: 'I miei clienti devono scaricare un\'app?',
    a: "No, non serve scaricare nulla. Accedono direttamente dal browser del telefono, come se fosse un sito web. Possono anche aggiungerlo alla schermata home per averlo sempre a portata di tap."
  },
  {
    q: 'Posso provarlo prima di comprare?',
    a: "Certo! Offriamo una garanzia soddisfatto o rimborsato di 14 giorni. Se non fa per te, ti rimborsiamo senza fare domande."
  },
  {
    q: 'Cosa succede ai miei dati se smetto di usarlo?',
    a: "I tuoi dati sono tuoi. Prima di cancellare l'account puoi esportare tutto. E se un giorno vuoi tornare, saremo felici di riaverli."
  },
  {
    q: 'Posso passare a un piano superiore in seguito?',
    a: "Sì, puoi fare upgrade in qualsiasi momento. Paghi solo la differenza proporzionale al tempo rimanente. Nessun costo nascosto."
  },
  {
    q: 'Ho già un sito, devo crearne uno nuovo?',
    a: "No, il plugin si installa sul tuo sito WordPress esistente. Se non hai WordPress, possiamo aiutarti con la migrazione o creare un nuovo sito insieme."
  },
  {
    q: 'Come funziona il supporto?',
    a: "Supporto via email con risposta entro 24 ore lavorative. Per i piani Business ed Enterprise c'è anche supporto prioritario."
  }
]

export default function LandingPage() {
  const [billingAnnual, setBillingAnnual] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />
      <div className="fixed inset-0 noise-overlay pointer-events-none" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 px-6">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-mint flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl">Coaching Hub</span>
            </a>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#funzionalita" className="text-sm text-white/70 hover:text-white transition-colors">Funzionalità</a>
              <a href="#prezzi" className="text-sm text-white/70 hover:text-white transition-colors">Prezzi</a>
              <a href="#faq" className="text-sm text-white/70 hover:text-white transition-colors">FAQ</a>
              <a href="#prezzi" className="btn-primary text-sm !py-3 !px-6">
                Inizia Ora
              </a>
            </div>
            
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-slate-900 border-t border-white/5 px-6 py-4"
          >
            <div className="flex flex-col gap-4">
              <a href="#funzionalita" className="text-white/70 py-2" onClick={() => setMobileMenuOpen(false)}>Funzionalità</a>
              <a href="#prezzi" className="text-white/70 py-2" onClick={() => setMobileMenuOpen(false)}>Prezzi</a>
              <a href="#faq" className="text-white/70 py-2" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
              <a href="#prezzi" className="btn-primary text-center mt-2" onClick={() => setMobileMenuOpen(false)}>Inizia Ora</a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="container-custom section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <Zap className="w-4 h-4 text-accent-lime" />
                <span className="text-sm text-white/80">La piattaforma #1 per coach in Italia</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Gestisci i tuoi clienti{' '}
                <span className="text-gradient">come un professionista.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/60 mb-8 max-w-xl mx-auto lg:mx-0">
                Senza perdere tempo con fogli Excel e messaggi WhatsApp. 
                Piani alimentari, schede allenamento, messaggi e progressi in un unico posto.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#prezzi" className="btn-primary">
                  Scopri i Piani
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <a href="#demo" className="btn-secondary">
                  <Play className="w-5 h-5 mr-2" />
                  Guarda la Demo
                </a>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-slate-950" />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-accent-lime text-accent-lime" />
                    ))}
                  </div>
                  <p className="text-sm text-white/60">Amato da +500 coach</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              {/* Dashboard mockup placeholder */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/20 to-accent-mint/20 blur-3xl rounded-3xl" />
                <div className="relative card-glass p-2 rounded-3xl">
                  <div className="bg-slate-900 rounded-2xl overflow-hidden">
                    {/* Browser bar */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-slate-700/50 rounded-lg px-4 py-1.5 text-xs text-white/40 text-center">
                          tuosito.com/dashboard
                        </div>
                      </div>
                    </div>
                    
                    {/* Dashboard content placeholder */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="h-6 w-40 bg-white/10 rounded-lg" />
                          <div className="h-4 w-24 bg-white/5 rounded mt-2" />
                        </div>
                        <div className="h-10 w-32 bg-accent-lime/20 rounded-lg" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { label: 'Clienti Attivi', value: '47', color: 'bg-brand-500/20' },
                          { label: 'Check-in Oggi', value: '12', color: 'bg-accent-mint/20' },
                          { label: 'Messaggi', value: '8', color: 'bg-purple-500/20' },
                        ].map((stat, i) => (
                          <div key={i} className={`${stat.color} rounded-xl p-4`}>
                            <div className="text-2xl font-display font-bold">{stat.value}</div>
                            <div className="text-xs text-white/60">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-xl p-4">
                          <div className="h-4 w-24 bg-white/10 rounded mb-3" />
                          <div className="space-y-2">
                            {[1,2,3].map((i) => (
                              <div key={i} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
                                <div className="flex-1">
                                  <div className="h-3 w-20 bg-white/10 rounded" />
                                  <div className="h-2 w-16 bg-white/5 rounded mt-1" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4">
                          <div className="h-4 w-20 bg-white/10 rounded mb-3" />
                          <div className="h-24 flex items-end gap-1">
                            {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                              <div 
                                key={i} 
                                className="flex-1 bg-gradient-to-t from-brand-500 to-brand-400 rounded-t"
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 card-glass p-4 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">+23%</div>
                    <div className="text-xs text-white/60">Progressi</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-6 card-glass p-4 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-lime/20 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-accent-lime" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Nuovo messaggio</div>
                    <div className="text-xs text-white/60">da Marco R.</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white/30" />
        </motion.div>
      </section>

      {/* Problem/Solution Section */}
      <section className="relative section-padding bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Sei stanco di gestire{' '}
              <span className="text-gradient">tutto a mano?</span>
            </motion.h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Problems */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="card-glass p-8 rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="font-display text-xl font-bold">I problemi di oggi</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  'Fogli Excel infiniti per tracciare i progressi',
                  'Schede allenamento inviate su WhatsApp che si perdono',
                  'Piani alimentari in PDF che nessuno legge',
                  'Messaggi sparsi tra email, WhatsApp e Instagram',
                  'Nessuna idea di come stanno andando i tuoi clienti',
                  'Ore perse a fare copia-incolla delle stesse schede',
                ].map((problem, i) => (
                  <motion.div 
                    key={i}
                    variants={fadeInUp}
                    className="flex items-start gap-3 text-white/70"
                  >
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>{problem}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Solutions */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="card-glass p-8 rounded-3xl border-accent-lime/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent-lime/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-accent-lime" />
                </div>
                <h3 className="font-display text-xl font-bold">Con Coaching Hub</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  'Tutto in un\'unica piattaforma professionale',
                  'I tuoi clienti hanno la loro app personale',
                  'Tu risparmi ore ogni settimana',
                  'I clienti sono più motivati e ottengono risultati',
                  'Il tuo lavoro viene percepito come premium',
                  'Automatizzi le attività ripetitive',
                ].map((solution, i) => (
                  <motion.div 
                    key={i}
                    variants={fadeInUp}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-accent-lime shrink-0 mt-0.5" />
                    <span>{solution}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funzionalita" className="relative section-padding">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Tutto quello che ti serve.{' '}
              <span className="text-gradient">Niente di più.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/60 max-w-2xl mx-auto">
              Una piattaforma completa pensata per personal trainer e coach online.
              Semplice da usare, potente quando serve.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group card-glass p-8 rounded-3xl hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-white/40">
              E anche: Check-in settimanali • Report PDF • Notifiche push • Multi-coach • Contenuti educativi • White label • e molto altro...
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="relative section-padding bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Pronto in{' '}
              <span className="text-gradient">3 semplici passi</span>
            </motion.h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                step: '01',
                icon: Zap,
                title: 'Installa',
                description: 'Ricevi il plugin, lo installi sul tuo sito WordPress e attivi la licenza. Fatto in 5 minuti.',
              },
              {
                step: '02',
                icon: Palette,
                title: 'Configura',
                description: 'Personalizza colori, logo e impostazioni. Aggiungi i tuoi primi clienti con un invito via email.',
              },
              {
                step: '03',
                icon: Dumbbell,
                title: 'Lavora',
                description: 'Crea schede, piani alimentari e segui i progressi. I tuoi clienti accedono dal telefono, tu gestisci tutto dal computer.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative text-center"
              >
                {i < 2 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/20 to-transparent" />
                )}
                
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute inset-0 bg-brand-500/20 blur-2xl rounded-full" />
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                    <item.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-accent-lime flex items-center justify-center font-display font-bold text-slate-950">
                    {item.step}
                  </div>
                </div>
                
                <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60 max-w-xs mx-auto">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="prezzi" className="relative section-padding">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Scegli il piano{' '}
              <span className="text-gradient">giusto per te</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
              Tutti i piani includono: installazione guidata, supporto email, 
              aggiornamenti gratuiti e una landing page professionale.
            </motion.p>
            
            {/* Billing toggle */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-4 p-2 rounded-full bg-white/5 border border-white/10">
              <button
                onClick={() => setBillingAnnual(true)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  billingAnnual 
                    ? 'bg-accent-lime text-slate-950' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Annuale
                <span className="ml-2 text-xs px-2 py-1 rounded-full bg-slate-950/30">-20%</span>
              </button>
              <button
                onClick={() => setBillingAnnual(false)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  !billingAnnual 
                    ? 'bg-accent-lime text-slate-950' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Mensile
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className={`relative card-glass p-8 rounded-3xl ${
                  plan.popular ? 'border-accent-lime/50 ring-2 ring-accent-lime/20' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-lime text-slate-950 text-sm font-bold rounded-full">
                    Più Popolare
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/60 text-sm">{plan.description}</p>
                </div>
                
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-display font-bold">
                      €{billingAnnual ? plan.priceAnnual : plan.priceMonthly.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-white/60">
                      /{billingAnnual ? 'anno' : 'mese'}
                    </span>
                  </div>
                  {!billingAnnual && (
                    <p className="text-xs text-white/40 mt-2">*Impegno minimo 12 mesi</p>
                  )}
                </div>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-accent-lime shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <a 
                  href={`/acquista/?plan=${plan.name.toLowerCase()}&billing=${billingAnnual ? 'annual' : 'monthly'}`}
                  className={`block w-full text-center py-4 rounded-full font-bold transition-all ${
                    plan.popular 
                      ? 'bg-accent-lime text-slate-950 hover:shadow-[0_0_30px_rgba(200,255,0,0.3)]' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contattaci' : 'Inizia Ora'}
                </a>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center space-y-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent-lime" />
                <span>Pagamento sicuro con PayPal</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent-lime" />
                <span>Soddisfatto o rimborsato 14 giorni</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Landing Page Bonus Section */}
      <section className="relative section-padding bg-gradient-to-b from-transparent via-brand-950/30 to-transparent">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-lime/10 border border-accent-lime/20 mb-6">
                <span className="text-2xl">🎁</span>
                <span className="text-sm font-semibold text-accent-lime">Bonus Incluso</span>
              </motion.div>
              
              <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold mb-6">
                La tua landing page professionale{' '}
                <span className="text-accent-lime">è inclusa</span>
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-lg text-white/60 mb-6">
                Non hai ancora un sito web? Nessun problema.
              </motion.p>
              
              <motion.p variants={fadeInUp} className="text-white/80 mb-8">
                Con ogni piano ricevi <strong>GRATIS</strong> una landing page professionale 
                per presentare i tuoi servizi ai potenziali clienti. Una pagina moderna, veloce 
                e ottimizzata che include:
              </motion.p>
              
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  'Presentazione servizi',
                  'Chi sei e la tua storia',
                  'Recensioni clienti',
                  'Form di contatto',
                  'Collegamento ai social',
                  'Ottimizzata per mobile',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent-lime" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </motion.div>
              
              <motion.div variants={fadeInUp} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-white/80 mb-4">
                  <strong>Vuoi qualcosa di più completo?</strong><br />
                  Possiamo creare un sito multi-pagina su misura per te.
                  Il prezzo viene calcolato in base alle tue esigenze specifiche.
                </p>
                <a href="#contatti" className="inline-flex items-center gap-2 text-accent-lime font-semibold hover:underline">
                  Richiedi un preventivo
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Landing page mockup */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent-lime/10 to-brand-500/10 blur-3xl rounded-3xl" />
                <div className="relative card-glass p-3 rounded-3xl">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    {/* Simplified landing page mockup */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-white/20" />
                        <div className="h-4 w-32 bg-white/20 rounded" />
                      </div>
                      <div className="h-8 w-3/4 bg-white/30 rounded mb-4" />
                      <div className="h-4 w-full bg-white/10 rounded mb-2" />
                      <div className="h-4 w-2/3 bg-white/10 rounded mb-6" />
                      <div className="h-12 w-40 bg-accent-lime rounded-full" />
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        {[1,2,3].map((i) => (
                          <div key={i} className="h-24 bg-slate-100 rounded-xl" />
                        ))}
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 w-1/3 bg-slate-200 rounded" />
                        <div className="h-3 w-full bg-slate-100 rounded" />
                        <div className="h-3 w-full bg-slate-100 rounded" />
                        <div className="h-3 w-2/3 bg-slate-100 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating device */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-8 -right-8 w-32"
              >
                <div className="card-glass p-2 rounded-2xl">
                  <div className="bg-slate-900 rounded-xl p-4 aspect-[9/16]">
                    <div className="h-3 w-16 bg-white/20 rounded mb-3" />
                    <div className="h-2 w-full bg-white/10 rounded mb-1" />
                    <div className="h-2 w-3/4 bg-white/10 rounded" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Placeholder) */}
      <section className="relative section-padding">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Cosa dicono i coach che{' '}
              <span className="text-gradient">usano Coaching Hub</span>
            </motion.h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                quote: "Finalmente ho smesso di perdere ore su WhatsApp. I miei clienti hanno tutto sul telefono e io ho tutto sotto controllo.",
                name: "Marco R.",
                role: "Personal Trainer, Milano"
              },
              {
                quote: "I miei clienti sono più motivati da quando vedono i loro progressi sui grafici. E il sistema di punti funziona alla grande!",
                name: "Sara B.",
                role: "Coach Online, Roma"
              },
              {
                quote: "Ho provato altre app ma erano troppo complicate. Questa è semplice e ha tutto quello che serve.",
                name: "Luca M.",
                role: "Preparatore Atletico, Torino"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="card-glass p-8 rounded-3xl"
              >
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((j) => (
                    <Star key={j} className="w-5 h-5 fill-accent-lime text-accent-lime" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-white/60">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative section-padding bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Domande{' '}
              <span className="text-gradient">Frequenti</span>
            </motion.h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto space-y-4"
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="card-glass rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-white/70">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative card-glass p-12 md:p-16 rounded-3xl text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-accent-mint/20" />
            <div className="relative">
              <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Pronto a lavorare{' '}
                <span className="text-gradient">in modo più smart?</span>
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
                Unisciti ai coach che hanno scelto di risparmiare tempo 
                e offrire un'esperienza premium ai loro clienti.
              </motion.p>
              
              <motion.a 
                variants={fadeInUp}
                href="#prezzi" 
                className="btn-primary inline-flex"
              >
                Scegli il tuo piano
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-lime" />
                  <span>Installazione in 5 minuti</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-lime" />
                  <span>Garanzia 14 giorni</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-lime" />
                  <span>Supporto incluso</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <a href="#" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-mint flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <span className="font-display font-bold text-xl">Coaching Hub</span>
              </a>
              <p className="text-white/60 mb-6 max-w-sm">
                La piattaforma tutto-in-uno per personal trainer e coach online.
                Gestisci i tuoi clienti come un professionista.
              </p>
              <div className="flex gap-4">
                {/* Social links placeholder */}
                {['instagram', 'facebook', 'linkedin'].map((social) => (
                  <a 
                    key={social}
                    href={`#${social}`}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <Globe className="w-5 h-5 text-white/60" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-display font-bold mb-4">Link Utili</h4>
              <ul className="space-y-3">
                {['Funzionalità', 'Prezzi', 'FAQ', 'Contatti'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-display font-bold mb-4">Contatti</h4>
              <ul className="space-y-3 text-white/60">
                <li>📧 info@coachinghub.it</li>
                <li>📍 Torino, Italia</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <p>© 2026 Coaching Hub - Mauro Vallotti. Tutti i diritti riservati.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/termini" className="hover:text-white transition-colors">Termini di Servizio</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

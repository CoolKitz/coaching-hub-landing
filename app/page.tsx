'use client'

import { Analytics } from '@vercel/analytics/react'
import { useState, useEffect, FormEvent } from 'react'
import type { ReactNode } from 'react'
import Image from 'next/image'
import { 
  Apple, MessageCircle, TrendingUp, Calendar, Trophy,
  Check, X, ChevronDown, Zap, Shield, Clock,
  ArrowRight, Mail, Bell, Palette, Menu, 
  XIcon, Send, User, Phone, Dumbbell, LucideIcon,
  Cookie, Settings
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }

// Logo Component - usa immagine PNG
const CoachingHubLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <Image src="/logo.png" alt="Coaching Hub" width={40} height={40} className={className} />
)

const plans = [
  { name: 'Starter', description: 'Perfetto per iniziare', priceAnnual: 99, priceMonthly: 9.90, popular: false,
    features: ['Fino a 10 clienti', 'Schede allenamento', 'Piani alimentari', 'Calendario', 'Messaggistica', 'Landing page generata dal sistema'] },
  { name: 'Professional', description: 'Per chi fa sul serio', priceAnnual: 199, priceMonthly: 19.90, popular: true,
    features: ['Fino a 50 clienti', 'Tutto di Starter, più:', 'Check-in settimanali', 'Tracciamento progressi', 'Foto progressi', 'Gamification', 'Report base', 'Landing page generata dal sistema'] },
  { name: 'Business', description: 'Per professionisti affermati', priceAnnual: 349, priceMonthly: 34.90, popular: false,
    features: ['Fino a 200 clienti', 'Tutto di Professional, più:', 'Multi-coach (fino a 5)', 'Report avanzati', 'Notifiche push', 'Contenuti educativi', 'White label base', 'Landing page generata dal sistema'] },
  { name: 'Enterprise', description: 'Per centri e team', priceAnnual: 599, priceMonthly: 59.90, popular: false,
    features: ['Clienti illimitati', 'Coach illimitati', 'Tutto di Business, più:', 'White label completo', 'Accesso API', 'Supporto tecnico prioritario', 'Landing page generata dal sistema'] }
]

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  color: string
}

const features: Feature[] = [
  { icon: Dumbbell, title: 'Schede Allenamento', description: 'Crea schede personalizzate in pochi minuti. Esercizi con video, serie, ripetizioni e note.', color: 'from-blue-500 to-cyan-400' },
  { icon: Apple, title: 'Piani Alimentari', description: 'Costruisci piani alimentari giorno per giorno. Database con migliaia di alimenti già pronti.', color: 'from-green-500 to-emerald-400' },
  { icon: MessageCircle, title: 'Messaggi Privati', description: 'Chatta con i tuoi clienti senza dare il numero personale. Tutto resta salvato e organizzato.', color: 'from-purple-500 to-pink-400' },
  { icon: TrendingUp, title: 'Tracciamento Progressi', description: 'Peso, misure, foto e check-in settimanali. Grafici automatici per vedere i miglioramenti.', color: 'from-orange-500 to-amber-400' },
  { icon: Calendar, title: 'Calendario Appuntamenti', description: 'I clienti prenotano direttamente dalla piattaforma. Sincronizzazione con Google Calendar.', color: 'from-rose-500 to-red-400' },
  { icon: Trophy, title: 'Gamification', description: 'Punti, badge e classifiche per tenere alta la motivazione. I clienti competono tra loro.', color: 'from-yellow-500 to-orange-400' }
]

const faqs = [
  { q: 'Ho bisogno di competenze tecniche per usarlo?', a: "Coaching Hub è progettato per essere semplice e intuitivo. L'installazione e l'attivazione sono guidate passo-passo tramite istruzioni e supporto tecnico dedicato, così puoi iniziare rapidamente anche senza competenze tecniche." },
  { q: 'Funziona su telefono?', a: "Sì! I tuoi clienti possono accedere da qualsiasi dispositivo: telefono, tablet o computer." },
  { q: 'I miei clienti devono scaricare un\'app?', a: "No, non serve scaricare nulla. Accedono direttamente dal browser del telefono." },
  { q: 'Posso provarlo prima di comprare?', a: "Certo! I primi 14 giorni sono completamente gratuiti. Il pagamento viene addebitato solo a partire dal 15° giorno, quindi hai tutto il tempo per esplorare le funzionalità e decidere se Coaching Hub fa per te. Se non ti convince, puoi annullare senza alcun costo." },
  { q: 'Posso passare a un piano superiore in seguito?', a: "Sì, puoi fare upgrade in qualsiasi momento. Paghi solo la differenza proporzionale al tempo rimanente." },
  { q: 'Cosa è incluso nel prezzo della licenza?', a: "La licenza include l'accesso completo al software Coaching Hub secondo il piano scelto, tutti gli aggiornamenti futuri e il supporto tecnico via email. Il nostro team si occuperà anche dell'installazione e della configurazione iniziale della piattaforma." },
  { q: 'Ci sono costi aggiuntivi oltre alla licenza?', a: "Sì, alcuni costi infrastrutturali sono a carico del cliente: hosting web (indicativamente €50–150/anno a seconda del traffico), dominio personalizzato (es. tuonome.it, circa €10–15/anno) e certificato SSL (spesso già incluso nell'hosting, altrimenti €20–50/anno). Durante la fase di configurazione ti guideremo nella scelta delle soluzioni più adatte alle tue esigenze e al tuo budget." },
  { q: 'Chi si occupa dell\'installazione?', a: "Pensiamo a tutto noi! Dopo l'acquisto verrai contattato dal nostro team, che si occuperà di configurare l'intera piattaforma sul tuo hosting. Tu dovrai solo scegliere hosting e dominio — e ti aiutiamo anche in questo." },
  { q: 'Posso usare un hosting che ho già?', a: "Certamente! Se hai già un hosting WordPress compatibile (PHP 7.4+, MySQL 5.7+), possiamo installare Coaching Hub direttamente lì senza costi aggiuntivi di infrastruttura." },
  { q: 'Posso migrare da un altro tool?', a: "Sì! Se attualmente utilizzi fogli Excel, Google Sheets, altri software o app per gestire i tuoi clienti, il nostro team ti aiuterà a importare i dati esistenti durante la fase di configurazione, così non perderai nulla nel passaggio a Coaching Hub." },
  { q: 'Quanto tempo richiede l\'attivazione?', a: "Generalmente completiamo la configurazione entro 24–48 ore lavorative dal momento in cui riceviamo tutti i dati necessari (accesso hosting e dominio configurato)." },
  { q: 'I dati dei miei clienti sono al sicuro?', a: "Assolutamente sì. Coaching Hub si installa direttamente sul tuo sito WordPress, quindi i dati dei tuoi clienti restano sul tuo server, sotto il tuo pieno controllo. Non transitano mai su piattaforme terze. Il software è conforme al GDPR." },
  { q: 'Cosa significa "Landing page generata dal sistema"?', a: "Ogni coach riceve automaticamente una pagina pubblica personalizzata con il proprio nome, logo e servizi offerti. È una vetrina professionale già pronta che puoi condividere con i potenziali clienti per presentarti e ricevere nuove richieste, senza dover creare un sito separato." },
  { q: 'Come funziona il supporto?', a: "Il supporto è disponibile via email con risposta entro 24 ore lavorative ed è dedicato all'utilizzo del software, alla gestione della licenza e alle funzionalità incluse. I piani Business ed Enterprise includono supporto prioritario." }
]

// ============================================
// MODAL DOCUMENTI LEGALI
// ============================================

type ModalType = 'privacy' | 'cookie' | 'termini' | null

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

const LegalModal = ({ isOpen, onClose, title, children }: LegalModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-[101] flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-4xl mx-auto card-glass rounded-3xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="font-display text-xl md:text-2xl font-bold">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="prose prose-invert prose-sm md:prose-base max-w-none">
                  {children}
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-white/10">
                <button
                  onClick={onClose}
                  className="btn-primary w-full md:w-auto"
                >
                  Ho capito, chiudi
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Contenuto Privacy Policy
const PrivacyPolicyContent = () => (
  <div className="space-y-6 text-white/80">
    <p className="text-white/60 text-sm">Ultimo aggiornamento: Gennaio 2026</p>
    
    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">1. Titolare del Trattamento</h3>
      <p>Il Titolare del trattamento dei dati personali è:</p>
      <ul className="list-none mt-2 space-y-1">
        <li><strong className="text-white">Nome:</strong> Mauro Vallotti</li>
        <li><strong className="text-white">Indirizzo:</strong> Via Roma 2, 10040 Rivalta di Torino (TO), Italia</li>
        <li><strong className="text-white">Email:</strong> coachinghubinfo@gmail.com</li>
        <li><strong className="text-white">Codice Fiscale:</strong> VLLMRA85S01L219P</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">2. Tipologie di Dati Raccolti</h3>
      <p>I dati personali raccolti dal sito, in modo autonomo o tramite terze parti, includono:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Dati di navigazione (indirizzo IP, browser, sistema operativo, pagine visitate)</li>
        <li>Dati forniti volontariamente dall&apos;utente (nome, cognome, email, telefono, messaggi inviati tramite il form di contatto)</li>
        <li>Cookie e tecnologie simili (vedi Cookie Policy)</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">3. Finalità del Trattamento</h3>
      <p>I dati personali sono trattati per le seguenti finalità:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li><strong className="text-white">Rispondere alle richieste:</strong> gestire le richieste di informazioni inviate tramite il form di contatto</li>
        <li><strong className="text-white">Erogazione della licenza software:</strong> fornire accesso alle funzionalità della piattaforma Coaching Hub agli utenti registrati</li>
        <li><strong className="text-white">Comunicazioni di servizio:</strong> inviare comunicazioni tecniche relative al servizio acquistato</li>
        <li><strong className="text-white">Adempimenti legali:</strong> adempiere agli obblighi previsti dalla legge</li>
        <li><strong className="text-white">Miglioramento del servizio:</strong> analisi statistiche aggregate per migliorare l&apos;esperienza utente</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">4. Base Giuridica del Trattamento</h3>
      <p>Il trattamento dei dati personali si basa su:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li><strong className="text-white">Consenso:</strong> per l&apos;invio di comunicazioni tramite il form di contatto (Art. 6.1.a GDPR)</li>
        <li><strong className="text-white">Esecuzione contrattuale:</strong> per la fornitura della licenza software e delle funzionalità richieste</li>
        <li><strong className="text-white">Obbligo legale:</strong> per adempiere a obblighi di legge (Art. 6.1.c GDPR)</li>
        <li><strong className="text-white">Interesse legittimo:</strong> per la sicurezza del sito e analisi statistiche aggregate (Art. 6.1.f GDPR)</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">5. Modalità di Trattamento</h3>
      <p>I dati personali sono trattati con strumenti informatici e/o telematici, con logiche strettamente correlate alle finalità indicate e comunque in modo da garantire la sicurezza e la riservatezza dei dati stessi.</p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">6. Periodo di Conservazione</h3>
      <p>I dati personali saranno conservati per il tempo strettamente necessario a conseguire le finalità per le quali sono stati raccolti:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li><strong className="text-white">Dati del form di contatto:</strong> 12 mesi dall&apos;ultimo contatto</li>
        <li><strong className="text-white">Dati degli utenti registrati:</strong> per tutta la durata del rapporto contrattuale e per il periodo successivo necessario a tutelare i diritti del Titolare e adempiere ad obblighi di legge applicabili</li>
        <li><strong className="text-white">Dati di navigazione:</strong> 26 mesi</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">7. Comunicazione e Diffusione dei Dati</h3>
      <p>I dati personali potranno essere comunicati a:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li><strong className="text-white">Lemon Squeezy (Merchant of Record):</strong> per la gestione dei pagamenti, della fatturazione e degli abbonamenti. Lemon Squeezy riceve i dati necessari all&apos;elaborazione dei pagamenti (nome, email, indirizzo di fatturazione). Per maggiori informazioni: <a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:underline">Privacy Policy di Lemon Squeezy</a></li>
        <li>Altri fornitori di servizi tecnici che agiscono come Responsabili del trattamento</li>
        <li>Autorità competenti, quando richiesto dalla legge</li>
      </ul>
      <p className="mt-2">I dati non saranno in alcun modo diffusi o ceduti a terzi per finalità di marketing senza il tuo esplicito consenso.</p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">7bis. Lemon Squeezy come Merchant of Record</h3>
      <p>I pagamenti per Coaching Hub sono gestiti da <strong className="text-white">Lemon Squeezy</strong>, che opera come Merchant of Record (MoR). Questo significa che:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Lemon Squeezy è il venditore ufficiale ai fini fiscali e legali</li>
        <li>Le fatture vengono emesse direttamente da Lemon Squeezy</li>
        <li>I dati di pagamento (carta di credito, ecc.) sono gestiti esclusivamente da Lemon Squeezy</li>
        <li>Lemon Squeezy gestisce gli adempimenti fiscali (IVA, ecc.)</li>
      </ul>
      <p className="mt-2">Per informazioni complete: <a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:underline">Privacy</a> | <a href="https://www.lemonsqueezy.com/terms" target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:underline">Termini</a> di Lemon Squeezy</p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">8. Trasferimento dei Dati</h3>
      <p>Alcuni dei servizi terzi utilizzati potrebbero comportare il trasferimento di dati verso paesi extra-UE (es. USA). In tal caso, il trasferimento avviene nel rispetto delle garanzie previste dal GDPR, come le Clausole Contrattuali Standard approvate dalla Commissione Europea.</p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">9. Diritti dell&apos;Interessato</h3>
      <p>Ai sensi degli articoli 15-22 del GDPR, hai diritto di:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li><strong className="text-white">Accesso:</strong> ottenere conferma dell&apos;esistenza di un trattamento e accedere ai tuoi dati</li>
        <li><strong className="text-white">Rettifica:</strong> ottenere la correzione di dati inesatti</li>
        <li><strong className="text-white">Cancellazione:</strong> ottenere la cancellazione dei tuoi dati (&quot;diritto all&apos;oblio&quot;)</li>
        <li><strong className="text-white">Limitazione:</strong> ottenere la limitazione del trattamento</li>
        <li><strong className="text-white">Portabilità:</strong> ricevere i tuoi dati in formato strutturato</li>
        <li><strong className="text-white">Opposizione:</strong> opporti al trattamento per motivi legittimi</li>
        <li><strong className="text-white">Revoca del consenso:</strong> revocare in qualsiasi momento il consenso prestato</li>
      </ul>
      <p className="mt-3">Per esercitare i tuoi diritti, puoi contattarci all&apos;indirizzo: <a href="mailto:coachinghubinfo@gmail.com" className="text-accent-lime hover:underline">coachinghubinfo@gmail.com</a></p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">10. Reclamo all&apos;Autorità di Controllo</h3>
      <p>Hai il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali se ritieni che il trattamento dei tuoi dati sia contrario alla normativa vigente.</p>
      <p className="mt-2">Sito web: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:underline">www.garanteprivacy.it</a></p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">11. Modifiche alla Privacy Policy</h3>
      <p>Il Titolare si riserva il diritto di apportare modifiche alla presente Privacy Policy in qualsiasi momento, dandone comunicazione agli utenti su questa pagina. Ti invitiamo a consultare regolarmente questa pagina.</p>
    </section>
  </div>
)

// Contenuto Cookie Policy
const CookiePolicyContent = () => (
  <div className="space-y-6 text-white/80">
    <p className="text-white/60 text-sm">Ultimo aggiornamento: Gennaio 2026</p>
    
    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">1. Cosa sono i Cookie</h3>
      <p>I cookie sono piccoli file di testo che i siti web visitati inviano al browser dell&apos;utente, dove vengono memorizzati, per poi essere ritrasmessi agli stessi siti alla visita successiva. I cookie permettono di migliorare la navigazione, ricordare le preferenze e personalizzare l&apos;esperienza dell&apos;utente.</p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">2. Titolare del Trattamento</h3>
      <ul className="list-none space-y-1">
        <li><strong className="text-white">Nome:</strong> Mauro Vallotti</li>
        <li><strong className="text-white">Indirizzo:</strong> Via Roma 2, 10040 Rivalta di Torino (TO), Italia</li>
        <li><strong className="text-white">Email:</strong> coachinghubinfo@gmail.com</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">3. Tipologie di Cookie Utilizzati</h3>
      
      <div className="mt-4 space-y-4">
        <div className="p-4 bg-white/5 rounded-xl">
          <h4 className="font-bold text-white mb-2">3.1 Cookie Tecnici (Necessari)</h4>
          <p className="text-sm">Questi cookie sono essenziali per il corretto funzionamento del sito e non richiedono il consenso dell&apos;utente.</p>
          <ul className="list-disc list-inside mt-2 text-sm space-y-1">
            <li>Cookie di sessione per la navigazione</li>
            <li>Cookie per la sicurezza</li>
            <li>Cookie per ricordare le preferenze sui cookie</li>
          </ul>
          <p className="text-xs text-white/50 mt-2">Base giuridica: necessità tecnica per il corretto funzionamento del sito (Art. 6.1.b GDPR e Art. 122 Codice Privacy)</p>
        </div>

        <div className="p-4 bg-white/5 rounded-xl">
          <h4 className="font-bold text-white mb-2">3.2 Cookie Analitici</h4>
          <p className="text-sm">Questi cookie raccolgono informazioni in forma aggregata e anonima, senza consentire l&apos;identificazione diretta dell&apos;utente</p>
          <ul className="list-disc list-inside mt-2 text-sm space-y-1">
            <li>Vercel Analytics (se attivato): analisi delle performance</li>
          </ul>
          <p className="text-xs text-white/50 mt-2">Base giuridica: consenso dell'utente (Art. 6.1.a GDPR), espresso tramite il banner cookie</p>
        </div>

        <div className="p-4 bg-white/5 rounded-xl">
          <h4 className="font-bold text-white mb-2">3.3 Cookie di Terze Parti</h4>
          <p className="text-sm">Il sito potrebbe contenere collegamenti a servizi di terze parti che installano propri cookie:</p>
          <ul className="list-disc list-inside mt-2 text-sm space-y-1">
            <li><strong className="text-white">Lemon Squeezy:</strong> piattaforma di pagamento per checkout e abbonamenti. Potrebbe utilizzare cookie per la sicurezza delle transazioni. <a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:underline">Privacy Policy</a></li>
            <li><strong className="text-white">Formspree:</strong> servizio per la gestione del form di contatto.</li>
          </ul>
          <p className="text-xs text-white/50 mt-2">Per questi cookie, consulta le rispettive informative privacy.</p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">4. Durata dei Cookie</h3>
      <ul className="list-disc list-inside space-y-1">
        <li><strong className="text-white">Cookie di sessione:</strong> cancellati automaticamente alla chiusura del browser</li>
        <li><strong className="text-white">Cookie persistenti:</strong> conservati per un periodo variabile in base alla finalità e comunque non superiore a 12 mesi, salvo diversa indicazione del fornitore terzo</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">5. Come Gestire i Cookie</h3>
      <p>Puoi gestire le tue preferenze sui cookie in diversi modi:</p>
      
      <div className="mt-4 space-y-3">
        <div>
          <h4 className="font-bold text-white mb-1">Tramite il Browser</h4>
          <p className="text-sm">Puoi configurare il tuo browser per accettare, rifiutare o eliminare i cookie. Ecco i link alle guide dei principali browser:</p>
          <ul className="list-disc list-inside mt-2 text-sm space-y-1">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:underline">Apple Safari</a></li>
            <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:underline">Microsoft Edge</a></li>
          </ul>
        </div>
      </div>
      <p className="text-sm">È sempre possibile modificare o revocare il consenso ai cookie non necessari tramite il banner cookie o le impostazioni disponibili sul sito.</p>
      <p className="mt-4 text-sm"><strong className="text-white">Nota:</strong> Disabilitare i cookie tecnici potrebbe compromettere il corretto funzionamento del sito.</p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">6. Aggiornamenti</h3>
      <p>La presente Cookie Policy può essere soggetta a modifiche. Ti invitiamo a consultare periodicamente questa pagina per essere sempre informato su come trattiamo i cookie.</p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">7. Contatti</h3>
      <p>Per qualsiasi domanda relativa a questa Cookie Policy, puoi contattarci all&apos;indirizzo: <a href="mailto:coachinghubinfo@gmail.com" className="text-accent-lime hover:underline">coachinghubinfo@gmail.com</a></p>
    </section>
  </div>
)

// Contenuto Termini di Servizio
const TerminiServizioContent = () => (
  <div className="space-y-6 text-white/80">
    <p className="text-white/60 text-sm">Ultimo aggiornamento: Gennaio 2026</p>
    
    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">1. Definizioni</h3>
      <ul className="list-disc list-inside space-y-1">
        <li><strong className="text-white">&quot;Coaching Hub&quot;</strong> o <strong className="text-white">&quot;Piattaforma&quot;</strong>: il software gestionale per personal trainer e coach distribuito tramite questo sito</li>
        <li><strong className="text-white">&quot;Titolare del software&quot;</strong>: Mauro Vallotti, con sede in Via Roma 2, 10040 Rivalta di Torino (TO)</li>
        <li><strong className="text-white">&quot;Utente&quot;</strong> o <strong className="text-white">&quot;Cliente&quot;</strong>: la persona fisica o giuridica che acquista una licenza di Coaching Hub</li>
        <li><strong className="text-white">&quot;Servizio&quot;</strong>: l&apos;insieme delle funzionalità software rese disponibili tramite la Piattaforma secondo il piano sottoscritto</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">2. Oggetto del Contratto</h3>
      <p>I presenti Termini di Servizio regolano l&apos;utilizzo della piattaforma Coaching Hub. Con l&apos;acquisto di una licenza, l&apos;Utente accetta integralmente i presenti termini.</p>
      <p className="mt-2">Coaching Hub è un software gestionale che permette a personal trainer, nutrizionisti e coach di gestire i propri clienti attraverso funzionalità quali: schede allenamento, piani alimentari, messaggistica, tracciamento progressi e calendario appuntamenti.</p>
      <p className="mt-2">Coaching Hub è fornito esclusivamente come <strong>licenza software</strong>. Eventuali attività di supporto sono accessorie e limitate all'utilizzo del software e non costituiscono prestazioni di servizi professionali.</p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">3. Requisiti Tecnici</h3>
      <p>Per utilizzare Coaching Hub è necessario:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Disporre di un sito WordPress con hosting compatibile (PHP 7.4+, MySQL 5.7+)</li>
        <li>Connessione internet attiva</li>
        <li>Browser web aggiornato</li>
      </ul>
      <p className="mt-2">Il Titolare del software fornisce supporto tecnico limitato all'attivazione e all'utilizzo del software, ma non è responsabile per problemi derivanti da hosting inadeguati o configurazioni errate del server.</p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">4. Piani e Prezzi</h3>
      <p>Coaching Hub è disponibile in diversi piani di abbonamento:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li><strong className="text-white">Starter:</strong> fino a 10 clienti</li>
        <li><strong className="text-white">Professional:</strong> fino a 50 clienti</li>
        <li><strong className="text-white">Business:</strong> fino a 200 clienti</li>
        <li><strong className="text-white">Enterprise:</strong> clienti illimitati</li>
      </ul>
      <p className="mt-2">I prezzi sono quelli indicati nella pagina Prezzi al momento dell&apos;acquisto e possono essere soggetti a modifiche per i rinnovi successivi, con preavviso di almeno 30 giorni.</p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">5. Pagamento e Fatturazione</h3>
      <p>I pagamenti sono gestiti da <strong className="text-white">Lemon Squeezy</strong>, che opera come Merchant of Record (MoR):</p>
      <ul className="list-disc list-inside space-y-1 mt-2">
        <li><strong className="text-white">Merchant of Record:</strong> Lemon Squeezy è il venditore ufficiale ai fini legali e fiscali</li>
        <li><strong className="text-white">Fatturazione:</strong> Le fatture vengono emesse da Lemon Squeezy, non da Coaching Hub</li>
        <li><strong className="text-white">IVA:</strong> Gestita automaticamente da Lemon Squeezy in base alla tua posizione</li>
        <li><strong className="text-white">Rinnovo:</strong> L&apos;abbonamento si rinnova automaticamente, salvo disdetta</li>
        <li><strong className="text-white">Disdetta:</strong> Puoi annullare dal tuo account Lemon Squeezy o contattando il supporto</li>
      </ul>
      <p className="mt-2">In caso di mancato pagamento, l&apos;accesso alla licenza potrà essere sospeso. Per i termini completi: <a href="https://www.lemonsqueezy.com/terms" target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:underline">Termini Lemon Squeezy</a></p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">6. Periodo di Prova, Recesso e Rimborsi</h3>
      <p><strong className="text-white">Periodo di prova gratuito:</strong> I primi 14 giorni dall&apos;attivazione sono completamente gratuiti. Il pagamento viene addebitato automaticamente a partire dal 15° giorno. L&apos;Utente può annullare in qualsiasi momento durante il periodo di prova senza alcun addebito.</p>
      <p className="mt-2"><strong className="text-white">Diritto di recesso:</strong> Ai sensi del Codice del Consumo (D.Lgs. 206/2005), l&apos;Utente consumatore ha diritto di recedere entro 14 giorni dal primo addebito effettivo (ovvero dal 15° giorno dall&apos;attivazione).</p>
      <p className="mt-2"><strong className="text-white">Come richiedere un rimborso:</strong> I rimborsi successivi al periodo di prova sono gestiti da Lemon Squeezy. Contatta <a href="mailto:coachinghubinfo@gmail.com" className="text-accent-lime hover:underline">coachinghubinfo@gmail.com</a> e il rimborso verrà elaborato sullo stesso metodo di pagamento.</p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">7. Upgrade e Downgrade</h3>
      <ul className="list-disc list-inside space-y-1">
        <li><strong className="text-white">Upgrade:</strong> puoi passare a un piano superiore in qualsiasi momento. Pagherai solo la differenza proporzionale al periodo rimanente</li>
        <li><strong className="text-white">Downgrade:</strong> il passaggio a un piano inferiore sarà effettivo dal prossimo rinnovo. Non sono previsti rimborsi per il periodo corrente</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">8. Obblighi dell&apos;Utente</h3>
      <p>L&apos;Utente si impegna a:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Utilizzare la Piattaforma in conformità alle leggi vigenti</li>
        <li>Non condividere le proprie credenziali di accesso con terzi</li>
        <li>Non tentare di aggirare le limitazioni del piano acquistato</li>
        <li>Non utilizzare la Piattaforma per scopi illeciti o fraudolenti</li>
        <li>Mantenere aggiornati i propri dati di contatto e fatturazione</li>
        <li>Rispettare la privacy dei propri clienti e trattare i loro dati in conformità al GDPR</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">9. Responsabilità dell&apos;Utente sui Dati</h3>
      <p>L&apos;Utente è l&apos;unico Titolare del trattamento dei dati dei propri clienti inseriti nella Piattaforma. Il Titolare del software agisce come Responsabile del trattamento ai sensi dell&apos;Art. 28 del GDPR.</p>
      <p className="mt-2">L&apos;Utente si impegna a:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Informare adeguatamente i propri clienti sul trattamento dei loro dati</li>
        <li>Ottenere i consensi necessari dove richiesto</li>
        <li>Non inserire dati sensibili non necessari all&apos;erogazione del servizio</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">10. Limitazione di Responsabilità</h3>
      <p>Il Fornitore non è responsabile per:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Interruzioni del servizio dovute a cause di forza maggiore o a manutenzione programmata</li>
        <li>Perdita di dati causata da negligenza dell&apos;Utente o del suo provider di hosting</li>
        <li>Danni indiretti, incidentali o consequenziali derivanti dall&apos;uso della Piattaforma</li>
        <li>Malfunzionamenti derivanti da incompatibilità con plugin o temi WordPress di terze parti</li>
      </ul>
      <p className="mt-2">La responsabilità massima del Fornitore è in ogni caso limitata all&apos;importo pagato dall&apos;Utente negli ultimi 12 mesi.</p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">11. Proprietà Intellettuale</h3>
      <p>Coaching Hub, inclusi codice sorgente, grafica, documentazione e marchi, sono di proprietà esclusiva del Fornitore. L&apos;acquisto di una licenza non trasferisce alcun diritto di proprietà intellettuale.</p>
      <p className="mt-2">È vietato:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Copiare, modificare o distribuire il software</li>
        <li>Effettuare reverse engineering</li>
        <li>Rimuovere o alterare avvisi di copyright</li>
        <li>Sublicenziare o rivendere l&apos;accesso alla Piattaforma</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">12. Supporto Tecnico</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>Il supporto è fornito via email all&apos;indirizzo <a href="mailto:coachinghubinfo@gmail.com" className="text-accent-lime hover:underline">coachinghubinfo@gmail.com</a></li>
        <li>Tempo di risposta: entro 24 ore lavorative (48 ore per piani Starter)</li>
        <li>I piani Business ed Enterprise includono supporto tecnico prioritario</li>
        <li>Il supporto copre problemi relativi al funzionamento della Piattaforma, non alla configurazione dell&apos;hosting o di WordPress</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">13. Sospensione e Risoluzione</h3>
      <p>Il Fornitore si riserva il diritto di sospendere o risolvere il contratto in caso di:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Mancato pagamento delle quote di abbonamento</li>
        <li>Violazione dei presenti Termini di Servizio</li>
        <li>Utilizzo fraudolento o illecito della Piattaforma</li>
        <li>Comportamenti che danneggino l&apos;immagine del Fornitore</li>
      </ul>
      <p className="mt-2">In caso di risoluzione per causa imputabile all&apos;Utente, non è previsto alcun rimborso.</p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">14. Modifiche ai Termini</h3>
      <p>Il Fornitore si riserva il diritto di modificare i presenti Termini di Servizio. Le modifiche saranno comunicate via email con almeno 30 giorni di preavviso. L&apos;uso continuato della Piattaforma dopo tale periodo costituisce accettazione delle modifiche.</p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">15. Legge Applicabile e Foro Competente</h3>
      <p>Il presente contratto è regolato dalla legge italiana. Per qualsiasi controversia relativa all&apos;interpretazione, esecuzione o risoluzione del presente contratto, sarà competente in via esclusiva il Foro di Torino, salvo il caso in cui l&apos;Utente sia qualificabile come consumatore ai sensi del Codice del Consumo, nel qual caso sarà competente il foro del luogo di residenza o domicilio del consumatore.</p>
    </section>

    <section>
      <h3 className="text-lg font-display font-bold text-white mb-3">16. Contatti</h3>
      <p>Per qualsiasi domanda relativa ai presenti Termini di Servizio:</p>
      <ul className="list-none mt-2 space-y-1">
        <li><strong className="text-white">Email:</strong> <a href="mailto:coachinghubinfo@gmail.com" className="text-accent-lime hover:underline">coachinghubinfo@gmail.com</a></li>
        <li><strong className="text-white">Indirizzo:</strong> Via Roma 2, 10040 Rivalta di Torino (TO), Italia</li>
      </ul>
    </section>
  </div>
)

// ============================================
// COOKIE BANNER
// ============================================

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
}

interface CookieBannerProps {
  onAcceptAll: () => void
  onRejectAll: () => void
  onSavePreferences: (prefs: CookiePreferences) => void
  onOpenCookiePolicy: () => void
}

const CookieBanner = ({ onAcceptAll, onRejectAll, onSavePreferences, onOpenCookiePolicy }: CookieBannerProps) => {
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
  })

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-[99] p-4 md:p-6"
    >
      <div className="max-w-4xl mx-auto card-glass rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-lime/20 flex items-center justify-center shrink-0">
              <Cookie className="w-6 h-6 text-accent-lime" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-lg mb-2">Questo sito utilizza i cookie 🍪</h3>
              <p className="text-sm text-white/70">
                Utilizziamo i cookie per migliorare la tua esperienza di navigazione e analizzare il traffico del sito. 
                Puoi scegliere quali cookie accettare.{' '}
                <button 
                  onClick={onOpenCookiePolicy}
                  className="text-accent-lime hover:underline"
                >
                  Leggi la Cookie Policy
                </button>
              </p>
            </div>
          </div>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">Cookie Necessari</h4>
                        <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">Sempre attivi</span>
                      </div>
                      <p className="text-xs text-white/60">
                        Essenziali per il funzionamento del sito. Non possono essere disattivati.
                      </p>
                    </div>
                    <div className="w-12 h-6 rounded-full bg-accent-lime/30 p-1 cursor-not-allowed">
                      <div className="w-4 h-4 rounded-full bg-accent-lime translate-x-6" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex-1 pr-4">
                      <h4 className="font-semibold text-sm mb-1">Cookie Analitici</h4>
                      <p className="text-xs text-white/60">
                        Ci aiutano a capire come i visitatori interagiscono con il sito, raccogliendo informazioni in forma anonima.
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle('analytics')}
                      className={`w-12 h-6 rounded-full p-1 transition-colors ${preferences.analytics ? 'bg-accent-lime/30' : 'bg-white/10'}`}
                    >
                      <div className={`w-4 h-4 rounded-full transition-all ${preferences.analytics ? 'bg-accent-lime translate-x-6' : 'bg-white/40 translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4 md:p-6 pt-0 flex flex-col sm:flex-row gap-3">
          {showDetails ? (
            <>
              <button
                onClick={() => setShowDetails(false)}
                className="flex-1 sm:flex-none px-6 py-3 text-sm font-semibold text-white/70 hover:text-white transition-colors"
              >
                ← Indietro
              </button>
              <button
                onClick={() => onSavePreferences(preferences)}
                className="flex-1 btn-primary !py-3 justify-center"
              >
                Salva preferenze
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowDetails(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white/70 hover:text-white border border-white/10 rounded-full transition-colors"
              >
                <Settings className="w-4 h-4" />
                Personalizza
              </button>
              <button
                onClick={onRejectAll}
                className="flex-1 sm:flex-none px-6 py-3 text-sm font-semibold text-white/70 hover:text-white border border-white/10 rounded-full transition-colors"
              >
                Rifiuta tutti
              </button>
              <button
                onClick={onAcceptAll}
                className="flex-1 btn-primary !py-3 justify-center"
              >
                Accetta tutti
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// COMPONENTE PRINCIPALE
// ============================================

export default function LandingPage() {
  const LS_CHECKOUT_URLS: Record<string, string> = {
    starter: 'https://coaching-hub.lemonsqueezy.com/checkout/buy/58e06e8d-1c33-46ef-93c5-50c3a65a89d1',
    professional: 'https://coaching-hub.lemonsqueezy.com/checkout/buy/785626e8-04db-4ded-8ea9-b0236818deaa',
    business: 'https://coaching-hub.lemonsqueezy.com/checkout/buy/17d7fa34-a78e-4366-8e59-6270de13bc48',
    enterprise: 'https://coaching-hub.lemonsqueezy.com/checkout/buy/c007414d-2ca2-45ee-80ff-1b9471e825dd'
  }
  
  const getCheckoutUrl = (planName: string) => {
    const plan = planName.toLowerCase()
    return LS_CHECKOUT_URLS[plan] || '#contatti'
  }
  
  const [billingAnnual, setBillingAnnual] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  
  const [showCookieBanner, setShowCookieBanner] = useState(false)
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences | null>(null)

  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookiePreferences')
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences))
      setShowCookieBanner(false)
    } else {
      const timer = setTimeout(() => setShowCookieBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAllCookies = () => {
    const allAccepted: CookiePreferences = { necessary: true, analytics: true }
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted))
    setCookiePreferences(allAccepted)
    setShowCookieBanner(false)
  }

  const handleRejectAllCookies = () => {
    const allRejected: CookiePreferences = { necessary: true, analytics: false }
    localStorage.setItem('cookiePreferences', JSON.stringify(allRejected))
    setCookiePreferences(allRejected)
    setShowCookieBanner(false)
  }

  const handleSaveCookiePreferences = (prefs: CookiePreferences) => {
    const cleanedPrefs: CookiePreferences = { necessary: true, analytics: prefs.analytics }
    localStorage.setItem('cookiePreferences', JSON.stringify(cleanedPrefs))
    setCookiePreferences(cleanedPrefs)
    setShowCookieBanner(false)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('sending')
    
    const form = e.currentTarget
    const formData = new FormData(form)
    
    try {
      const res = await fetch('https://formspree.io/f/mpqqjkrn', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      if (res.ok) {
        setFormStatus('sent')
        form.reset()
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />
      <div className="fixed inset-0 noise-overlay pointer-events-none" />

      {/* Modal Legali */}
      <LegalModal isOpen={activeModal === 'privacy'} onClose={() => setActiveModal(null)} title="Privacy Policy"><PrivacyPolicyContent /></LegalModal>
      <LegalModal isOpen={activeModal === 'cookie'} onClose={() => setActiveModal(null)} title="Cookie Policy"><CookiePolicyContent /></LegalModal>
      <LegalModal isOpen={activeModal === 'termini'} onClose={() => setActiveModal(null)} title="Termini di Servizio"><TerminiServizioContent /></LegalModal>

      {/* Cookie Banner */}
      <AnimatePresence>
        {showCookieBanner && (
          <CookieBanner
            onAcceptAll={handleAcceptAllCookies}
            onRejectAll={handleRejectAllCookies}
            onSavePreferences={handleSaveCookiePreferences}
            onOpenCookiePolicy={() => { setActiveModal('cookie') }}
          />
        )}
      </AnimatePresence>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 px-6">
            <a href="#" className="flex items-center gap-3">
              <CoachingHubLogo />
              <span className="font-display font-bold text-xl">Coaching Hub</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#funzionalita" className="text-sm text-white/70 hover:text-white transition-colors">Funzionalità</a>
              <a href="#prezzi" className="text-sm text-white/70 hover:text-white transition-colors">Prezzi</a>
              <a href="#faq" className="text-sm text-white/70 hover:text-white transition-colors">FAQ</a>
              <a href="#contatti" className="text-sm text-white/70 hover:text-white transition-colors">Contatti</a>
              <a href="#prezzi" className="btn-primary text-sm !py-3 !px-6">Inizia Ora</a>
            </div>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-slate-900 border-t border-white/5 px-6 py-4">
            <div className="flex flex-col gap-4">
              <a href="#funzionalita" className="text-white/70 py-2" onClick={() => setMobileMenuOpen(false)}>Funzionalità</a>
              <a href="#prezzi" className="text-white/70 py-2" onClick={() => setMobileMenuOpen(false)}>Prezzi</a>
              <a href="#faq" className="text-white/70 py-2" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
              <a href="#contatti" className="text-white/70 py-2" onClick={() => setMobileMenuOpen(false)}>Contatti</a>
              <a href="#prezzi" className="btn-primary text-center mt-2" onClick={() => setMobileMenuOpen(false)}>Inizia Ora</a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="container-custom section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center lg:text-left">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <Zap className="w-4 h-4 text-accent-lime" />
                <span className="text-sm text-white/80">La soluzione software per gestire clienti, piani e progressi in un unico posto</span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Gestisci i tuoi clienti <span className="text-gradient">come un professionista.</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/60 mb-8 max-w-xl mx-auto lg:mx-0">
                Senza perdere tempo con fogli Excel e messaggi WhatsApp. Piani alimentari, schede allenamento, messaggi e progressi in un unico posto.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#prezzi" className="btn-primary">Scopri i Piani <ArrowRight className="w-5 h-5 ml-2" /></a>
                <a href="#contatti" className="btn-secondary"><Mail className="w-5 h-5 mr-2" /> Richiedi Informazioni</a>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/20 to-accent-mint/20 blur-3xl rounded-3xl" />
                <div className="relative card-glass p-2 rounded-3xl">
                  <div className="bg-slate-900 rounded-2xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-white/5">
                      <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80" /><div className="w-3 h-3 rounded-full bg-yellow-500/80" /><div className="w-3 h-3 rounded-full bg-green-500/80" /></div>
                      <div className="flex-1 mx-4"><div className="bg-slate-700/50 rounded-lg px-4 py-1.5 text-xs text-white/40 text-center">tuosito.com/dashboard</div></div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between"><div><div className="h-6 w-40 bg-white/10 rounded-lg" /><div className="h-4 w-24 bg-white/5 rounded mt-2" /></div><div className="h-10 w-32 bg-accent-lime/20 rounded-lg" /></div>
                      <div className="grid grid-cols-3 gap-4">
                        {[{ label: 'Clienti Attivi', value: '47', color: 'bg-brand-500/20' }, { label: 'Check-in Oggi', value: '12', color: 'bg-accent-mint/20' }, { label: 'Messaggi', value: '8', color: 'bg-purple-500/20' }].map((stat, i) => (
                          <div key={i} className={`${stat.color} rounded-xl p-4`}><div className="text-2xl font-display font-bold">{stat.value}</div><div className="text-xs text-white/60">{stat.label}</div></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-6 -right-6 card-glass p-4 rounded-2xl">
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-green-400" /></div><div><div className="text-sm font-semibold">+23%</div><div className="text-xs text-white/60">Progressi</div></div></div>
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -bottom-4 -left-6 card-glass p-4 rounded-2xl">
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-accent-lime/20 flex items-center justify-center"><Bell className="w-5 h-5 text-accent-lime" /></div><div><div className="text-sm font-semibold">Nuovo messaggio</div><div className="text-xs text-white/60">da Marco R.</div></div></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2"><ChevronDown className="w-8 h-8 text-white/30" /></motion.div>
      </section>

      {/* Problem/Solution */}
      <section className="relative section-padding">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Sei stanco di gestire <span className="text-gradient">tutto a mano?</span></motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="card-glass p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center"><X className="w-6 h-6 text-red-400" /></div><h3 className="font-display text-xl font-bold">I problemi di oggi</h3></div>
              <div className="space-y-4">
                {['Fogli Excel infiniti per tracciare i progressi', 'Schede allenamento inviate su WhatsApp che si perdono', 'Piani alimentari in PDF che nessuno legge', 'Messaggi sparsi tra email, WhatsApp e Instagram', 'Nessuna idea di come stanno andando i tuoi clienti', 'Ore perse a fare copia-incolla delle stesse schede'].map((problem, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex items-start gap-3 text-white/70"><X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /><span>{problem}</span></motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="card-glass p-8 rounded-3xl border-accent-lime/20">
              <div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 rounded-xl bg-accent-lime/20 flex items-center justify-center"><Check className="w-6 h-6 text-accent-lime" /></div><h3 className="font-display text-xl font-bold">Con Coaching Hub</h3></div>
              <div className="space-y-4">
                {['Dashboard con tutto sotto controllo', 'Schede allenamento sempre accessibili dal cliente', 'Piani alimentari interattivi e facili da seguire', 'Messaggistica integrata in un unico posto', 'Report e grafici automatici sui progressi', 'Template riutilizzabili per risparmiare ore'].map((solution, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex items-start gap-3 text-white/70"><Check className="w-5 h-5 text-accent-lime shrink-0 mt-0.5" /><span>{solution}</span></motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="funzionalita" className="relative section-padding">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Tutto quello che ti serve, <span className="text-gradient">in un unico posto.</span></motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/60 max-w-2xl mx-auto">Dimentica i 10 strumenti diversi. Coaching Hub integra tutto quello che serve per gestire i tuoi clienti come un vero professionista.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div key={i} variants={fadeInUp} className="group card-glass p-8 rounded-3xl hover:border-white/20 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative section-padding">
        <div className="container-custom">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center lg:text-left">Perché scegliere <span className="text-gradient">Coaching Hub?</span></motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp}>
              <div className="space-y-6">
                {[
                  { icon: Zap, title: 'Semplicissimo da usare', description: 'Interfaccia intuitiva pensata per chi non è un tecnico. Se sai usare lo smartphone, sai usare Coaching Hub.' },
                  { icon: Shield, title: 'I tuoi dati sono al sicuro', description: 'Il plugin si installa sul TUO sito WordPress. I dati dei tuoi clienti restano tuoi, sempre.' },
                  { icon: Clock, title: 'Risparmia 10+ ore a settimana', description: 'Automatizza le attività ripetitive e dedica più tempo a quello che conta: i tuoi clienti.' },
                  { icon: Palette, title: 'Personalizzabile', description: 'Adatta colori, logo e funzionalità al tuo brand. I piani avanzati offrono anche white label completo.' },
                  { icon: User, title: 'La tua vetrina professionale', description: 'Il sistema genera automaticamente una landing page pubblica con il tuo nome, logo e servizi. Condividila per attrarre nuovi clienti senza creare un sito da zero.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0"><item.icon className="w-6 h-6 text-brand-400" /></div>
                    <div><h3 className="font-display font-bold mb-1">{item.title}</h3><p className="text-white/60 text-sm">{item.description}</p></div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative self-center">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent-lime/10 to-brand-500/10 blur-3xl rounded-3xl" />
              <div className="relative card-glass p-8 rounded-3xl">
                <div className="text-center">
                  <div className="text-6xl md:text-7xl font-display font-bold text-gradient mb-4">10+</div>
                  <p className="text-xl text-white/80 mb-2">ore risparmiate a settimana</p>
                  <p className="text-white/60">in media dai nostri utenti</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="prezzi" className="relative section-padding">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Scegli il piano <span className="text-gradient">perfetto per te</span></motion.h2>
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm ${!billingAnnual ? 'text-white' : 'text-white/50'}`}>Mensile</span>
              <button onClick={() => setBillingAnnual(!billingAnnual)} className="relative w-16 h-8 rounded-full bg-white/10 p-1 transition-colors">
                <div className={`absolute top-1 w-6 h-6 rounded-full bg-accent-lime transition-transform ${billingAnnual ? 'translate-x-8' : 'translate-x-0'}`} />
              </button>
              <span className={`text-sm ${billingAnnual ? 'text-white' : 'text-white/50'}`}>Annuale</span>
              <span className="ml-2 text-xs bg-accent-lime/20 text-accent-lime px-3 py-1 rounded-full">Risparmia 2 mesi</span>
            </motion.div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {plans.map((plan, i) => (
              <motion.div key={i} variants={fadeInUp} className={`relative card-glass p-6 rounded-3xl flex flex-col ${plan.popular ? 'border-accent-lime/50 scale-105' : ''}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-lime text-slate-950 text-xs font-bold px-4 py-1 rounded-full">Più Popolare</div>}
                <h3 className="font-display text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-white/60 text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold">€{billingAnnual ? plan.priceAnnual : plan.priceMonthly.toFixed(2)}</span>
                  <span className="text-white/60">/{billingAnnual ? 'anno' : 'mese'}</span>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-accent-lime shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-center gap-2 mb-4 py-2 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-emerald-300 font-medium">14 giorni gratis — paghi solo dal 15° giorno</span>
                </div>
                <a href={getCheckoutUrl(plan.name)} className={`block w-full text-center mt-auto ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                  Prova gratis 14 giorni<br /> {plan.name}
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Nota costi licenza */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-8">
            <div className="card-glass p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 text-center max-w-3xl mx-auto">
              <p className="text-sm text-amber-200/80">
                <strong className="text-amber-200">💡 Nota:</strong> I prezzi indicati si riferiscono esclusivamente alla licenza software. 
                Hosting, dominio e servizi esterni sono a carico del cliente. 
                <a href="#faq" className="text-accent-lime hover:underline ml-1">Maggiori info nelle FAQ</a>
              </p>
            </div>
          </motion.div>

          {/* Avviso importante post-acquisto */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-6 max-w-3xl mx-auto">
            <div className="card-glass p-6 rounded-2xl border border-amber-500/30 bg-amber-500/5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <span className="text-xl">⚠️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-200 mb-2">Informazione importante sull&apos;attivazione</h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Dopo l&apos;acquisto della licenza, per procedere con l&apos;attivazione completa della piattaforma è necessario contattare il nostro supporto tecnico all&apos;indirizzo <a href="mailto:coachinghubinfo@gmail.com" className="text-accent-lime hover:underline">coachinghubinfo@gmail.com</a>. Il nostro team si occuperà della configurazione dell&apos;ambiente tecnico (hosting, dominio, installazione) e della personalizzazione iniziale secondo le tue esigenze. L&apos;attivazione della licenza è subordinata al completamento di questa procedura di configurazione assistita, come previsto dalle <button type="button" onClick={() => setActiveModal('termini')} className="text-accent-lime hover:underline">Condizioni di Servizio</button>.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center text-white/50 text-sm mt-8">
            Tutti i prezzi sono IVA inclusa. I primi 14 giorni sono gratuiti: il pagamento viene addebitato solo a partire dal 15° giorno. Se non soddisfa le tue aspettative, puoi annullare senza alcun costo.
            Coaching Hub è un software in abbonamento. L'acquisto include una licenza d'uso del plugin e l'accesso alle funzionalità descritte.
            Eventuale supporto fornito è limitato all'attivazione e all'utilizzo del software e non costituisce prestazione di servizi professionali personalizzati.
          </motion.p>
        </div>
      </section>

      {/* Contact Form - FORMSPREE */}
      <section id="contatti" className="relative section-padding">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-2xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Hai domande? <span className="text-gradient">Scrivici!</span></h2>
              <p className="text-lg text-white/60">Compila il modulo e ti risponderemo entro 24 ore.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="card-glass p-8 md:p-12 rounded-3xl">
              {formStatus === 'sent' ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-lime/20 flex items-center justify-center"><Check className="w-10 h-10 text-accent-lime" /></div>
                  <h3 className="font-display text-2xl font-bold mb-4">Messaggio Inviato!</h3>
                  <p className="text-white/60">Ti risponderemo il prima possibile.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium mb-2">Nome *</label><div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" /><input type="text" name="nome" required className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-accent-lime focus:outline-none" placeholder="Il tuo nome" /></div></div>
                    <div><label className="block text-sm font-medium mb-2">Cognome *</label><div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" /><input type="text" name="cognome" required className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-accent-lime focus:outline-none" placeholder="Il tuo cognome" /></div></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium mb-2">Email *</label><div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" /><input type="email" name="email" required className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-accent-lime focus:outline-none" placeholder="tua@email.com" /></div></div>
                    <div><label className="block text-sm font-medium mb-2">Telefono</label><div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" /><input type="tel" name="telefono" className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-accent-lime focus:outline-none" placeholder="+39 123 456 7890" /></div></div>
                  </div>
                  <div><label className="block text-sm font-medium mb-2">Messaggio *</label><textarea name="messaggio" required rows={5} className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-accent-lime focus:outline-none resize-none" placeholder="Scrivi qui il tuo messaggio..." /></div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="privacy" name="privacy" required className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5" />
                    <label htmlFor="privacy" className="text-sm text-white/70">Ho letto e accetto la <button type="button" onClick={() => setActiveModal('privacy')} className="text-accent-lime hover:underline">Privacy Policy</button> ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003. *</label>
                  </div>
                  {formStatus === 'error' && <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">Si è verificato un errore. Riprova o scrivi direttamente a coachinghubinfo@gmail.com</div>}
                  <button type="submit" disabled={formStatus === 'sending'} className="w-full btn-primary justify-center disabled:opacity-50">
                    {formStatus === 'sending' ? <><svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Invio in corso...</> : <><Send className="w-5 h-5 mr-2" />Invia Messaggio</>}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative section-padding">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Domande <span className="text-gradient">Frequenti</span></motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeInUp} className="card-glass rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="font-semibold pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-6 pb-6"><p className="text-white/70">{faq.a}</p></motion.div>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative section-padding">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="relative card-glass p-12 md:p-16 rounded-3xl text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-accent-mint/20" />
            <div className="relative">
              <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Pronto a lavorare <span className="text-gradient">in modo più smart?</span></motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-white/60 max-w-2xl mx-auto mb-8">Unisciti ai coach che hanno scelto di risparmiare tempo e offrire un&apos;esperienza premium ai loro clienti.</motion.p>
              <motion.a variants={fadeInUp} href="#prezzi" className="btn-primary inline-flex">Scegli il tuo piano <ArrowRight className="w-5 h-5 ml-2" /></motion.a>
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-white/60">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-lime" /><span>Supporto alla configurazione di base del software</span></div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-lime" /><span>14 giorni gratis, paghi dal 15° giorno</span></div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-lime" /><span>Supporto tecnico per l'attivazione della licenza</span></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <a href="#" className="flex items-center gap-3 mb-4"><CoachingHubLogo /><span className="font-display font-bold text-xl">Coaching Hub</span></a>
              <p className="text-white/60 max-w-sm">La piattaforma tutto-in-uno per personal trainer e coach online. Gestisci i tuoi clienti come un professionista.</p>
            </div>
            <div><h4 className="font-display font-bold mb-4">Link Utili</h4><ul className="space-y-3">{['Funzionalità', 'Prezzi', 'FAQ', 'Contatti'].map((link) => <li key={link}><a href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors">{link}</a></li>)}</ul></div>
            <div><h4 className="font-display font-bold mb-4">Contatti</h4><ul className="space-y-3 text-white/60"><li className="flex items-center gap-2"><Mail className="w-4 h-4" /><a href="mailto:coachinghubinfo@gmail.com" className="hover:text-white transition-colors">coachinghubinfo@gmail.com</a></li><li>📍 Torino, Italia</li></ul></div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <p>© 2026 Coaching Hub - Mauro Vallotti. Tutti i diritti riservati.<br />
            Coaching Hub è un software in abbonamento. Il supporto fornito riguarda<br/> esclusivamente l'utilizzo del sistema e delle funzionalità incluse nella licenza.</p>
            <div className="flex gap-6">
              <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => setActiveModal('cookie')} className="hover:text-white transition-colors">Cookie Policy</button>
              <button onClick={() => setActiveModal('termini')} className="hover:text-white transition-colors">Termini di Servizio</button>
              <button onClick={() => setShowCookieBanner(true)} className="hover:text-white transition-colors flex items-center gap-1">
                <Cookie className="w-3 h-3" />
                Preferenze Cookie
              </button>
            </div>
          </div>
        </div>
      </footer>
      {/* Analytics condizionale */}
      {cookiePreferences?.analytics === true && <Analytics />}
    </div>
  )
}

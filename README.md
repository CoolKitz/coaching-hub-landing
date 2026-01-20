# Coaching Hub Landing Page

Landing page moderna in Next.js + Tailwind CSS per promuovere Coaching Hub.

## 🚀 Come Installare

### Opzione 1: Deploy su Vercel (Consigliato - Gratuito)

1. **Crea account su Vercel** (se non ce l'hai)
   - Vai su https://vercel.com
   - Registrati con GitHub

2. **Carica il progetto su GitHub**
   ```bash
   # Nella cartella del progetto
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/tuousername/coaching-hub-landing.git
   git push -u origin main
   ```

3. **Collega a Vercel**
   - In Vercel, clicca "New Project"
   - Importa il repository da GitHub
   - Clicca "Deploy"
   - Fatto! Il sito sarà online su `tuoprogetto.vercel.app`

4. **Collega dominio personalizzato** (opzionale)
   - In Vercel → Settings → Domains
   - Aggiungi il tuo dominio (es. `coachinghub.maurovallotti.it`)
   - Segui le istruzioni per configurare DNS

### Opzione 2: Sviluppo Locale

1. **Requisiti**
   - Node.js 18+ installato
   - npm o yarn

2. **Installa dipendenze**
   ```bash
   cd coaching-hub-landing
   npm install
   ```

3. **Avvia in modalità sviluppo**
   ```bash
   npm run dev
   ```
   Apri http://localhost:3000

4. **Build per produzione**
   ```bash
   npm run build
   ```
   I file statici saranno in `/out`

### Opzione 3: Hosting Statico (Netlify, GitHub Pages, etc.)

1. **Genera i file statici**
   ```bash
   npm run build
   ```

2. **Carica la cartella `/out`** sul tuo hosting

---

## 📁 Struttura File

```
coaching-hub-landing/
├── app/
│   ├── layout.tsx      # Layout principale con font e metadata
│   ├── page.tsx        # Pagina principale (tutta la landing)
│   └── globals.css     # Stili globali e Tailwind
├── public/             # Immagini e file statici
├── next.config.js      # Configurazione Next.js
├── tailwind.config.js  # Configurazione Tailwind
├── package.json        # Dipendenze
└── README.md           # Questo file
```

---

## ✏️ Come Personalizzare

### Cambiare Colori

Modifica `tailwind.config.js`:

```javascript
colors: {
  brand: {
    500: '#1a65f5',  // Colore principale
    // ...
  },
  accent: {
    lime: '#c8ff00',   // Colore accento (CTA)
    mint: '#00d4aa',   // Colore secondario
  }
}
```

### Cambiare Testi

Tutti i testi sono in `app/page.tsx`. Cerca e modifica:
- `plans` - Piani e prezzi
- `features` - Funzionalità
- `faqs` - Domande frequenti

### Aggiungere Immagini

1. Metti le immagini in `/public`
2. Usa nel codice:
   ```jsx
   <img src="/nome-immagine.jpg" alt="..." />
   ```

### Cambiare Link

Cerca `href=` in `page.tsx` e modifica:
- `/acquista/` - Link al checkout
- `#contatti` - Link contatti
- Social links nel footer

---

## 🔗 Collegamenti Importanti

Assicurati che questi link puntino alle pagine corrette del tuo License Server:

| Link nella Landing | Dove Deve Puntare |
|-------------------|-------------------|
| `/acquista/?plan=starter` | Pagina checkout License Server |
| `/prezzi/` | Pagina prezzi (se separata) |
| `#contatti` | Form contatto o email |

---

## 📱 Responsive

La landing è già ottimizzata per:
- 📱 Mobile (< 768px)
- 📱 Tablet (768px - 1024px)
- 💻 Desktop (> 1024px)

---

## 🎨 Caratteristiche Design

- **Tema scuro** con gradienti e effetti glassmorphism
- **Animazioni** con Framer Motion (fade, slide, float)
- **Font**: Space Grotesk (titoli) + DM Sans (testo)
- **Colori accento**: Lime (#c8ff00) per CTA
- **Effetti**: Mesh gradient, noise overlay, blur

---

## 📦 Dipendenze

- `next` - Framework React
- `react` - UI Library
- `tailwindcss` - CSS Framework
- `framer-motion` - Animazioni
- `lucide-react` - Icone

---

## 🆘 Supporto

Per modifiche o problemi, contatta Mauro.

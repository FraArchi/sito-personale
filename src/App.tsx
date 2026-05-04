import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Code, Terminal, Brain, ArrowRight, X, Mail, ArrowRight as Github, ArrowRight as Linkedin } from 'lucide-react';
import './App.css';

interface CardData {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

const CARDS: CardData[] = [
  {
    id: "chi-sono",
    title: "Chi Sono",
    icon: Brain,
    content: (
      <>
        <h3>Francesco</h3>
        <p>
          Sono un developer e scrittore. Lavoro all'intersezione tra codice e narrativa, 
          esplorando come la tecnologia può raccontare storie e come le storie possono dare un senso alla tecnologia.
        </p>
        <p>
          Credo in interfacce pulite, architetture robuste e testi che vanno dritti al punto.
        </p>
      </>
    )
  },
  {
    id: "competenze",
    title: "Competenze",
    icon: Terminal,
    content: (
      <>
        <h3>Stack & Strumenti</h3>
        <ul>
          <li><ArrowRight size={18} /> <strong>Frontend:</strong> React, TypeScript, Vite, Tailwind CSS, Framer Motion</li>
          <li><ArrowRight size={18} /> <strong>Backend & Data:</strong> Python, Node.js, REST APIs, SQL</li>
          <li><ArrowRight size={18} /> <strong>AI & LLMs:</strong> Prompt Engineering, LangChain, RAG pipelines</li>
          <li><ArrowRight size={18} /> <strong>Soft Skills:</strong> Scrittura tecnica ed editoriale, Storytelling, UI/UX minimalista</li>
        </ul>
      </>
    )
  },
  {
    id: "progetti",
    title: "Progetti",
    icon: Code,
    content: (
      <>
        <h3>AI di Provincia</h3>
        <p>
          Un progetto editoriale e sperimentale che esplora l'impatto dell'intelligenza artificiale
          fuori dalle grandi bolle tech, nelle realtà locali e provinciali.
        </p>
        <p>
          <a href="#" target="_blank" rel="noreferrer">Visita il progetto &rarr;</a>
        </p>
        
        <br />
        
        <h3>Pipeline Dati Python</h3>
        <p>
          Sviluppo di tool interni per l'automazione della raccolta dati e analisi semantica
          utilizzando Python e modelli linguistici di grandi dimensioni.
        </p>
        <p>
          <a href="#" target="_blank" rel="noreferrer">Vedi repository &rarr;</a>
        </p>
      </>
    )
  },
  {
    id: "scrittura",
    title: "Scrittura",
    icon: PenTool,
    content: (
      <>
        <h3>Pensieri & Saggi</h3>
        <p>
          Scrivo regolarmente di tecnologia, impatto sociale dell'AI e programmazione.
          L'approccio è sempre editoriale: curato, diretto e senza rumore di fondo.
        </p>
        <ul>
          <li><ArrowRight size={18} /> <a href="#">Perché l'AI serve in provincia</a></li>
          <li><ArrowRight size={18} /> <a href="#">React vs Vanilla JS: quando fermarsi</a></li>
          <li><ArrowRight size={18} /> <a href="#">Il minimalismo come feature</a></li>
        </ul>
      </>
    )
  },
  {
    id: "contatti",
    title: "Contatti",
    icon: Mail,
    content: (
      <>
        <h3>Parliamone</h3>
        <p>
          Sempre aperto a nuove collaborazioni, progetti interessanti o semplicemente a una chiacchierata 
          su codice e scrittura.
        </p>
        <ul>
          <li><Mail size={18} /> <a href="mailto:ciao@example.com">ciao@example.com</a></li>
          <li><Linkedin size={18} /> <a href="#">LinkedIn</a></li>
          <li><Github size={18} /> <a href="#">GitHub</a></li>
        </ul>
      </>
    )
  }
];

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Translate vertical wheel scroll to horizontal scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only translate if we're not scrolling vertically already on a child (like in the expanded modal)
      if (selectedId) return;

      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [selectedId]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedId(null);
      }
      
      const container = scrollContainerRef.current;
      if (!container || selectedId) return;

      if (e.key === 'ArrowRight') {
        container.scrollBy({ left: 300, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        container.scrollBy({ left: -300, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId]);

  return (
    <>
      <div 
        className="app-container" 
        ref={scrollContainerRef}
      >
        <div className="scroll-content">
          {CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div 
                key={card.id}
                className="card-container"
                layoutId={`card-container-${card.id}`}
                onClick={() => setSelectedId(card.id)}
              >
                <motion.div 
                  className="card"
                  layoutId={`card-${card.id}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div className="card-number" layoutId={`number-${card.id}`}>
                    0{index + 1}
                  </motion.div>
                  <motion.h2 className="card-title" layoutId={`title-${card.id}`}>
                    {card.title}
                  </motion.h2>
                  <motion.div className="card-icon-bottom" layoutId={`icon-${card.id}`}>
                    <Icon size={48} strokeWidth={1} />
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <div className="expanded-overlay">
            <motion.div 
              className="expanded-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            />
            
            {CARDS.filter(c => c.id === selectedId).map(card => {
              return (
                <motion.div 
                  key={`expanded-${card.id}`}
                  className="expanded-card"
                  layoutId={`card-${card.id}`}
                >
                  <div className="expanded-header">
                    <motion.div>
                      <motion.div className="card-number" layoutId={`number-${card.id}`} style={{ marginBottom: '1rem' }}>
                        0{CARDS.findIndex(c => c.id === card.id) + 1}
                      </motion.div>
                      <motion.h2 className="expanded-title" layoutId={`title-${card.id}`}>
                        {card.title}
                      </motion.h2>
                    </motion.div>
                    
                    <button className="close-button" onClick={() => setSelectedId(null)}>
                      <X size={32} strokeWidth={1} />
                    </button>
                  </div>
                  
                  <motion.div 
                    className="expanded-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {card.content}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;

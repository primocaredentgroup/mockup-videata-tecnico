import { useState, useEffect, useRef } from 'react'
import './App.css'

type MediaItem = {
  id: string
  name: string
  type: 'image' | 'document'
  url?: string
}

type CronologiaBlock = {
  id: string
  blockNumber: string
  name: string
  completed: boolean
  media: MediaItem[]
}

const CRONOLOGIA: CronologiaBlock[] = [
  {
    id: 'phase1',
    blockNumber: '3',
    name: 'Prova montaggio',
    completed: true,
    media: [
      { id: 'p1-1', name: 'prova_montaggio.jpg', type: 'image', url: 'https://picsum.photos/800/601' },
      { id: 'p1-2', name: 'gig_gesso.jpg', type: 'image', url: 'https://picsum.photos/800/602' },
      { id: 'p1-3', name: 'dettaglio_mediana.pdf', type: 'document' },
    ],
  },
  {
    id: 'phase2',
    blockNumber: '2',
    name: 'Base vallo e Gig in gesso',
    completed: false,
    media: [
      { id: 'p2-1', name: 'foto.jpg', type: 'image', url: 'https://picsum.photos/800/600' },
      { id: 'p2-2', name: 'doc.pdf', type: 'document' },
    ],
  },
]

// Lista piatta di tutti i media per navigazione nel dialog
const ALL_MEDIA = CRONOLOGIA.flatMap((block) =>
  block.media.map((item) => ({ item, phaseName: block.name }))
)

function App() {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null)

  const openMediaDetail = (item: MediaItem) => {
    const index = ALL_MEDIA.findIndex((m) => m.item.id === item.id)
    setSelectedMediaIndex(index >= 0 ? index : null)
  }

  const closeMediaDetail = () => {
    setSelectedMediaIndex(null)
  }

  const goToPrev = () => {
    if (selectedMediaIndex !== null && selectedMediaIndex > 0) {
      setSelectedMediaIndex(selectedMediaIndex - 1)
    }
  }

  const goToNext = () => {
    if (selectedMediaIndex !== null && selectedMediaIndex < ALL_MEDIA.length - 1) {
      setSelectedMediaIndex(selectedMediaIndex + 1)
    }
  }

  const handleDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeMediaDetail()
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goToPrev()
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goToNext()
    }
  }

  const currentMedia = selectedMediaIndex !== null ? ALL_MEDIA[selectedMediaIndex] : null
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentMedia && dialogRef.current) {
      dialogRef.current.focus()
    }
  }, [currentMedia])

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">PRIMO LAB</div>
          <div className="search-bar">
            <input type="text" placeholder="Nuova ricerca" />
            <select>
              <option>ricerca per codice</option>
            </select>
          </div>
        </div>
        <div className="header-center">
          <div className="patient-info">
            <h2>RAFFAELE TANCREDI</h2>
            <div className="details-row">
              <span>Studio: Cellini DeS</span>
              <span>Medico: FRANCESCA GURRIERI</span>
            </div>
            <div className="details-row">
              <span>000091DCE Creata il 04/02/2026</span>
              <a href="#">Vedi prescrizione</a>
            </div>
            <p className="work-desc">PROTESI AVVITATA DEFINITIVA SU 6 IMPIANTI (D21)</p>
            <div className="details-row">
              <span>All on 6, A3.5, 1 elemento</span>
              <span>Impianto: -</span>
              <span>Bruxista: no</span>
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="payments-box">
            <h3>PAGAMENTI</h3>
            <p>Tot. 0,00 €</p>
          </div>
        </div>
      </header>

      <div className="main-layout">
        <main className="content">
          <div className="cronologia-header">
            <h2>CRONOLOGIA LAVORAZIONI</h2>
            <div className="cronologia-actions">
              <button className="icon-btn" title="Note globali">📝</button>
              <button className="icon-btn" title="Messaggi">💬 3</button>
            </div>
          </div>

          <div className="cronologia-list">
            {CRONOLOGIA.map((block) => (
              <div key={block.id} className="cronologia-block">
                <div className="block-header">
                  <span className="block-number">{block.blockNumber}</span>
                  <h3>{block.name}</h3>
                  <span className={`status-icon ${block.completed ? 'completed' : ''}`}>
                    {block.completed ? '✓' : '⚙'}
                  </span>
                </div>
                <div className="block-content">
                  <div className="timeline-col">
                    <div className="timeline-item">
                      <span className="icon">⚙</span>
                      <span className="date">12/02/2026 09:00</span>
                    </div>
                    <div className="timeline-item">
                      <span className="icon">📋</span>
                      <span className="date">04/02/2026 12:50</span>
                    </div>
                  </div>
                  <div className="info-col">
                    <div className="feedback-nota-col">
                      <div className="info-row feedback-row">
                        <span className="label">Feedback:</span>
                        <span className="value">Nessun feedback presente</span>
                        <span className="expand-icon">↗</span>
                        <span className="chevron">▼</span>
                      </div>
                      <div className="info-row nota-row">
                        <span className="label">Nota:</span>
                        <span className="value">
                          {block.id === 'phase1'
                            ? 'PROVA MONTAGGIO + GIG IN GESSO. HO SEGNATO NUOVA MEDIANA E FATTO FOTO....'
                            : 'Nessuna nota presente'}
                        </span>
                        <span className="expand-icon">↗</span>
                        <span className="chevron">▼</span>
                      </div>
                    </div>
                    <div className="media-col">
                      <div className={`media-box ${block.media.length > 0 ? 'has-media' : 'empty'}`}>
                        <div className="media-header">
                          <span className="media-label">Media</span>
                          <span className="media-count">
                            {block.media.length} {block.media.length === 1 ? 'allegato' : 'allegati'}
                          </span>
                        </div>
                        {block.media.length > 0 ? (
                          <div className="media-preview-grid">
                            {block.media.map((item) => (
                              <div
                                key={item.id}
                                className="media-thumb"
                                onClick={() => openMediaDetail(item)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && openMediaDetail(item)}
                              >
                                <div className="thumb-placeholder">
                                  {item.type === 'image' && item.url ? (
                                    <img src={item.url} alt={item.name} className="thumb-img" />
                                  ) : (
                                    <span className="thumb-icon">📄</span>
                                  )}
                                  <span className="thumb-label">{item.name}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="media-preview-placeholder">Nessun allegato</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Sidebar destra */}
        <aside className="sidebar">
          <div className="sidebar-tabs">
            <button className="tab">CHAT</button>
            <button className="tab active">PROGETTI</button>
            <button className="tab">ORDINI</button>
          </div>
          <div className="sidebar-content">
            <div className="project-card">
              <div className="project-header">
                <h4>Prova montaggio</h4>
                <span className="expand-arrow">▲</span>
              </div>
              <div className="project-details">
                <p>Progettazione - ALESSIO / BOSCIA</p>
                <p>05/02/2026 - P - Dente 21</p>
                <p>Plastica - A3.5 <span className="icon-3d">3D</span></p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Dialog dettaglio media */}
      {currentMedia && (
        <div
          className="media-dialog-overlay"
          onClick={closeMediaDetail}
          role="dialog"
          aria-modal="true"
          aria-labelledby="media-dialog-title"
        >
          <div
            ref={dialogRef}
            className="media-dialog"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleDialogKeyDown}
            tabIndex={0}
          >
            <div className="media-dialog-header">
              <div className="media-dialog-title-row">
                <h3 id="media-dialog-title">{currentMedia.item.name}</h3>
                <span className="media-dialog-counter">
                  {selectedMediaIndex! + 1} / {ALL_MEDIA.length}
                </span>
              </div>
              <button
                className="media-dialog-close"
                onClick={closeMediaDetail}
                aria-label="Chiudi"
              >
                ✕
              </button>
            </div>
            <div className="media-dialog-content">
              {currentMedia.item.type === 'image' && currentMedia.item.url ? (
                <img
                  src={currentMedia.item.url}
                  alt={currentMedia.item.name}
                  className="media-dialog-image"
                />
              ) : (
                <div className="media-dialog-document">
                  <span className="doc-icon">📄</span>
                  <p>{currentMedia.item.name}</p>
                  <p className="doc-type">Documento PDF</p>
                </div>
              )}
            </div>
            <div className="media-dialog-nav">
              <button
                className="media-dialog-nav-btn"
                onClick={goToPrev}
                disabled={selectedMediaIndex === 0}
                aria-label="Media precedente"
              >
                ‹ Precedente
              </button>
              <span className="media-dialog-phase">{currentMedia.phaseName}</span>
              <button
                className="media-dialog-nav-btn"
                onClick={goToNext}
                disabled={selectedMediaIndex === ALL_MEDIA.length - 1}
                aria-label="Media successiva"
              >
                Successiva ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

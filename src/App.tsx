import { useState } from 'react'
import './App.css'

type MediaItem = {
  id: string
  name: string
  type: 'image' | 'document'
  url?: string
}

const MEDIA_ITEMS: MediaItem[] = [
  { id: '1', name: 'foto.jpg', type: 'image', url: 'https://picsum.photos/800/600' },
  { id: '2', name: 'doc.pdf', type: 'document' },
]

function App() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)

  const openMediaDetail = (item: MediaItem) => {
    setSelectedMedia(item)
  }

  const closeMediaDetail = () => {
    setSelectedMedia(null)
  }

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
            {/* Blocco 1 - Prova montaggio */}
            <div className="cronologia-block">
              <div className="block-header">
                <span className="block-number">3</span>
                <h3>Prova montaggio</h3>
                <span className="status-icon completed">✓</span>
              </div>
              <div className="block-content">
                <div className="timeline-col">
                  <div className="timeline-item">
                    <span className="icon">▶</span>
                    <span className="icon">🖼</span>
                  </div>
                  <div className="timeline-item">
                    <span className="icon">📄</span>
                    <span className="date">09/02/2026 13:24</span>
                  </div>
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
                      <span className="value">PROVA MONTAGGIO + GIG IN GESSO. HO SEGNATO NUOVA MEDIANA E FATTO FOTO....</span>
                      <span className="expand-icon">↗</span>
                      <span className="chevron">▼</span>
                    </div>
                  </div>
                  <div className="media-col">
                    <div className="media-box empty">
                      <span className="media-label">Media</span>
                      <span className="media-count">0 allegati</span>
                      <div className="media-preview-placeholder">Nessun allegato</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blocco 2 - Base vallo e Gig in gesso (con allegato) */}
            <div className="cronologia-block">
              <div className="block-header">
                <span className="block-number">2</span>
                <h3>Base vallo e Gig in gesso</h3>
                <span className="status-icon">⚙</span>
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
                      <span className="value">Nessuna nota presente</span>
                      <span className="expand-icon">↗</span>
                      <span className="chevron">▼</span>
                    </div>
                  </div>
                  <div className="media-col">
                    <div className="media-box has-media">
                      <div className="media-header">
                        <span className="media-label">Media</span>
                        <span className="media-count">2 allegati</span>
                      </div>
                      <div className="media-preview-grid">
                        {MEDIA_ITEMS.map((item) => (
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      {selectedMedia && (
        <div
          className="media-dialog-overlay"
          onClick={closeMediaDetail}
          role="dialog"
          aria-modal="true"
          aria-labelledby="media-dialog-title"
        >
          <div
            className="media-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="media-dialog-header">
              <h3 id="media-dialog-title">{selectedMedia.name}</h3>
              <button
                className="media-dialog-close"
                onClick={closeMediaDetail}
                aria-label="Chiudi"
              >
                ✕
              </button>
            </div>
            <div className="media-dialog-content">
              {selectedMedia.type === 'image' && selectedMedia.url ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.name}
                  className="media-dialog-image"
                />
              ) : (
                <div className="media-dialog-document">
                  <span className="doc-icon">📄</span>
                  <p>{selectedMedia.name}</p>
                  <p className="doc-type">Documento PDF</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

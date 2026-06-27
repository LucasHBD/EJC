import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./contato.css";
import logo from "../../assets/EJC.png";

// Corrige o ícone padrão do Leaflet com Webpack/Vite
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// ── Dados da loja (edite aqui) ──
const LOJA = {
  nome: "EJC Presentear e Lindo",
  endereco: "R. Pedro Clementino, 378 - Tangara",
  cidade: "Tangará - RN, 59240-000",
  telefone: "(84) 99999-9999",
  email: "contato@ejc.com.br",
  instagram: "@ejc_presentes",
  horario: "Seg a Sex: 9h às 18h  |  Sáb: 9h às 13h",
  // Coordenadas de Natal/RN — substitua pelas coordenadas exatas da loja
  lat: -6.201629510515794,
  lng: -35.80203686293196,
};

export default function Contato() {
  return (
    <>
      <header>
        <div className="logo-header">
          <img src={logo} alt="Logo EJC" />
        </div>
        <nav>
          <a href="/">Início</a>
          <a href="/produtos">Produtos</a>
          <a href="/sobreNos">Sobre Nós</a>
          <a href="/contato" className="active">Contato</a>
        </nav>
      </header>

      <main className="contato-main">

        <div className="contato-titulo">
          <h1>Fale Conosco</h1>
        </div>

        <section className="contato-section">

          {/* ── Informações ── */}
          <div className="contato-info">

            <div className="info-bloco">
              <h2 className="info-bloco__titulo">Onde Estamos</h2>
              <p className="info-bloco__texto">{LOJA.endereco}</p>
              <p className="info-bloco__texto">{LOJA.cidade}</p>
            </div>

            <div className="info-divisor" />

            <div className="info-bloco">
              <h2 className="info-bloco__titulo">Horário de Funcionamento</h2>
              <p className="info-bloco__texto">{LOJA.horario}</p>
            </div>

            <div className="info-divisor" />

            <div className="info-bloco">
              <h2 className="info-bloco__titulo">Contato</h2>
              <div className="info-contato-lista">

                <a href={`tel:${LOJA.telefone}`} className="info-contato-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>{LOJA.telefone}</span>
                </a>

                <a href={`mailto:${LOJA.email}`} className="info-contato-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>{LOJA.email}</span>
                </a>

                <a
                  href={`https://instagram.com/${LOJA.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-contato-item"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                  <span>{LOJA.instagram}</span>
                </a>

              </div>
            </div>

          </div>

          {/* ── Mapa ── */}
          <div className="contato-mapa">
            <MapContainer
              center={[LOJA.lat, LOJA.lng]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[LOJA.lat, LOJA.lng]}>
                <Popup>
                  <strong>{LOJA.nome}</strong><br />
                  {LOJA.endereco}<br />
                  {LOJA.cidade}
                </Popup>
              </Marker>
            </MapContainer>
          </div>

        </section>
      </main>
    </>
  );
}
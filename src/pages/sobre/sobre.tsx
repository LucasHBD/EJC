import "./sobre.css";
import logo from "../../assets/EJC.png";
import face from "../../assets/Vector.png"
import zap from "../../assets/Group.png"
import insta from "../../assets/ri_instagram-fill.png"
import { Link } from "react-router-dom";

export default function SobreNos() {
  return (
    <>
      <header>
        <div className="logo-header">
          <img src={logo} alt="Logo EJC" />
        </div>
        <nav>
          <Link to="/">Início</Link>
          <Link to="/produtos">Produtos</Link>
          <Link to="/sobreNos">Sobre Nós</Link>
          <Link to="/contato">Contato</Link>
        </nav>
      </header>

      <main className="sobre-main">
        <section className="sobre-section">

          <div className="sobre-logo">
            <img src={logo} alt="EJC presentear e lindo" />
          </div>

          <div className="sobre-conteudo">
            <h1 className="sobre-titulo">Quem Somos</h1>

            <p className="sobre-texto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              diam nulla, fringilla nec purus ac, tempor ullamcorper odio.
              Maecenas vulputate euismod enim, quis fringilla felis viverra ac.
              In non interdum enim. Cras finibus mauris et quam rutrum aliquet.
              Pellentesque nec sollicitudin felis, non bibendum lacus.
            </p>

            <p className="sobre-texto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              diam nulla, fringilla nec purus ac, tempor ullamcorper odio.
              Maecenas vulputate euismod enim, quis fringilla felis viverra ac.
              In non interdum enim. Cras finibus mauris et quam rutrum aliquet.
              Pellentesque nec sollicitudin felis, non bibendum lacus.
            </p>
          </div>

        </section>
      </main>
      <footer>
                <div className='logo-texto'>
                    <div className="footer-logo">
                        <img src={logo} />
                    </div>
                    <div className='footer-texto'>
                        <p>Feitos com Amor<br />para transformar<br></br>
                        <span className="footer-slogan">Presentear é Lindo!</span>
                        </p>
                    </div>
                </div>

                <div className="footer-links">
                    <h3>Links Rápidos</h3>
                    <Link to="produtos">Produtos</Link>
                    <Link to="sobreNos">Sobre Nós</Link>
                    <Link to="contato">Contato</Link>
                </div>

                <div className="footer-localizacao">
                    <h3>Localização</h3>
                    <p>Rua Fulaninho, 400<br />Tangará RN<br />Centro</p>
                </div>

                <div className="footer-redes">
                    <h3>Redes Sociais</h3>
                    <div className="footer-icons">
                    <a href=""><img src={face}/></a>
                    <a href="https://www.instagram.com/ejc_presentes/"><img src={insta} /></a>
                    <a href="#"><img src={zap} /></a>
                    </div>
                </div>
            </footer>
    </>
  );
}
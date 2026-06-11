import './style.css'
import logo from "../../assets/EJC.png"
import kits from "../../assets/kits.png"
import papelaria from "../../assets/papelaria.png"
import decoracao from "../../assets/decoracao.png"
import casa from "../../assets/casa.png"
import artesanato from "../../assets/artesanato.png"
import produto from "../../assets/produto.png"
import face from "../../assets/Vector.png"
import zap from "../../assets/Group.png"
import insta from "../../assets/ri_instagram-fill.png"
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Home(){

    const [atual, setAtual] = useState(0)
    const visiveis = 5

    const produtos = [
        {img: produto, preco: "RS$ 25,00"},
        {img: produto, preco: "RS$ 25,00"},
        {img: produto, preco: "RS$ 25,00"},
        {img: produto, preco: "RS$ 25,00"},
        {img: produto, preco: "RS$ 25,00"},
        {img: produto, preco: "RS$ 25,00"},
        {img: produto, preco: "RS$ 25,00"},
    ]

    const anterior = () => setAtual(i => Math.max(i - 1, 0))
    const proximo = () => setAtual(i => Math.min(i + 1, produtos.length - visiveis))

    return(
        <>
            <header>
                <div className="logo-header">
                    <img src={logo}></img>
                </div>
                <nav>
                    <Link to="#">Início</Link>
                    <Link to="produtos">Produtos</Link>
                    <Link to="sobreNos">Sobre Nós</Link>
                    <Link to="contato">Contato</Link>
                </nav>
            </header>
            <main>
                <div className='banner'>
                    <div className="outdoor">
                        <div className="texto">
                            Tudo que<br></br> você precisa<br></br>
                            <span className="texto-bonito">está aqui</span>
                        </div>
                            <button><Link to="produtos">Ver Produtos</Link></button>
                    </div>
                    <div className="logo-outdoor">
                        <img src={logo}></img>
                    </div>
                </div>
                <div className="categorias">
                    <div className="titulo">
                        <h1>Categorias</h1>
                    </div>
                    <div className="categorias-card">
                        <div className="kits">
                            <img src={kits}></img>
                            <h1>Kits</h1>
                        </div>
                        <div className="decoracao">
                            <img src={decoracao}></img>
                            <h1>Decoração</h1>
                        </div>
                        <div className="papelaria">
                            <img src={papelaria}></img>
                            <h1>Papelaria</h1>
                        </div>
                        <div className="casa">
                            <img src={casa}></img>
                            <h1>Itens de casa</h1>
                        </div>
                        <div className="artesanato">
                            <img src={artesanato}></img>
                            <h1>Artesanato</h1>
                        </div>
                    </div>
                </div>
                <div className="promocoes">
                    <div className="titulo">
                        <h1>Promoções</h1>
                    </div>
                    <div className="carrossel">
                        <button className="carrossel-btn" onClick={anterior} disabled={atual === 0}>
                        &#8249;
                        </button>
                        <div className="carrossel-viewport">
                            <div className="carrossel-track" style={{ transform: `translateX(-${atual * (100 / visiveis)}%)` }}>
                                {produtos.map((p, i) => (
                                <div className="produto" key={i}>
                                    <img src={p.img} />
                                    <h1>{p.preco}</h1>
                                </div>
                                ))}
                            </div>
                        </div>
                        <button className="carrossel-btn" onClick={proximo} disabled={atual === produtos.length - visiveis}>
                        &#8250;
                        </button>
                    </div>
                </div>
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
    )
}

export default Home
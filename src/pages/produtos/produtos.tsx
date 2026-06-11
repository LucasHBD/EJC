import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import type { Produto } from "../../type";
import "./produtos.css";
import logo from "../../assets/EJC.png"
import face from "../../assets/Vector.png"
import zap from "../../assets/Group.png"
import insta from "../../assets/ri_instagram-fill.png"
import { Link } from "react-router-dom";

const CATEGORIAS = ["Kits", "Decoração", "Papelaria", "Itens de casa", "Artesanato"];

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <div className={`checkbox ${checked ? "checkbox--checked" : ""}`} onClick={onChange}>
      {checked && (
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path d="M1 3L3.5 5.5L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

interface ProductCardProps {
  produto: Produto;
}

function ProductCard({ produto }: ProductCardProps) {
  return (
    <div className="card">
      <div
        className="card__image"
        style={
          produto.imagem_url
            ? { backgroundImage: `url(${produto.imagem_url})` }
            : {}
        }
      >
        <div className="card__price">
          R$ {Number(produto.preco).toFixed(2).replace(".", ",")}
        </div>
      </div>
      <div className="card__info">
        <div className="card__name">{produto.nome}</div>
        <div className="card__category">{produto.categoria}</div>
        {produto.descricao && <p className="card__descricao">{produto.descricao}</p>}
      </div>
      <button className="card__btn">Ver Produto</button>
    </div>
  );
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProdutos() {
      setLoading(true);
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setErro("Erro ao carregar produtos.");
      } else {
        setProdutos(data as Produto[]);
      }
      setLoading(false);
    }

    fetchProdutos();
  }, []);

  const toggleCategoria = (cat: string) => {
    setSelecionados((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const produtosFiltrados =
    selecionados.length === 0
      ? produtos
      : produtos.filter((p) => selecionados.includes(p.categoria));

  return (
    <>
      <header>
        <div className="logo-header">
          {/* Substitua pelo caminho do seu logo */}
          <img src={logo} alt="Logo EJC" />
        </div>
        <nav>
          <a href="/">Início</a>
          <a href="/produtos" className="active">Produtos</a>
          <a href="/sobreNos">Sobre Nós</a>
          <a href="/contato">Contato</a>
        </nav>
      </header>

      <div className="produtos-page">
        <div className="produtos-page__titulo">
          <h1>Todos os Produtos</h1>
        </div>

        <div className="produtos-page__content">
          <aside className="sidebar">
            <h2 className="sidebar__titulo">Categorias</h2>
            {CATEGORIAS.map((cat) => (
              <div key={cat} className="filter-item" onClick={() => toggleCategoria(cat)}>
                <Checkbox
                  checked={selecionados.includes(cat)}
                  onChange={() => toggleCategoria(cat)}
                />
                <span className={`filter-item__label ${selecionados.includes(cat) ? "filter-item__label--active" : ""}`}>
                  {cat}
                </span>
              </div>
            ))}
          </aside>

          <main>
            {loading && <p className="grid__feedback">Carregando produtos...</p>}
            {erro && <p className="grid__feedback grid__feedback--erro">{erro}</p>}
            {!loading && !erro && (
              <div className="grid">
                {produtosFiltrados.length > 0 ? (
                  produtosFiltrados.map((produto) => (
                    <ProductCard key={produto.id} produto={produto} />
                  ))
                ) : (
                  <p className="grid__empty">Nenhum produto encontrado.</p>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
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
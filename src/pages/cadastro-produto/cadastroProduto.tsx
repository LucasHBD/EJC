import { type ChangeEvent, type FormEvent, useState } from "react";
import { supabase } from "../../supabase";
import type { NovoProduto } from "../../type";
import "./cadastroProduto.css";

const CATEGORIAS = ["Kits", "Decoração", "Papelaria", "Itens de casa", "Artesanato"];

type FormState = {
  nome: string;
  preco: string;
  categoria: string;
  descricao: string;
};

const FORM_INICIAL: FormState = {
  nome: "",
  preco: "",
  categoria: "",
  descricao: "",
};

export default function CadastroProduto() {
  const [form, setForm] = useState<FormState>(FORM_INICIAL);
  const [imagem, setImagem] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sucesso, setSucesso] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSucesso(false);
    setErro(null);
  };

  const handleImagem = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagem(file);
    setPreview(URL.createObjectURL(file));
    setSucesso(false);
    setErro(null);
  };

  const handleRemoverImagem = () => {
    setImagem(null);
    setPreview(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.nome || !form.preco || !form.categoria) {
      setErro("Preencha os campos obrigatórios: nome, preço e categoria.");
      return;
    }

    setLoading(true);
    setErro(null);

    let imagem_url: string | null = null;

    if (imagem) {
      const ext = imagem.name.split(".").pop();
      const nomeArquivo = `${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("produtos-imagens")
        .upload(nomeArquivo, imagem, { upsert: false });

      if (uploadError) {
        setErro("Erro ao fazer upload da imagem. Tente novamente.");
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("produtos-imagens")
        .getPublicUrl(nomeArquivo);

      imagem_url = urlData.publicUrl;
    }

    const novoProduto: NovoProduto = {
      nome: form.nome,
      preco: parseFloat(form.preco),
      categoria: form.categoria,
      imagem_url,
      descricao: form.descricao || null,
    };

    const { error } = await supabase.from("produtos").insert([novoProduto]);

    if (error) {
      setErro("Erro ao cadastrar produto. Tente novamente.");
    } else {
      setSucesso(true);
      setForm(FORM_INICIAL);
      setImagem(null);
      setPreview(null);
    }

    setLoading(false);
  };

  return (
    <>
      <header>
        <div className="logo-header">
          <img src="/assets/Vector.png" alt="Logo EJC" />
        </div>
        <nav>
          <a href="/">Início</a>
          <a href="/produtos">Produtos</a>
          <a href="/sobre">Sobre Nós</a>
          <a href="/contato">Contato</a>
        </nav>
      </header>

      <div className="cadastro-page">
        <div className="cadastro-page__titulo">
          <h1>Cadastrar Produto</h1>
        </div>

        <form className="cadastro-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label className="form-label">
              Nome <span className="form-obrigatorio">*</span>
            </label>
            <input
              className="form-input"
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Ex: Kit Presente Especial"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Preço (R$) <span className="form-obrigatorio">*</span>
              </label>
              <input
                className="form-input"
                type="number"
                name="preco"
                value={form.preco}
                onChange={handleChange}
                placeholder="0,00"
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Categoria <span className="form-obrigatorio">*</span>
              </label>
              <select
                className="form-input form-select"
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                {CATEGORIAS.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Descrição</label>
            <textarea
              className="form-input form-textarea"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              placeholder="Descreva o produto..."
              rows={3}
            />
          </div>

          {/* ── Upload de imagem ── */}
          <div className="form-group">
            <label className="form-label">Imagem do Produto</label>

            {preview ? (
              <div className="upload-preview">
                <img src={preview} alt="Preview" className="upload-preview__img" />
                <button
                  type="button"
                  className="upload-preview__remover"
                  onClick={handleRemoverImagem}
                >
                  Remover imagem
                </button>
              </div>
            ) : (
              <label className="upload-area">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagem}
                  className="upload-area__input"
                />
                <div className="upload-area__conteudo">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="upload-area__texto">Clique para selecionar</span>
                  <span className="upload-area__subtexto">PNG, JPG ou WEBP</span>
                </div>
              </label>
            )}
          </div>

          {erro && <p className="form-mensagem form-mensagem--erro">{erro}</p>}
          {sucesso && <p className="form-mensagem form-mensagem--sucesso">Produto cadastrado com sucesso!</p>}

          <button className="form-btn" type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar Produto"}
          </button>

        </form>
      </div>
    </>
  );
}
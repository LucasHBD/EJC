export interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  imagem_url: string | null;
  descricao: string | null;
  created_at: string;
}

export type NovoProduto = Omit<Produto, "id" | "created_at">;
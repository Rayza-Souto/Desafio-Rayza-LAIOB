import { useState, useRef } from 'react'
import './App.css'

function App() {

  //definindo o estado inicial dos produtos
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const nomeRef = useRef();
  const precoRef = useRef();
  const descricaoRef = useRef();

  //função para listar todos os produtos
  const listarProdutos = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL);
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      setMensagem('Erro ao listar produtos');
    }
  };

  //função para buscar um produto pelo ID
  const buscarProdutoPorId = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Produto não encontrado');
      }
      const data = await response.json();
      setProdutoSelecionado(data);
      setMensagem('');
    } catch (error) {
      console.error(`Erro ao buscar produto ${id}:`, error);
      setMensagem(`Erro ao buscar produto ${id}`);
    }
  };

  //função para criar um novo produto
  const criarProduto = async (produto) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto),
      });
      if (!response.ok) {
        throw new Error('Erro ao criar produto');
      }
      const data = await response.json();
      setMensagem('Produto criado com sucesso');
      listarProdutos();
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      setMensagem('Erro ao criar produto');
    }
  };

  //função para atualizar um produto existente
  const atualizarProduto = async (id, produto) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar produto');
      }
      const data = await response.json();
      setMensagem('Produto atualizado com sucesso');
      listarProdutos();
    } catch (error) {
      console.error(`Erro ao atualizar produto ${id}:`, error);
      setMensagem(`Erro ao atualizar produto ${id}`);
    }
  };

  //função para deletar um produto
  const deletarProduto = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar produto');
      }
      setMensagem('Produto deletado com sucesso');
      listarProdutos();
    } catch (error) {
      console.error(`Erro ao deletar produto ${id}:`, error);
      setMensagem(`Erro ao deletar produto ${id}`);
    }
  };

  return (
    <div className="App">
      <h1>Gerenciamento de Produtos</h1>

      <button onClick={listarProdutos}>Listar Produtos</button>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - ${produto.preco}
            <button onClick={() => buscarProdutoPorId(produto.id)}>Ver Detalhes</button>
            <button onClick={() => deletarProduto(produto.id)}>Deletar</button>
          </li>
        ))}
      </ul>

      {produtoSelecionado && (
        <div>
          <h2>Detalhes do Produto</h2>
          <p>Nome: {produtoSelecionado.nome}</p>
          <p>Preço: ${produtoSelecionado.preco}</p>
          <p>Descrição: {produtoSelecionado.descricao}</p>
          <button onClick={() => setProdutoSelecionado(null)}>Fechar</button>
        </div>
      )}

      <h2>Criar/Atualizar Produto</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const produto = {
            nome: nomeRef.current.value,
            preco: parseFloat(precoRef.current.value),
            descricao: descricaoRef.current.value,
          };
          if (produtoSelecionado) {
            atualizarProduto(produtoSelecionado.id, produto);
          } else {
            criarProduto(produto);
          }
          nomeRef.current.value = '';
          precoRef.current.value = '';
          descricaoRef.current.value = '';
          setProdutoSelecionado(null);
        }}
      >
        <input type="text" placeholder="Nome" ref={nomeRef} required />
        <input type="number" placeholder="Preço" ref={precoRef} required />
        <input type="text" placeholder="Descrição" ref={descricaoRef} required />
        <button type="submit">{produtoSelecionado ? 'Atualizar' : 'Criar'} Produto</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );  

}

export default App

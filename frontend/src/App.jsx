import { useState, useRef } from 'react'
import './App.css'

import {
  getProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto
} from './Service/Api.jsx';

function App() {

  //definindo o estado inicial dos produtos
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const nomeRef = useRef();
  const precoRef = useRef();
  const quantidadeRef = useRef();
  const descricaoRef = useRef();

  //função para listar todos os produtos
  const listarProdutos = async () => {
    try {
      const data = await getProdutos();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      setMensagem('Erro ao listar produtos');
    }
  };

  //função para buscar um produto pelo ID
  const buscarProdutoPorId = async (id) => {
    try {
      const data = await getProdutoById(id);
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
      const novoProduto = await createProduto(produto);
      setProdutos(prev => [...prev, novoProduto]);
      setMensagem('Produto criado com sucesso');
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      setMensagem('Erro ao criar produto');
    }
  };

  //função para atualizar um produto existente
  const atualizarProduto = async (id, produto) => {
    try {
      const produtoAtualizado = await updateProduto(id, produto);
      setProdutos(prev => prev.map(p => p.id === id ? produtoAtualizado : p));
      setMensagem('Produto atualizado com sucesso');
    } catch (error) {
      console.error(`Erro ao atualizar produto ${id}:`, error);
      setMensagem(`Erro ao atualizar produto ${id}`);
    }
  };

  //função para deletar um produto
  const deletarProduto = async (id) => {
    try {
      await deleteProduto(id);
      setProdutos(prev => prev.filter(p => p.id !== id));
      setMensagem('Produto deletado com sucesso');
      if (produtoSelecionado?.id === id) setProdutoSelecionado(null); 
    } catch (error) {
      console.error(`Erro ao deletar produto ${id}:`, error);
      setMensagem(`Erro ao deletar produto ${id}`);
    }
  };

  //submit do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const produto = {
      nome: nomeRef.current.value,
      preco: parseFloat(precoRef.current.value),
      quantidade: parseInt(quantidadeRef.current.value),
      descricao: descricaoRef.current.value,
    };
    if (produtoSelecionado) {
      atualizarProduto(produtoSelecionado.id, produto);
    } else {
      criarProduto(produto);
    }

    //limpar formulário
    nomeRef.current.value = '';
    precoRef.current.value = '';
    quantidadeRef.current.value = '';
    descricaoRef.current.value = '';
    setProdutoSelecionado(null);
  };


  return (
    <div className="App">
      <h1>Gerenciamento de Produtos</h1>

      <button onClick={listarProdutos}>Listar Produtos</button>
      <ul>
        {console.log('Produtos antes do map:', produtos)}
        {produtos.map(produto => (
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
          <p>Quantidade: ${produtoSelecionado.quantidade}</p>
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
            quantidade: parseInt(quantidadeRef.current.value),
            descricao: descricaoRef.current.value,
          };
          if (produtoSelecionado) {
            atualizarProduto(produtoSelecionado.id, produto);
          } else {
            criarProduto(produto);
          }
          nomeRef.current.value = '';
          precoRef.current.value = '';
          quantidadeRef.current.value = '';
          descricaoRef.current.value = '';
          setProdutoSelecionado(null);
        }}
      >
        <input type="text" placeholder="Nome" ref={nomeRef} required />
        <input type="number" placeholder="Preço" ref={precoRef} required />
        <input type="number" placeholder="Quantidade" ref={quantidadeRef} required />
        <input type="text" placeholder="Descrição" ref={descricaoRef} required />
        <button type="submit">{produtoSelecionado ? 'Atualizar' : 'Criar'} Produto</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );

}

export default App

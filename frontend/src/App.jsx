import { useState, useRef, useEffect } from 'react'
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
  const [mostrarLista, setMostrarLista] = useState(false);

  const nomeRef = useRef();
  const precoRef = useRef();
  const quantidadeRef = useRef();
  const descricaoRef = useRef();

  //definindo uma função para apagar os campos do formulário
  const limparFormulario = () => {
    nomeRef.current.value = '';
    precoRef.current.value = '';
    quantidadeRef.current.value = '';
    descricaoRef.current.value = '';
  };

  const mostrarMensagem = (msg, tempo = 10000) => {
    setMensagem(msg);
    setTimeout(() => setMensagem(''), tempo);
  }

  //efetuar o preenchimento dos campos do formulário ao selecionar um produto
  useEffect(() => {
    if (produtoSelecionado) {
      nomeRef.current.value = produtoSelecionado.nome;
      precoRef.current.value = produtoSelecionado.preco;
      quantidadeRef.current.value = produtoSelecionado.quantidade;
      descricaoRef.current.value = produtoSelecionado.descricao;
    } else {
      limparFormulario();
    }

  }, [produtoSelecionado]);


  //função para listar todos os produtos
  const listarProdutos = async () => {
    try {
      const data = await getProdutos();
      setProdutos(data);
      mostrarMensagem(data.length === 0 ? 'Nenhum produto encontrado' : '');
    } catch (error) {
      mostrarMensagem('Erro ao listar produtos');
    }
  };

  //função para buscar um produto pelo ID
  const buscarProdutoPorId = async (id) => {
    try {
      const data = await getProdutoById(id);
      setProdutoSelecionado(data);
      mostrarMensagem('');
    } catch (error) {
      mostrarMensagem(`Erro ao buscar produto ${id}`);
    }
  };

  //função para criar um novo produto
  const criarProduto = async (produto) => {
    try {
      const novoProduto = await createProduto(produto);
      setProdutos(prev => [...prev, novoProduto]);
      mostrarMensagem('Produto criado com sucesso');
      setProdutoSelecionado(null);
    } catch (error) {
      mostrarMensagem('Erro ao criar produto');
    }
  };

  //função para atualizar um produto existente
  const atualizarProduto = async (id, produto) => {
    try {
      const produtoAtualizado = await updateProduto(id, produto);
      setProdutos(prev => prev.map(p => p.id === id ? produtoAtualizado : p));
      //vai atualizar a descrição do produto assim que a atualização for feita
      if (produtoSelecionado?.id === id) { setProdutoSelecionado(produtoAtualizado) };
      setProdutoSelecionado(null);
      mostrarMensagem('Produto atualizado com sucesso');

    } catch (error) {
      mostrarMensagem(`Erro ao atualizar produto ${id}`);
    }
  };

  //função para deletar um produto
  const deletarProduto = async (id) => {
    try {
      await deleteProduto(id);
      setProdutos(prev => prev.filter(p => p.id !== id));
      mostrarMensagem('Produto deletado com sucesso');
      if (produtoSelecionado?.id === id) setProdutoSelecionado(null);
    } catch (error) {
      mostrarMensagem(`Erro ao deletar produto ${id}`);
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
  };


  return (
    <div className="container-fluid">
      <h1>Gerenciamento de Produtos</h1><br />

      <button onClick={() => {
        if (!mostrarLista) listarProdutos();
        setMostrarLista(prev => !prev);
      }} className="btn btn-primary" > {mostrarLista ? 'Ocultar' : 'Mostrar'} Produtos</button>

      {mostrarLista && (
        <ul>
          {produtos.map(produto => (
            <li key={produto.id}>
              {produto.nome} - ${produto.preco}
              <button className="btn btn-info" onClick={() => buscarProdutoPorId(produto.id)}>Ver Detalhes</button>
              <button className="btn btn-danger" onClick={() => deletarProduto(produto.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      )}

      {produtoSelecionado && (
        <div>
          <h2>Detalhes do Produto</h2>
          <p>Nome: {produtoSelecionado.nome}</p>
          <p>Preço: ${produtoSelecionado.preco}</p>
          <p>Quantidade: ${produtoSelecionado.quantidade}</p>
          <p>Descrição: {produtoSelecionado.descricao}</p>
          <button className="btn btn-success" onClick={() => setProdutoSelecionado(null)}>Fechar</button>
        </div>
      )}

      <h2 className='AtualizaCriaProd'>{produtoSelecionado ? 'Atualizar Produto' : 'Criar Produto'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" ref={nomeRef} required />
        <input type="number" step="0.01" placeholder="Preço" ref={precoRef} required />
        <input type="number" placeholder="Quantidade" ref={quantidadeRef} required />
        <input type="text" placeholder="Descrição" ref={descricaoRef} required />
        <button type="submit" className="btn btn-success">{produtoSelecionado ? 'Atualizar' : 'Criar'} Produto</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );

}

export default App

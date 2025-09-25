import { useState, useRef } from 'react'
import './App.css'

function App() {

  // Estado para armazenar a lista de produtos
  const [products, setProducts] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');

  // Referência para o próximo ID do produto
  const nextID = useRef(1);

  // Função para adicionar um novo produto
  const addProduct = (e) => {
    e.preventDefault();

    if (!nome || !preco || !quantidade || !descricao) return;

    // Adiciona o novo produto à lista
    setProducts([...products, { id: nextID.current, nome, preco, quantidade, descricao }]);
    nextID.current += 1; // Incrementa o ID para o próximo produto
    setNome('');
    setPreco('');
    setQuantidade('');
    setDescricao('');
  };

  const removeProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Controle de Produtos</h1>

      <form onSubmit={addProduct}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.nome} - R$ {product.preco} - Quantidade: {product.quantidade} - {product.descricao}
            <button onClick={() => removeProduct(product.id)}>Remover</button>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default App

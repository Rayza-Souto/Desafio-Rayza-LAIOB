import React, { useState } from 'react';

function EditableProduct({ product, onUpdate, onRemove }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedProduct);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  if (isEditing) {
    return (
      <div>
        <input name="nome" value={editedProduct.nome} onChange={handleChange} />
        <input name="preco" type="number" value={editedProduct.preco} onChange={handleChange} />
        <input name="quantidade" type="number" value={editedProduct.quantidade} onChange={handleChange} />
        <input name="descricao" value={editedProduct.descricao} onChange={handleChange} />
        <button onClick={handleSave}>Salvar</button>
        <button onClick={() => setIsEditing(false)}>Cancelar</button>
      </div>
    );
  }

  return (
    <div>
      {product.nome} - R$ {product.preco} - Quantidade: {product.quantidade} - {product.descricao}
      <button onClick={handleEdit}>Editar</button>
      <button onClick={onRemove}>Remover</button>
    </div>
  );
}

export default EditableProduct
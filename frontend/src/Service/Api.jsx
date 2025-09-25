import axios from "axios";

//importando a variável de ambiente para a URL da API
const apiUrl = import.meta.env.VITE_API_URL;

//função para listar todos os produtos
export const getProdutos = async () => {
    try {
        const response = await axios.get(apiUrl);
        if (!response.data || response.data.length === 0) {
            return [];
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        throw error;
    }

};

//função para buscar um produto pelo ID
export const getProdutoById = async (id) => {
    try {
        const response = await axios.get(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar produto ${id}:`, error);
        throw error;
    }
};

//função para criar um novo produto
export const createProduto = async (produto) => {
    try {
        const response = await axios.post(apiUrl, produto);
        return response.data; // retorna o produto criado com ID
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        throw error;
    }
};

//função para atualizar um produto existente
export const updateProduto = async (id, produto) => {
    try {
        const response = await axios.put(`${apiUrl}/${id}`, produto);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar produto ${id}:`, error);
        throw error;
    }
};

//função para deletar um produto
export const deleteProduto = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar produto ${id}:`, error);
        throw error;
    }
};
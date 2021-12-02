import axios from '../../helper/axios'
const state = {
    products: [],
    product: null
}
const mutations = {
    GET_PRODUCTS: (state, payload) => {
        state.products = payload;
    },
    SET_PRODUCT: (state, product) => {
        state.product = product;
    },
    CREATE_PRODUCT: (state, form) => {
        state.products.push(form);
    },
    UPDATE_PRODUCT: (state, id, product) => {
        const index = state.products.findIndex(pro => pro._id === id);
        state.products[index] = product;
    },
    DELETE_PRODUCT: (state, id) => {
        const index = state.products.findIndex(pro => pro.id === id);
        state.products.splice(index, 1)
    }
}

const actions = {
    async getAllProducts({commit}) {
        const res = await axios.get(`/product/`);
        console.log(res);
        commit('GET_PRODUCTS', res.data);
    },

    async getProductById({commit}, productId) {
        await axios.get(`/product/${productId}`).then((response) => {
            commit('SET_PRODUCT', response.data);
        })

    },

    async createProduct({commit}, form) {
        await axios.post(`/product/create`, form).then((response) => {
            commit('CREATE_PRODUCT',response.data);
        }).catch((error) => { console.error(error) })
    },

    async updateProduct({commit}, id, form) {
        await axios.patch(`/product/${id}`, form).then((response) => {
            commit('UPDATE_PRODUCT', response.data);
        }).catch((error) => { console.error(error) })
    },
    
    async deleteProduct({commit},id) {
        await axios.delete(`/product/${id}`)
        .then(() => {
            commit('DELETE_PRODUCT', id);
        })
    }
}

const getters = {
    products: state => state.products,
    product: state => state.product,
}
export const products = {
    state,
    mutations,
    actions,
    getters
}
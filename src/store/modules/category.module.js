import axios from '../../helper/axios'
const state = {
    categories: [],
    category: null
}
const mutations = {
    GET_CATEGORIES: (state, payload) => {
        state.categories = payload;
    },
    SET_CATEGORY: (state, category) => {
        state.category = category;
    },
    CREATE_CATEGORY: (state, form) => {
        state.categories.push(form);
    },
    UPDATE_CATEGORY: (state, id, category) => {
        const index = state.categories.findIndex(cat => cat._id === id);
        state.categories[index] = category;
    },
    DELETE_CATEGORY: (state, id) => {
        const index = state.categories.findIndex(cat => cat.id === id);
        state.categories.splice(index, 1)
    }
}

const actions = {
    async getAllCategories({commit}) {
        const res = await axios.get(`/category/`);
        console.log(res);
        commit('GET_CATEGORIES', res.data);
    },

    async getCategoryById({commit}, categoryId) {
        await axios.get(`/category/${categoryId}`).then((response) => {
            commit('SET_CATEGORY', response.data);
        })

    },

    async createCategory({commit}, form) {
        await axios.post(`/category/create`, form).then((response) => {
            commit('CREATE_CATEGORY',response.data);
        }).catch((error) => { console.error(error) })
    },

    async updateCategory({commit}, id, form) {
        await axios.patch(`/category/${id}`, form).then((response) => {
            commit('UPDATE_CATEGORY', response.data);
        }).catch((error) => { console.error(error) })
    },
    
    async deleteCategory({commit},id) {
        await axios.delete(`/category/${id}`)
        .then(() => {
            commit('DELETE_CATEGORY', id);
        })
    }
}

const getters = {
    categories: state => state.categories,
    category: state => state.category,
}
export const category = {
    state,
    mutations,
    actions,
    getters
}
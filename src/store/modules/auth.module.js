// import axios from "axios";
import axios from "../../helper/axios";

const state = {
    status: {
        loggedIn: Boolean
    },
    isLoggedIn: false
};

const mutations = {
    initAuthState(state) {
        state.user = JSON.parse(localStorage.getItem("user"));
        state.status.loggedIn = !!state.user;
        state.isLoggedIn = false;
    },
    login(state, user) {
        state.status.loggedIn = true;
        state.user = user;
        state.isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(user));
    },
    logout(state) {
        state.status.loggedIn = false;
        state.isLoggedIn = false;
        state.user = null;
        localStorage.removeItem("user");
    },
    clearLoginStatus(state) {
        state.status.loggedIn = false;
    },
    register: (state, user) => {
        state.user.push(user);
    },
};

const actions = {
    LOGIN: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            axios
                .post(`/admin/signin`, payload)
                .then(({ data, status }) => {
                    if (status === 200 && data.token) {
                        resolve(true);
                        commit('login', data)
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    REGISTER: ({ commit }, { firstName, lastName, email, password }) => {
        return new Promise((resolve, reject) => {
            axios
                .post(`/admin/signup`, {
                    firstName,
                    lastName,
                    email,
                    password
                })
                .then(({ data, status }) => {
                    if (status === 201) {
                        resolve(true);
                        commit('register', data)
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

};

const getters = {
    userLoggedIn(state) {
        return state.status.loggedIn;
    },
    loggedInUser(state) {
        return state.isLoggedIn;
    },
    user(state) {
        return state.user;
    }
};

export const auth = {
    state,
    mutations,
    actions,
    getters
};
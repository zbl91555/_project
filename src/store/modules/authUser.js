import token from '../../common/token'

// initial state
const state = {
    authorization : false,
    token_expire : null,
}

// getters
const getters = {
    // checkoutStatus: state => state.checkoutStatus,
    //
    // cartProducts: (state, getters, rootState) => {
    //     return state.added.map(({ id, quantity }) => {
    //         const product = rootState.products.all.find(product => product.id === id)
    //         return {
    //             title: product.title,
    //             price: product.price,
    //             quantity
    //         }
    //     })
    // },
    //
    // cartTotalPrice: (state, getters) => {
    //     return getters.cartProducts.reduce((total, product) => {
    //         return total + product.price * product.quantity
    //     }, 0)
    // }
}

// actions
const actions = {
    setAuthUser({commit}){
        commit('setAuthUser')
    },
    unsetAuthUser({commit}){
        commit('unsetAuthUser')
    }
}

// mutations
const mutations = {
    //修改vuex中用户的登录状态
    setAuthUser(state){
        //设置用户的登录状态
        state.authorization = true;
        //获取保存到localStorage中的数据expires_in
        state.token_expire = token.getLocalItem('expires_in');
    },
    unsetAuthUser(state){
        state.AuthUser.authorization = false;
        state.AuthUser.token_expire = null;
        token.removeToken();
        token.removeRefreshToken();
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
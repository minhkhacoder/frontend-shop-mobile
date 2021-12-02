import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AllProduct from '../views/AllProduct.vue'
import AddProduct from '../views/AddProduct.vue'
import EditProduct from '../views/EditProduct.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import AddCategory from '../components/AddCategory.vue'
import EditCategory from '../components/EditCategory.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/all-product',
    name: 'all-product',
    component: AllProduct,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/add-product',
    name: 'add-product',
    component: AddProduct
  },
  {
    path: '/product/:id',
    name: 'product',
    component: Product
  },
  {
    path: '/edit-product/:id',
    name: 'edit-product',
    component: EditProduct
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/category/add-category',
    name: 'add-category',
    component: AddCategory
  },
  {
    path: '/category/edit-category/:id',
    name: 'edit-category',
    component: EditCategory
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters.userLoggedIn;
  if (authRequired && !loggedIn) {
      next("/login");
  } else {
      next();
  }
});

export default router

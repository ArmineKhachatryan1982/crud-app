import { createRouter, createWebHistory } from  "vue-router";

import productIndex from '../components/products/Index.vue'
 import productForm from '../components/products/Form.vue';




import notFound from '../components/notFound.vue'
const routes = [
    {
        path:'/',
        name:'products.index',
        component:productIndex
    },
    {
        path:'/products/create',
        name:'products.create',
        component:productForm
    },
    {
        path:'/products/:id/edit',
        name:'products.edit',
        component:productForm
    },
    {
        path:'/:pathMatch(.*)*',
        name:'notfound',
        component: notFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router

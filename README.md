<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

-   [Simple, fast routing engine](https://laravel.com/docs/routing).
-   [Powerful dependency injection container](https://laravel.com/docs/container).
-   Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
-   Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
-   Database agnostic [schema migrations](https://laravel.com/docs/migrations).
-   [Robust background job processing](https://laravel.com/docs/queues).
-   [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

-   **[Vehikl](https://vehikl.com/)**
-   **[Tighten Co.](https://tighten.co)**
-   **[WebReinvent](https://webreinvent.com/)**
-   **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
-   **[64 Robots](https://64robots.com)**
-   **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
-   **[Cyber-Duck](https://cyber-duck.co.uk)**
-   **[DevSquad](https://devsquad.com/hire-laravel-developers)**
-   **[Jump24](https://jump24.co.uk)**
-   **[Redberry](https://redberry.international/laravel/)**
-   **[Active Logic](https://activelogic.com)**
-   **[byte5](https://byte5.de)**
-   **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

https://www.youtube.com/watch?v=SjeYhB5O45Q&t=3002s

32. to save file we use intervention image
    https://intervention.io/

    https://image.intervention.io/v3/introduction/frameworks
    and run in terminal
    composer require intervention/image-laravel

    php artisan vendor:publish --provider="Intervention\Image\Laravel\ServiceProvider"

    and incontroller we include
    use Intervention\Image\Laravel\Facades\Image;

    if($request->image != ""){
            $strpos = strpos($request->image,';');
    $sub = substr($request->image,0,$strpos);
            $ex = explode('/',$sub)[1];
    $name = time().".".$ex;
    $img = Image::read($request->image)->resize(200,200);
    $upload_path = public_path();
            $img->save($upload_path.$name);
    $product->image = $name;

        }else{
            $product->image="no-image.png";
        }

33. public function store(Request $request){

           $product = new Product();
           $product->name = $request->name;
           $product->description = $request->description;
           if($request->image != ""){
               $strpos = strpos($request->image,';');
               $sub = substr($request->image,0,$strpos);
               $ex = explode('/',$sub)[1];
               $name = time().".".$ex;
               $img = Image::read($request->image)->resize(200,200);
               $upload_path = public_path('')."/upload/";
               $img->save($upload_path.$name);
               $product->image = $name;

           }else{
               $product->image="no-image.png";
           }


           $product->type = $request->type;
           $product->quantity = $request->type;
           $product->price = $request->price;
           $product->save();

    }

34. after saving product we need to redirect home page
    for that, in form.vue file in script we include
    import { useRouter } from "vue-router"
    const router=useRouter()
    then in response router.push('/')

    const handleSave = () =>{
    axios.post('/api/products',form)
    .then((response)=>{
    router.push('/')
    })
    }

35. after saving product we will show alert for that install sweetalert2
    npm install sweetalert2v

36. in resources\js\app.js

import Swal from 'sweetalert2'
window.Swal = Swal
const toast = Swal.mixin({
toast: true,
position: true,
showConfirmButton: false,
timer: 3000,
timerProgressBar: true,
})
window.toast = toast 37. in \resources\js\components\products\Form.vue in response add

const handleSave = () =>{
axios.post('/api/products',form)
.then((response)=>{
router.push('/')
toast.fire({icon:"success",title:"product Added Succesfully"})
})
} 38. to show error

let errors = ref([]) and to be reactive we add ref array in

import { reactive,ref } from "vue"
in handleSave method add error section
.catch((error) => {
if(error.response.status ===422){
errors.value = error.response.data.errors
}

            })

39. in blade we add
    <input type="text" class="input" v-model="form.name" >
    <small style="color:red" v-if="errors.name">{{ errors.name }}</small>

40 to show all products in index for that

const getproducts = async () => {
let response = await axios.get ( '/api/products')
.then((response) => {
products.value = response.data.products
})
}
we need to define products

    let products = ref([])
    to import ref from vue

    import { ref } from  "vue"

    we shell call getProducts onMounted hook

    onMounted(async () => {
    getProducts()

})
we shell be shoor that import onMounted in vue
import { ref, onMounted } from "vue" 41. we shell in api.php de

42. in product controller
    public function index(){
    $products = Product::query();
    $products = $products->latest()->get();
    return response()->json([
    'products' => $products
    ], 200);

    }

43. index blade to show all products

    src="/public/upload/1.jpg" change to :src="ourImage(product.image)"

44. to show images from folder
    const ourImage = (img) =>{
    return "/upload/"+img
    }

 <div class="table--items products__list__item"  v-for="product in products" :key="product.id">
                  <div class="products__list__item--imgWrapper">
                      <img

                       :src="ourImage(product.image)"
                        />
                  </div>
                  <a href="# " >
                      {{product.name}}
                  </a>
                  <p >
                    {{product.type}}
                  </p>
                  <p >
                      {{product.quantity}}
                  </p>
                  <div>
                      <button class="btn-icon btn-icon-success" >

                          <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn-icon btn-icon-danger" >
                          <i class="far fa-trash-alt"></i>
                      </button>
                  </div>

              </div>

========================== pagination=================================
  
45. for pagination we make in controller paginate
$products = $products->latest()->paginate(2);
and in index.vue

add data
const getProducts = async () => {
let response = await axios.get ( '/api/products')
.then((response) => {

        products.value = response.data.products.data

    })

}
add link
let links = ref([])
in .then add

links.value = response.data.products.links

const getProducts = async () => {
let response = await axios.get ( '/api/products')
.then((response) => {

        products.value = response.data.products.data
        links.value = response.data.products.links
    })

}
in template we have

 <div class="table-paginate">
                <div class="pagination">
                    <a
                    href="#"
                    class="btn"
                    v-for="(link,index) in links"
                    :key="index"
                    v-html="link.lable"
                    :class="{active: link.active,disabled:!link.url }"
                    @click="changePage(link)"
                        ></a>
                        </div>
            </div>v
			
	46.
	const changePage =(link) =>{
    console.log(link)
    if(!link.url || link.active){
        return
    }
    axios.get(link.url)
        .then((response) =>{
            products.value = response.data.products.data
            links.value = response.data.products.link
        })
}
============================search =========================================

47. search implement , for that in input we call via v-model="searchQuery"

<input type="text" placeholder="searchQuery" v-model="searchQuery"/>

48. declare
    let searchQuery = ref('')

    then in getProduct function we add searchQuery.value
    let response = await axios.get ( '/api/products?&searchQuery='+searchQuery.value)v

49. make shoor to call searchQuery inside of watch hook


    watch(searchQuery,() => {
    getProducts()

}) 50. watch added on
import { ref, onMounted,watch } from "vue"
============================= edit================================================
in index.vue add

const onEdit = (id) =>{

        router.push(`/products/${id}/edit`)
    }

    <button class="btn-icon btn-icon-success" @click="onEdit(product.id)">

           <i class="fas fa-edit"></i>
     </button>


    fot edit we need to create root and component

51. resources\js\router\index.js in routes add

    {
    path:'/products/:id/edit',
    name:'products.edit',
    component:productForm
    },

    we use same productForm component in Form.vue

    but when we go we see Create Product we shell change it to Edit Product, for that

    const editMode = ref(false)

        onMounted(()=>{
        	if(route.name ==='products.edit'){
        		editMode.value=true
        	}
        })

52. lets define route state useRoute

    const route = useRoute()

    import { useRouter, useRoute } from "vue-router"v

53. import { reactive, ref, onMounted } from "vue"

    in form.vue componenet
    <h1 class="my-1">
    	<span v-if="editMode">Edit</span>
    	<span v-else>Create</span>
    	 Product
    </h1>

54. we add getProduct() in onMounted
    onMounted(()=>{
    if(route.name ==='products.edit'){
    editMode.value=true
    getProduct()
    }
    })

    const getProduct = async () => {
    let response = await axios.get(`/api/products/${route.params.id}/edit`)
    .then((response)=>{
    form.name = response.data.product.name
    })
    }

55. we shell declare
    /api/products/${route.params.id}/edit`)
    Route::get('/products/{product}/edit',[ProductController::class,'edit']);

    http://127.0.0.1:8000/products/11/edit
    now getProduct looks like this
    const getProduct = async () => {
    let response = await axios.get(`/api/products/${route.params.id}/edit`)
    .then((response)=>{
    form.name = response.data.product.name
    form.description = response.data.product.description
    form.image = response.data.product.image
    form.type = response.data.product.type
    form.quantity = response.data.product.quantity
    form.price = response.data.product.price

        })

    }

56.a little bit change handleSave
const handleSave = (values, action) =>{

        if(editMode.value){

            updateProduct(values, action)


        }else{

            createProduct(values, action)
        }

    }

57. we seperate createProduct

    const createProduct = (values, action) => {

         axios.post('/api/products',form)
            .then((response)=>{
                router.push('/')
                toast.fire({icon:"success",title:"product Added Succesfully"})
            })
            .catch((error) => {
                if(error.response.status ===422){
                    console.log(error.response.data.errors)
                    errors.value = error.response.data.errors
                }

            })

    }

58. update function
    const updateProduct = (values,action) =>{
    axios.put(`/api/products/${route.params.id}`,form)
    .then((response)=>{
    router.push('/')
    toast.fire({icon:"success",title:"product Added Succesfully"})
    })
    .catch((error) => {
    if(error.response.status ===422){
    console.log(error.response.data.errors)
    errors.value = error.response.data.errors
    }

            })

    }

59. update function looks like this , added

$image = $upload_path.$product->image;

            if(file_exists($image )){
                @unlink($image);
            }

    		and change

    		else{
            $product->image = $product->image;
        }

public function update(Request $request,$id){

        $request->validate([
            'name'=>'required',
            'description'=>'required'
        ]);

        $product = Product::find($id);

        $product->name = $request->name;
        $product->description = $request->description;
        if($request->image != $product->image){
            $strpos = strpos($request->image,';');
            $sub = substr($request->image,0,$strpos);
            $ex = explode('/',$sub)[1];
            $name = time().".".$ex;
            $img = Image::read($request->image)->resize(200,200);
            $upload_path = public_path('')."/upload/";
           c
            $img->save($upload_path.$name);
            $product->image = $name;

        }else{
            $product->image = $product->image;
        }

        $product->type = $request->type;
        $product->quantity = $request->type;
        $product->price = $request->price;
        $product->save();

    }

    =====================delete==================
    take alert style from  sites https://sweetalert2.github.io/

     <button class="btn-icon btn-icon-danger" @click="deleteProduct(product.id)" >
                          <i class="far fa-trash-alt"></i>
                      </button>v

    const deleteProduct = (id) =>{
            Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/products/${id}`)
                        .then(()=>{
                           Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                                });

                                getProducts()

                        })
                }
            });
    }
    Route::delete('/products/{product}',[ProductController::class,'destroy']);

    public function destroy($id){

        $product = Product::findOrFail($id);
        $image_path = public_path()."/upload/";
        $image = $image_path . $product->image;
        if(file_exists($image)){
            @unlink($image);
        }
        $product->delete();

    }

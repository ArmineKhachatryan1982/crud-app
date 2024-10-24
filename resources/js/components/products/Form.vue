<script setup>
import { reactive, ref, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"

const form =reactive({
    name: "",
    description: "",
    image: "",
    type: "",
    quantity: "",
    price: ""
})
const router = useRouter()

let errors = ref([])

const route = useRoute()

const editMode = ref(false)

onMounted(()=>{
    if(route.name ==='products.edit'){
        console.log(777)
        editMode.value=true
        getProduct()
    }
})

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

const getImage = () =>{
    let image = "/upload/no-image.png"
    if(form.image){
        // console.log('form.image')
        if(form.image.indexOf("base64")!=-1){
            // console.log('(form.image.indexOf("base64")!=-1)')
            image = form.image
        }else{
            image = "/upload/"+ form.image
        }
    }

    return image
}

const handleFileChange = (e) =>{

    let file = e.target.files[0]

    let reader = new FileReader()
    reader.onloadend = (file) => {
        form.image = reader.result
    }
    reader.readAsDataURL(file)
}

    const handleSave = (values, action) =>{

        if(editMode.value){

            updateProduct(values, action)


        }else{

            createProduct(values, action)
        }

    }
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
    const updateProduct = (values,action) =>{
        axios.put(`/api/products/${route.params.id}`,form)
            .then((response)=>{
                router.push('/')
                toast.fire({icon:"success",title:"product Updated Succesfully"})
            })
            .catch((error) => {
                if(error.response.status ===422){
                    console.log(error.response.data.errors)
                    errors.value = error.response.data.errors
                }

            })
    }



</script>

<template>
    <section>
        <div class="products__create ">

            <div class="products__create__titlebar dflex justify-content-between align-items-center">
                <div class="products__create__titlebar--item">

                    <h1 class="my-1">
                        <span v-if="editMode">Edit</span>
                        <span v-else>Create</span>

                         Product
                    </h1>
                </div>
                <div class="products__create__titlebar--item">

                    <button class="btn btn-secondary ml-1" @click ="handleSave" >
                        Save
                    </button>
                </div>
            </div>
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            <div class="products__create__cardWrapper mt-2">
                <div class="products__create__main">
                    <div class="products__create__main--addInfo card py-2 px-2 bg-white">
                        <p class="mb-1">Name</p>
                        <input type="text" class="input" v-model="form.name" >
                        <small style="color:red" v-if="errors.name">{{ errors.name }}</small>

                        <p class="my-1">Description (optional)</p>
                        <textarea cols="10" rows="5" class="textarea" v-model="form.description" ></textarea>
                        <small style="color:red" v-if="errors.description">{{ errors.description }}</small>
                        <div class="products__create__main--media--images mt-2">
                        <ul class="products__create__main--media--images--list list-unstyled">
                            <li class="products__create__main--media--images--item">
                                <div class="products__create__main--media--images--item--imgWrapper">
                                    <img class="products__create__main--media--images--item--img" alt=""
                                    :src="getImage()"
                                    />
                                </div>
                                <input type="file"  @change="handleFileChange">
                            </li>
                            <!-- upload image small -->
                         <!--   <li class="products__create__main--media--images--item">
                                <form class="products__create__main--media--images--item--form">
                                    <label class="products__create__main--media--images--item--form--label" for="myfile">Add Image</label>
                                    <input class="products__create__main--media--images--item--form--input" type="file" id="myfile" @change="handleFileChange" >
                                </form>
                            </li>  -->
                        </ul>
                    </div>

                    </div>

                </div>
                <div class="products__create__sidebar">
                    <!-- Product Organization -->
                    <div class="card py-2 px-2 bg-white">

                        <!-- Product unit -->
                        <div class="my-3">
                            <p>Product type</p>
                            <input type="text" class="input" v-model="form.type" >
                        </div>
                        <hr>

                        <!-- Product invrntory -->
                        <div class="my-3">
                            <p>Inventory</p>
                            <input type="text" class="input"  v-model="form.quantity">
                        </div>
                        <hr>

                        <!-- Product Price -->
                        <div class="my-3">
                            <p>Price</p>
                            <input type="text" class="input" v-model="form.price">
                        </div>
                    </div>

                </div>
            </div>
            <!-- Footer Bar -->
            <div class="dflex justify-content-between align-items-center my-3">
                <p ></p>
                <button class="btn btn-secondary"  @click=handleSave>Save</button>
            </div>
        </div>
    </section>
</template>

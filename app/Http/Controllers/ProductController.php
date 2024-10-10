<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function store(Request $request){
        $product = new Product();
        $product->name = $request->name;
        $product->description = $request->description;
        $product->image = $request->image;
        $product->type = $request->type;
        $product->quantity = $request->type;
        image: "",
        type: "",
        quantity: "",
        price: ""
    }
}

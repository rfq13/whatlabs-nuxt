<template>
    <div class="col-sm-4 mt-3">
        <div class="card" style="width: 18rem;">
            <img :src="imgSrc" class="card-img-top" :alt="imgSrc">
            <div class="card-body">
                <h5 class="card-title">{{ title }}</h5>
                <p class="card-text">{{ desc }}</p>
                <a href="#" :class="btnClass" @click.prevent="sayHi">
                    <slot/>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        btnClass:{
            type:String,
            default:'btn btn-danger'
        },
        title:{
            type:String,
            default:'title'
        },
        desc:{
            type:String,
            default:'desc'
        },
        imgSrc:{
            type:String,
            default:'/loading.gif'
            // default:'https://picsum.photos/600/300/?image=25'
        },
    },     
    methods: {
        sayHi() {
            alert("hi");
        }
    }
}
</script>
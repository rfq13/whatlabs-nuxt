<template>
    <div>
        <b-badge
            href="javascript:void(0)"
            :variant="conv.type ==1 ? 'primary' : 'info'"
            class="capitalize"
        >{{ conv.type ==1 ? "Training Phrase" : "Output" }}
        </b-badge>
        <b-icon
            @click.prevent="createConv($event,{intentId:intent._id,type:conv.type})"
            class="float-right"
            icon="plus-circle-fill"
            font-scale="1"
            aria-hidden="true"
        ></b-icon>

        <b-list-group class="mt-2">
        <b-list-group-item
            button
            v-for="(ph, index) in conv.phrases"
            :key="index"
            class="d-flex justify-content-between align-items-center"
        >
        
            <b-form-input
            :value="ph"
            size="sm"
            class="invisible-form-control p-0"
            @blur="changeConv($event,{intentId:intent._id,conv_id:conv._id,index,prev:ph})"
            @keyup.enter="blurOnEnter($event)"
            ></b-form-input>

            <a
            href="javascript:void(0)"
            @click.prevent="deleteConv($event,{intentId:intent._id,conv_id:conv._id,index})"
            class="ml-2"
            ><i class="fas fa-times-circle"></i>
            </a>
        </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
export default {
    props:{
        conv:{
            type:Object,
            required:true
        },
        intent:{
            type:Object,
            required:true
        },
        createConv:{
            type:Function,
            required:true
        },
        changeConv:{
            type:Function,
            required:true
        },
        deleteConv:{
            type:Function,
            required:true
        },
    },
    methods:{
        blurOnEnter(e) {
            //   console.log('lohi')
            e.target.blur()
        },
    }
}
</script>
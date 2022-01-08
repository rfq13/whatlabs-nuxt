<template>
    <div class="float-right">
        <b-dropdown
        size="md"
        dropleft
        variant="link"
        toggle-class="text-decoration-none"
        class="m-2"
        no-caret
        >
        <template #button-content>
            <b-icon
            class="float-right"
            :icon="icon"
            font-scale="1"
            aria-hidden="true"
            ></b-icon>
        </template>
        <b-dropdown-form @submit.stop.prevent>
            <b-form-input
            id="dropdown-form-email"
            size="sm"
            :placeholder="placeholder"
            @keyup.enter="createIntent($event)"
            ></b-form-input>
        </b-dropdown-form>
        </b-dropdown>
    </div>
</template>
<style scoped>
.capitalize {
  text-transform: capitalize;
}

.form-control:focus,
.form-control:active {
  background: transparent;
  border: none;
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}

.form-control[readonly] {
  background-color: transparent;
  border: 0;
  font-size: 1em;
}

.form-control {
  border: none;
}
</style>

<script>
export default {
    props:{
        icon:{
            type:String,
            default:"plus-square-fill"
        },
        placeholder:{
            type:String,
            default:"kategori.."
        },
        createIntent:{
            type:Function,
            required:true
        }
    }
}
</script>
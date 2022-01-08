<template>
    <div class="onoffswitch">
        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" tabindex="0" :checked="checked" @change="changeAlgo($event)">
        <label class="onoffswitch-label" for="myonoffswitch">
            <span class="onoffswitch-inner"></span>
            <span class="onoffswitch-switch"></span>
        </label>
    </div>
</template>
<style scoped>
    .onoffswitch {
        position: relative; width: 66px;
        -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
    }
    .onoffswitch-checkbox {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }
    .onoffswitch-label {
        display: block; overflow: hidden; cursor: pointer;
        border: 2px solid #FFFFFF; border-radius: 19px;
    }
    .onoffswitch-inner {
        display: block; width: 200%; margin-left: -100%;
        transition: margin 0.3s ease-in 0s;
    }
    .onoffswitch-inner:before, .onoffswitch-inner:after {
        display: block; float: left; width: 50%; height: 22px; padding: 0; line-height: 22px;
        font-size: 14px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
        box-sizing: border-box;
    }
    .onoffswitch-inner:before {
        content: "";
        padding-left: 8px;
        background-color: #34C268; color: #FFFFFF;
    }
    .onoffswitch-inner:after {
        content: "";
        padding-right: 8px;
        background-color: #3D71FF; color: #FFFFFF;
        text-align: right;
    }
    .onoffswitch-switch {
        display: block; width: 13px;height: 14px; margin: 5px;
        background: #FFFFFF;
        position: absolute; top: 0; bottom: 0;
        right: 40px;
        border: 2px solid #FFFFFF; border-radius: 19px;
        transition: all 0.3s ease-in 0s; 
    }
    .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
        margin-left: 0;
    }
    .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
        right: 0px; 
    }
</style>
<script>
export default {
    props:{
        checked:{
            type:Boolean,
            default:false,
        },
        changeAlgo:{
            type:Function,
            required:true
        },
    }
}
</script>
<template>
    <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <!-- <div class="sidebar-brand-icon rotate-n-15"> -->
                <div class="sidebar-brand-icon">
                   <i class="fad fa-won-sign"></i>hatLabs
                </div>
                <!-- <div class="sidebar-brand-text mx-3">hatLabs <sup></sup></div> -->
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item">
                <NuxtLink to="/" class="nav-link">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </NuxtLink>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Heading -->
            <div class="sidebar-heading">
                Interface
            </div>

            <!-- Nav Item - Pages Collapse Menu -->
            <li :class="$nuxt.$route.path.includes('users') ? 'nav-item active' : 'nav-item' ">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas fa-user"></i>
                    <span>Users</span>
                </a>
                <div id="collapseTwo" :class="$nuxt.$route.path.includes('users') ? 'collapse show' : 'collapse' " aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Pages:</h6>
                        <NuxtLink class="collapse-item" to="/users/lists">Home</NuxtLink>
                        <NuxtLink class="collapse-item" to="/users/connection">Connect</NuxtLink>
                        <NuxtLink class="collapse-item" to="/users/conversations">Conversations</NuxtLink>
                    </div>
                </div>
            </li>

            <!-- Nav Item - Utilities Collapse Menu -->
            <li :class="$nuxt.$route.path.includes('utilities') ? 'nav-item active' : 'nav-item' ">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i class="fad fa-motorcycle"></i>
                    <span>Utilities</span>
                </a>
                <div id="collapseUtilities" :class="$nuxt.$route.path.includes('utilities') ? 'collapse show' : 'collapse' " aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Custom Utilities:</h6>
                        <NuxtLink class="collapse-item" to="/utilities/conversations">Conversations</NuxtLink>
                    </div>
                </div>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider d-none d-md-block">

            <!-- Sidebar Toggler (Sidebar) -->
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

            <!-- Sidebar Message -->
            <div class="sidebar-card">
                WhatLabs.net
            </div>
        </ul>
        <!-- End of Sidebar -->
</template>

<style scoped>
/* home route and active route will show in bold as it matches / and /about */
a.nuxt-link-active span{
  font-weight: bold;
  color:#FFFFFF
}

a.nuxt-link-active .fas{
  color:#FFFFFF
}

/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #FFFFFF    ;
}
</style>

<script>
export default {
    data(){
      return{
      }
    },
    mounted(){
        $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
            $("body").toggleClass("sidebar-toggled");
            $(".sidebar").toggleClass("toggled");
            if ($(".sidebar").hasClass("toggled")) {
            $('.sidebar .collapse').collapse('hide');
            };
        });
    }
}
</script>
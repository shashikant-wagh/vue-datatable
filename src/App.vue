<template>
    <div class="container">
        <user-datatable />
    </div>
</template>

<script>
    import UserDatatable from './components/UserDatatable.vue'

    export default {
        name: 'App',
        components: {UserDatatable}
    }
</script>
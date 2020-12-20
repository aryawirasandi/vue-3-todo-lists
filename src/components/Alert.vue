<template>
    <div class="alert alert-danger" role="alert">
        <p class="text-bold fw-bold m-0">{{ text }}</p>
    </div>   
</template>
<script>
export default {
    props : {
        text : {
            type : String
        }
    }
}
</script>
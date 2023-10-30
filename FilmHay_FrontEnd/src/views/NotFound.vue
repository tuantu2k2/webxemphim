<template>
    <div class="page">
        <h1>
            Oops, không thể tìm thấy trang. Trở về
            <router-link to="/" class="link">Trang Chủ.</router-link>
        </h1>
    </div>
</template>
<style scoped>
    .page{
        min-height: 80vh;
    }
    h1{
        text-align: center;
    }
    .link{
        color: turquoise;
    }
</style>
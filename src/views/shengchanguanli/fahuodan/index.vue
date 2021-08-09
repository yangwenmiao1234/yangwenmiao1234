<template>
    <div class="body">
        <div>
            <Fhd>
        </Fhd>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import Fhd from '@/components/fahuodan/fahuodan.vue'
import Index from '@/components/fahuodan/index.vue'
export default Vue.extend({
    components:{ Fhd , Index }
})
</script>

<style scoped>
.body{
    padding :20px;
}
</style>
<template>
    <div class="container">
        <div class="row d-flex">
            <div class="col-md-6 pt-5 m-auto">
                <CategorySelector />
            </div>
        </div>


    </div>
</template>

<script>
import CategorySelector from '@/components/UI/CategorySelector'

export default {
    name: 'ByCategory',
    components: {
        CategorySelector
    },
    data () {
        return {
            
        }
    }
}
</script>

<style>

</style>

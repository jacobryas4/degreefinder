<template>
    <div class="container">
        <div class="row d-flex">
            <div class="col-md-6 pt-5 m-auto">
                <CategorySelector v-on:categorySelected="updateCategory($event)" />
                <DegreeSelector v-if="category" v-bind:category="category" v-bind:categoryDegrees="categoryDegrees"/>
            </div>
        </div>


    </div>
</template>

<script>
import CategorySelector from '@/components/UI/CategorySelector'
import DegreeSelector from '@/components/UI/DegreeSelector'

export default {
    name: 'ByCategory',
    components: {
        CategorySelector,
        DegreeSelector
    },
    data () {
        return {
            category: null,
            degreesOffered: [
                {degreeCategory: 'Business', degrees: ['Accounting', 'Business Management', 'Human Resource Managment']},
                {degreeCategory: 'Computer Science', degrees: ['Computer Science', 'Information Technology']}
            ],
            categoryDegrees: null
        }
    },
    methods: {
        updateCategory(newCategory) {
            this.category = newCategory
            let catObj = this.degreesOffered.filter((degreeObj) => {
                return degreeObj.degreeCategory === newCategory
            })  
            console.log(catObj[0].degrees)
            this.categoryDegrees = catObj[0].degrees
        }
    }
}
</script>

<style>

</style>

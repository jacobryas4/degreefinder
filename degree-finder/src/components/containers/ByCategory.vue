<template>
    <div class="container">
        <div class="row d-flex">
            <div class="col-md-10 pt-5 m-auto">
                <CategorySelector v-on:categorySelected="updateCategory($event)" />
                <DegreeSelector v-if="category" v-bind:category="category" v-bind:degreesOffered="degreesOffered"/>
            </div>
        </div>


    </div>
</template>

<script>
import CategorySelector from '@/components/UI/CategorySelector'
import DegreeSelector from '@/components/UI/DegreeSelector'
import db from '@/firebase/init'

export default {
    name: 'ByCategory',
    components: {
        CategorySelector,
        DegreeSelector
    },
    data () {
        return {
            category: null,
            degreesOffered: [],
            categoryDegrees: null,
            schools: ['Liberty University', 'Colorado State University', 'Indiana Wesleyan University', 'Trident University', 'Indiana Tech']
        }
    },
    methods: {
        updateCategory(newCategory) {
            this.category = newCategory
            // clear degreesOffered to remove degrees listed from previous queries
            this.degreesOffered = []
            // this updates the category, queries the database and returns degrees to pass to DegreeSelector
            db.collection('degrees').where('category','==', this.category).get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    console.log(doc.data())
                    this.degreesOffered.push(doc.data())
                })
            })
        }
    }
}
</script>

<style>

</style>

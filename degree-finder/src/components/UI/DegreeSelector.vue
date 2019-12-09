<template>
    <div>
        <h1>Degree Selector</h1>
        {{this.selectedCategory}}
        <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action" v-for="degree in degreesOffered">
                {{degree.degreeName}} <span class="badge badge-primary m-1" v-for="school in degree.offeredBy">{{school.schoolName}}</span>
            </a>
        </div>
        
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'DegreeSelector',
    props: [
        'category',
        'categoryDegrees'
    ],
    data() {
        return {
            degreesOffered: [],
            selectedCategory: this.category
        }
    },
    beforeMount() {
        db.collection('degrees').where('category','==', this.selectedCategory).get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    console.log(doc.data())
                    this.degreesOffered.push(doc.data())
                })
                
            })
    }
} 
</script>

<style>

</style>

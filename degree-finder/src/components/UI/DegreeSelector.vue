<template>
    <div>
        <h1>Degree Selector</h1>
        <p v-for="degree in categoryDegrees">{{degree}}</p>
    </div>
</template>

<script>
export default {
    name: 'DegreeSelector',
    props: [
        'category',
        'categoryDegrees'
    ],
    data() {
        return {
            selectedCategory: this.category,
            degreesOffered: null
        }
    }
} 
</script>

<style>

</style>

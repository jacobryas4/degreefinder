<template>
    
    <div class="container">
        <div class="row text-center">
            <div class="w-100">
                <h1 class="text-center">Select a Category</h1>
            <form @submit.prevent="AddCategory">
                <select class="form-control form-control-lg" name="category" v-model="category" @change="categorySelected">
                    <option value="Business">Business</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Nursing and Healthcare">Nursing and Healthcare</option>
                    <option value="Psychology and Social Work">Psychology and Social Work</option>
                    <option value="Criminal Justice">Criminal Justice</option>
                    <option value="General Studies">General Studies</option>
                </select>
            </form>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    name: 'CategorySelector',
    data () {
        return {
            category: null
        }
    },
    methods: {
        categorySelected() {
            this.$emit('categorySelected', this.category)
        }
    }
}
</script>

<style>

</style>

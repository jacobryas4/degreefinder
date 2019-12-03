<template>
    
    <div class="container">
        <div class="row text-center">
            <div class="w-100">
                <h1 class="text-center">Select a Category</h1>
            <form @submit.prevent="AddCategory">
                <select class="form-control form-control-lg" name="category" v-model="category">
                    <option value="Opt 1">Opt 1</option>
                    <option value="Opt 2">Opt 2</option>
                    <option value="Opt 3">Opt 3</option>
                    <option value="Opt 4">Opt 4</option>
                    <option value="Opt 5">Opt 5</option>
                </select>
                <button class="btn btn-primary m-3">Confirm identity</button>
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
        AddCategory() {
            
        }
    }
}
</script>

<style>

</style>

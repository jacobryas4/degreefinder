<template>
    <div>
        <div class="form-row m-2" v-for="(row, index) in requiredCourses" v-bind:key="index">
                <div class="col">
                    <input type="text" class="form-control" placeholder="DLSI Course" v-model="requiredCourses[index].dlsi">
                </div>
                <h2>=</h2>
                <div class="col">
                    <input type="text" class="form-control" placeholder="School Course" v-model="requiredCourses[index].school">
                </div>
            </div>
            <div class="form-row d-flex justify-content-center">
                <button @click.prevent="AddReqCourseRow" class="m-2">Add Row</button>
                <button @click.prevent="RemoveReqCourseRow" class="m-2">Remove Row</button>
            </div>
    </div>
</template>

<script>


export default {
    name: 'EquivCourseInput',
    data() {
        return {
            requiredCourses: [{ dlsi: null, school: null }]
        }
    },
    methods: {
        AddReqCourseRow() {
            this.requiredCourses.push({ dlsi: null, school: null })
            this.$emit('modifiedCourses', this.requiredCourses)
        },
        RemoveReqCourseRow() {
            this.requiredCourses.pop()
            this.$emit('modifiedCourses', this.requiredCourses)
        }
    },
    created() {
        this.$emit('modifiedCourses', this.requiredCourses)
    }
}
</script>

<style>

</style>


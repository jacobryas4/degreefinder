<template>
    <div>
        <h1>{{sectionTitle}}</h1>
        <div class="list-group">
            <transition-group name="fade">
                <li class="list-group-item d-flex justify-content-between list-group-item-action align-items-center" 
                    v-for="degree in degreesOffered"
                    v-bind:key="degree.degreeName">
                    <h5>{{degree.degreeName}}</h5>
                        <div v-if="!editMode">
                            <div class="btn-group">
                                <button type="button" class="btn btn-primary dropdown-toggle" v-if="degree.offeredBy.bachelors" data-toggle="dropdown">
                                    Bachelors <span class="badge badge-light mr-1">{{degree.offeredBy.bachelors.length}}</span>
                                </button>
                                <div class="dropdown-menu">
                                    <a href="#" class="dropdown-item" 
                                        v-for="(school,index) in degree.offeredBy.bachelors"
                                        v-bind:key="index"
                                        @click.prevent="degreeSelected(school, degree.id, 'bachelors')">{{school}}</a>
                                        
                                </div>
                            </div>

                            <div class="btn-group">
                                <button type="button" class="btn btn-secondary dropdown-toggle" v-if="degree.offeredBy.associates" data-toggle="dropdown">
                                    Associates <span class="badge badge-light mr-1">{{degree.offeredBy.associates.length}}</span>
                                </button>
                                <div class="dropdown-menu">
                                    <a href="#" class="dropdown-item" 
                                        v-for="(school,index) in degree.offeredBy.associates"
                                        v-bind:key="index"
                                        @click.prevent="degreeSelected(school, degree.id, 'associates')">{{school}}</a>
                                </div>
                            </div>
                        </div>
                        <div v-if="editMode">
                            <button type="button" class="btn btn-light" v-if="degree.offeredBy.bachelors" @click.prevent="degreeSelected(degree)">
                                <router-link :to="{ name: 'EditDegree', params: {degree_slug: degree.slug}}">
                                    Edit Degree
                                </router-link>
                            </button>
                            <button type="button" class="btn btn-secondary" v-if="degree.offeredBy.associates" @click.prevent="degreeSelected(degree)">
                                <router-link :to="{ name: 'EditDegreeReq', params: {degree_slug: degree.slug} }">
                                    Edit Requirements
                                </router-link>
                            </button>
                        </div>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'DegreeSelector',
    props: [
        'category',
        'degreesOffered',
        'sectionTitle',
        'editMode'
    ],
    data() {
        return {
            showDegreeTypeSelector: false,
            degrees: null,
            chosenDegree: null
        }
    },
    methods: {
        degreeSelected(school, id, degreeType) {
            let payload = {
                school,
                id,
                degreeType
            }

            this.$emit('degreeSelected', payload)
            
        }
    }
} 
</script>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>

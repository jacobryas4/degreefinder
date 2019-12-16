<template>
    
    <div>
        <button @click="postSchoolDegreeHandler">Post School Degree</button>
        <button @click="postDegreeHandler">Post Degree</button>
    </div>
    

</template>

<script>
import db from '@/firebase/init'

// This is a temporary component, used in dev to conveniently add degrees to firestore

export default {
    name: "AddDegree",
    data() {
        return {
            schoolDegreeObj: {
                admReq: "Students must have a 2.0 or above cumulative GPA for admission on Good Standing. Students with less than 2.0 will be considered for Acceptance or Caution.",
                coreSchoolCourses: ["BUSI 201", "BUSI 230", "BUSI 240", "ACCT 211"],
                dlsiCourses: {
                    electives: [
                        "Anatomy and Physiology (3CH)",
                        "College Algebra (3 CH)",
                        "Developmental Psychology (3 CH)",
                        "Introduction to Sociology (3 CH)",
                        "Health and Human Development (3 CH)",
                        "Microbiology (3 CH)",
                        "Principles of Management (3 CH)",
                        "Substance Abuse (3 CH)",
                        "Intro to World Religions (3 CH)",
                        "Ethics (1 CH)"
                    ],
                    genEd: [
                        "Biology (3 CH)",
                        "College Math (3 CH)",
                        "History of the US I: Early Colonization to 1877 (3 CH)",
                        "Intro to Humanities (3 CH)",
                        "Intro to Psychology (3 CH)"
                    ]
                },
                pricing: {
                    fullTime: "$351 per credit hour with 10% DLSI discount",
                    partTime: "$409.50 per credit hour with 10% DLSI discount.",
                    military: "$250"
                },
                schoolCourses: {
                    coreSchoolCourses: [
                        "BUSI 201 Intermediate Business Computer Apps (3 CH)",
                        "BUSI 230 Introduction to Probability and Statistics (3 CH)",
                        "BUSI 240 Organizational Behavior I (3 CH)",
                        "ACCT 211 Financial Accounting (3 CH)",
                        "ACCT 212 Managerial Accounting (3 CH)",
                        "BUSI 301 Business Law (3 CH)",
                        "BUSI 303 International Business (3 CH)"
                    ],
                    equivCourses: [
                        "BIOL 101",
                        "MATH 115",
                        "HIUS 221",
                        "CSTU 101",
                        "PSYC 101"
                    ],
                    genElectives: [
                        "BIOL 102",
                        "MATH 121",
                        "PSYC 210",
                        "SOCI 200",
                        "HTLH 216",
                        "BIOL 2XX",
                        "BUSI 101",
                        "SOWK 260",
                        "ANTH 1XX",
                        "ETHC 1XX"
                    ]
                },
                stips: ["20 hours of community service"],
                transferReq: [
                    "You will need to fill out a high school self-certificate form and mail in any official transcripts from previous schools",
                    "Transfer in up to 45 credits into an Associate's Degree, and up to 90 credits into a Bachelor's Degree"
                ]
            },
            degreeObj: {
                category: 'Business',
                degreeName: 'Accounting',
                desc: "Here is a big o description for the degree",
                offeredBy: [
                    "Liberty University",
                    "Indiana Tech",
                    "Colorado State"
                ]
            }
        }
    },
    methods: {
        postSchoolDegreeHandler() {

            const ref = db.collection('degrees').doc('CAzqLnJe7o3O5TAPCgFH').collection('schoolsOffering').doc("Indiana Tech")

            ref.set(this.schoolDegreeObj)
                .then((docRef) => {
                    console.log(`Document written with ID: ${docRef.id}`)
                })
                .catch(err => {
                    console.log(error)
                })
            
        },
        postDegreeHandler() {

            db.collection('degrees').add()

        }
    }

}
</script>

<style scoped>

</style>

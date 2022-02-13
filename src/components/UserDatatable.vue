<template>
    <div class="mt-5">
        <table-component
            v-model="records"
            :columns="[
                'Id',
                'Name',
                'Gender',
                'Email',
                'Active',
            ]"
            :dataFor="'users'"
            :tableClass="'table table-bordered table-responsive'"
            @create="show.create = true"
        >
            <template v-slot:table-body>
                <tr v-for="(record, index) in normalizedRecords">
                    <td class="text-center"> {{ record.id }} </td>
                    <td> {{ record.name }} </td>
                    <td class="text-center"> {{ record.gender }} </td>
                    <td> {{ record.email }} </td>
                    <td class="text-center"> {{ record.active }} </td>
                </tr>
            </template>
        </table-component>
    </div>
</template>


<script>

    import '../assets/css/styles.css';

    import UserRecord from './userRecord.js';
    import TableComponent from './DataTable/TableComponent';

    export default {
        components: {TableComponent},

        data() {
            return {
                show: {
                    edit: null,
                    create: false,
                    delete: true
                },
                records: [],
            }
        },

        computed: {
            normalizedRecords() {
                return this.records.map((record) => new UserRecord(record.sanitize()));
            }
        }
    }

</script>
<template>
    <flash-message />

    <div class="row">
        <div class="col">
            <h3>{{ dataFor.capitalize() }} Table</h3>
        </div>
    </div>

    <table :class="tableClass">
        <thead>
            <!-- Eevn though we renders table column we given option to, override it using table-head slot  -->
            <slot name="table-head">
                <tr>
                    <th
                        v-for="column in columns"
                        :class="column.toSlug()"
                    >
                        {{ column }}
                    </th>
                </tr>
            </slot>
        </thead>

        <tbody>
            <!-- table-body slot renders table rows -->
            <slot name="table-body" />

            <tr v-if="!records.length">
                <td
                    class="text-center"
                    :colspan="6"
                >
                    No Records Found.
                </td>
            </tr>
        </tbody>
    </table>
</template>


<script>

    import 'bootstrap/dist/css/bootstrap.min.css';
    import FlashMessage from './FlashMessage';

    export default {
        props: {
            modelValue: Array,
            columns: Array,
            dataFor: String,
            tableClass: String,
        },

        components: {FlashMessage},

        data() {
            return {
                records: [],
            }
        },

        watch: {
            modelValue: {
                handler(newValue) {
                    if(!(newValue || []).isEqualsTo(this.records)) {
                        this.$set(this.$data, 'records', newValue.sanitize());
                    }
                },
            },

            records: {
                handler(newValue) {
                    if(!(newValue || []).isEqualsTo(this.value)) {
                        this.$emit('update:modelValue', newValue.sanitize());
                    }
                },
            }
        },

        methods: {
            fetch() {
                this
                    .apiManager
                    .get('/users')
                    .then((response) => this.records = response)
                    .catch((error) => this.EventBus.emit('error', error)); // Firing error event on global event bus
            }
        },

        created() {
            this.fetch();
        }
    }

</script>
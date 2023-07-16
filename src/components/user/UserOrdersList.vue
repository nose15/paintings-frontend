<template>
    <div class="container">
    <h4>Orders</h4>
    <p>{{ orders.value }}</p>
        <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Status</th>
                <th scope="col">Utworzono</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.status }}</td>
                    <td>{{ order.createdAt }}</td>
                    <td><router-link :to="`/zamowienie/${order.id}`" class="btn btn-primary">Szczegóły</router-link><router-link :to="`/zamowienie/${order.id}/odwolaj`" class="btn btn-danger">Odwolaj</router-link></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const { orders } = defineProps(['orders']);
</script>
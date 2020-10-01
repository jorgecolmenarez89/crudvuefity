<template>
    <v-card style="height:100%;">
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-text>
            {{ post.body }}
        </v-card-text>
        <v-card-actions >
            <v-btn
                depressed
                color="primary"
                text
                @click="editar(post)"
            >
                Editar
            </v-btn>
            <v-btn
                depressed
                color="red"
                text
                @click="eliminar(post)"
            >
                Eliminar
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  
  export default {
    name: 'Item',
    props: {
            post: Object
    },
    data: () => ({}),
    methods: {
        editar(item){
            this.$emit('editar', item);
        },
        eliminar(item){
            this.$emit('eliminar', item);
        }
    }
  }
</script>
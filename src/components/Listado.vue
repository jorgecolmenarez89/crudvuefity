<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h2 class="text-center">Listado de Posts</h2>
                <v-row>
                    <v-col cols="12" sm="4" v-for="(item,index) in posts" :key="index">
                        <Item :post="item" @editar="editarRegistro" @eliminar="eliminarRegistro" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-fab-transition>
            <v-btn
                key="1"
                color="primary"
                fab
                large
                dark
                class="btn-create"
                @click="add"
            >
                <v-icon>{{ icon }}</v-icon>
            </v-btn>
        </v-fab-transition>

        <v-row justify="center">
            <v-dialog  v-model="dialog" persistent max-width="600px" >
                <v-card>
                    <v-card-title>
                        <span v-if="edicion" class="headline">Editar Registro</span>
                        <span v-if="!edicion" class="headline">Crear Registro</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Titulo*"
                                        required
                                        v-model="post.title"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Contenido"
                                        hint="Escriba el contenido de su artículo"
                                        v-model="post.body"
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12" v-if="errors.length > 0" >
                                    <v-alert
                                        border="top"
                                        color="red lighten-2"
                                        dark
                                    >
                                        <ul>
                                            <li v-for="err in errors" :key="err">{{ err }}</li>
                                        </ul>
                                    </v-alert>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            depressed
                            color="primary"
                            text
                            @click="guardarDatos"
                        >
                            Guardar
                        </v-btn>
                        <v-btn
                            depressed
                            color="red"
                            text
                            @click="dialog = false"
                        >
                            Cerrar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>


<script>
    import axios from 'axios';
    import Item from './Item';

  export default {
    name: 'Listado',
    components: {
        Item
    },
    data: () => ({
        posts: [],
        headers: [
            { text: 'Titulo', value: 'title' },
            { text: 'Cuerpo', value: 'body' },
        ],
        icon: 'mdi-plus',
        dialog: false,
        edicion: false,
        post: {id: 0, title: '', body: '', userId: 1},
        errors: []

    }),
    methods: {
        add() {
            this.post = {id: 0, title: '', body: '', userId: 1};
            this.edicion = false;
            this.dialog = true;
        },
        editarRegistro(item){
            this.edicion = true;
            this.post = item;
            this.dialog = true;
        },
        eliminarRegistro(item){
            axios.delete('https://jsonplaceholder.typicode.com/posts/' + item.id)
            .then((response) => {
                console.log(response)
                const news = this.posts.filter(row =>  row.id !== item.id); //quitar el elemento del arreglo
                this.posts = news;
            })
            .catch((error)=>{
                console.log(error);
            });
        },
        guardarDatos(){
            this.errors = [];
            if(!this.post.title){
                this.errors.push('Campo tiulo Incorrecto');
            }
            if(!this.post.body){
                this.errors.push('Campo Contenido Incorrecto');
            }
            if(this.errors.length === 0){
                if(this.edicion){
                    axios.put('https://jsonplaceholder.typicode.com/posts/' + this.post.id, this.post)
                    .then((response) => {
                        this.post = response.data; 
                        this.dialog = false;
                    })
                    .catch((error)=>{
                        console.log(error);
                    });
                } else {
                    axios.post('https://jsonplaceholder.typicode.com/posts/', this.post)
                    .then((response) => {
                        this.posts.push(response.data);
                        this.dialog = false;
                    })
                    .catch((error)=>{
                        console.log(error);
                    });
                }
            }
        }
    },
    mounted() {
        axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            this.posts = response.data;
        })
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>
  .btn-create {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-bottom: 10px;
    margin-right: 10px;
  }
</style>
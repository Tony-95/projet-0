<template>
  <div id="app">
    <v-app id="inspire">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="object.mail"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
              v-model="object.password"
              :rules="required"
              label="Mot de passe"
              :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="() => (value = !value)"
              :type="value ? 'password' : 'text'"
              required
        ></v-text-field>
        <v-btn color="error" class="mr-4" @click="log" x-large rounded> Connexion</v-btn>
      </v-form>
    </v-app>
  </div>
</template>

<script>
import axios from "axios"; //client pour requetes db

export default {
  data: () => ({
    valid: false,
    value: String,
    message: "",
    object: {
      mail: "",
      password: "",
    },
    emailRules: [
      (v) => !!v || "E-mail requis",
      (v) => /.+@.+\..+/.test(v) || "E-mail non valide",
    ],
    required: [(v) => !!v || "Mot de passe requis"],
  }),
  mounted() {
    if (this.$store.state.customerId) {
      this.$router.push("/client/profil");
    }
  },

  methods: {
    // fonction qui log un user, stocker l'id du user en global pour savoir si c'est bien lui, redirige vers le dashboard du user
    log() {
      //On appelle la route login qui permet de log un user
      let url = "http://localhost:5000/customers/login";
      this.$refs.form.validate();
      axios
        .get(url, {
          params: { mail: this.object.mail, password: this.object.password },
        })
        .then((response) => {
          if (response.data) {
            // console.log("CONNECTE", response.data);
            this.$store.commit('loginCustomer', response.data.id_customer)
            this.$router.push("/client/profil");
          } 
          else { 
            console.log("PAS CONNECTE");
            this.message = "Email et/ou password invalide";
          
          }
        })
        .catch((error) => {
          console.log("PAS CONNECTE", error);
          this.message = "Email et/ou password invalide";
        })

    },
  },
};
</script>

<style lang="scss" scoped>
</style>
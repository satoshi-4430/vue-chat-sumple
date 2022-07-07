<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-sheet color="grey lighten-4" class="pa-4">
      <v-avatar color="indigo">
        <input
          type="file"
          ref="fileInput"
          accept="image/jpeg, image/jpg, image/png"
          style="display: none"
          @change="updateIcon"
        />
        <v-icon dark v-if="!photoUrl" @click="changeIcon">
          mdi-account-circle
        </v-icon>
        <img :src="photoUrl" alt="" v-if="photoUrl" @click="changeIcon" />
      </v-avatar>

      <div class="username">{{ auth && auth.displayName }}</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="[icon, text, to] in links" :key="icon" :to="to" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="Logout">
        <v-list-item-icon>
          <v-icon> mdi-logout </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import firebase from "@/firebase/firebase";

export default {
  mounted() {
    this.auth = JSON.parse(sessionStorage.getItem("user"));
    this.photoUrl = this.auth.photoURL
  },
  data: () => ({
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "rooms", "/"],
      // ["mdi-send", "Send", "/about"],
      // ["mdi-delete", "Trash", "/about"],
      // ["mdi-alert-octagon", "Spam", "/about"],
    ],
    auth: null,
    photoUrl: "",
  }),
  methods: {
    Logout() {
      console.log("Logout call");
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.message = "ログアウトしました";
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeIcon() {
      this.$refs.fileInput.click();
    },
    updateIcon() {
      console.log("updateIcon call");
      const user = this.getAuth();
      if (!user) {
        sessionStorage.removeItem("user");
        this.$router.push("/login");
      }
      const file = this.$refs.fileInput.files[0];
      const filePath = `/user/${file.name}`;
      console.log(file);
      firebase
        .storage()
        .ref()
        .child(filePath)
        .put(file)
        .then(async (snapshot) => {
          // console.log("snapshot", snapshot)
          const photoUrl = await snapshot.ref.getDownloadURL();

          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              user.updateProfile({
                photoURL: photoUrl,
              })

              this.auth.photoURL = photoUrl
              sessionStorage.setItem("user", JSON.stringify(this.auth))
              this.photoUrl = photoUrl;
            }
          });
        });
    },

    getAuth() {
      return firebase.auth().onAuthStateChanged((user) => {
        return user;
      });
    },
  },
};
</script>

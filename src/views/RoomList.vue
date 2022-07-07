<template>
  <v-app id="inspire">

      <sideBar />
    <v-app-bar app shrink-on-scroll>
      <v-toolbar-title>ルーム一覧</v-toolbar-title>
      <CreateRoom/>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="room in rooms" :key="room.id" cols="4">
          <router-link :to="{ path: '/chat', query: { room_id: room.id }}">
                <v-avatar color="grey lighten-2" size="128">
                                    <img
                    v-if="!room.thumbnailUrl"
                    alt="Avatar"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  >
                                                      <img
                    v-if="room.thumbnailUrl"
                    alt="Avatar"
                    :src="room.thumbnailUrl"
                  >
                </v-avatar>
                <div class="roomName">{{room.name}}</div>           
            </router-link>

          </v-col>


          <!-- <v-col v-for="n in 24" :key="n" cols="4">
          <router-link :to="{ path: '/chat', query: { user_id: n }}">
                <v-avatar color="grey lighten-2" size="128"></v-avatar>                
            </router-link>

          </v-col> -->
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "@/firebase/firebase"
import sideBar from '@/components/layouts/Side_Bar'
import CreateRoom from '@/components/modal/CreateRoom'
export default {
  components:{
    sideBar,
    CreateRoom
  },
  data:()=>({
    rooms:[],
  }),
  mounted() {
    this.getRooms()
  },
  methods: {
    async getRooms(){
      this.rooms= []
      const roomRef = firebase.firestore().collection("rooms")
      const snapshot = await roomRef.get()
      // snapshot.forEach(doc => {
      //   console.log(doc.data())
      // })
      snapshot.docs.map(doc => {
        // const data = {
        //   name:doc.data().name,
        //   thumbnailUrl:doc.data().thumbnailUrl
        // }

        const data = {...doc.data()}
        data.id = doc.id

        console.log(data)
        this.rooms.push(data)
      })
    },


  },
};
</script>
<style>
.roomName{
  text-decoration: none;
  color: #333;
}
</style>
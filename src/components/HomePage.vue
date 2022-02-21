<template>
 <v-main>
   <section>
     <v-layout
       column
       wrap
       class="my-5"
       align-center
       >
       <v-flex>
         <h1 style="font-family: Copperplate,serif; font-size: 30px" class="animate__animated animate__bounce">ELITE COACHING 42</h1>
       </v-flex>
     </v-layout>
     <v-divider></v-divider>
   </section>
   <section class="presentationSection">
     <v-container>
       <v-row>
         <v-col xs="12" md="6">
           <v-img
               :src="require('../assets/images/latifapix .jpg')"
               class="my-3"
               contain
               height="300"
           />
         </v-col>
         <v-col xs="12" md="6" class="presentation">
           <div>
             <div class="text-center">
               <h3>Image, Bien-être, Développement personnel</h3>
               <br>
               <p class="font-italic">Être soi, c'est être authentique et libre.</p>
             </div>
             <br>
             <div>
               <div class="text-decoration-underline">Mon rôle ?</div>
               <div class="text-center" style="font-size: 18px">
                 <p>Faire en sorte de susciter chez vous
                   <span class="font-italic font-weight-bold">la réflexion , la créativité </span> , pour que vous puissiez évoluer ,
                   <span class="font-italic">atteindre <span class="text-decoration-underline font-weight-bold">vos objectifs</span></span> personnels ou professionnels.
                 </p>
                </div>
             </div>
           </div>
         </v-col>
       </v-row>
     </v-container>
   </section>

   <section class="aproposSection">
     <v-img
       :src="require('../assets/images/pexels-luca-nardone-3651820.jpg')"
     >
       <div style="color: white; padding-top: 50px"  class="text-center">
         <h1>À PROPOS</h1><br>
         <div class="font-italic">
           <p>« Le destin n’est pas une question de chance mais une question de choix. »</p>
           <p>Au cours de mes expériences personnelles et professionnelles, j’ai compris que ma mission de vie consistait <br>à accompagner en tant que coach ceux qui le souhaitent sur le chemin du bien-être et du bonheur.</p>
           <p>Grâce à un travail personnel sur moi, j’ai décidé de vivre mon rêve et d’exercer ma passion.</p>
           <p>Aujourd'hui, ma spécialité, ma passion : "l'humain".</p>
           <p>Vous avez besoin d'être entendu, d'être vu, d'être au centre ?</p>
           <p>Je suis celle qui sait écouter, regarder, voir, accompagner.</p>
           <p>Je suis votre coach.</p>
         </div>
       </div>
     </v-img>
   </section>

   <section class="breackSection">
     <v-container>
       <v-row>
         <v-col xs="12" md="6" class="presentation">
          <p>« La volonté, le courage et l'action sont 3 choses essentielles pour atteindre vos objectifs »</p>
         </v-col>
         <v-col xs="12" md="6">
           <v-img
               :src="require('../assets/images/pexels-min-an-1134190.jpg')"
               class="my-3"
               contain
               height="300"
           />
         </v-col>
       </v-row>
     </v-container>
   </section>

   <v-divider></v-divider>
   <section>
     <v-img
         :src="require('../assets/images/Chaussures de mode.jpeg')"
         class="my-3"
         contain
         height="300"
     />
     <v-container>
       <v-layout row wrap align-center>
         <v-flex class="text-xs-center">
           <h1>Formulaire de contact</h1>
<!--           TODO remplacer 1ff900ac249a96a1c3d359fb15edf8bd par mail de latifa puis par le code envoyé sur son mail-->
           <form action="https://formsubmit.co/1ff900ac249a96a1c3d359fb15edf8bd" method="POST">
             <v-row>
               <v-col>
                 <v-text-field outlined label="E-mail" type="email" name="email" required></v-text-field>
               </v-col>
               <v-col>
                 <v-text-field outlined label="Téléphone" type="phone" name="phone" required></v-text-field>
               </v-col>
             </v-row>
             <v-textarea outlined label="Entrez votre message" type="text" name="message" required></v-textarea>
             <v-btn type="submit">Envoyer</v-btn>
           </form>
         </v-flex>
       </v-layout>
     </v-container>
     <v-container fill-height>
       <v-layout column align-center>
           <h2>Adresse : </h2>
           <p>Elite Coaching 42<br>28 rue Etienne Dolet 42300 ROANNE, France</p>
           <h2>E-mail : </h2>
           <p>elitecoaching42@gmail.com</p>
           <h2>Téléphone : </h2>
           <p>07 71 07 65 32</p>
       </v-layout>
       <template>
         <div id="mapContainer">
           <l-map
               :center="center"
               :zoom="zoom"
               ref="map"
               @update:zoom="zoomUpdated"
               @update:center="centerUpdated"
           >
             <l-tile-layer
                 :url="url"
             >
             </l-tile-layer>
             <l-marker :lat-lng="center" ></l-marker>
           </l-map>
         </div>
       </template>
     </v-container>
   </section>

 </v-main>

</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
export default {
  name: "homepage",
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return{
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [ 46.04621887207031, 4.077489852905273 ],
      zoom: 15,
    }},
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    }
  },
}
</script>
<style>
.presentation {
  display: flex;
  align-items: center;
}
.presentationSection{
  /*background-color: #B4FCFC;*/
}
.map {
  position: absolute;
  width: 80vw;
  height: 50vh;
  overflow :hidden
}
#mapContainer {
  width: 80vw;
  height: 50vh;
}
</style>
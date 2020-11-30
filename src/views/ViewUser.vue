<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- handle error -->
      <div v-if="error" class="ion-padding">
        <p>{{ error.message }}</p>
      </div>

      <!-- handle loading -->
      <ion-loading :is-open="loading"></ion-loading>
      <ion-item v-if="user">
        <ion-label class="ion-text-wrap">
          <h2>{{ user.firstName }} {{ user.lastName }}</h2>
          <h3>
            {{ user.street1 }} {{ user.city }}, {{ user.state }}
            {{ user.zip }}
          </h3>
          <h3>{{ user.email }}</h3>
          <h3>{{ user.phone }}</h3>
          <h3>{{ user.id }}</h3>
        </ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonToolbar,
  IonLoading
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import firebaseService from "@/firebase-service";

export default defineComponent({
  name: "ViewUser",
  props: ["id"],
  setup() {
    const user = ref<any>(null);
    const { getUser, error, loading } = firebaseService();
    const route = useRoute();

    // user.value = getLocalUser(route.params.id as string);
    (async () => {
      user.value = await getUser(route.params.id as string);
    })();


    return {
      user,
      error,
      loading
    };
  },
  components: {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonToolbar,
    IonLoading
  }
});
</script>

<style scoped>
</style>
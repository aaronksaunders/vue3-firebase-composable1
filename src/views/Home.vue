<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>USERS COLLECTION</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- handle error -->
      <div v-if="error" class="ion-padding">
        <p>{{ error.message }}</p>
      </div>

      <!-- handle loading -->
      <ion-loading :is-open="loading"></ion-loading>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content :pulling-icon="chevronDownCircleOutline">
        </ion-refresher-content>
      </ion-refresher>
      <ion-list>
        <user-list-item v-for="user in users" :key="user.id" :user="user" />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonLoading
} from "@ionic/vue";
import { chevronDownCircleOutline } from "ionicons/icons";

import UserListItem from "@/components/UserListItem.vue";
import { defineComponent } from "vue";

// firebase service
import firebaseService from "../firebase-service";

export default defineComponent({
  name: "Home",
  setup() {
    const { users, error, loading, loadUsers } = firebaseService();

    const doRefresh = async (event: CustomEvent) => {
      await loadUsers();
      (event?.target as any)?.complete();
    };

    return {
      users,
      error,
      loading,

      doRefresh,
      chevronDownCircleOutline
    };
  },
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    UserListItem,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonLoading
  }
});
</script>
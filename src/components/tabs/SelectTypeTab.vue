<template>
  <v-sheet>
    <v-list rounded color="transparent">  
      <v-list-item-group
        v-model="selectedItem"
      >
        <v-list-item color="primary" outlined class="rounded-xl">
          <v-card
            height="120"
            flat
            tile
            color="transparent"
            class="d-flex mx-auto py-10"
          >
            <v-icon color="teal" size="50">mdi-library</v-icon>
            <p class="text-h4 teal--text ">Library</p>
          </v-card>
        </v-list-item>
        <v-list-item color="primary"  class="rounded-pill">
          <v-card
              height="120"
              flat
              tile
              color="transparent"
              class="d-flex mx-auto py-10 " 
            >
              <v-icon color="teal" size="50">mdi-view-dashboard</v-icon>
              <p class="text-h4 teal--text">Component</p>
          </v-card>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <div class="d-flex">
      <v-select
        :items="typeItems"
        v-model="selectedType"
        outlined
        label="Element type"
      ></v-select>
      <v-spacer></v-spacer>
      <v-checkbox
        class="mx-2"
        v-model="status"
        label="Public"
      ></v-checkbox>
    </div>
    
  </v-sheet>
</template>

<script>

export default {
  name: 'SelectTypeTab',
  data: () => ({
    typeItems: [
      'VueJS',
      'VueTS',
      'ReactJS',
      'ReactTS',
      'AngularJS',
      'AngularTS',
    ]
  }),
  computed: {
    selectedItem: {
      get () {
        return this.$store.state.ElementStore.elementSelectType
      },
      set (value) {
        this.$store.commit('ElementStore/updateElementType', value)
      }
    },

    selectedType: {
      get () {
        return this.$store.state.ElementStore.elementType
      },
      set (value) {
        this.$store.commit('ElementStore/updateType', value)
      }
    },

    status: {
      get () {
        return this.$store.state.ElementStore.status
      },
      set (value) {
        this.$store.commit('ElementStore/updateStatus', value)
      }
    }
  }
}
</script>

<style scoped>
  .border {
    border: 0.4ch solid teal !important;
  }
</style>
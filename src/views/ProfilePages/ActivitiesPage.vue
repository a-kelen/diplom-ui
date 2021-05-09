<template>
  <v-container class="pa-4 ma-auto">
    <v-row v-for="activity in filtredActivities" :key="activity.id">
      <v-col >
        <activity-item :item="activity"/>
      </v-col>
    </v-row>
    <v-row v-show="noData">
      <no-data-component />
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ActivityItem from '../../components/items/ActivityItem.vue'
import NoDataComponent from '../../components/NoDataComponent.vue'
export default {
  components: { NoDataComponent, ActivityItem },
  name: 'ActivitiesPage',
  props: ['activities'],
  data: () => ({
      noData: false
  }),
  computed: {
    ...mapState({
      filter: s => s.SearchStore.userProfileSearchQuery
    }),

    filtredActivities() {
      if(this.filter)
        return this.activities.filter(x => x.name.toLowerCase().includes(this.filter.toLowerCase()))
      else
        return this.activities
    }
  }
};
</script>

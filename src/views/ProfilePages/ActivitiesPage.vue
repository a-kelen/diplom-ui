<template>
  <v-container class="pa-0 ma-auto">
    <v-row v-for="activity in activities" :key="activity.id">
      <v-col >
        <activity-item  :item="activity"/>
      </v-col>
    </v-row>
    <v-row v-show="noData">
      <no-data-component />
    </v-row>
  </v-container>
</template>

<script>
import ActivityItem from '../../components/items/ActivityItem.vue'
import NoDataComponent from '../../components/NoDataComponent.vue'
export default {
  components: { NoDataComponent, ActivityItem },
  name: 'ActivitiesPage',
  props: ['activities'],
  data: () => ({
      noData: false
  }),
};
</script>

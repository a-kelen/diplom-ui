<template>
    <v-container>
        <v-list two-line>
          <template v-for="(item, index) in historyItems">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{
                item.header
              }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
            ></v-divider>

            <v-list-item
              v-else
              class="ml-5"
              :key="item.title"
            >
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.subtitle"
                ></v-list-item-subtitle>
                <v-flex class="d-flex align-center">
                    <span class="">{{ item.name }}</span>
                    <span class="ml-auto">{{ item.type }}</span>
                    <v-chip  class="ml-5" small>{{ item.action }}</v-chip>
                </v-flex>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>        
    </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'HistoryPage',
    data: () => ({
        
    }),

    created() {
        this.$store.dispatch('HistoryStore/getHistoryItems')
    },

    computed: {
        ...mapState({
            historyItems: s => s.HistoryStore.historyItems
        })
    }
};
</script>


<style scoped>

</style>

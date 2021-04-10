<template>
  <v-snackbar
    v-model="snack"
    :timeout="timeout"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="snack = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  export default {
    data: () => ({
      timeout: 3000
    }),
    props: ['snackbar', 'text'],
    computed: {
        snack: {
            get: function() {
                return this.snackbar
            },
            set: function(value) {
                this.$emit('update:snackbar', value)
            }
        }
    }
  }
</script>
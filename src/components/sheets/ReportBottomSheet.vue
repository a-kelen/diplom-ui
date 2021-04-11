<template>
    <v-bottom-sheet
    v-model="reportSheet"
    inset
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        class="ml-auto"
        dark
        v-bind="attrs"
        v-on="on"
        icon
      >
        <v-icon>mdi-comment-alert-outline</v-icon>
      </v-btn>
    </template>
    <v-sheet
      height="220px"
    >
      <v-row class="d-flex ma-0">
        <v-btn
          class="mr-auto mt-3 ml-3"
          color="primary"
          :disabled="buttonDisabled"
          @click="submit"
        >
          Report
        </v-btn>
        <v-btn
          class="ml-auto mt-3 mr-3"
          text
          color="error"
          @click="reportSheet = !reportSheet"
        >
          close
        </v-btn>
        
      </v-row>
      <v-row class="d-flex ma-3">
        <v-textarea
          v-model="content"
          no-resize
          filled
          rows="4"
          label="Report content"
        ></v-textarea>
      </v-row>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>

export default {
  name: 'ReportBottomSheet',
  data: () => ({
      content: ''
  }),
  props: ['visibility'],
  computed: {
    reportSheet: {
      get: function() {
        return this.visibility
      },
      set: function(value) {
        this.$emit('update:visibility', value)
      }
    },
      
    buttonDisabled() {
        return this.content == ''
    }
  },
  methods: {
    submit() {
      if(this.content != '')
        this.$emit('submit', this.content)
    }
  },
  watch: {
    visibility() {
      if(!this.visibility)
        this.content = ''
    }
  }
}
</script>



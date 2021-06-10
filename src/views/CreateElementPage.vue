<template>
  <v-container>
    <v-stepper v-model="currentStep">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n.id}-step`"
            :complete="currentStep > n.id || n.id == 4"
            :step="n.id"
          >
            {{ n.title }}
          </v-stepper-step>
          <v-divider v-if="n.id !== steps" :key="n.id"></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="n in steps"
          :key="`${n.id}-content`"
          :step="n.id"
        >
          <component :is="n.component"></component>
          <v-btn
            color="primary"
            class="mx-3"
            v-show="n.backVisibleBtn"
            @click="backStep()"
          >
            Back
          </v-btn>
          <v-btn
            :class="[error ? 'error' : 'primary']"
            class="mx-3"
            v-show="n.saveVisibleBtn"
            
            :disabled="saveButtonDisable"
            :loading="saveBtnLoading"
            @click="saveElement"
          >
            Save
          </v-btn>
          <v-btn
            color="primary"
            class="mx-3"
            v-show="n.nextVisibleBtn"
            :disabled="nextButtonDisable"
            @click="nextStep()"
          >
            Continue
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <default-snakbar :snackbar.sync="error" :text="errorText"/>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import SelectTypeTab from '../components/tabs/SelectTypeTab'
import DefaultSnakbar from '../components/snackbars/DefaultSnakbar.vue'
import DescribeLibraryTab from '../components/tabs/DescribeLibraryTab'
import DescribeComponentTab from '../components/tabs/AddComponentTab'
import LibraryDecorateTab from '../components/tabs/LibraryDecorateTab'

export default {
  name: 'CreateElementPage',
  components: {
    SelectTypeTab,
    DefaultSnakbar,
    DescribeLibraryTab,
    DescribeComponentTab,
    LibraryDecorateTab
  },
  data: () => ({
    saveBtnLoading: false,
    error: false,
    errorText: 'Element saving failed',
    e1: 0,
    rawSteps: [
      {
        id: 1,
        title: 'Select type',
        component: 'SelectTypeTab',
        backVisibleBtn: false,
        nextVisibleBtn: true,
        saveVisibleBtn: false
      },
      {
        id: 2,
        title: 'Describe Library',
        component: 'DescribeLibraryTab',
        backVisibleBtn: true,
        nextVisibleBtn: true,
        saveVisibleBtn: false
      },
      {
        id: 3,
        title: 'Decorate Library',
        component: 'LibraryDecorateTab',
        backVisibleBtn: true,
        nextVisibleBtn: false,
        saveVisibleBtn: true
      },
      {
        id: 4,
        title: 'Select & Describe component',
        component: 'DescribeComponentTab',
        backVisibleBtn: true,
        nextVisibleBtn: false,
        saveVisibleBtn: true
      }
    ],
  }),
  computed: {
    ...mapState({
      elementType: s => s.ElementStore.elementSelectType,
      frameworkType: s => s.ElementStore.elementType,
      newLibraryName: s => s.ElementStore.newLibraryName,
      hasDuplicates: s => s.ElementStore.newLibraryHasDuplicates,
      components: s => s.ElementStore.components,
      newComponent: s => s.ElementStore.newComponent
    }),

    steps() {
      if(this.elementType == 1)
        return this.rawSteps.filter(x => ![2, 3].includes(x.id))
      else  return this.rawSteps.filter(x => ![4].includes(x.id))
    },

    currentStep() {
      return this.steps[this.e1].id
    },

    nextButtonDisable() {
      this.newLibraryName
      this.elementType
      if(this.currentStep == 1) {
        return this.elementType == undefined || this.frameworkType == ""
      }
      if(this.currentStep == 2) {
        return this.newLibraryName == ''
      }
      return false;
    },

    saveButtonDisable() {
      
      if(this.elementType == 0)
        return this.components.length === 0 || this.components.some(x => !x.isDone) || this.hasDuplicates
      else  
        return this.newComponent.files.length === 0 || !this.newComponent.name
    },
    
    backButtonVisible() {
      return this.currentStep > 1;
    }
  },

  watch: {
      steps (val) {
        if (this.currentStep > val) {
          this.currentStep = val
        }
      },
    },

  methods: {
      saveElement() {
        this.saveBtnLoading = true
        this.$store.dispatch('ElementStore/createElement').then(() => {
          this.saveBtnLoading = false
          this.$router.push('Dashboard')
        })
        .catch((err) => {
          this.error = true
          this.saveBtnLoading = false
          setTimeout(() => {
            this.error = false
            console.log(err)
          }, 4000)
        })
      },
      nextStep () {
        this.e1++
      },
      backStep () {
        this.e1--
      },
  }

};
</script>

<style scoped>
.gap {
  gap: 1rem;
}
</style>

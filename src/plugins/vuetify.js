import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          options: {
              customProperties: true
          },
          light: {
            primary: colors.teal.darken3,
            secondary: colors.teal.darken2,
            accent: colors.teal,
            background: colors.grey.darken1
          },
          dark: {
            background: '#ffffff'
          },
    
        },
      }
});

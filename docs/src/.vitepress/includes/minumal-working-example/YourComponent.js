// YourComponent.vue
import { GDialog } from 'gitart-vue-dialog'

export default {
  components: {
    GDialog,
  },
  data: () => ({
    dialogState: false,
  }),

  methods: {
    onOpen() {
      this.dialogState = true
    },
  },
}
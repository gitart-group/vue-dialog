<template>
  <div class="app">
    <GDialog v-model="dialogState" max-width="400">
      <div class="text-box">
        <div>
          Header
        </div>
        <p v-for="i in 6" :key="i">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas porro
          aliquid sunt expedita possimus ipsam nihil magni eos quam beatae
          repellat neque totam quidem reiciendis, incidunt commodi sequi, minus
          accusantium?
        </p>
        <div>
          Footer
        </div>
      </div>
    </GDialog>

    <GDialog
      v-model="dialogState2"
      max-width="400"
      scrollable
    >
      <div class="text-box scrollable">
        <div>
          Header
        </div>
        <div class="scrollable-content">
          <p v-for="i in 6" :key="i">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            porro aliquid sunt expedita possimus ipsam nihil magni eos quam beatae
            repellat neque totam quidem reiciendis, incidunt commodi sequi, minus
            accusantium?
          </p>
        </div>
        <div>
          Footer
        </div>
      </div>
    </GDialog>

    <button @click="onClick">
      Simple
    </button>
    <hr>
    <button @click="dialogState2 = true">
      Scrollable
    </button>
    <hr>
    <button @click="onOpenBoth">
      both
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import QLib from '@/gitart-vue-dialog/index'

export default defineComponent({
  name: 'App',
  components: {
    GDialog: QLib.GDialog,
  },

  data: () => ({
    dialogState: false,
    dialogState2: false,
  }),

  methods: {
    onClick() {
      console.log('set true')
      this.dialogState = true
    },
    onOpenBoth() {
      console.log('set true')
      this.dialogState = true
      setTimeout(() => {
        this.dialogState2 = true
      }, 2200)
    },
  },
})
</script>

<style lang="scss">
.app {
  height: 2000px;
}

.text-box {
  background: rgb(248, 248, 248);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  font-size: 20px;
  border-radius: 4px;
}

.scrollable {
  max-height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
}

.scrollable-content {
  overflow: auto;
}
</style>

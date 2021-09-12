<template>
  <div>
    <h3 m="b-3">
      Nested Dialogs
    </h3>

    <GDialog
      v-model="dialogs.first"
      max-width="400"
    >
      <DialogToolbar @close="dialogs.first = false" />

      <div p="x-5 y-4">
        <h3 m="b-4">
          First Dialog
        </h3>

        <p m="b-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quas aliquid, voluptates voluptas commodi inventore.
        </p>

        <Btn m="r-2" @click="dialogs.second = true">
          Second
        </Btn>

        <Btn m="r-2" @click="dialogs.third = true">
          Third
        </Btn>
      </div>
    </GDialog>

    <GDialog
      v-model="dialogs.second"
      fullscreen
    >
      <DialogToolbar @close="dialogs.second = false" />

      <div p="x-5 y-4">
        <h3 m="b-4">
          Second Dialog
        </h3>

        <p m="b-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, sit.
        </p>

        <Btn m="r-2" @click="dialogs.third = true">
          Third
        </Btn>
      </div>
    </GDialog>

    <GDialog
      v-model="dialogs.third"
      max-width="500"
    >
      <DialogToolbar @close="dialogs.third = false" />

      <div p="x-5 y-4">
        <h3 m="b-4">
          Third Dialog
        </h3>
        <p m="b-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio iusto aperiam quasi recusandae nulla officia quibusdam libero et alias minus?
        </p>
      </div>
    </GDialog>

    <Btn
      m="r-2"
      @click="dialogs.first = true"
    >
      First
    </Btn>

    <Btn
      m="r-2"
      @click="dialogs.second = true"
    >
      Second
    </Btn>

    <Btn m="r-2" @click="dialogs.third = true">
      Third
    </Btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { GDialog } from 'gitart-vue-dialog'

import DialogToolbar from '@/components/Dialog/DialogToolbar.vue'

import Btn from '@/components/UI/Btn/Btn.vue'

export default defineComponent({
  name: 'DialogLayout',
  components: {
    GDialog,
    DialogToolbar,
    Btn,
  },

  setup() {
    const dialogs = reactive({
      first: false,
      second: false,
      third: false,
    })

    return {
      dialogs,
    }
  },
})
</script>

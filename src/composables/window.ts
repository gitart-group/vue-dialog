import { onMounted, onUnmounted } from 'vue'

export function useWindowEventListener <E extends keyof WindowEventMap>(
  event: E, listener: (this: Window, ev: WindowEventMap[E]) => any, options?: AddEventListenerOptions,
) {
  onMounted(() => {
    window.addEventListener(event, listener, options)
  })

  onUnmounted(() => {
    window.removeEventListener(event, listener)
  })
}

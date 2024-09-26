import { computed, onMounted, onUnmounted, ref } from 'vue'

export function useMediaQuery() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  const updateSize = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', updateSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateSize)
  })

  const isMobile = computed(() => width.value <= 1024)

  return { isMobile }
}

<template>
  <div ref="containerRef" class="rive-container" :style="containerStyle">
    <canvas ref="canvasRef" :width="width" :height="height"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { Rive, Layout, Fit, Alignment } from '@rive-app/canvas'

interface Props {
  src: string
  stateMachine?: string
  artboard?: string
  autoplay?: boolean
  width?: number
  height?: number
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scaleDown'
  alignment?: 'center' | 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
}

const props = withDefaults(defineProps<Props>(), {
  stateMachine: undefined,
  artboard: undefined,
  autoplay: true,
  width: 400,
  height: 400,
  fit: 'contain',
  alignment: 'center',
})

const emit = defineEmits<{
  load: [rive: Rive]
  error: [error: Error]
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)
let riveInstance: Rive | null = null

const containerStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
}))

const getFit = (fit: string): Fit => {
  const fitMap: Record<string, Fit> = {
    contain: Fit.Contain,
    cover: Fit.Cover,
    fill: Fit.Fill,
    none: Fit.None,
    scaleDown: Fit.ScaleDown,
  }
  return fitMap[fit] || Fit.Contain
}

const getAlignment = (alignment: string): Alignment => {
  const alignmentMap: Record<string, Alignment> = {
    center: Alignment.Center,
    topLeft: Alignment.TopLeft,
    topCenter: Alignment.TopCenter,
    topRight: Alignment.TopRight,
    centerLeft: Alignment.CenterLeft,
    centerRight: Alignment.CenterRight,
    bottomLeft: Alignment.BottomLeft,
    bottomCenter: Alignment.BottomCenter,
    bottomRight: Alignment.BottomRight,
  }
  return alignmentMap[alignment] || Alignment.Center
}

const initRive = async () => {
  if (!canvasRef.value) return

  try {
    riveInstance = new Rive({
      src: props.src,
      canvas: canvasRef.value,
      autoplay: props.autoplay,
      stateMachines: props.stateMachine ? [props.stateMachine] : undefined,
      artboard: props.artboard,
      layout: new Layout({
        fit: getFit(props.fit),
        alignment: getAlignment(props.alignment),
      }),
      onLoad: () => {
        if (riveInstance) {
          riveInstance.resizeDrawingSurfaceToCanvas()
          emit('load', riveInstance)
        }
      },
      onLoadError: (error) => {
        emit('error', new Error(error?.message || 'Failed to load Rive animation'))
      },
    })
  } catch (error) {
    emit('error', error as Error)
  }
}

const cleanup = () => {
  if (riveInstance) {
    riveInstance.cleanup()
    riveInstance = null
  }
}

watch(() => props.src, () => {
  cleanup()
  initRive()
})

onMounted(() => {
  initRive()
})

onUnmounted(() => {
  cleanup()
})

defineExpose({
  getRive: () => riveInstance,
})
</script>

<style scoped>
.rive-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.rive-container canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

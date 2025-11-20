<script setup lang="ts">
interface Insight {
  id: number
  type: 'success' | 'warning' | 'info' | 'tip'
  title: string
  message: string
  action?: {
    label: string
    link: string
  }
}

defineProps<{
  insights: Insight[]
}>()

const getInsightStyle = (type: string) => {
  switch (type) {
    case 'success':
      return {
        bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
        border: 'border-green-200',
        icon: 'bg-green-100 text-green-600',
        iconName: 'check-circle',
      }
    case 'warning':
      return {
        bg: 'bg-gradient-to-r from-orange-50 to-yellow-50',
        border: 'border-orange-200',
        icon: 'bg-orange-100 text-orange-600',
        iconName: 'exclamation-triangle',
      }
    case 'info':
      return {
        bg: 'bg-gradient-to-r from-blue-50 to-cyan-50',
        border: 'border-blue-200',
        icon: 'bg-blue-100 text-blue-600',
        iconName: 'info-circle',
      }
    case 'tip':
      return {
        bg: 'bg-gradient-to-r from-purple-50 to-pink-50',
        border: 'border-purple-200',
        icon: 'bg-purple-100 text-purple-600',
        iconName: 'lightbulb',
      }
    default:
      return {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        icon: 'bg-gray-100 text-gray-600',
        iconName: 'info-circle',
      }
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'brain']" class="text-white text-lg" />
      </div>
      <div>
        <h3 class="text-xl font-bold text-gray-900">AI Insights</h3>
        <p class="text-sm text-gray-600">Personalized recommendations</p>
      </div>
    </div>
    
    <div class="space-y-3">
      <div
        v-for="insight in insights"
        :key="insight.id"
        :class="[
          'p-4 rounded-xl border transition-all hover:shadow-md',
          getInsightStyle(insight.type).bg,
          getInsightStyle(insight.type).border,
        ]"
      >
        <div class="flex items-start gap-3">
          <div :class="['w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', getInsightStyle(insight.type).icon]">
            <font-awesome-icon :icon="['fas', getInsightStyle(insight.type).iconName]" class="text-sm" />
          </div>
          
          <div class="flex-1">
            <h4 class="font-bold text-gray-900 mb-1">{{ insight.title }}</h4>
            <p class="text-sm text-gray-700 mb-3">{{ insight.message }}</p>
            
            <RouterLink
              v-if="insight.action"
              :to="insight.action.link"
              class="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition"
            >
              {{ insight.action.label }}
              <font-awesome-icon :icon="['fas', 'arrow-right']" class="text-xs" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
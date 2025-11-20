<script setup lang="ts">
interface Goal {
  id: number
  title: string
  target: number
  current: number
  unit: string
  icon: string
  color: string
  deadline?: string
}

defineProps<{
  goals: Goal[]
}>()

const getProgress = (current: number, target: number) => {
  return Math.min(Math.round((current / target) * 100), 100)
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-gray-900">Learning Goals</h3>
      <button class="text-primary-600 hover:text-primary-700 font-semibold text-sm">
        Edit Goals
      </button>
    </div>
    
    <div class="space-y-4">
      <div
        v-for="goal in goals"
        :key="goal.id"
        class="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-primary-200 transition-all"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', `bg-${goal.color}-100`]">
              <font-awesome-icon :icon="['fas', goal.icon]" :class="['text-lg', `text-${goal.color}-600`]" />
            </div>
            <div>
              <h4 class="font-bold text-gray-900">{{ goal.title }}</h4>
              <p class="text-xs text-gray-600">
                {{ goal.current }}/{{ goal.target }} {{ goal.unit }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <div :class="['text-2xl font-bold', `text-${goal.color}-600`]">
              {{ getProgress(goal.current, goal.target) }}%
            </div>
          </div>
        </div>
        
        <div class="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            :class="[
              'h-2 rounded-full transition-all duration-500',
              `bg-gradient-to-r from-${goal.color}-500 to-${goal.color}-600`,
            ]"
            :style="{ width: `${getProgress(goal.current, goal.target)}%` }"
          >
            <div class="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>
        
        <p v-if="goal.deadline" class="text-xs text-gray-500 mt-2">
          Deadline: {{ goal.deadline }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  color: string
  bgColor: string
  unlocked: boolean
  progress?: number
  date?: string
}

defineProps<{
  achievements: Achievement[]
}>()

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-gray-900">Achievements</h3>
      <span class="text-sm text-gray-600">
        {{ achievements.filter(a => a.unlocked).length }}/{{ achievements.length }} unlocked
      </span>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="achievement in achievements"
        :key="achievement.id"
        :class="[
          'relative p-4 rounded-xl border-2 transition-all cursor-pointer group',
          achievement.unlocked
            ? 'border-gray-200 hover:border-primary-300 hover:shadow-md'
            : 'border-gray-100 opacity-60',
        ]"
      >
        <!-- Unlock Animation Glow -->
        <div
          v-if="achievement.unlocked"
          class="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
        ></div>
        
        <div class="relative">
          <div
            :class="[
              'w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110',
              achievement.unlocked ? achievement.bgColor : 'bg-gray-100',
            ]"
          >
            <font-awesome-icon
              :icon="['fas', achievement.icon]"
              :class="['text-xl', achievement.unlocked ? achievement.color : 'text-gray-400']"
            />
          </div>
          
          <h4 class="font-bold text-gray-900 text-sm mb-1">{{ achievement.title }}</h4>
          <p class="text-xs text-gray-600 mb-2">{{ achievement.description }}</p>
          
          <div v-if="achievement.unlocked && achievement.date" class="text-xs text-gray-500">
            Unlocked {{ formatDate(achievement.date) }}
          </div>
          
          <div v-else-if="!achievement.unlocked && achievement.progress !== undefined" class="mt-2">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs text-gray-600">Progress</span>
              <span class="text-xs font-bold text-gray-700">{{ achievement.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5">
              <div
                class="bg-gradient-to-r from-primary-500 to-primary-600 h-1.5 rounded-full transition-all"
                :style="{ width: `${achievement.progress}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
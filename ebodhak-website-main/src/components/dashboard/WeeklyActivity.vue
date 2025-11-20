<script setup lang="ts">
interface DayActivity {
  day: string
  hours: number
  date: string
}

defineProps<{
  weekData: DayActivity[]
}>()

const maxHours = 8
const getBarHeight = (hours: number) => {
  return Math.min((hours / maxHours) * 100, 100)
}

const getBarColor = (hours: number) => {
  if (hours >= 4) return 'bg-gradient-to-t from-green-500 to-green-400'
  if (hours >= 2) return 'bg-gradient-to-t from-blue-500 to-blue-400'
  if (hours > 0) return 'bg-gradient-to-t from-yellow-500 to-yellow-400'
  return 'bg-gray-200'
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-xl font-bold text-gray-900">Weekly Activity</h3>
        <p class="text-sm text-gray-600">Your learning hours this week</p>
      </div>
      <div class="text-right">
        <div class="text-2xl font-bold text-primary-600">
          {{ weekData.reduce((sum, day) => sum + day.hours, 0) }}h
        </div>
        <p class="text-xs text-gray-600">Total</p>
      </div>
    </div>
    
    <div class="flex items-end justify-between gap-2 h-40">
      <div
        v-for="day in weekData"
        :key="day.day"
        class="flex-1 flex flex-col items-center gap-2 group"
      >
        <div class="relative w-full flex-1 flex items-end">
          <div class="w-full relative">
            <!-- Bar -->
            <div
              :class="[
                'w-full rounded-t-lg transition-all duration-300 group-hover:opacity-80 relative overflow-hidden',
                getBarColor(day.hours),
              ]"
              :style="{ height: `${getBarHeight(day.hours)}%` }"
            >
              <!-- Shine effect -->
              <div class="absolute inset-0 bg-gradient-to-t from-transparent to-white/30"></div>
            </div>
            
            <!-- Tooltip on hover -->
            <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {{ day.hours }}h
              <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          </div>
        </div>
        
        <!-- Day label -->
        <div class="text-center">
          <div class="text-xs font-bold text-gray-900">{{ day.day }}</div>
          <div class="text-xs text-gray-500">{{ day.date }}</div>
        </div>
      </div>
    </div>
    
    <!-- Legend -->
    <div class="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-gray-100">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-green-400"></div>
        <span class="text-xs text-gray-600">4+ hours</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-400"></div>
        <span class="text-xs text-gray-600">2-4 hours</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400"></div>
        <span class="text-xs text-gray-600">&lt;2 hours</span>
      </div>
    </div>
  </div>
</template>
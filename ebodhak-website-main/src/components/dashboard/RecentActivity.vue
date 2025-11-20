<script setup lang="ts">
import type { RecentActivity } from '@/types/dashboard'

defineProps<{
  activities: RecentActivity[]
}>()

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'course':
      return 'book-open'
    case 'test':
      return 'trophy'
    case 'achievement':
      return 'award'
    case 'class':
      return 'video'
    default:
      return 'bell'
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case 'course':
      return 'bg-blue-100 text-blue-600'
    case 'test':
      return 'bg-yellow-100 text-yellow-600'
    case 'achievement':
      return 'bg-purple-100 text-purple-600'
    case 'class':
      return 'bg-green-100 text-green-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const formatTimeAgo = (dateString: string) => {
  const now = new Date()
  const date = new Date(dateString)
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    const minutes = Math.floor(diff / (1000 * 60))
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-200 p-6">
    <h3 class="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
    
    <div class="space-y-4">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
      >
        <div :class="['w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', getActivityColor(activity.type)]">
          <font-awesome-icon :icon="['fas', getActivityIcon(activity.type)]" />
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="font-semibold text-gray-900 mb-1">{{ activity.title }}</h4>
          <p class="text-sm text-gray-600 mb-1">{{ activity.description }}</p>
          <span class="text-xs text-gray-500">{{ formatTimeAgo(activity.timestamp) }}</span>
        </div>
      </div>
    </div>

    <div v-if="activities.length === 0" class="text-center py-8">
      <font-awesome-icon :icon="['fas', 'inbox']" class="text-4xl text-gray-300 mb-3" />
      <p class="text-gray-600">No recent activity</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import {
  Activity,
  Mic2,
  AlertCircle,
  CheckCircle2,
  Music2,
  Wind,
  Weight,
} from 'lucide-vue-next'

// 1. TypeScript Interfaces
interface ToneAnalysis {
  timbre: string
  texture: string
  vocalWeight: string
}

interface ImprovementTip {
  issueName: string
  fix: string
}

interface Exercise {
  exerciseName: string
  description: string
}

interface AnalysisResult {
  vocalToneAnalysis: ToneAnalysis
  improvementTips: ImprovementTip[]
  suggestedExercises: Exercise[]
}

// 2. Mock Data
const MOCK_DATA: AnalysisResult = {
  vocalToneAnalysis: {
    timbre: 'Warm and Resonant',
    texture: 'Slightly Breathy',
    vocalWeight: 'Medium-Light (Likely Baritone)',
  },
  improvementTips: [
    {
      issueName: 'Inconsistent Airflow',
      fix: 'Focus on steady diaphragmatic support rather than pushing from the throat. Imagine a steady stream of water.',
    },
    {
      issueName: 'Scooping Pitch',
      fix: 'Attack the note directly rather than sliding up to it. Visualize landing on top of the note.',
    },
  ],
  suggestedExercises: [
    {
      exerciseName: 'Lip Trills',
      description:
        'Blow air through loose lips to create a motorboat sound while sliding up and down your range. This balances pressure.',
    },
    {
      exerciseName: 'Ngang Sirens',
      description:
        "Make a 'ng' sound (like in 'sing') and slide from your lowest to highest note to improve nasal resonance.",
    },
  ],
}

// 3. Get data from history state, with a fallback to MOCK_DATA
const data = computed(() => (history.state.results || MOCK_DATA) as AnalysisResult)


// 4. Helper to organize the Tone Cards for the template
const toneCards = computed(() => [
  {
    label: 'Timbre',
    value: data.value.vocalToneAnalysis.timbre,
    desc: 'Your unique tone color',
    icon: Mic2,
    colorClass: 'text-blue-500',
  },
  {
    label: 'Texture',
    value: data.value.vocalToneAnalysis.texture,
    desc: 'Surface quality of sound',
    icon: Wind,
    colorClass: 'text-teal-500',
  },
  {
    label: 'Vocal Weight',
    value: data.value.vocalToneAnalysis.vocalWeight,
    desc: 'Perceived heaviness',
    icon: Weight,
    colorClass: 'text-purple-500',
  },
])
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
    <div class="max-w-4xl mx-auto space-y-8">
      <header class="text-center space-y-2 mb-10">
        <div
          class="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4"
        >
          <Mic2 class="w-8 h-8 text-indigo-600" />
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-slate-900">
          Vocal Analysis Report
        </h1>
        <p class="text-slate-500">
          Here is the breakdown of your unique sound and how to improve.
        </p>
      </header>

      <section>
        <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
          <Music2 class="w-5 h-5 text-indigo-600" />
          Vocal Profile
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="(card, index) in toneCards"
            :key="index"
            class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow"
          >
            <div class="p-3 bg-slate-50 rounded-full mb-3">
              <component
                :is="card.icon"
                class="w-5 h-5"
                :class="card.colorClass"
              />
            </div>
            <h3
              class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1"
            >
              {{ card.label }}
            </h3>
            <p class="text-lg font-bold text-slate-900 mb-1">
              {{ card.value }}
            </p>
            <p class="text-xs text-slate-400">
              {{ card.desc }}
            </p>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section class="space-y-4">
          <h2 class="text-xl font-semibold flex items-center gap-2">
            <AlertCircle class="w-5 h-5 text-amber-500" />
            Areas for Improvement
          </h2>
          <div class="space-y-3">
            <div
              v-for="(tip, idx) in data.improvementTips"
              :key="idx"
              class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
            >
              <h3
                class="font-medium text-amber-700 mb-2 flex items-center gap-2"
              >
                <span
                  class="bg-amber-100 px-2 py-0.5 rounded text-xs uppercase tracking-wide font-bold"
                >
                  Issue
                </span>
                {{ tip.issueName }}
              </h3>
              <div class="text-slate-600 text-sm leading-relaxed">
                <span class="font-semibold text-slate-900">Try this: </span>
                {{ tip.fix }}
              </div>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold flex items-center gap-2">
            <Activity class="w-5 h-5 text-green-600" />
            Recommended Exercises
          </h2>
          <div class="space-y-3">
            <div
              v-for="(exercise, idx) in data.suggestedExercises"
              :key="idx"
              class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex gap-4"
            >
              <div class="mt-1">
                <CheckCircle2 class="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 class="font-bold text-slate-900 mb-1">
                  {{ exercise.exerciseName }}
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed">
                  {{ exercise.description }}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

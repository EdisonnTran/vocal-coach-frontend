<script setup>
import Record from "@/frontend/components/Record.vue";
</script>

<script>
export default {
  name: 'VocalCoachUI',
  data() {
    return {
      // Represents the current state of the app
      // 'idle', 'recording', 'analyzing', 'results'
      appState: 'idle', // 'idle', 'recording', 'analyzing', 'results'
      analysis: null, // To store results from the backend
    };
  },
  methods: {
    // This method will be triggered by an event from a child component
    // or after the recording is processed.
    showResults() {
      // Mock analysis data
      this.analysis = {
        vocalRange: {
          type: 'Baritone',
          low: 'G2',
          high: 'F4',
        },
        timbre: {
          brightness: 75, // out of 100
          richness: 60,
        },
        tone: ['Clear', 'Warm'],
        improvements: [
          { id: 1, title: 'Breathing Support', description: 'Practice diaphragmatic breathing to sustain notes longer.' },
          { id: 2, title: 'Pitch Accuracy', description: 'Use pitch training apps to improve your accuracy on scales.' },
        ],
      };
      this.appState = 'results';
    },
    // Method to go back to the initial state
    resetApp() {
      this.appState = 'idle';
      this.analysis = null;
    }
  }
};
</script>

<template>
  <div id="app-container">
    <header>
      <h1>Vocal Coach AI</h1>
      <p>Analyze your voice and discover your potential.</p>
    </header>

    <main>
      <Record />
    </main>
  </div>
</template>

<style scoped>
/* Modern Styling with a Green and White Theme */
#app-container {
  font-family: 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1F2937; /* Darker text for better contrast */
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
}

header {
  margin-bottom: 50px;
}

h1 {
  color: #10B981; /* Vibrant Green */
  font-size: 2.5rem;
  font-weight: 600;
}

p {
  font-size: 1.1rem;
  color: #4B5563; /* Medium gray for subtext */
}

main {
  /* The <Record> component will be placed here */
}
</style>
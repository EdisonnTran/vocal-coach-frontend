<script>
export default {
  name: 'VocalCoachUI',
  data() {
    return {
      // Represents the current state of the app
      // 'idle', 'recording', 'analyzing', 'results'
      appState: 'idle',
      analysis: null, // To store results from the backend
    };
  },
  methods: {
    startRecording() {
      this.appState = 'recording';
      console.log('Recording started...');
      // Placeholder for recording logic.
      // After a few seconds, we'll simulate completion.
      setTimeout(this.finishRecording, 5000);
    },
    finishRecording() {
      this.appState = 'analyzing';
      console.log('Recording finished. Analyzing...');
      // In a real app, you would send the recording to your backend here.
      // For now, we'll simulate an API call.
      setTimeout(this.showResults, 3000);
    },
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
    resetApp() {
      this.appState = 'idle';
      this.analysis = null;
    }
  },
};
</script>

<template>
  <div id="app-container">
    <header>
      <h1>Vocal Coach AI</h1>
      <p>Analyze your voice and discover your potential.</p>
    </header>

    <main>
      <!-- Idle State: Ready to record -->
      <div v-if="appState === 'idle'" class="card">
        <h2>Ready to Analyze Your Voice?</h2>
        <p>Click the button below to start recording. Sing a scale or a short piece of a song.</p>
        <button @click="startRecording">Start Recording</button>
      </div>

      <!-- Recording State -->
      <div v-if="appState === 'recording'" class="card recording-indicator">
        <h2>Recording...</h2>
        <div class="pulsing-dot"></div>
        <p>Sing clearly into your microphone.</p>
      </div>

      <!-- Analyzing State -->
      <div v-if="appState === 'analyzing'" class="card">
        <h2>Analyzing Your Voice...</h2>
        <p>Our AI is working its magic. This will just take a moment.</p>
      </div>

      <!-- Results State -->
      <div v-if="appState === 'results' && analysis" class="results-container">
        <h2>Your Vocal Analysis</h2>
        <div class="card">
          <h3>Vocal Range: {{ analysis.vocalRange.type }}</h3>
          <p>Your estimated range is from <strong>{{ analysis.vocalRange.low }}</strong> to <strong>{{ analysis.vocalRange.high }}</strong>.</p>
        </div>
        <div class="card">
          <h3>Tone & Timbre</h3>
          <p>Your tone is described as: <strong>{{ analysis.tone.join(', ') }}</strong>.</p>
        </div>
        <div class="card">
          <h3>Areas for Improvement</h3>
          <ul>
            <li v-for="tip in analysis.improvements" :key="tip.id">
              <strong>{{ tip.title }}:</strong> {{ tip.description }}
            </li>
          </ul>
        </div>
        <button @click="resetApp">Analyze Again</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Add some modern styling */
#app-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
}

header {
  margin-bottom: 40px;
}

h1 {
  color: #42b983;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #36a473;
}

.recording-indicator .pulsing-dot {
  height: 20px;
  width: 20px;
  background-color: red;
  border-radius: 50%;
  margin: 20px auto;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(255, 82, 82, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 82, 82, 0); }
}

.results-container ul {
  list-style-type: none;
  padding: 0;
}

.results-container li {
  margin-bottom: 10px;
}
</style>
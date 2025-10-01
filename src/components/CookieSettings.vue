<template>
  <v-dialog v-model="showDialog" max-width="600" persistent>
    <v-card>
      <!-- Header -->
      <v-card-title class="d-flex align-center pa-6 pb-4">
        <v-icon color="jutta-600" size="24" class="mr-3">mdi-cookie</v-icon>
        <span class="text-h6 font-display">Cookie-Einstellungen</span>
      </v-card-title>
      
      <!-- Content -->
      <v-card-text class="pa-6 pt-0">
        <p class="text-jutta-700 mb-6">
          Verwalten Sie Ihre Cookie-Einstellungen. Sie können Ihre Auswahl jederzeit ändern.
        </p>
        
        <!-- Cookie Categories -->
        <div class="space-y-6">
          <!-- Essential Cookies -->
          <div class="d-flex align-start justify-space-between">
            <div class="flex-grow-1 mr-4">
              <h4 class="text-subtitle-1 font-weight-medium text-jutta-900 mb-2">
                Notwendige Cookies
              </h4>
              <p class="text-body-2 text-jutta-600 mb-0">
                Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.
              </p>
            </div>
            <v-switch
              :model-value="true"
              color="jutta-600"
              disabled
              density="compact"
              hide-details
            ></v-switch>
          </div>
          
          <!-- Analytics Cookies -->
          <div class="d-flex align-start justify-space-between">
            <div class="flex-grow-1 mr-4">
              <h4 class="text-subtitle-1 font-weight-medium text-jutta-900 mb-2">
                Analyse-Cookies
              </h4>
              <p class="text-body-2 text-jutta-600 mb-0">
                Helfen uns zu verstehen, wie Besucher mit der Website interagieren (Google Analytics).
              </p>
            </div>
            <v-switch
              v-model="analyticsEnabled"
              color="jutta-600"
              density="compact"
              hide-details
            ></v-switch>
          </div>
          
          <!-- Marketing Cookies -->
          <div class="d-flex align-start justify-space-between">
            <div class="flex-grow-1 mr-4">
              <h4 class="text-subtitle-1 font-weight-medium text-jutta-900 mb-2">
                Marketing-Cookies
              </h4>
              <p class="text-body-2 text-jutta-600 mb-0">
                Werden verwendet, um Besuchern relevante Anzeigen und Inhalte zu zeigen.
              </p>
            </div>
            <v-switch
              v-model="marketingEnabled"
              color="jutta-600"
              density="compact"
              hide-details
            ></v-switch>
          </div>
        </div>
        
        <!-- Details Section -->
        <v-expand-transition>
          <div v-if="showDetails" class="mt-6">
            <v-divider class="mb-4"></v-divider>
            <h4 class="text-subtitle-1 font-weight-medium text-jutta-900 mb-3">
              Detaillierte Informationen
            </h4>
            
            <div class="space-y-4">
              <div>
                <h5 class="text-body-1 font-weight-medium text-jutta-900 mb-2">
                  Google Analytics
                </h5>
                <p class="text-body-2 text-jutta-600 mb-2">
                  Wir verwenden Google Analytics, um zu verstehen, wie Besucher unsere Website nutzen. 
                  Diese Daten helfen uns, die Website zu verbessern und die Benutzererfahrung zu optimieren.
                </p>
                <div class="text-caption text-jutta-500">
                  <strong>Anbieter:</strong> Google LLC<br>
                  <strong>Zweck:</strong> Website-Analyse und -Optimierung<br>
                  <strong>Datenschutz:</strong> 
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    class="text-jutta-600 hover:text-jutta-900 text-decoration-none"
                  >
                    Google Datenschutzerklärung
                  </a>
                </div>
              </div>
            </div>
          </div>
        </v-expand-transition>
      </v-card-text>
      
      <!-- Actions -->
      <v-card-actions class="pa-6 pt-0">
        <v-spacer></v-spacer>
        
        <v-btn
          variant="text"
          color="jutta-600"
          @click="showDetails = !showDetails"
          class="mr-2"
        >
          {{ showDetails ? 'Weniger Details' : 'Mehr Details' }}
        </v-btn>
        
        <v-btn
          variant="outlined"
          color="jutta-600"
          @click="acceptOnlyEssential"
          class="mr-2"
        >
          Nur Notwendige
        </v-btn>
        
        <v-btn
          color="jutta-900"
          @click="saveSettings"
          class="text-white"
        >
          Einstellungen Speichern
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

// Props
const props = defineProps<{
  modelValue: boolean;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

// State
const showDialog = ref(false);
const showDetails = ref(false);
const analyticsEnabled = ref(false);
const marketingEnabled = ref(false);

// Cookie keys
const COOKIE_ANALYTICS_KEY = 'jutta_horn_analytics_enabled';
const COOKIE_MARKETING_KEY = 'jutta_horn_marketing_enabled';

// Load saved preferences
const loadPreferences = () => {
  const analytics = localStorage.getItem(COOKIE_ANALYTICS_KEY);
  const marketing = localStorage.getItem(COOKIE_MARKETING_KEY);
  
  analyticsEnabled.value = analytics === 'true';
  marketingEnabled.value = marketing === 'true';
};

// Save preferences
const savePreferences = () => {
  localStorage.setItem(COOKIE_ANALYTICS_KEY, analyticsEnabled.value.toString());
  localStorage.setItem(COOKIE_MARKETING_KEY, marketingEnabled.value.toString());
};

// Initialize Google Analytics
const initGoogleAnalytics = () => {
  if (analyticsEnabled.value) {
    // Load Google Analytics script if not already loaded
    if (!document.querySelector('script[src*="googletagmanager.com"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-H60N6X4QFN';
      document.head.appendChild(script);
    }
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', 'G-H60N6X4QFN', {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });
  }
};

// Actions
const acceptOnlyEssential = () => {
  analyticsEnabled.value = false;
  marketingEnabled.value = false;
  savePreferences();
  closeDialog();
};

const saveSettings = () => {
  savePreferences();
  initGoogleAnalytics();
  closeDialog();
};

const closeDialog = () => {
  showDialog.value = false;
  emit('update:modelValue', false);
};

// Watch for modelValue changes
watch(() => props.modelValue, (newValue) => {
  showDialog.value = newValue;
  if (newValue) {
    loadPreferences();
  }
});

// Watch for showDialog changes
watch(showDialog, (newValue) => {
  emit('update:modelValue', newValue);
});

// Initialize
onMounted(() => {
  loadPreferences();
  initGoogleAnalytics();
});
</script>

<style scoped>
.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}
</style>

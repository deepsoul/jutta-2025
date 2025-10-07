<template>
  <div
    v-if="showDialog"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
  >
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
      @click="closeDialog"
    ></div>

    <!-- Dialog -->
    <div
      class="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100"
    >
      <!-- Header -->
      <div class="px-6 py-4 border-b border-jutta-200">
        <div class="flex items-center">
          <v-icon color="jutta-600" size="24" class="mr-3">mdi-cookie</v-icon>
          <h3 class="text-lg font-display font-semibold text-jutta-900">
            Cookie-Einstellungen
          </h3>
        </div>
      </div>

      <!-- Content -->
      <div class="px-6 py-4">
        <p class="text-jutta-700 mb-4 leading-relaxed">
          Wir verwenden Cookies, um Ihnen die beste Erfahrung auf unserer
          Website zu bieten. Sie können Ihre Einstellungen jederzeit anpassen.
        </p>

        <!-- Cookie Categories -->
        <div class="space-y-4">
          <!-- Essential Cookies -->
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h4 class="text-sm font-medium text-jutta-900 mb-1">
                Notwendige Cookies
              </h4>
              <p class="text-xs text-jutta-600">
                Diese Cookies sind für die Grundfunktionen der Website
                erforderlich.
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
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h4 class="text-sm font-medium text-jutta-900 mb-1">
                Analyse-Cookies
              </h4>
              <p class="text-xs text-jutta-600">
                Helfen uns zu verstehen, wie Besucher mit der Website
                interagieren.
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
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h4 class="text-sm font-medium text-jutta-900 mb-1">
                Marketing-Cookies
              </h4>
              <p class="text-xs text-jutta-600">
                Werden verwendet, um Besuchern relevante Anzeigen zu zeigen.
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
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-jutta-200 bg-jutta-50">
        <div class="flex flex-col sm:flex-row gap-3">
          <v-btn
            variant="outlined"
            color="jutta-600"
            @click="acceptOnlyEssential"
            class="flex-1"
          >
            Nur Notwendige
          </v-btn>

          <v-btn
            variant="outlined"
            color="jutta-600"
            @click="showDetails = !showDetails"
            class="flex-1"
          >
            {{ showDetails ? 'Weniger' : 'Details' }}
          </v-btn>

          <v-btn color="jutta-900" @click="acceptAll" class="flex-1 text-white">
            Alle Akzeptieren
          </v-btn>
        </div>
      </div>

      <!-- Details Section -->
      <div
        v-if="showDetails"
        class="px-6 py-4 border-t border-jutta-200 bg-jutta-50"
      >
        <div class="space-y-3">
          <div>
            <h4 class="text-sm font-medium text-jutta-900 mb-2">
              Google Analytics
            </h4>
            <p class="text-xs text-jutta-600 mb-2">
              Wir verwenden Google Analytics, um zu verstehen, wie Besucher
              unsere Website nutzen. Diese Daten helfen uns, die Website zu
              verbessern.
            </p>
            <div class="text-xs text-jutta-500">
              <strong>Anbieter:</strong> Google LLC<br />
              <strong>Zweck:</strong> Website-Analyse<br />
              <strong>Datenschutz:</strong>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                class="text-jutta-600 hover:text-jutta-900 underline"
              >
                Google Datenschutzerklärung
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from 'vue';

// State
const showDialog = ref(false);
const showDetails = ref(false);
const analyticsEnabled = ref(false);
const marketingEnabled = ref(false);

// Cookie management
const COOKIE_CONSENT_KEY = 'jutta_horn_cookie_consent';
const COOKIE_ANALYTICS_KEY = 'jutta_horn_analytics_enabled';
const COOKIE_MARKETING_KEY = 'jutta_horn_marketing_enabled';

// Check if user has already made a choice
const hasConsent = () => {
  return localStorage.getItem(COOKIE_CONSENT_KEY) !== null;
};

// Load saved preferences
const loadPreferences = () => {
  const analytics = localStorage.getItem(COOKIE_ANALYTICS_KEY);
  const marketing = localStorage.getItem(COOKIE_MARKETING_KEY);

  analyticsEnabled.value = analytics === 'true';
  marketingEnabled.value = marketing === 'true';
};

// Save preferences
const savePreferences = () => {
  localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
  localStorage.setItem(COOKIE_ANALYTICS_KEY, analyticsEnabled.value.toString());
  localStorage.setItem(COOKIE_MARKETING_KEY, marketingEnabled.value.toString());
};

// Initialize Google Analytics
const initGoogleAnalytics = () => {
  if (analyticsEnabled.value) {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-H60N6X4QFN';
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'G-H60N6X4QFN', {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
    });
  }
};

// Actions
const acceptAll = () => {
  analyticsEnabled.value = true;
  marketingEnabled.value = true;
  savePreferences();
  initGoogleAnalytics();
  showDialog.value = false;
};

const acceptOnlyEssential = () => {
  analyticsEnabled.value = false;
  marketingEnabled.value = false;
  savePreferences();
  showDialog.value = false;
};

const closeDialog = () => {
  // Don't allow closing without making a choice
  if (!hasConsent()) {
    return;
  }
  showDialog.value = false;
};

// Watch for changes in analytics setting
const updateAnalytics = () => {
  if (analyticsEnabled.value) {
    initGoogleAnalytics();
  } else {
    // Disable analytics if already loaded
    if (window.gtag) {
      gtag('config', 'G-H60N6X4QFN', {
        send_page_view: false,
      });
    }
  }
};

// Initialize on mount
onMounted(() => {
  if (!hasConsent()) {
    showDialog.value = true;
  } else {
    loadPreferences();
    initGoogleAnalytics();
  }
});

// Watch for changes
watch(() => analyticsEnabled.value, updateAnalytics);
</script>

<style scoped>
/* Custom styles for the dialog */
.fixed {
  backdrop-filter: blur(4px);
}

/* Smooth transitions */
.transform {
  transition: transform 0.3s ease-in-out;
}

/* Custom scrollbar for details section */
.space-y-3::-webkit-scrollbar {
  width: 4px;
}

.space-y-3::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.space-y-3::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.space-y-3::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>

<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-white jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" lg="8" class="mx-auto text-center">
            <h1 class="jutta-heading mb-8">Kontakt</h1>
            <p class="text-xl text-jutta-700 leading-relaxed">
              Ich freue mich über Ihre Nachricht und den Austausch über Kunst,
              Leben und die kleinen Wunder des Alltags.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Contact Information -->
    <section class="bg-jutta-50 jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" lg="6">
            <h2 class="jutta-subheading mb-8">Kontaktinformationen</h2>
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <v-icon color="jutta-600" size="24">mdi-email</v-icon>
                <div>
                  <h3 class="text-lg font-medium text-jutta-900 mb-1">
                    E-Mail
                  </h3>
                  <a
                    href="mailto:info@juttahorn.de"
                    class="text-jutta-600 hover:text-jutta-900 transition-colors"
                  >
                    info@juttahorn.de
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <v-icon color="jutta-600" size="24">mdi-phone</v-icon>
                <div>
                  <h3 class="text-lg font-medium text-jutta-900 mb-1">
                    Telefon
                  </h3>
                  <a
                    href="tel:+4915233644324"
                    class="text-jutta-600 hover:text-jutta-900 transition-colors"
                  >
                    +49 1523 3644 324
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <v-icon color="jutta-600" size="24">mdi-map-marker</v-icon>
                <div>
                  <h3 class="text-lg font-medium text-jutta-900 mb-1">
                    Atelier
                  </h3>
                  <p class="text-jutta-600">
                    Rosenweg 29<br />
                    71287 Weissach-Flacht<br />
                    Deutschland
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <v-icon color="jutta-600" size="24">mdi-clock</v-icon>
                <div>
                  <h3 class="text-lg font-medium text-jutta-900 mb-1">
                    Atelierbesuche
                  </h3>
                  <p class="text-jutta-600">
                    Nach Vereinbarung<br />
                    Termine gerne per E-Mail oder Telefon
                  </p>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" lg="6">
            <div class="aspect-square bg-jutta-100 rounded-lg overflow-hidden">
              <img
                src="/assets/atelier-kontakt.jpg"
                alt="Jutta Horn im Atelier"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Contact Form -->
    <section class="bg-white jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" lg="8" class="mx-auto">
            <h2 class="jutta-subheading mb-8 text-center">Schreiben Sie mir</h2>

            <v-form @submit.prevent="submitForm" ref="form">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.name"
                    label="Name"
                    variant="outlined"
                    :error-messages="nameErrors"
                    @blur="validateName"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.email"
                    label="E-Mail"
                    type="email"
                    variant="outlined"
                    :error-messages="emailErrors"
                    @blur="validateEmail"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.subject"
                    label="Betreff"
                    variant="outlined"
                    :error-messages="subjectErrors"
                    @blur="validateSubject"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="form.message"
                    label="Nachricht"
                    variant="outlined"
                    rows="6"
                    :error-messages="messageErrors"
                    @blur="validateMessage"
                  />
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="form.privacy"
                    :error-messages="privacyErrors"
                    @change="validatePrivacy"
                  >
                    <template v-slot:label>
                      <span class="text-sm text-jutta-700">
                        Ich habe die
                        <a href="#" class="text-jutta-900 underline"
                          >Datenschutzerklärung</a
                        >
                        gelesen und stimme der Verarbeitung meiner Daten zu.
                      </span>
                    </template>
                  </v-checkbox>
                </v-col>
        <v-col cols="12" class="text-center">
          <v-btn
            type="submit"
            color="jutta-900"
            size="large"
            :loading="formLoading"
            class="text-white"
          >
            Nachricht senden
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <!-- Snackbar für Benachrichtigungen -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      location="bottom"
      class="mb-4"
    >
      <div class="d-flex align-center">
        <v-icon :icon="snackbar.icon" class="mr-3"></v-icon>
        <span>{{ snackbar.message }}</span>
      </div>
      
      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar.show = false"
          icon="mdi-close"
          size="small"
        ></v-btn>
      </template>
    </v-snackbar>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Additional Information -->
    <section class="bg-jutta-50 jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" lg="8" class="mx-auto text-center">
            <h2 class="jutta-subheading mb-8">Weitere Informationen</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 class="text-xl font-serif font-medium text-jutta-900 mb-4">
                  Über meine Arbeit
                </h3>
                <p class="jutta-text">
                  Ich arbeite hauptsächlich in meinem Atelier in Weissach-Flacht
                  und freue mich über Besuche von Kunstinteressierten. Gerne
                  zeige ich Ihnen meine aktuellen Arbeiten und erzähle von
                  meinem künstlerischen Schaffensprozess.
                </p>
              </div>
              <div>
                <h3 class="text-xl font-serif font-medium text-jutta-900 mb-4">
                  Termine und Besuche
                </h3>
                <p class="jutta-text">
                  Atelierbesuche sind nach vorheriger Anmeldung möglich. Ich
                  freue mich auf interessante Gespräche über Kunst, Leben und
                  die kleinen Wunder des Alltags.
                </p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
  privacy: false,
});

const formLoading = ref(false);

// Snackbar für Benachrichtigungen
const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
  icon: 'mdi-check-circle',
  timeout: 4000,
});

// Error states for manual validation
const nameErrors = ref<string[]>([]);
const emailErrors = ref<string[]>([]);
const subjectErrors = ref<string[]>([]);
const messageErrors = ref<string[]>([]);
const privacyErrors = ref<string[]>([]);

// Manual validation functions
const validateName = () => {
  nameErrors.value = [];
  if (!form.value.name) {
    nameErrors.value.push('Name ist erforderlich');
  } else if (form.value.name.length < 2) {
    nameErrors.value.push('Name muss mindestens 2 Zeichen haben');
  }
};

const validateEmail = () => {
  emailErrors.value = [];
  if (!form.value.email) {
    emailErrors.value.push('E-Mail ist erforderlich');
  } else if (!/.+@.+\..+/.test(form.value.email)) {
    emailErrors.value.push('E-Mail muss gültig sein');
  }
};

const validateSubject = () => {
  subjectErrors.value = [];
  if (!form.value.subject) {
    subjectErrors.value.push('Betreff ist erforderlich');
  } else if (form.value.subject.length < 5) {
    subjectErrors.value.push('Betreff muss mindestens 5 Zeichen haben');
  }
};

const validateMessage = () => {
  messageErrors.value = [];
  if (!form.value.message) {
    messageErrors.value.push('Nachricht ist erforderlich');
  } else if (form.value.message.length < 10) {
    messageErrors.value.push('Nachricht muss mindestens 10 Zeichen haben');
  }
};

const validatePrivacy = () => {
  privacyErrors.value = [];
  if (!form.value.privacy) {
    privacyErrors.value.push('Sie müssen der Datenschutzerklärung zustimmen');
  }
};

// Validate all fields
const validateAll = () => {
  validateName();
  validateEmail();
  validateSubject();
  validateMessage();
  validatePrivacy();
  
  return (
    nameErrors.value.length === 0 &&
    emailErrors.value.length === 0 &&
    subjectErrors.value.length === 0 &&
    messageErrors.value.length === 0 &&
    privacyErrors.value.length === 0
  );
};

// Snackbar-Hilfsfunktionen
const showSnackbar = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
  snackbar.value.message = message;
  snackbar.value.color = type === 'success' ? 'success' : type === 'error' ? 'error' : 'warning';
  snackbar.value.icon = type === 'success' ? 'mdi-check-circle' : type === 'error' ? 'mdi-alert-circle' : 'mdi-information';
  snackbar.value.timeout = 4000;
  snackbar.value.show = true;
};

const submitForm = async () => {
  // Validate all fields before submitting
  if (!validateAll()) {
    return;
  }

  formLoading.value = true;

  try {
    // Send to PHP script on www.juttahorn.de
    const response = await fetch(
      'https://www.juttahorn.de/contact-form-simple.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.value.name,
          email: form.value.email,
          subject: form.value.subject,
          message: form.value.message,
        }),
      },
    );

    const result = await response.json();

    if (response.ok && result.success) {
      // Reset form and clear errors
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: '',
        privacy: false,
      };

      // Clear all error messages
      nameErrors.value = [];
      emailErrors.value = [];
      subjectErrors.value = [];
      messageErrors.value = [];
      privacyErrors.value = [];

              // Show success message
              showSnackbar(
                'Vielen Dank für Ihre Nachricht! Sie erhalten eine Bestätigungs-E-Mail. Ich werde mich bald bei Ihnen melden.',
                'success'
              );
    } else {
      // Show error message
      const errorMessage = result.details
        ? result.details.join(', ')
        : result.error || 'Unbekannter Fehler';
      showSnackbar(`Fehler beim Senden: ${errorMessage}`, 'error');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    showSnackbar(
      'Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt unter info@juttahorn.de',
      'error'
    );
  } finally {
    formLoading.value = false;
  }
};

const handleImageError = () => {
  // Handle image loading errors
};
</script>

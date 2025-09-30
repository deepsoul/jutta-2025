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
                    :rules="nameRules"
                    variant="outlined"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.email"
                    label="E-Mail"
                    type="email"
                    :rules="emailRules"
                    variant="outlined"
                    required
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.subject"
                    label="Betreff"
                    :rules="subjectRules"
                    variant="outlined"
                    required
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="form.message"
                    label="Nachricht"
                    :rules="messageRules"
                    variant="outlined"
                    rows="6"
                    required
                  />
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="form.privacy"
                    :rules="privacyRules"
                    required
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
                  Ich arbeite hauptsächlich in meinem Atelier in Hamburg und
                  freue mich über Besuche von Kunstinteressierten. Gerne zeige
                  ich Ihnen meine aktuellen Arbeiten und erzähle von meinem
                  künstlerischen Schaffensprozess.
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

const nameRules = [
  (v: string) => !!v || 'Name ist erforderlich',
  (v: string) => v.length >= 2 || 'Name muss mindestens 2 Zeichen haben',
];

const emailRules = [
  (v: string) => !!v || 'E-Mail ist erforderlich',
  (v: string) => /.+@.+\..+/.test(v) || 'E-Mail muss gültig sein',
];

const subjectRules = [
  (v: string) => !!v || 'Betreff ist erforderlich',
  (v: string) => v.length >= 5 || 'Betreff muss mindestens 5 Zeichen haben',
];

const messageRules = [
  (v: string) => !!v || 'Nachricht ist erforderlich',
  (v: string) => v.length >= 10 || 'Nachricht muss mindestens 10 Zeichen haben',
];

const privacyRules = [
  (v: boolean) => !!v || 'Sie müssen der Datenschutzerklärung zustimmen',
];

const submitForm = async () => {
  formLoading.value = true;

  // Simulate form submission
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Reset form
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: '',
    privacy: false,
  };

  formLoading.value = false;

  // Show success message (you could use a toast notification here)
  alert(
    'Vielen Dank für Ihre Nachricht! Ich werde mich bald bei Ihnen melden.',
  );
};

const handleImageError = () => {
  // Handle image loading errors
};
</script>

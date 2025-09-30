<?php
/**
 * Jutta Horn Kontaktformular - Einfache Version
 * Für www.juttahorn.de
 */

// CORS-Header für Cross-Domain-Requests
header('Access-Control-Allow-Origin: https://juttahorn-2025-relaunch.vercel.app');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Preflight-Request behandeln
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Nur POST-Requests erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// JSON-Daten lesen
$input = json_decode(file_get_contents('php://input'), true);

// Validierung
$errors = [];

if (empty($input['name'])) {
    $errors[] = 'Name ist erforderlich';
}

if (empty($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Gültige E-Mail-Adresse ist erforderlich';
}

if (empty($input['subject'])) {
    $errors[] = 'Betreff ist erforderlich';
}

if (empty($input['message'])) {
    $errors[] = 'Nachricht ist erforderlich';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => 'Validierungsfehler', 'details' => $errors]);
    exit();
}

// Daten extrahieren und bereinigen
$name = trim($input['name']);
$email = trim($input['email']);
$subject = trim($input['subject']);
$message = trim($input['message']);

// E-Mail-Konfiguration
$to = 'info@juttahorn.de';
$from = 'noreply@juttahorn.de';
$replyTo = $email;

// E-Mail an Jutta (Benachrichtigung)
$mailSubject = "Kontaktformular: " . $subject;
$mailBody = "Neue Nachricht von der Website\n\n";
$mailBody .= "Kontaktdaten:\n";
$mailBody .= "Name: " . $name . "\n";
$mailBody .= "E-Mail: " . $email . "\n";
$mailBody .= "Betreff: " . $subject . "\n\n";
$mailBody .= "Nachricht:\n";
$mailBody .= $message . "\n\n";
$mailBody .= "---\n";
$mailBody .= "Diese E-Mail wurde über das Kontaktformular auf juttahorn.de gesendet.\n";
$mailBody .= "Antworten Sie direkt auf diese E-Mail, um dem Absender zu antworten.";

$headers = "From: " . $from . "\r\n";
$headers .= "Reply-To: " . $replyTo . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$mailSent = mail($to, $mailSubject, $mailBody, $headers);

if (!$mailSent) {
    http_response_code(500);
    echo json_encode(['error' => 'E-Mail konnte nicht gesendet werden']);
    exit();
}

// Bestätigungs-E-Mail an Absender
$confirmationSubject = "Bestätigung: Ihre Nachricht wurde gesendet";
$confirmationBody = "Vielen Dank für Ihre Nachricht!\n\n";
$confirmationBody .= "Liebe/r " . $name . ",\n\n";
$confirmationBody .= "vielen Dank für Ihre Nachricht. Ich habe Ihre E-Mail erhalten und werde mich so schnell wie möglich bei Ihnen melden.\n\n";
$confirmationBody .= "Ihre Nachricht:\n";
$confirmationBody .= $message . "\n\n";
$confirmationBody .= "Mit freundlichen Grüßen,\n";
$confirmationBody .= "Jutta Horn\n\n";
$confirmationBody .= "Kontakt:\n";
$confirmationBody .= "E-Mail: info@juttahorn.de\n";
$confirmationBody .= "Telefon: +49 1523 3644 324\n";
$confirmationBody .= "Atelier: Rosenweg 29, 71287 Weissach-Flacht";

$confirmationHeaders = "From: " . $from . "\r\n";
$confirmationHeaders .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$confirmationHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

mail($email, $confirmationSubject, $confirmationBody, $confirmationHeaders);

// Erfolgreiche Antwort
echo json_encode([
    'success' => true,
    'message' => 'E-Mail erfolgreich gesendet'
]);
?>

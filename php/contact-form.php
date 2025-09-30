<?php
/**
 * Jutta Horn Kontaktformular - E-Mail-Versand
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

// Daten extrahieren
$name = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars(trim($input['email']), ENT_QUOTES, 'UTF-8');
$subject = htmlspecialchars(trim($input['subject']), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8');

// E-Mail-Konfiguration
$to = 'info@juttahorn.de';
$from = 'noreply@juttahorn.de';
$replyTo = $email;

// E-Mail an Jutta (Benachrichtigung)
$mailSubject = "Kontaktformular: " . $subject;
$mailBody = createNotificationEmail($name, $email, $subject, $message);

$headers = [
    'From: ' . $from,
    'Reply-To: ' . $replyTo,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/html; charset=UTF-8'
];

$mailSent = mail($to, $mailSubject, $mailBody, implode("\r\n", $headers));

if (!$mailSent) {
    http_response_code(500);
    echo json_encode(['error' => 'E-Mail konnte nicht gesendet werden']);
    exit();
}

// Bestätigungs-E-Mail an Absender
$confirmationSubject = "Bestätigung: Ihre Nachricht wurde gesendet";
$confirmationBody = createConfirmationEmail($name, $subject, $message);

$confirmationHeaders = [
    'From: ' . $from,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/html; charset=UTF-8'
];

mail($email, $confirmationSubject, $confirmationBody, implode("\r\n", $confirmationHeaders));

// Erfolgreiche Antwort
echo json_encode([
    'success' => true,
    'message' => 'E-Mail erfolgreich gesendet'
]);

/**
 * Erstellt die Benachrichtigungs-E-Mail für Jutta
 */
function createNotificationEmail($name, $email, $subject, $message) {
    return "
    <!DOCTYPE html>
    <html lang='de'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Neue Nachricht von der Website</title>
    </head>
    <body style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;'>
        <div style='background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);'>
            <h2 style='color: #404040; border-bottom: 2px solid #737373; padding-bottom: 10px; font-family: Georgia, serif;'>
                Neue Nachricht von der Website
            </h2>
            
            <div style='background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;'>
                <h3 style='color: #404040; margin-top: 0; font-family: Georgia, serif;'>Kontaktdaten:</h3>
                <p><strong>Name:</strong> " . $name . "</p>
                <p><strong>E-Mail:</strong> " . $email . "</p>
                <p><strong>Betreff:</strong> " . $subject . "</p>
            </div>
            
            <div style='background-color: white; padding: 20px; border-left: 4px solid #737373; margin: 20px 0;'>
                <h3 style='color: #404040; margin-top: 0; font-family: Georgia, serif;'>Nachricht:</h3>
                <p style='white-space: pre-wrap; line-height: 1.6;'>" . nl2br($message) . "</p>
            </div>
            
            <div style='margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; font-size: 12px; color: #666;'>
                <p>Diese E-Mail wurde über das Kontaktformular auf juttahorn.de gesendet.</p>
                <p>Antworten Sie direkt auf diese E-Mail, um dem Absender zu antworten.</p>
            </div>
        </div>
    </body>
    </html>";
}

/**
 * Erstellt die Bestätigungs-E-Mail für den Absender
 */
function createConfirmationEmail($name, $subject, $message) {
    return "
    <!DOCTYPE html>
    <html lang='de'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Bestätigung: Ihre Nachricht wurde gesendet</title>
    </head>
    <body style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;'>
        <div style='background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);'>
            <h2 style='color: #404040; font-family: Georgia, serif;'>Vielen Dank für Ihre Nachricht!</h2>
            
            <p>Liebe/r " . $name . ",</p>
            
            <p>vielen Dank für Ihre Nachricht. Ich habe Ihre E-Mail erhalten und werde mich so schnell wie möglich bei Ihnen melden.</p>
            
            <div style='background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;'>
                <p><strong>Ihre Nachricht:</strong></p>
                <p style='white-space: pre-wrap; font-style: italic;'>" . nl2br($message) . "</p>
            </div>
            
            <p>Mit freundlichen Grüßen,<br>
            <strong>Jutta Horn</strong></p>
            
            <div style='margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; font-size: 12px; color: #666;'>
                <p><strong>Kontakt:</strong><br>
                E-Mail: info@juttahorn.de<br>
                Telefon: +49 1523 3644 324<br>
                Atelier: Rosenweg 29, 71287 Weissach-Flacht</p>
            </div>
        </div>
    </body>
    </html>";
}
?>

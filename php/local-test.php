<?php
/**
 * Lokales Test-Skript für Entwicklung
 * Simuliert das PHP-Skript ohne E-Mail-Versand
 */

// CORS-Header für lokale Entwicklung
header('Access-Control-Allow-Origin: *');
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
$name = trim($input['name']);
$email = trim($input['email']);
$subject = trim($input['subject']);
$message = trim($input['message']);

// Log für lokales Testen
$logData = [
    'timestamp' => date('Y-m-d H:i:s'),
    'name' => $name,
    'email' => $email,
    'subject' => $subject,
    'message' => $message
];

// In Datei loggen (optional)
file_put_contents('contact-log.txt', json_encode($logData) . "\n", FILE_APPEND);

// Erfolgreiche Antwort (simuliert E-Mail-Versand)
echo json_encode([
    'success' => true,
    'message' => 'E-Mail erfolgreich gesendet (lokaler Test)',
    'debug' => [
        'received_data' => $logData,
        'note' => 'Dies ist ein lokaler Test - keine E-Mail wurde tatsächlich gesendet'
    ]
]);
?>

<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Отримуємо дані в POST-запиті
    $data = json_decode(file_get_contents('php://input'), true);

    // Зберігаємо дані у файлі або БД (виберіть підходящий метод)
    file_put_contents('data.json', json_encode($data));

    // Відповідаємо успішно
    echo json_encode(['status' => 'success']);
} else {
    // Відповідаємо на GET-запит, повертаючи збережені дані
    $savedData = file_get_contents('data.json');
    echo $savedData;
}
?>

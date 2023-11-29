<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $text = $data['text'];
    $color1 = $data['color1'];
    $color2 = $data['color2'];
    $timer = $data['timer'];

    $data = array(
        'text' => $_POST['text'],
        'color1' => $_POST['color1'],
        'color2' => $_POST['color2'],
        'timer' => $_POST['timer']
    );

    $currentDateTime = date("Y-m-d_H-i-s");

    $fileName = "data_" . $currentDateTime . ".txt";

    $dataToWrite = "Це дані, які ви хочете записати в файл.";

    file_put_contents($fileName, $dataToWrite);

    echo "Файл '$fileName' був створений та дані були записані в нього.";

    http_response_code(200);
} else {
    http_response_code(400);
    echo 'Невірний тип запиту.';
}
?>

</body>
</html>

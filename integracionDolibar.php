<?php
$apiUrl = 'https://tudolibarr.com/api/index.php/products';
$apiKey = 'Dbxenoverse2.0';

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'DOLAPIKEY: ' . $apiKey,
  'Accept: application/json'
]);

$response = curl_exec($ch);
curl_close($ch);

$products = json_decode($response, true);
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Productos de Dolibarr</title>
</head>
<body>
  <h1>Lista de Productos</h1>
  <ul>
    <?php foreach ($products as $product): ?>
      <li><?php echo htmlspecialchars($product['label']); ?> - <?php echo htmlspecialchars($product['price']); ?> <?php echo htmlspecialchars($product['currency']); ?></li>
    <?php endforeach; ?>
  </ul>
</body>
</html>

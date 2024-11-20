// config.php - Configuración de la conexión con Dolibarr
<?php
define('DOLIBARR_API_KEY', 'tu_api_key_aquí');
define('DOLIBARR_URL', 'http://tu-dominio/dolibarr/api/index.php');

// Función para hacer peticiones a la API de Dolibarr
function dolibarr_api_call($endpoint, $method = 'GET', $data = null) {
    $url = DOLIBARR_URL . $endpoint;
    $headers = [
        'DOLAPIKEY: ' . DOLIBARR_API_KEY,
        'Content-Type: application/json'
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return [
        'code' => $http_code,
        'data' => json_decode($response, true)
    ];
}

// Ejemplo de endpoint para obtener productos
function get_products() {
    return dolibarr_api_call('/products');
}

// Ejemplo de endpoint para crear un pedido
function create_order($order_data) {
    return dolibarr_api_call('/orders', 'POST', $order_data);
}

// Ejemplo de endpoint para crear un cliente
function create_customer($customer_data) {
    return dolibarr_api_call('/thirdparties', 'POST', $customer_data);
}
?>

<!-- products.php - Página para mostrar productos -->
<?php
require_once('config.php');
header('Content-Type: application/json');

$products = get_products();
echo json_encode($products);
?>

<!-- Ejemplo de código HTML y JavaScript para consumir la API -->
<!DOCTYPE html>
<html>
<head>
    <title>Catálogo de Productos</title>
</head>
<body>
    <div id="products-container"></div>

    <script>
    // Función para cargar productos desde Dolibarr
    async function loadProducts() {
        try {
            const response = await fetch('products.php');
            const products = await response.json();
            
            const container = document.getElementById('products-container');
            products.data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product-card';
                productDiv.innerHTML = `
                    <h3>${product.label}</h3>
                    <p>Precio: ${product.price} €</p>
                    <p>Stock: ${product.stock_reel}</p>
                    <button onclick="addToCart(${product.id})">Añadir al carrito</button>
                `;
                container.appendChild(productDiv);
            });
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    }

    // Función para crear un pedido
    async function createOrder(orderData) {
        try {
            const response = await fetch('create_order.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error al crear el pedido:', error);
        }
    }

    // Cargar productos al iniciar la página
    document.addEventListener('DOMContentLoaded', loadProducts);
    </script>

    <style>
    .product-card {
        border: 1px solid #ddd;
        padding: 15px;
        margin: 10px;
        display: inline-block;
        width: 200px;
    }
    </style>
</body>
</html>

<!-- create_order.php - Endpoint para crear pedidos -->
<?php
require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $order_data = json_decode(file_get_contents('php://input'), true);
    $result = create_order($order_data);
    header('Content-Type: application/json');
    echo json_encode($result);
}
?>
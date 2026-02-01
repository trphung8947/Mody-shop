// Dữ liệu sản phẩm
const products = [
    {
        id: 1,
        name: "Tòa nhà Empire State",
        price: "299.000 VNĐ",
        image: "🏢",
        description: "Mô hình 3D chi tiết của tòa nhà Empire State nổi tiếng",
        size: "30cm x 15cm x 40cm",
        quantity: 12
    },
    {
        id: 2,
        name: "Tháp Eiffel Paris",
        price: "249.000 VNĐ",
        image: "🗼",
        description: "Tháp Eiffel mô hình tinh tế, chi tiết tương tự bản gốc",
        size: "25cm x 25cm x 50cm",
        quantity: 15
    },
    {
        id: 3,
        name: "Xe đua Ferrari",
        price: "189.000 VNĐ",
        image: "🏎️",
        description: "Mô hình xe Ferrari độc quyền, chi tiết công nghệ cao",
        size: "20cm x 10cm x 8cm",
        quantity: 20
    },
    {
        id: 4,
        name: "Máy bay Boeing 747",
        price: "279.000 VNĐ",
        image: "✈️",
        description: "Máy bay Boeing 747 mô hình với cánh có thể xoay",
        size: "35cm x 30cm x 12cm",
        quantity: 8
    }
];

// Lưu trữ sản phẩm hiện tại (cho modal)
let currentProduct = null;

// Render sản phẩm ban đầu
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    setupNavigation();
});

// Hàm render sản phẩm
function renderProducts(productsToRender) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price}</span>
                    <button class="btn-view" onclick="openModal(${product.id})">Xem chi tiết</button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Thêm hiệu ứng fade-in
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease ${index * 0.1}s backwards`;
    });
}

// Lọc sản phẩm

// Hàm lấy tên danh mục

// Hàm mở modal
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentProduct = product;

    document.getElementById('modalImage').textContent = product.image;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalSize').textContent = product.size;
    document.getElementById('modalQuantity').textContent = product.quantity + ' sản phẩm';

    document.getElementById('productModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Ngăn cuộn trang
}

// Hàm đóng modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentProduct = null;
}

// Đóng modal khi click bên ngoài
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Hàm thêm vào giỏ hàng
function addToCart() {
    if (!currentProduct) return;

    // Tạo thông báo
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        z-index: 2000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = `✓ Đã thêm "${currentProduct.name}" vào giỏ hàng!`;
    document.body.appendChild(notification);

    // Xóa thông báo sau 3 giây
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Thiết lập navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks[0].classList.add('active');
}

// Thêm CSS animation cho notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Hàm tìm kiếm sản phẩm (tùy chọn)
function searchProducts(keyword) {
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(keyword.toLowerCase()) ||
        p.description.toLowerCase().includes(keyword.toLowerCase())
    );
    renderProducts(filtered);
}

// Hàm set active menu
function setActiveMenu(event) {
    event.preventDefault();
    
    // Xóa active từ tất cả links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Thêm active vào link được click
    event.target.classList.add('active');
    
    // Lấy target ID từ href
    const targetId = event.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
        // Smooth scroll đến section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

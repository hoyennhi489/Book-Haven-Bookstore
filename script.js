document.addEventListener("DOMContentLoaded", () => {
  // Lấy phần tử HTML có ID là "cart-button" (nút giỏ hàng)
  const cartButton = document.getElementById("cart-button");
  // Lấy phần tử HTML có ID là "cart-count" (số lượng sản phẩm trong giỏ hàng)
  const cartCount = document.getElementById("cart-count");
  // Lấy phần tử HTML có ID là "cart-details" (chi tiết giỏ hàng)
  const cartDetails = document.getElementById("cart-details");
  // Lấy phần tử HTML có ID là "cart-items" (danh sách các sản phẩm trong giỏ)
  const cartItemsList = document.getElementById("cart-items");
  // Lấy phần tử HTML có ID là "clear-cart" (nút xóa giỏ hàng)
  const clearCartButton = document.getElementById("clear-cart");
  // Lấy tất cả các nút "add-to-cart-button" (nút thêm sản phẩm vào giỏ hàng)
  const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

  // Khởi tạo một mảng giỏ hàng rỗng
  let cart = [];

  // Hàm cập nhật giao diện giỏ hàng
  const updateCartUI = () => {
    cartItemsList.innerHTML = ""; // Làm rỗng danh sách cũ

    // Duyệt qua từng sản phẩm trong giỏ hàng và thêm vào danh sách HTML
    cart.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name} - $${item.price.toFixed(2)} (x${item.quantity})`;
      cartItemsList.appendChild(listItem);
    });

    // Cập nhật số lượng tổng các sản phẩm trong giỏ hàng
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Hiển thị hoặc ẩn giỏ hàng nếu giỏ có sản phẩm
    cartDetails.style.display = cart.length > 0 ? "block" : "none";
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (itemName, itemPrice) => {
    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    const existingItem = cart.find((item) => item.name === itemName);

    if (existingItem) {
      existingItem.quantity++; // Nếu có, tăng số lượng lên 1
    } else {
      cart.push({ name: itemName, price: itemPrice, quantity: 1 }); // Nếu chưa, thêm sản phẩm mới vào giỏ
    }

    updateCartUI(); // Cập nhật lại giao diện giỏ hàng
  };

  // Lắng nghe sự kiện click trên tất cả các nút "Add to Cart"
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Lấy tên sản phẩm từ thuộc tính "data-item" của nút
      const itemName = button.getAttribute("data-item");
      // Lấy giá sản phẩm từ phần tử HTML chứa giá
      const itemPrice = parseFloat(
        button.parentElement.querySelector("p:nth-of-type(2)").textContent.replace("Price: $", "")
      );
      addToCart(itemName, itemPrice); // Gọi hàm addToCart để thêm sản phẩm vào giỏ
    });
  });

  // Lắng nghe sự kiện click trên nút "Clear Cart" để xóa giỏ hàng
  clearCartButton.addEventListener("click", () => {
    cart = []; // Xóa tất cả sản phẩm trong giỏ hàng
    updateCartUI(); // Cập nhật lại giao diện giỏ hàng
    alert("Your cart has been cleared."); // Thông báo giỏ hàng đã bị xóa
  });

  // Lắng nghe sự kiện click trên nút giỏ hàng để hiển thị hoặc ẩn giỏ
  cartButton.addEventListener("click", () => {
    if (cartDetails.style.display === "none" || cartDetails.style.display === "") {
      cartDetails.style.display = "block"; // Hiển thị giỏ hàng
    } else {
      cartDetails.style.display = "none"; // Ẩn giỏ hàng
    }
  });

  // Cập nhật giao diện giỏ hàng ngay khi trang được tải xong
  updateCartUI();
});
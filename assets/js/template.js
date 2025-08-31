// JavaScript for any additional functionality
document.addEventListener('DOMContentLoaded', function () {
    // Add any interactive features here if needed

    // Example: Add loading animation to buttons
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            setTimeout(() => {
                if (this.classList.contains('btn-view')) {
                    this.innerHTML = '<i class="fas fa-eye"></i> View Website';
                } else {
                    this.innerHTML = '<i class="fab fa-whatsapp"></i> Order Now';
                }
            }, 1500);
        });
    });
});

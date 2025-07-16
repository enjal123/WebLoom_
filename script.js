// Form submission handling
document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const thankYou = document.getElementById('projectThankYou');
    const originalButtonText = submitButton.textContent;
    
    // Disable the submit button and show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');

    // Create a new FormData object
    const formData = new FormData(form);
    
    // Add timestamp to prevent caching
    formData.append('_timestamp', new Date().getTime());

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Cache-Control': 'no-cache'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show thank you message
            thankYou.style.display = 'block';
            form.reset();
            
            // Hide thank you message after 5 seconds
            setTimeout(() => {
                thankYou.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        showNotification('Failed to send project details. Please try again.', 'error');
    })
    .finally(() => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        submitButton.setAttribute('aria-busy', 'false');
    });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const thankYou = document.getElementById('contactThankYou');
    const originalButtonText = submitButton.textContent;
    
    // Disable the submit button and show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');

    // Create a new FormData object
    const formData = new FormData(form);
    
    // Add timestamp to prevent caching
    formData.append('_timestamp', new Date().getTime());

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Cache-Control': 'no-cache'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show thank you message
            thankYou.style.display = 'block';
            form.reset();
            
            // Hide thank you message after 5 seconds
            setTimeout(() => {
                thankYou.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        showNotification('Failed to send message. Please try again.', 'error');
    })
    .finally(() => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        submitButton.setAttribute('aria-busy', 'false');
    });
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
} 
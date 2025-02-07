document.addEventListener('DOMContentLoaded', function() {
    // Initialize the form with login mode
    toggleAuthMode(true);

    // Add login and sign up event listeners
    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('signupBtn').addEventListener('click', signup);

    document.getElementById('changePasswordTrigger').addEventListener('click', function() {
        const form = document.getElementById('changePasswordForm');
        // Toggle the display style
        form.classList.toggle('hidden');
    });

    // Attach event listener for Enter key in the chat input
    document.getElementById('chatInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
            event.preventDefault(); // Prevent form submission
        }
    });

});



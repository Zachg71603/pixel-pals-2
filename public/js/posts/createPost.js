// function to handle the submission of a new post
document.getElementById('postButton').addEventListener('click', function(event) {
    event.preventDefault();
    var modal = document.getElementById('createPostModal');
    modal.classList.remove('hidden');
});

document.getElementById('closeCreate').addEventListener('click', function(event) {
    event.preventDefault();
    var modal = document.getElementById('createPostModal');
    modal.classList.add('hidden');
});

document.getElementById('cancelPost').addEventListener('click', function(event) {
    event.preventDefault();
    var modal = document.getElementById('createPostModal');
    modal.classList.add('hidden');
});

async function submitPost(event) {
    event.preventDefault(); 
        const user = await getCurrentUser(); 
    
        if (!user) {
        alert('You must be logged in to create a post.');
        return;
        }

        const postText = document.getElementById('postText').value;
        // Create an object containing post data
        const postData = {
        userId: user.uid,
        content: postText
        };

// Send a POST request to create the new post
fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(postData)
        })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        toggleModal('createPostModal'); 
        })
    .catch((error) => {
        console.error('Error:', error);
        });
}

    // Function to get the current user's authentication status
function getCurrentUser() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                resolve(user.uid);
            } else {
                resolve(null);
        }
        });
    });
}
// add an event listener to the form submission
// document.getElementById('postForm').addEventListener('submit', submitPost);
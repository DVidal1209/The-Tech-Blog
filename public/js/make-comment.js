const addCommentFormHandler = async (event) => {
    event.preventDefault();
    const comment_body = document.querySelector('#comment').value.trim();
    const blog_id = document.querySelector('#blog').dataset.id;
    console.log("Hello world")
    if (comment_body){
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_body, blog_id}),
            headers: {
            'Content-Type': 'application/json',
            },
        })
        if(response.ok){
            location.reload();
        } else {
            alert('Failed to create comment');
        }
    }
};

document.querySelector('#submit').addEventListener("click", addCommentFormHandler)  
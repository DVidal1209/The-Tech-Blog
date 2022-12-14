const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    console.log("response.ok",response.ok)
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }
};


document.querySelector('#delete').addEventListener('click', delButtonHandler);

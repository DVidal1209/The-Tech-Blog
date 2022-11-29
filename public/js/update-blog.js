const updateFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    const id = document.querySelector('#update-form').dataset.id;
  
    if (title && content) {
      const response = await fetch('/api/blogs/:id', {
        method: 'PUT',
        body: JSON.stringify({ title, content, id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        document.location.replace('/dashboard');
        alert('Failed to update blog');
      }
    }
  };

  document.querySelector('#update-form').addEventListener('submit', updateFormHandler);
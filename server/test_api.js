fetch('http://localhost:5000/api/blogs')
  .then(res => res.json())
  .then(data => {
    console.log('Status:', Array.isArray(data) ? 'OK' : 'Error');
    console.log('Count:', data.length);
    if (data.length > 0) {
      console.log('First Item:', data[0].title);
      console.log('Source:', data[0].source);
    }
  })
  .catch(err => console.error('Failed:', err));

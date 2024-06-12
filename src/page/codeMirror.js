import React, { useState, useEffect } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CodeMirrorId() {
  const [content, setContent] = useState('');
  const [title,setTitle]=useState('')
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/menu_contents/${id}`)
      .then((response) => setTitle(response.data))
      .catch((error) => console.error("Error fetching menus:", error));
  }, [id]);

  useEffect(() => {
    axios
    .get(`http://localhost:8000/api/menu_contents/${id}`)
    .then((response) => {
      const htmlEncodedCode = response.data.para;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlEncodedCode, 'text/html');
      const decodedCode = doc.body.textContent || "";
      setContent(decodedCode);
    })
    .catch((error) => console.error('Error fetching menu content:', error));
}, [id]);

  console.log("content",content)



  return (
    <main className='w-full h-full'>
      <h1>Code éditeur</h1>
      <h2>{title.title} </h2>
      <LiveProvider code={content} noInline>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <div className='w-1/2'>
            <LiveEditor className='relative' onChange={newCode => setContent(newCode)} />
          </div>
          <div className='borde w-1/2'>
            <LivePreview />
            <LiveError />
          </div>
        </div>
      </LiveProvider>
    </main>
  );
}

export default CodeMirrorId;

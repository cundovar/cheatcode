import React, { useState, useEffect } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { URLAPI } from '../common/utils/Url';
import { Titles } from '../common/components';
import Result from '../common/utils/result';

function CodeMirrorId() {
  const [content, setContent] = useState('');
  const [title,setTitle]=useState('')
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${URLAPI}/${id}`)
      .then((response) => {
        setTitle(response.data.title);
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
    <main className='w-full h-full  overscroll-auto'>
   
      <h1>Code éditeur</h1>
      {content ? (
<>
      {title && (
        <Titles title={title}/>

      )}
      <LiveProvider code={content} noInline >
        <div style={{ display: 'flex', width: '100%', height: '80vh', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, marginRight: '20px', border: '1px solid #ddd', overflow: 'auto' }}>
            <LiveEditor onChange={newCode => setContent(newCode)} />
          </div>
          <div style={{ flex: 1, border: '1px solid #ddd', overflow: 'auto' }}>
            <LivePreview />
            <LiveError />
          </div>
        </div>
      </LiveProvider>



</>




      ):(
        <h1 className='text-green-300'>pas encore de contenu</h1>
      )}
    </main>
  );
}

export default CodeMirrorId;

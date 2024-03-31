import React, { useState, useContext, useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorize')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  // redirect to login page for any user whi isn't logged in
  useEffect(() => {
    if(!token) {
      navigate('/login') 
    }
    // eslint-disable-next-line
  }, [])


  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  }

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'
  ]

  const POST_CATEGORIES = [
    'Uncategorize', 'Mood Disorders', 'Anxiety Disorders', 'Psychotic Disorders', 'Personality Disorders', 'Eating Disorders', 'Substance Use Disorders'
  ]


  const createPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set('title', title)
    postData.set('category', category)
    postData.set('description', description)
    postData.set('thumbnail', thumbnail)

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if (response.status === 201) {
        return navigate('/')
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }



  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className='form__error-message'>{error}</p>}
        <form className='form create-post__form' onSubmit={createPost}>
          <input type='text' placeholder='Enter Title for your Post' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          <select name='category' value={category} onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(category => <option key={category}>{category}</option>)
            }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
            <input type='file' onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg, gif' />
            <button type='submit' className='btn primary'>Create Post</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost

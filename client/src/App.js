import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  const [ users, setUsers ] = useState([]);
  const [ newUser, setNewUser ] = useState({})
  const [ userEdit, setUserEdit ] = useState({});

  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/users`)
    .then(res => {
      console.log(res.data);
      setUsers(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  const handleEdit = edit => {
    setUserEdit({
      "id":edit.id,
      "name":edit.name,
      "bio":edit.bio
    })
  }

  const handleDelete = id => {
    axios
    .delete(`http://localhost:5000/api/users/${id}`)
    .then(res => {
      axios
      .get(`http://localhost:5000/api/users/`)
      .then(res => setUsers(res.data))
    })
    .catch(err => console.log(err))
  }

  const handleEditChange = e => {
    setUserEdit({
      ...userEdit,
      "id":userEdit.id,
      [e.target.name]:e.target.value
    })
  }

  const handleUpdate = () => {
    console.log(userEdit)
    axios
    .put(`http://localhost:5000/api/users/${userEdit.id}`, {"name": userEdit.name, "bio": userEdit.bio})
    .then(res => {
      axios
      .get(`http://localhost:5000/api/users/`)
      .then(res => setUsers(res.data))
    })
    .catch(err => console.log(err))
  }

  const handleChange = e => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })
  }

  const handleInsert = e => {
    e.preventDefault();
    axios
    .post(`http://localhost:5000/api/users/`, newUser)
    .then(res => {
      console.log(res)
      axios
      .get(`http://localhost:5000/api/users/`)
      .then(res => setUsers(res.data))
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <h1>API Testing</h1>
      {users.map(user => (
        <p key={user.id}>
          <span>{user.name}</span> : <span>{user.bio}</span> | <span onClick={() => handleEdit(user)} className="link">[edit]</span> <span onClick={() => handleDelete(user.id)} className="link">[delete]</span>
        </p>
      ))}
      <h2>Edit Form</h2>
      {userEdit.name !== undefined ? (
        <>
        <input type="text" value={userEdit.name} onChange={handleEditChange} name="name"/>
        <input type="text" value={userEdit.bio} onChange={handleEditChange} name="bio"/>
        </>
      ) : (
        <>
        <input type="text" />
        <input type="text" />
        </>
      )}
      
      <button onClick={handleUpdate}>Update</button>
      <h2>Add User</h2>
      <input type="text" onChange={handleChange} name="name" placeholder="Full Name"/>
      <input type="text" onChange={handleChange} name="bio" placeholder="Bio"/>
      <button onClick={handleInsert}>Add User</button>
    </div>
  );
}

export default App;

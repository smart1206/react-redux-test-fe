import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import {
  setUser,
} from './userSlice';

const Detail = ({ id }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getUserInfo`, {
          params: {
            id
          }
        }, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        });

        if (data.success) {
          setTitle(data.result.title)
          setBody(data.result.body)
          setData(data.result)
        } else {
          alert('Data fetch was failed.')
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData()
  }, [])

  const history = useHistory();
  const dispatch = useDispatch();

  const saveUser = () => {
    if (!title || !body) {
      alert('Please fill in all the form fields');
      return;
    } else {
      dispatch(setUser({
        userId: data.userId,
        id: parseInt(id),
        title,
        body,
      }))

      editCancel();
    }
  }

  const editCancel = () => {
    history.push('/')
  }

  return (
    <div className="editForm">
      <h2>Edit User Form</h2>
      <input required className="inputField" value={title} type="text" onChange={(e) => setTitle(e.target.value)} />
      <textarea required className="textArea" value={body} type="text" onChange={(e) => setBody(e.target.value)} />
      <div className="ctaSection">
        <button onClick={saveUser}>Save</button>
        <button onClick={editCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Detail;
import './App.css';
import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import {
  getKeyword,
  getUser,
  setKeyword
} from './component/userSlice';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getUserInfos`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        });

        if (data.success) {
          setData(data.result)
          setLoading(false);
        } else {
          alert('Data fetch was failed.')
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

  const columns = [
    {
      name: 'ID',
      selector: row => { return row.id },
      sortable: true,
      width: '100px'
    },
    {
      name: 'TITLE',
      selector: row => { return row.title },
      sortable: true,
      width: '500px'
    },
    {
      name: 'BODY',
      selector: row => { return row.body },
      sortable: true,
      width: '700px'
    },
  ];

  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const keyword = useSelector(getKeyword);

  const filered = data.map(elem => {
    if (user && elem.id === user.id) {
      return user;
    } else {
      return elem;
    }
  }).filter((item) => {
    if (keyword === "") {
      return item;
    } else if (
      item.title.toLowerCase().includes(keyword.toLowerCase())
    ) {
      return item;
    }
    return false;
  });

  const handleFilterChange = (e) => {
    dispatch(setKeyword(e.target.value));
  }
  const history = useHistory();

  const handleRowClick = (row) => {
    history.push(`/edit/${row.id}`)
  }

  return (
    <div className="App" >
      <h2>User informations</h2>
      <div style={{ padding: '10px', display: 'flex', justifyContent: 'right' }}>
        <input type='text' placeholder='search' value={keyword} onChange={handleFilterChange}></input>
      </div>
      <DataTable
        columns={columns}
        data={filered}
        progressPending={loading}
        progressComponent={<>Loading...</>}
        pagination={true}
        onRowClicked={(row) => handleRowClick(row)}
      />
    </div >
  );
}

export default App;

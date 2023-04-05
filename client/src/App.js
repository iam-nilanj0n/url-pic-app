import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import unsplashLogo from './assets/unsplashIcon.png';
import Card from './components/Card';
const Domain = 'http://localhost:6001/';

const hidden = {
  visibilty: 'hidden'
}

function App() {
  const [data, setData] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [postlabel, setPostLabel] = useState('')
  const [postURL, setPostURL] = useState('');
  const [modalStyle, setModalStyle] = useState();
  const [add, setAdd] = useState(false)
  const [label, setLabel] = useState('');
  const [filted, setFilted] = useState([]);
  const [mainDisplay, setMainDisplay] = useState([
    {
      display: 'none'
    },
    {
      display: 'inherit'
    }
  ])

  // getting all data
  useEffect(() => {
    Axios.get(Domain)
      .then((res) => {
        // console.log(res.data.post);
        setData(res.data.post)
      })
      .catch((err) => {
        console.log('Error')
      })
  }, [data])

  // setting modal background height here
  const modalHandler = () => {
    setAdd(true)
  }
  useEffect(() => {
    if (add) {
      if (data.length > 3) {
        let factor = Math.floor(data.length / 3) + 1
        let Height = factor * 80
        setModalStyle({
          visibility: 'visible',
          height: `${Height}vh`
        })
      } else {
        setModalStyle({
          visibility: 'visible',
          height: `100vh`
        })

      }
    }
    if (!add) {
      setModalStyle(hidden)
    }
  }, [data, modalStyle, add])

  // setting post request here
  useEffect(() => {
    if (submit) {
      if (postlabel.length > 0 && postURL.length > 0) {
        Axios.post(Domain, {
          label: postlabel,
          url: postURL
        })
          .then((res) => {
            setPostLabel('');
            setPostURL('')
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
    return () => {
      setSubmit(false)
    }
  }, [submit, postlabel, postURL])

  // search with label
  useEffect(() => {
    if (label.length > 0) {
      let arr = []
      setMainDisplay([
        {
          display: 'inherit'
        },
        {
          display: 'none'
        }
      ])
      for (let i = 0; i < data.length; i++) {
        if (data[i].label.includes(label)) {
          arr.push(data[i])
        }
      }
      setFilted(arr)
    }
    if (label.length === 0) {
      setMainDisplay([
        {
          display: 'none'
        },
        {
          display: 'inherit'
        }
      ])
    }
  }, [label, data, filted, mainDisplay])

  return (
    <div className="App">
      <div className='postModal' style={modalStyle}>
        <form className='postForm'>
          <h2>Add a new photo</h2>
          <label>Label</label>
          <input type='text' placeholder='Picture Label' value={postlabel} onChange={(e) => setPostLabel(e.target.value)} />
          <label>Photo URL</label>
          <input type='text' placeholder='URL Only' value={postURL} onChange={(e) => setPostURL(e.target.value)} />
          <div className='modalButton'>
            <button className='cancelButton' onClick={(e) => {
              e.preventDefault();
              setAdd(false)
            }}>Cancel</button>
            <button className='submitButton' onClick={(e) => {
              e.preventDefault()
              setSubmit(true)
            }}>Submit</button>
          </div>
        </form>
      </div>
      <header>
        <div className='logoDiv'>
          <img src={unsplashLogo} alt='logoPic' />
          <p><b>My Unsplash</b><span>devchallenges.io</span> </p>
        </div>
        <input type='text' placeholder='Search by name' onChange={(e) => setLabel(e.target.value)} />
        <button onClick={(e) => {modalHandler()}}>Add a Photo</button>
      </header>
      <main>
        <div className='searchedData' style={mainDisplay[0]}>
          {(filted.length > 0) ? (
            <div className='searchedDataDisplay'>
              {filted.map((e, i) => {
                return (
                  <div key={i} className='gridItem'>
                    <Card data={e} setData={setData} />
                  </div>
                )
              })}
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className='storedData' style={mainDisplay[1]}>
          {(data.length > 0) ? (
            <div className='storedDataDisplay' >
              {data.map((e, i) => {
                return (
                  <div key={i} className='gridItem'>
                    <Card data={e} setData={setData} />
                  </div>
                )
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

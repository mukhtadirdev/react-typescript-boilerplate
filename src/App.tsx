import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

interface user {
  "id": Number,
  "name": string,
  "username": string,
  "email": string,
  "address": {
    "street": string,
    "suite": string,
    "city": string,
    "zipcode": string,
    "geo": {
      "lat": string,
      "lng": string
    }
  },
  "phone": string,
  "website": string
  "company": {
    "name": string,
    "catchPhrase": string,
    "bs": string,
  }
}

function Home() {
  const [users, setUsers] = useState<user[] | undefined>([])
  const URL: string = "https://jsonplaceholder.typicode.com/users"

  const fetchUsers = async () => {
    try {
      const response = await fetch(URL)
      const data = await response.json()
      setUsers(() => data.sort((a: user, b: user) => a.name.localeCompare(b.name)))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <table>
        <th>Name</th>
        <th>Email</th>
        <th>City</th>
        <th>Company</th>
        <tbody>
          {
            users?.map(ele => <tr>
              <td>{ele.name}</td>
              <td>{ele.email}</td>
              <td>{ele.address?.city}</td>
              <td>{ele.company?.name}</td>
            </tr>)
          }
        </tbody>

      </table>

    </>
  )
}
interface newData {
  name :string
  email :string
  city :string
  company :string
  SetStateAction : void
}
function UserPage() {
  const [userData, setUsersData] = useState<newData| undefined>({
    name: '', email: "", city: "", company: ""
  })

  const handleSubmit = (e:Event) => {
    console.log(e.target.name || null)
  }
  const handleChange = (e:HTMLInputElement) => {
    setUsersData(()=>[e.target.name] : e.target.value)
}
return (
  <form>
    <input type="text" name="name" onChange={(e) => handleChange(e)} placeholder='Name' />
    <input type="Email" name='email' onChange={(e) => handleChange(e)} placeholder='Email' />
    <input type="text" name='city' onChange={(e) => handleChange(e)} placeholder='city' />
    <input type="text" name='company' onChange={(e) => handleChange(e)} placeholder='company' />
    <button type='submit' onClick={(e:HTMLButtonElement) => handleSubmit(e)}> ADD</button>
  </form>
)
}

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link> | <Link to="/userPage">UserPage</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userPage" element={<UserPage />} />
      </Routes>
    </div>
  )
}

export default App

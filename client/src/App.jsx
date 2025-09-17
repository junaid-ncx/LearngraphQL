import './App.css'
import { useQuery, useMutation } from '@apollo/client/react'
import { gql } from '@apollo/client'

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      isMarried
      name
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
    }
  }
`;

function App() {

  const {data: getUsersData, error: getUsersError, loading: getUsersLoading} = useQuery(GET_USERS);
  
  const {data: getUserByIdData, error: getUserByIdError, loading: getUserByIdLoading} = useQuery(GET_USER_BY_ID, {
    variables: {id: "2"}
  });

  if (getUsersLoading) return <p>Loading....</p>
  
  if (getUsersError) return <p>ERROR!: {error.message}</p>

  return (
    <>
      <h1>Users</h1>
      <div>
        {getUsersData.getUsers.map((user, index) => (
          <div key={index}>
            <p>{user.name} is {user.isMarried ? '' : 'not'} married</p>
          </div>
        ))}
      </div>

      <div>
        <h1>Chosen User:</h1>
        {getUserByIdLoading ? <p>Loading user...</p> : 
          (
            <p>{getUserByIdData.getUserById.name}</p>
          )
        }
      </div>
    </>
  )
}

export default App

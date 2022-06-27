import { ApolloProvider, gql, useQuery } from "@apollo/client"
import { BrowserRouter } from "react-router-dom";
import { client } from "./lib/apollo"
import { Router } from "./Router";

// const GET_LESSONS_QUERY = gql`
//   query {
//     lessons {
//       id
//       title
//     }
//   }
// `

// interface Lesson {
//   id: string;
//   title: string;
// }

function App() {
  // useEffect(() => {
  //   client.query({
  //     query: GET_LESSONS_QUERY
  //   }).then((res) => {
  //     console.log(res.data)
  //   })
  // }, [])

  // const {data} = useQuery<{lessons: Lesson[]}>(GET_LESSONS_QUERY)

  return (
    <ApolloProvider
      client={client}
    >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App

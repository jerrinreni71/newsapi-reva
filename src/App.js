import React from 'react';
import './App.css';
import axios from "axios";
function App () {
  const [category, setCategory] = React.useState( "" );
  const [data, setData] = React.useState( [] );
  const [loading, setLoading] = React.useState( false );

  React.useEffect( () => {
    console.log( category )
  }, [category] )


  const postData = () => {

    setLoading( true )
    let data = {
      category
    }
    axios
      .post(
        "https://1nri381946.execute-api.us-east-2.amazonaws.com/default/newsapi1",
        data
      )
      .then( response => {
        let newsData = JSON.parse( response.data )
        setData( newsData.headlines )
        setLoading( false )

        console.log( response )
        // this.setState( { loading: false, completed: true } );
      } )
      .catch( e => console.log( e ) );
  }

  return (
    <div className="container">
      <input
        id="food_name"
        type="text"
        className="validate"
        value={category}
        placeholder="Type Your Keywords"
        onChange={e => setCategory( e.target.value )}
      />
      <button onClick={postData}>
        Search By Keyword
      </button>
      <ul>

        {
          data.length > 0 ? data.map( d => <li>{d} </li> ) : <li>{!loading ? "Search to see the result" : "Loading..."} </li>
        }
      </ul>
    </div>
  );
}



export default App;

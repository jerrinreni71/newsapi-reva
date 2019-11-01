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
        "https://gwfzy6xxo3.execute-api.us-west-1.amazonaws.com/dev/latest",
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

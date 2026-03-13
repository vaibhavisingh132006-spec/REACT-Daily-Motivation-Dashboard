import { useState, useEffect } from "react";
import "./App.css";



function App() {

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [likedQuotes, setLikedQuotes] = useState([]);


  // Load liked quotes from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("likedQuotes")) || [];
    setLikedQuotes(saved);
  }, []);

  // Function to fetch the quote from the api 
  const fetchQuote = async () => {
    setLoading(true);

    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();

    setQuote(data.quote);
    setAuthor(data.author);

    setLoading(false);
  };

  //when the component loads we fetch the 'fetchQuote' function created above 
  useEffect(() => {
    fetchQuote();
  }, []);



  // This is gonnna save the quotes which the user liked to the local storage so that he/she can view them again 
  useEffect(() => {
    localStorage.setItem("likedQuotes", JSON.stringify(likedQuotes));
  }, [likedQuotes]);



  // This function runs when the user clicks on the like button and the button toggles 
  const likeQuote = () => {
    const newQuote = { quote, author };

    const exists = likedQuotes.find(q => q.quote === quote);

    if (exists) {
      setLikedQuotes(likedQuotes.filter(q => q.quote !== quote));
    } else {
      setLikedQuotes([...likedQuotes, newQuote]);
    }
  };




  return (
    <div className="container">

      <h1>Daily Motivation</h1>

      {loading ? (
        <p>Loading quote...</p>
      ) : (
        <div className="quoteBox">
          <p>"{quote}"</p>
          <p>- {author}</p>
        </div>
      )}



      <button onClick={fetchQuote} disabled={loading}>
        New Quote
      </button>

      <button onClick={likeQuote}>
        Like ❤️
      </button>

      <p>Total Likes: {likedQuotes.length}</p>

      {likedQuotes.length > 0 && (
        <div className="liked">
          <h3>Liked Quotes</h3>

          {likedQuotes.map((q, i) => (
            <div key={i}>
              <p>"{q.quote}"</p>
              <small>- {q.author}</small>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default App;
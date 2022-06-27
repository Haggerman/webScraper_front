import { useState, useEffect } from 'react';

const useFetch = ({url, scrapeUrl, submit, setSubmit}) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(scrapeUrl)
    if(scrapeUrl && submit){
      fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: scrapeUrl })
      })
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setSubmit(false);
        console.log(data)
        setError(null);
      })
      .catch(err => {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      })}
  }, [submit])

  return { data, isPending, error };
}
export default useFetch;
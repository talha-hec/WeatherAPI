import { useState, useEffect } from 'react';


function APIFetcher (APIURL, trigger) {

    const [APIdata, setAPIData] = useState(null);
    const [errorAPI, setErrorAPI] = useState(null);
    const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!APIURL) return;

    setLoading(true);
    setErrorAPI(null);

    fetch(APIURL)

      .then(function (response) {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })

      .then(function (data) {
        setAPIData(data);
      })

      .catch(function (err) {
        setErrorAPI(err.message);
      })

      .finally(function () {
        setLoading(false);
      })
      
      ;

  }, [APIURL, trigger]);

  
  return { APIdata, loading, errorAPI };
  
}

export default APIFetcher;
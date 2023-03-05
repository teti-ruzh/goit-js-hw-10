 export { fetchCountries };
 
 function fetchCountries(name) {
        const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
     return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
              }
          return response.json();
        })
        .then(countriesArray => {return countriesArray})
        // .catch(error => console.log("Oops, there is no country with that name"));
    };
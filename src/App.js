import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchImages = (query) => {
    let apiUrl = 'https://api.unsplash.com/photos/random?count=10&client_id=nGxKrzD4c8Ss_VD9t5VI9fP-2bAShq65u2B06VrEjfo';

    if (query) {
      apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=nGxKrzD4c8Ss_VD9t5VI9fP-2bAShq65u2B06VrEjfo`;
    }

    axios.get(apiUrl)
      .then((response) => {
        if (query) {
          setImages(response.data.results);
        } else {
          setImages(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  };

  const handleSearch = () => {
    fetchImages(searchQuery);
  };

  return (
    <>
      <div className="container my-2">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter category name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {images.map((image, index) => (
            <div className="col-4 mb-4" key={index}>
              <div className="card">
                <img
                  src={image.urls.small}
                  className="card-img-top"
                  alt={image.alt_description}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{image.user.name}</h5>
                  <p className="card-text">{image.description || 'No description available'}</p>
                  <a href={image.links.html} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    View !
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

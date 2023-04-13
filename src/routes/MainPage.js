import requests from 'api/requests'
import Banner from 'compenents/Banner'
import Row from 'compenents/Row'
import React from 'react'

function MainPage() {
  return (
    <div>

      <Banner />
      <Row title='NETFLIX ORIGINALS' id='NO' fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title='Trending Now' id='TN' fetchUrl={requests.fetchTrending} />
      <Row title='Top Rated' id='TR' fetchUrl={requests.fetchTopRated} />
      <Row title='Animation Movie' id='AM' fetchUrl={requests.fetchAnimationMovies} />
      <Row title='Family Movie' id='FM' fetchUrl={requests.fetchFamilyMovies} />
      <Row title='Adventure Movie' id='AM' fetchUrl={requests.fetchAdventureMovies} />
      <Row title='Science Fiction Movie' id='SFM' fetchUrl={requests.fetchScienceFictionMovies} />
      <Row title='Action Movie' id='AM' fetchUrl={requests.fetchAction} />

    </div>
  )
}

export default MainPage
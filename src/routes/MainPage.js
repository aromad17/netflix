import requests from 'api/requests'
import Banner from 'compenents/Banner'
import Row from 'compenents/Row'
import React from 'react'

function MainPage({ userObj }) {
  return (
    <div>

      <Banner />
      <Row title='NETFLIX ORIGINALS' id='NO' fetchUrl={requests.fetchNetflixOriginals} isLargeRow userObj={userObj} />
      <Row title='Trending Now' id='TN' fetchUrl={requests.fetchTrending} userObj={userObj} />
      <Row title='Top Rated' id='TR' fetchUrl={requests.fetchTopRated} userObj={userObj} />
      <Row title='Animation Movie' id='AM' fetchUrl={requests.fetchAnimationMovies} userObj={userObj} />
      <Row title='Family Movie' id='FM' fetchUrl={requests.fetchFamilyMovies} userObj={userObj} />
      <Row title='Adventure Movie' id='AM' fetchUrl={requests.fetchAdventureMovies} userObj={userObj} />
      <Row title='Science Fiction Movie' id='SFM' fetchUrl={requests.fetchScienceFictionMovies} userObj={userObj} />
      <Row title='Action Movie' id='AM' fetchUrl={requests.fetchAction} userObj={userObj} />

    </div>
  )
}

export default MainPage



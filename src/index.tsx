import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Search from './components/search'
import List from './components/list'

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
const YOUTUBE_SEARCH_API_URL = 'https://www.googleapis.com/youtube/v3/search'
const YOUTUBE_VIDEO_API_URL = 'https://www.googleapis.com/youtube/v3/videos'

const App = () => {
  const [state, setState] = useState<listState>({
    list: []
  })
  const [searchParams, setSearchParams] = useState<searchParamsState>({
    text: '',
    searchCount: '0',
  })

  const getVideoData = async (searchParams: searchParamsState) => {
    let searchResult: Array<listValueState> = []
    await axios
      .get(YOUTUBE_SEARCH_API_URL, {
        params: {
          part: 'snippet',
          type: 'video',
          maxResults: searchParams.searchCount,
          q: searchParams.text,
          key: YOUTUBE_API_KEY
        }
      })
      .then(res => {
        searchResult = res.data.items.map((item: { id: { videoId: string }, snippet: { channelTitle: string; title: string } }) => {
          const data = {
            videoId: item.id.videoId,
            channelTitle: item.snippet.channelTitle,
            title: item.snippet.title
          }
          return data
        })
      })
      .catch(() => {
        console.log("データの取得に失敗しました")
      })
    return Promise.resolve(searchResult)
  }

  const getViewCount = async (videoId: string) => {
    let viewCount: string = ''
    await axios
      .get(YOUTUBE_VIDEO_API_URL, {
        params: {
          part: 'statistics',
          id: videoId,
          key: YOUTUBE_API_KEY
        }
      })
      .then(res => {
        viewCount = Number(res.data.items[0].statistics.viewCount).toLocaleString()
      })
      .catch(() => {
        console.log('データの取得に失敗しました')
      })
    return Promise.resolve(viewCount)
  }

  const videoSearch = async (searchParams: searchParamsState) => {
    if (!searchParams.text || searchParams.searchCount == '0') { return }
    let videoData: Array<listValueState> = await getVideoData(searchParams)
    for (let i = 0; i < videoData.length; i++) {
      videoData[i].viewCount = await getViewCount(videoData[i].videoId)
    }
    setState({ list: videoData })
  }

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(state => ({ ...state, text: e.target.value }))
  }

  const changeSearchCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(state => ({ ...state, searchCount: e.target.value }))
  }

  return (
    <Container className='mt-3'>
      <h1>Yotubeの動画検索</h1>
      <Search 
        onClick={videoSearch}
        onTextChange={changeText}
        onSearchCountChange={changeSearchCount}
        searchParams={searchParams}
      />
      <List list={state.list}/>
    </Container>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
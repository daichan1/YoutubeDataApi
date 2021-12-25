type listValueState = {
  videoId: string
  channelTitle: string
  title: string
  viewCount: string
}

type listState = {
  list: Array<listValueState>
}

type searchParamsState = {
  text: string
  searchCount: string
}
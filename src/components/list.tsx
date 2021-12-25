import { Table } from 'react-bootstrap'

type listProps = {
  list: Array<listValueState>
}

const List = (props: listProps) => {
  const list = props.list.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.channelTitle}</td>
        <td>{item.title}</td>
        <td>{item.viewCount}回</td>
      </tr>
    )
  })

  return (
    <Table className='mt-3'>
      <thead>
        <tr>
          <th style={{ width: '20%' }}>チャンネル名</th>
          <th style={{ width: '60%' }}>動画タイトル</th>
          <th style={{ width: '20%' }}>再生回数</th>
        </tr>
      </thead>
      <tbody>
        {list}
      </tbody>
    </Table>
  )
}

export default List
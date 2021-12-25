import { Container, FormControl, Button, Form, Row, Col } from 'react-bootstrap'

type searchProps = {
  onClick: (searchParams: searchParamsState) => void
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearchCountChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  searchParams: searchParamsState
}

const MAX_SEARCH_COUNT = 5

const Search = (props: searchProps) => {
  const selectOption = () => {
    let result: JSX.Element[] = []
    for (let i = 1; i <= MAX_SEARCH_COUNT; i++) {
      result.push(<option key={i} value={i}>{i}</option>)
    }
    return result
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col xs={8}>
          <FormControl
            placeholder='検索したい文字列を入力してください'
            onChange={props.onTextChange}
            value={props.searchParams.text}
          />
        </Col>
        <Col xs={2}>
          <Form.Select onChange={(e) => props.onSearchCountChange(e)}>
            <option value="0">検索件数</option>
            {selectOption()}
          </Form.Select>
        </Col>
        <Col xs={2}>
          <Button
            onClick={() => props.onClick(props.searchParams)}
            variant="outline-secondary"
          >
            検索
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Search

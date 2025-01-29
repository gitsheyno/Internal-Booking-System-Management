import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";
function App() {
  return (
    <>
      <GlobalStyles />
      <Row type="horizantal">
        <Heading as="h1">This is a H1 Heading</Heading>
        <div>
          <Heading as="h2">This is a H1 Heading</Heading>
          <Button size="small" variation="secondary">
            Hello
          </Button>
          <Button size="medium" variation="primary">
            Hello2
          </Button>
          <Button>Default</Button>
        </div>
      </Row>

      <Row type="vertical">
        <Heading as="h3">This is a H1 Heading</Heading>
        <form>
          <Input type="number" />
          <Input type="number" />
        </form>
      </Row>
    </>
  );
}

export default App;

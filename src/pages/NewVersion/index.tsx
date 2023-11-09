import { h, Component, ComponentChild, Attributes, ComponentChildren, Ref } from 'preact';
import Container from '../../components/Container';
import Row from '../../components/Row';
import Column from '../../components/Column';

export default class NewVersion extends Component {
  handleUpdateClick = () => {
    alert('Aktualizacja w toku...');
  };

  render(
    props?: Readonly<Attributes & { children?: ComponentChildren; ref?: Ref<any> }>,
    state?: Readonly<{}>,
    context?: any
  ): ComponentChild {
    return (
      <Container className='d-flex justify-content-center mt-5'>
        <Column className='col-8'>
        <Row>
        <h1 class={'text-center'}>Nowa wersja aplikacji jest dostępna!</h1>
        </Row>
        <Row>
        <form className={'d-inline-flex justify-content-center flex-column'}>
          <button type="submit" class="btn btn-dark mt-5" onClick={this.handleUpdateClick}>
            Aktualizuj
          </button>
        </form>
        </Row>
        </Column>
      </Container>
    );
  }
}

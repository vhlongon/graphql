import { branch, renderComponent } from 'recompose';
import Error from './error';

const withError = hasError => branch(hasError, renderComponent(Error));

export default withError;

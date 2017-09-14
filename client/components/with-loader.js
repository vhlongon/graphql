import { branch, renderComponent } from 'recompose';
import Loader from './loader';

const withLoader = isLoading =>
  branch(isLoading, renderComponent(Loader));

export default withLoader;

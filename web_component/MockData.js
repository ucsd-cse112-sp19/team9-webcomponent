import  {addMock, enableMocking} from './MockAxios'

addMock('/messages', {data: "Hello Axios and Webpack"});

enableMocking(true);
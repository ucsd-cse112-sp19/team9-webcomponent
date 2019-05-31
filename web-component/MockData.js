import  {addMock} from '../util/MockAxios'

addMock('/messages', {data: ["Hello Axios and Webpack"]});
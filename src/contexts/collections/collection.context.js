import {createContext} from 'react' //Context are used to make anything (strings, arrays,function, objects, etc)

import SHOP_DATA from './shop.data'

const CollectionsContext = createContext(SHOP_DATA);

export default CollectionsContext;
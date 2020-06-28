import React, {lazy, Suspense} from 'react';
import { Route } from 'react-router-dom';

// import CollectionPage from '../collection/collection.component';
const CollectionsOverview =lazy(()=>import('../../components/collections-overview/collections-overview.component'));
const CollectionPage =lazy(()=>import('../collection/collection.component'));

const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Suspense fallback={<div>...Loading</div>}>
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </Suspense>
  </div>
);

export default ShopPage;

import React, { Suspense, FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthModule } from 'modules/auth';
import { useStore } from 'effector-react';
import { $user } from 'common/models/auth/store';
import { ErrorBoundary } from 'common/components/ErrorBoundary';
import { useTranslation } from 'react-i18next';
import { ModuleLayout } from './ModuleLayout';
import { createModules } from './list-modules';

const ModuleRouting: FC = () => {
  const { t } = useTranslation();
  const modules = createModules(t);

  return (
    <Suspense fallback={null}>
      <Switch>
        {modules.map((route) => (
          <Route key={route.url} path={route.url} exact>
            <ErrorBoundary>
              <route.component />
            </ErrorBoundary>
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
};

export const Routing: FC = () => {
  const user = useStore($user);

  return (
    <Suspense fallback={null}>
      <Switch>
        <Route exact path="/auth">
          <AuthModule />
        </Route>
        <ModuleLayout>
          <Route path="/">
            <ModuleRouting />
          </Route>
        </ModuleLayout>
      </Switch>
      {!user && <Redirect to="/auth" />}
    </Suspense>
  );
};

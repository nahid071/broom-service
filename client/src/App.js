import React from "react";
import Layout from "./components/layouts/Layout";
import { Switch, Route, Redirect } from "react-router-dom";

// Authentication
import Login from "./screens/auth/login";

// Admin
import Dashboard from "./screens/dashboard";
import Contructors from "./screens/contructors";
import AddContructor from "./screens/contructors/add";
import EditContructor from "./screens/contructors/edit";
import ContructorProfile from "./screens/contructors/profile";
import ManageContruct from "./screens/manage-contruct";
import Messages from "./screens/messages";
import Util from "./screens/utils";

// Uploading
import Uploading from "./components/utils/uploading";

// initialization firebase
import { firebase, auth } from "./helper/firebase";
import { useSelector } from "react-redux";
function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  // Initialization firebase storage
  (() => {
    // firebase.storage();
    auth
      .signInWithEmailAndPassword("forAuth@gamil.com", "#nsm123#")
      .then((user) => {
        console.log("Firebase Sign in Successfull");
      })
      .catch((e) => {
        console.log("Something went wrong with firebase signin");
      });
  })();
  return (
    <>
      {isAuthenticated && (
        <Layout>
          <Switch>
            <Route path="/contructors" exact component={Contructors} />
            <Route path="/contructors/add" exact component={AddContructor} />
            <Route
              path="/contructor/:id/update"
              exact
              component={EditContructor}
            />
            <Route
              path="/contructor/:id/profile"
              exact
              component={ContructorProfile}
            />
            <Route path="/manage-contruct" exact component={ManageContruct} />
            <Route path="/messages" exact component={Messages} />
            <Route path="/utils" exact component={Util} />
            <Route path="/" exact component={Dashboard} />

            <Route path="/" exact>
              <Redirect to="/" />
            </Route>
            <Route path="**" exact>
              <Redirect to="/" />
            </Route>
          </Switch>
        </Layout>
      )}

      {/* // if Not autenticated  */}
      {!isAuthenticated && (
        <Switch>
          {/* // Admin  */}
          <Route path="/" exact component={Login} />
          <Route path="**" exact>
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
      <Uploading />
    </>
  );
}

export default App;

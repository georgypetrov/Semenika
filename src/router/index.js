import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import { Role } from "../_helpers/role";

// Containers
const TheContainer = () => import("@/containers/TheContainer");

// Views
const Dashboard = () => import("@/views/Dashboard");

const Labels = () => import("@/views/pages/Labels");
const Userapply = () => import("@/views/pages/Userapply");
const AdminIssue = () => import("@/views/pages/AdminIssue");
const SeedCertification = () => import("@/views/pages/SeedCertification");
const MyProfile = () => import("@/views/pages/MyProfile");
const EditProfile = () => import("@/views/pages/EditProfile");
const ChangePassword = () => import("@/views/pages/ChangePassword");
const ViewLabels = () => import("@/views/pages/ViewLabels");
const Registers = () => import("@/views/pages/Registers");
// const SamplingAuthorization = () =>
//   import("@/views/pages/SamplingAuthorization");
// Views - Pages
const Page404 = () => import("@/views/pages/Page404");
const Page500 = () => import("@/views/pages/Page500");
const Login = () => import("@/views/pages/Login");
const Register = () => import("@/views/pages/Register");
// // Users
const Users = () => import("@/views/users/Users");
const User = () => import("@/views/users/User");
const AdminUserEdit = () => import("@/views/pages/AdminUserEdit");
const CreateTrademeterialRegister = () =>
  import("@/views/pages/CreateTrademeterialRegister");
const LinkRegisters = () => import("@/views/pages/LinkRegisters");

// const AddRegisterRecord = () => import("@/views/pages/AddRegisterRecord.vue")
Vue.use(Router);

const router = new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      name: "Home",
      component: TheContainer,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard,
          meta: { authorize: [] }
        },
        {
          path: "/labels",
          name: "Labels",
          component: Labels,
          meta: { authorize: [] }
        },
        {
          path: "/userapply",
          name: "Userapply",
          component: Userapply,
          meta: { authorize: [Role.Frontend] }
        },
        {
          path: "/adminissue",
          name: "AdminIssue",
          component: AdminIssue,
          meta: { authorize: [Role.Admin] }
        },
        {
          path: "/seedcertification",
          name: "SeedCertification",
          component: SeedCertification,
          meta: { authorize: [] }
        },
        {
          path: "/myprofile",
          name: "MyProfile",
          component: MyProfile,
          meta: { authorize: [] }
        },
        {
          path: "/myprofile/edit",
          name: "EditProfile",
          component: EditProfile,
          meta: { authorize: [] }
        },
        {
          path: "/myprofile/changepassword",
          name: "ChangePassword",
          component: ChangePassword,
          meta: { authorize: [] }
        },
        {
          path: "/registers",
          name: "Registers",
          component: Registers,
          meta: { authorize: [] }
        },
        // {
        //   path: "/samplingauthorization",
        //   name: "SamplingAuthorization",
        //   component: SamplingAuthorization,
        //   meta: { authorize: [Role.Admin] }
        // },
        {
          path: "/viewlabels",
          name: "ViewLabels",
          component: ViewLabels,
          meta: { authorize: [] }
        },
        {
          path: "/users",
          name: "Users",
          component: Users,
          meta: { authorize: [Role.Admin] }
        },
        {
          path: "/users/:id",
          name: "User",
          component: AdminUserEdit,
          meta: { authorize: [Role.Admin] }
        },
        {
          path: "/registers/createtrademeterialregister",
          name: "CreateTrademeterialRegister",
          component: CreateTrademeterialRegister,
          meta: { authorize: [Role.Admin] }
        },
        {
          path: "register/:id",
          name: "LinkRegisters",
          component: LinkRegisters,
          meta: { authorize: [] }
        }
        // {
        //   path: "/registers/createtrademeterialregister",
        //   name: "CreateTrademeterialRegister",
        //   component: AddRegisterRecord,
        //   meta: { authorize: [Role.Admin] }
        // }
        // {
        //   path: 'tables',
        //   redirect: '/tables/tables',
        //   name: 'Tables',
        //   component: {
        //     render(c) {
        //       return c("router-view");
        //     }
        //   },
        //   children: [
        //     {
        //       path: "",
        //       name: "Users",
        //       component: Users
        //     },
        //     {
        //       path: ":id",
        //       meta: {
        //         label: "User Details"
        //       },
        //       name: "User",
        //       component: User
        //     }
        //   ]
        // },
      ]
    },
    {
      path: "/pages",
      redirect: "/pages/404",
      name: "Pages",
      component: {
        render(c) {
          return c("router-view");
        }
      },
      children: [
        {
          path: "404",
          name: "Page404",
          component: Page404
        },
        {
          path: "500",
          name: "Page500",
          component: Page500
        },
        {
          path: "/login",
          name: "Login",
          component: Login
        },
        {
          path: "/register",
          name: "Register",
          component: Register
        }
      ]
    },
    { path: "*", redirect: "/" }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // console.log(store.state);

  const { authorize } = to.meta;
  // const currentUser = store.state.Auth.user;
  const roles = store.state.Auth.roles;

  // console.log("roles", roles);

  if (authorize) {
    // console.log(authorize);
    if (!store.getters["Auth/isAuthenticated"]) {
      //     // not logged in so redirect to login page with the return url
      return next({ path: "/login", query: { returnUrl: to.path } });
    }
    // console.log(authorize.filter(x => roles.includes(x)));

    // authorize.filter(x => roles.includes(x));
    //   // check if route is restricted by role
    // console.log(authorize.length);
    // console.log(authorize.length && authorize.filter(x => roles.includes(x)).length);

    if (
      authorize.length &&
      authorize.filter(x => roles.includes(x)).length == 0
    ) {
      //     // role not authorised so redirect to home page
      return next({ path: "/" });
    }
  }

  next();
});

export default router;

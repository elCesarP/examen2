import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "rol",
    loadChildren: () =>
      import("../../features/rol/rol.module").then((m) => m.RolModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("../../features/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "registro",
    loadChildren: () =>
      import("../../features/registro/registro.module").then(
        (m) => m.RegistroModule
      ),
  },
  {
    path: "login",
    loadChildren: () =>
      import("../../features/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "perfil",
    loadChildren: () =>
      import("../../features/perfil/perfil.module").then((m) => m.PerfilModule),
  },
];

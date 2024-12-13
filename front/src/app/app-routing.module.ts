import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { full } from "./shared/routes/full.routes";
import { content } from "./shared/routes/content.routes";

const routes: Routes = [
  {
    path: "",
    redirectTo: "rol",
    pathMatch: "full",
  },
  {
    path: "home",
    redirectTo: "home"
  },
  {
    path: "registro",
    redirectTo: "registro",
  },
  {
    path: "login",
    redirectTo: "login",
  },
  {
    path: "perfil",
    redirectTo: "perfil",
  },
  {
    path: "habitacion",
    redirectTo: "habitacion",
  },
  {
    path: "**",
    redirectTo: "rol",
  },
];

@NgModule({
  imports: [
    [
      RouterModule.forRoot(routes, {
        anchorScrolling: "enabled",
        scrollPositionRestoration: "enabled",
      }),
    ],
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

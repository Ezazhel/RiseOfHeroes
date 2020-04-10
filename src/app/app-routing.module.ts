import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CombatComponent } from "./routes/combat/components";

const routes: Routes = [
    { path: "", redirectTo: "house", pathMatch: "full" },
    { path: "combat", component: CombatComponent },
    {
        path: "house",
        loadChildren: () =>
            import("./routes/house/house.module").then((m) => m.HouseModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    { path: "", redirectTo: "house", pathMatch: "full" },
    {
        path: "house",
        loadChildren: () =>
            import("./routes/house/house.module").then((m) => m.HouseModule),
    },
    {
        path: "world",
        loadChildren: () =>
            import("./routes/world/world.module").then((m) => m.WorldModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

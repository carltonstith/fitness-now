import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { MaterialModule } from "src/app/material.module";
import { FormsModule } from "@angular/forms";

import { PagesRoutes } from "./pages.routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CardComponent } from "../card/card.component";

@NgModule({
  declarations: [DashboardComponent,CardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(PagesRoutes)
  ],
  exports: []
})
export class PagesModule {}

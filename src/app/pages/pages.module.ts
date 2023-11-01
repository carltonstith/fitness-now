import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { MaterialModule } from "src/app/material.module";
import { FormsModule } from "@angular/forms";

import { PagesRoutes } from "./pages.routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CardComponent } from "../components/card/card.component";
import { ChallengesComponent } from './challenges/challenges.component';
import { ChallengeDetailsComponent } from '../components/challenge-details/challenge-details.component';

@NgModule({
  declarations: [DashboardComponent, CardComponent, ChallengesComponent, ChallengeDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(PagesRoutes)
  ],
  exports: []
})
export class PagesModule {}

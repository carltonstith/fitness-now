import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ChallengesComponent } from "./challenges/challenges.component";

export const PagesRoutes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "challenge",
        component: ChallengesComponent,
        pathMatch: "full"
      }
    ]
  },
  // {
  //   path: "challenge",
  //   component: ChallengesComponent,
  //   pathMatch: "full"
  // }
];

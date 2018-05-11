import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpeedDisplayComponent } from './components/speed-display/speed-display.component';

const routes: Routes = [
    {
        path: '',
        component: SpeedDisplayComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

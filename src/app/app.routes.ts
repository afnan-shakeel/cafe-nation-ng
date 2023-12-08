import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { MenuConfigComponent } from './pages/menu-config/menu-config.component';
import { TestComponent } from './pages/test/test.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, },
    { path: 'about', component: AboutComponent, },
    { path: 'products', component: ProductsComponent },
    { path: 'menu-config', component: MenuConfigComponent, },
    { path: 'test', component: TestComponent, },
];

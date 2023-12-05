import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.sass'
})
export class ProductsComponent {
  constructor(private firestoreService: FirestoreService) { }
  mealCategoryList: any[] = [{ name: 'Fruit Blends', value: 'fruit blends' }, { name: 'Hot & Cold Drinks', value: 'hot & cold drink' }, { name: 'Fresh Bakes', value: 'fresh bakes' }, { name: 'Sandwiches', value: 'SANDWICHES' }];
  menuList: any[] = [];
  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.menuList = await this.firestoreService.getMenuData(null, 'active');
  }

  async onSelectChange(event: any) {
    const selectedValue = event.value;
    // Use the selectedValue here
    if(selectedValue=='all'){
      this.menuList = await this.firestoreService.getMenuData(null, 'active');
      return;
    }
    console.log(selectedValue);
    this.menuList = await this.firestoreService.getMenuData(selectedValue, 'active');
  }
}

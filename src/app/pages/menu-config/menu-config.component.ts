import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-config',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './menu-config.component.html',
  styleUrl: './menu-config.component.sass'
})
export class MenuConfigComponent {
  constructor(private firestoreService: FirestoreService) { }
  mealCategoryList: any[] = [{ name: 'Fruit Blends', value: 'fruit blends' }, { name: 'Hot & Cold Drinks', value: 'hot & cold drink' }, { name: 'Fresh Bakes', value: 'fresh bakes' }, { name: 'Sandwiches', value: 'SANDWICHES' }];
  menuList: any[] = [];
  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.menuList = await this.firestoreService.getMenuData(null, null);
  }

  isMenuForm: boolean = false;
  setMenuForm(value: any) {
    this.isMenuForm = value;
    if(value==false){
      this.menuForm.reset();
    }
  }

  menuForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    imageUrl: new FormControl(''),
    status: new FormControl(''),
  });
  async submitMenu() {
    const { name, price, category, description, imageUrl, status, id } = this.menuForm.controls;
    console.log(name.value, price.value, category.value, description.value, imageUrl.value, status.value);
    const res = await this.firestoreService.addMenuData(
      {
        id: id.value,
        dishName: name.value,
        price: price.value,
        category: category.value,
        description: description.value,
        imageUrl: imageUrl.value,
        status: status.value ? 'active' : 'inactive',
      }
    );
    this.setMenuForm(false);
    this.menuList = await this.firestoreService.getMenuData(null, null);
    console.log(res);
  }

  ediItem(item: any){
    console.log(item);
    this.menuForm.setValue({
      id: item.id,
      name: item.dishName,
      price: item.price,
      category: item.category,
      description: item.description,
      imageUrl: item.imageUrl,
      status: item.status,
    });
    this.setMenuForm(true);
  }
  showDeleteModal: boolean = false;
  showDeleteConfirm(item: any) {
    this.showDeleteModal = true;
      this.deleteCache = item;
  }
  deleteCache: any;
  async deleteMenu(){
    console.log(this.deleteCache);
    await this.firestoreService.deleteMenuData(this.deleteCache.id)
    this.showDeleteModal = false;
    this.menuList = await this.firestoreService.getMenuData(null, null);
    delete this.deleteCache;
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

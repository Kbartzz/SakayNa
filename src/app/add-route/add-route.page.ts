import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.page.html', 
  styleUrls: ['./add-route.page.scss'],
  standalone: false,
})
export class AddRoutePage {
  route = {
    origin: '',
    destination: '',
    code: ''
  };

  resultMsg: string = '';

  constructor(private firestore: Firestore) {}

  async submitRoute() {
    try {
      if (!this.route.origin || !this.route.destination || !this.route.code) {
        this.resultMsg = 'Please fill in all fields.';
        return;
      }

      const jeepneyRoutes = collection(this.firestore, 'jeepney-routes');
      await addDoc(jeepneyRoutes, {
        ...this.route,
        timestamp: new Date()
      });

      this.resultMsg = 'Route added successfully!';
      this.route = { origin: '', destination: '', code: '' }; 
    } catch (err) {
      this.resultMsg = 'Failed to add route: ' + (err as any).message;
    }
  }
}

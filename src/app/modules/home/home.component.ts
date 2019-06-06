import { Component, OnInit } from '@angular/core';
import { Icart } from 'src/app/core/models/icart';
import { Http } from '@angular/http';
import { IProduct } from 'src/app/core/models/iproduct';
import * as productData from '../../data/products.json';
import { Observable } from 'rxjs';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import * as cryptoJs from 'crypto-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  _arrProduct = [];
  _cartDetails: Icart[] = [];
  _cartObj: Icart;
  _subtotal: number = 0;

  get subtotal(): number {
    this._subtotal = 0;
    if (this._cartDetails != null) {
      this._cartDetails.forEach(x => this._subtotal += (x.quantity * x.price));
    }
    return this._subtotal;
  }

  get cartDetails(): Icart[] {
    this.subtotal;
    this._cartDetails = <Icart[]>JSON.parse(localStorage.getItem('cart'));
    return this._cartDetails;
  }

  constructor(private http: Http) { }

  ngOnInit() {
    this._arrProduct = <IProduct[]>JSON.parse(JSON.stringify(productData.default));
  }

  addToCart(item: IProduct) {

    this._cartDetails = <Icart[]>JSON.parse(localStorage.getItem('cart')); // get existing cart items from localStorage
    // check if item already exists in the cart or not.
    if (!(this._cartDetails == null)) {
      if (this._cartDetails.find(x => x.id == item.id)) {
        // product already exists in cart.   
        this._cartDetails.find(x => x.id == item.id).quantity += 1;
      }
      else {
        this._cartObj = <Icart>item;
        this._cartObj.quantity = 1;
        this._cartDetails.push(this._cartObj);
      }
    }
    else {
      this._cartObj = <Icart>item;
      this._cartObj.quantity = 1;
      this._cartDetails = [];
      this._cartDetails.push(this._cartObj);
    }

    localStorage.setItem('cart', JSON.stringify(this._cartDetails));
  }



  clearCart() {
    localStorage.removeItem('cart');
    /// check cart
    this._cartDetails = [];
  }



  removeItem(item: Icart) {
    this.cartDetails;
    if (this._cartDetails != null) {

      var index = this._cartDetails.findIndex(x => x.id == item.id);
      console.log(index);
      if (index > -1) {
        this._cartDetails.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this._cartDetails));
        this.cartDetails;
        console.log(this._cartDetails);
      }
    }
  }

}

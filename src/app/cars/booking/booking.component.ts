import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(private api: ApiService, private fb: FormBuilder) { }

  //to hold my order items
  allOrder: any = []

  //to hold total price
  totalPrice: number = 0

  //address form
  addressForm = this.fb.group({   //group
    //arrays
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    housenumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    street: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    state: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    pincode: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    mobilenumber: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  //to hold payment status information
  paymentStatus: boolean = false

  username: any
  housenumber: any
  pincode: any
  mobilenumber: any

  discountStatus: boolean = false
  offerClick: boolean = false

  //from paypal
  public payPalConfig?: IPayPalConfig;

  //paypal showSuccess
  showSuccess: boolean = false

  proceedtopay: boolean = false

  ngOnInit(): void {

    //paypal function call
    this.initConfig();

    this.api.getOrder().subscribe((result: any) => {
      console.log(result);
      this.allOrder = result
      // //call order total
      this.getOrderTotal()
    },
      (result: any) => {
        console.log(result.error);   //error message    
      })
  }

  removeOrderItem(id: any) {
    this.api.removeOrderItem(id).subscribe((result: any) => {
      console.log(result);   //remaining array of myorder
      //remaining cart items added to the allCarts
      this.allOrder = result
      // this.api.OrderCount()
      this.getOrderTotal()
    },
      (result: any) => {
        console.log(result.error);   //error message

      })
  }

  //get order total
  getOrderTotal() {
    let total = 0;
    this.allOrder.forEach((item: any) => {
      total = total + item.grandTotal
      this.totalPrice = Math.ceil(total)
    })
  }

  //address validation
  submitForm() {
    //check the address is valid
    if (this.addressForm.valid) {
      this.paymentStatus = true
      this.username = this.addressForm.value.username
      this.housenumber = this.addressForm.value.housenumber
      this.pincode = this.addressForm.value.pincode
      this.mobilenumber = this.addressForm.value.mobilenumber
    }
    else {
      alert("Please enter valid details")
    }
  }

  //offers
  offerClicked() {
    this.offerClick = true
  }

  discount(value: any) {
    this.totalPrice = Math.ceil(this.totalPrice * (100 - value) / 100)
    this.offerClick = false
    this.discountStatus = true
  }

  //proceed to pay
  makepay() {
    this.proceedtopay = true
  }

  modalclose() {
    this.addressForm.reset()
    this.showSuccess = false
    this.paymentStatus = false
  }

  //paypal function
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }


}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  data:any;
  checkInResponse:any;

  constructor(private router:Router, private route:ActivatedRoute, private service:DataService) { }

  ngOnInit() {
    var id = Number.parseInt(this.route.snapshot.paramMap.get("id"));
    this.service.getReservation(id).subscribe(res => {
      this.data = res;
    })
  }

  checkin(noOfBags){
    var checkInReqeust:any  = new Object();
    checkInReqeust.id = this.data.id;
    checkInReqeust.checkedIn = true;
    checkInReqeust.numberOfBags = noOfBags;

    this.service.checkin(checkInReqeust).subscribe( res => {
      this.checkInResponse = res;
    })
    this.router.navigate(['/confirm'])
  }

}

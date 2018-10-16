import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.scss']
})

// Een component die bedoeld is om als wrapper te dienen voor de router.
// Hier bevinden zich alle componenten die je ziet als je ingelogd bent.
export class LoggedInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

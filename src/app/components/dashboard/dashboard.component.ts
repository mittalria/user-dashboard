import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { UserService, User } from '../../services/user.service';
import { UserTableComponent } from '../user-table/user-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true, // 👈 Angular 17 style
  imports: [CommonModule, UserTableComponent], // 👈 import what template needs
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  users$!: Observable<User[]>;
  hasError = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users$ = this.userService.getUsers().pipe(
      catchError(() => {
        this.hasError = true;
        return of([]); // return empty array so app doesn't crash
      }),
    );
  }
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { UserService, User } from '../../services/user.service';
import { UserTableComponent } from '../user-table/user-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, UserTableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  users$!: Observable<User[]>;
  allUsers: User[] = []; // 👈 keep original list
  filteredUsers: User[] = []; // 👈 what table actually shows
  hasError = false;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef, // 👈 needed to trigger OnPush manually
  ) {}

  ngOnInit() {
    this.users$ = this.userService.getUsers().pipe(
      catchError(() => {
        this.hasError = true;
        return of([]);
      }),
    );

    this.users$.subscribe((users) => {
      this.allUsers = users;
      this.filteredUsers = users; // initially show all
      this.cdr.markForCheck(); // 👈 tell OnPush to re-render
    });
  }

  onSearchChanged(term: string) {
    this.filteredUsers = this.allUsers.filter((user) =>
      user.name.toLowerCase().includes(term.toLowerCase()),
    );
    this.cdr.markForCheck(); // 👈 trigger re-render after filter
  }
}

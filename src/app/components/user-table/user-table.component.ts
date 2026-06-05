import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush, // 👈 always OnPush on dumb components
})
export class UserTableComponent {
  @Input() users: User[] = []; // 👈 only knows about what it receives

  trackById(index: number, user: User): number {
    return user.id; // 👈 helps Angular avoid re-rendering unchanged rows
  }
}

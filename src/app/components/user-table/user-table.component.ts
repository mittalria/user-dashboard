import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  @Input() users: User[] = [];
  @Output() searchChanged = new EventEmitter<string>(); // 👈 events go UP

  trackById(index: number, user: User): number {
    return user.id;
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchChanged.emit(value); // 👈 tell parent, don't handle yourself
  }
}

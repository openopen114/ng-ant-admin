import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds.component.html',
  styleUrls: ['./ds.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsComponent {

}

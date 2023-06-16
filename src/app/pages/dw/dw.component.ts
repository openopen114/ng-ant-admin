import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dw',
  templateUrl: './dw.component.html',
  styleUrls: ['./dw.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DwComponent {

}

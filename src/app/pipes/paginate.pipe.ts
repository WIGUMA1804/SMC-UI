import { Pipe, PipeTransform } from '@angular/core';
import { SifocVariables } from '../interfaces/sifoc-interface';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform(sifocValues: SifocVariables[], page: number = 0): SifocVariables[] {
    return sifocValues.slice(page,page + 10);
  }

}

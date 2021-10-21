import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../../services/basic-statistic.service';
import { finalize } from 'rxjs/operators';
import {
  SifocVariables,
  dataPlot,
  dataCore,
} from '../../../interfaces/sifoc-interface';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  collections = [
    'SIF_401',
    'SIF_402',
    'SIF_405',
    'SIF_407',
    'SIF_408',
    'SIF_409',
  ];
  collectionData = [];
  showNewCollections: SifocVariables[] = [];
  dataSource: SifocVariables[] = [];
  page = 0;
  lenghtWindow = 0;
  suma = 0;
  average = 0;
  median = 0;
  mode: string[] = [];
  variance = 0;
  deviation = 0;
  collection = '';
  collectionToShow = '---';
  value = '';
  MESPAEA_rVoltage: number[] = [];
  MESPAEA_rCurrent: number[] = [];
  MESPAEA_rPowerFactor: number[] = [];
  MESPAEA_rActivePower: number[] = [];
  MESPAEA_rAir: number[] = [];
  MESPAEA_udiAirConsumed: number[] = [];
  MESPAEA_udiEnergyConsumed: number[] = [];
  time: string = '';
  dataset: any = [];

  collection401: any = [];
  collection402: any = [];
  collection405: any = [];
  collection407: any = [];
  collection408: any = [];
  collection409: any = [];

  histogramIsChecked: boolean = true;
  frecuencyIsChecked: boolean = false;

  count = 0;

  max: number = -1;
  min: number = 1000000;
  isChecked = false;
  isCheckedVol = false;
  isCheckedCur = false;
  isCheckedPf = false;
  isCheckedAp = false;
  isCheckedEne = false;
  isCheckedAir = false;
  isCheckedACo = false;
  loading = false;
  dataCore: dataCore[] = [
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
  ];
  time401: Date[] = [];
  time402: Date[] = [];
  time405: Date[] = [];
  time407: Date[] = [];
  time408: Date[] = [];
  time409: Date[] = [];

  public graph: dataPlot = {
    data: this.dataCore,
    layout: {
      width: 1500,
      height: 500,
      title: 'Consumption Variables Relation.',
    },
  };

  displayedColumns: string[] = [
    'MESPAEA_rVoltage',
    'MESPAEA_rCurrent',
    'MESPAEA_rPowerFactor',
    'MESPAEA_rActivePower',
    'MESPAEA_udiEnergyConsumed',
    'MESPAEA_rAir',
    'MESPAEA_udiAirConsumed',
  ];

  displayedColumns_: string[] = [
    'MESPAEA_rVoltage',
    'MESPAEA_rCurrent',
    'MESPAEA_rPowerFactor',
    'MESPAEA_rActivePower',
    'MESPAEA_udiEnergyConsumed',
  ];

  rVoltage: number[] = [];
  rCurrent: number[] = [];
  rPowerFactor: number[] = [];
  rActivePower: number[] = [];
  udiEnergyConsumed: number[] = [];
  rAir: number[] = [];
  udiAirConsumed: number[] = [];
  alarm: number[] = [];
  SIFOC_sif401_LEC: number[] = [];
  SIFOC_sif402_LEC: number[] = [];
  SetV_1: number[] = [];
  SetV_2: number[] = [];
  isActive401 = false;
  isActive402 = false;
  isActive405 = false;
  isCheckedSIFOC_sif401_LEC = false;
  isCheckedSIFOC_sif402_LEC = false;
  isChecked_ = false;
  isCheckedSetV_1 = false;
  isCheckedSetV_2 = false;
  isCheckedAlarm = false;
  SIFOC_sif405_V1: number[] = [];
  SIFOC_sif405_V2: number[] = [];
  isCheckedSIFOC_sif405_V1 = false;
  isCheckedSIFOC_sif405_V2 = false;

  constructor(private statisticService: StatisticService) {}

  resetCheckboxes() {
    this.isCheckedVol = false;
    this.isCheckedCur = false;
    this.isCheckedPf = false;
    this.isCheckedAp = false;
    this.isCheckedEne = false;
    this.isCheckedAir = false;
    this.isCheckedACo = false;
    this.isCheckedSIFOC_sif401_LEC = false;
    this.isCheckedSIFOC_sif402_LEC = false;
    this.isCheckedSetV_1 = false;
    this.isCheckedSetV_2 = false;
    this.isCheckedAlarm = false;
    this.SIFOC_sif401_LEC = [];
    this.SIFOC_sif402_LEC = [];
    this.rVoltage = [];
    this.rCurrent = [];
    this.rPowerFactor = [];
    this.rActivePower = [];
    this.udiEnergyConsumed = [];
    this.alarm = [];
    this.SetV_1 = [];
    this.SetV_2 = [];
  }

  getCollections(e: any) {
    this.loading = true;
    this.graph.data.forEach((item) => {
      item.x = [];
      item.y = [];
    });
    this.resetCheckboxes();
    this.collection = e.target.value;
    console.log(this.collection);
    this.collectionToShow = e.target.value;
    this.statisticService
      .getData(this.collection)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((response: any) => {
        this.count++;
        this.collectionData = response;
        if (this.collection === 'SIF_401') {
          this.isActive401 = true;
          this.isActive402 = false;
          this.isActive405 = false;
          this.collection401 = response;
          this.collection401.forEach((item: any) =>
            this.SIFOC_sif401_LEC.push(item.SIFOC_sif401_LEC)
          );
          this.collection401.forEach((item: any) =>
            this.SetV_1.push(item.SetV_1)
          );
          this.collection401.forEach((item: any) =>
            this.SetV_2.push(item.SetV_2)
          );

          this.collection401.forEach((item: any) => {
            this.time401.push(new Date(item.Time?.$date));
          });
          this.collection401.forEach((element: any) =>
            this.rAir.push(Number(element.MESPAEA_rAir?.toFixed(4)))
          );
          this.collection401.forEach((element: any) =>
            this.udiAirConsumed.push(Number(element.MESPAEA_udiAirConsumed))
          );
        }
        if (this.collection === 'SIF_402') {
          this.isActive401 = false;
          this.isActive402 = true;
          this.isActive405 = false;
          this.collection402 = response;
          this.collection402.forEach((item: any) =>
            this.SIFOC_sif402_LEC.push(item.SIFOC_sif402_LEC)
          );
          this.collection402.forEach((item: any) =>
            this.SetV_1.push(item.SetV_1)
          );
          this.collection402.forEach((item: any) =>
            this.SetV_2.push(item.SetV_2)
          );
          this.collection402.forEach((item: any) => {
            this.time402.push(new Date(item.Time.$date));
          });
        }
        if (this.collection === 'SIF_405') {
          this.isActive401 = false;
          this.isActive402 = false;
          this.isActive405 = true;
          this.collection405 = response;
          this.collection405.forEach((item: any) => {
            this.time405.push(new Date(item.Time.$date));
          });
          this.collection405.forEach((item: any) => {
            if (item.SIFOC_sif405_V1) {
              this.SIFOC_sif405_V1.push(1);
            } else {
              this.SIFOC_sif405_V1.push(0);
            }
          });
          this.collection405.forEach((item: any) => {
            if (item.SIFOC_sif405_V2) {
              this.SIFOC_sif405_V2.push(1);
            } else {
              this.SIFOC_sif405_V2.push(0);
            }
          });

          this.collection405.forEach((item: any) =>
            this.SetV_1.push(item.SetV_1)
          );
          this.collection405.forEach((item: any) =>
            this.SetV_2.push(item.SetV_2)
          );
        }
        if (this.collection === 'SIF_407') {
          this.isActive401 = false;
          this.collection407 = response;
          this.collection407.forEach((item: any) => {
            this.time407.push(new Date(item.Time.$date));
          });
        }
        if (this.collection === 'SIF_408') {
          this.isActive401 = false;
          this.collection408 = response;
          this.collection408.forEach((item: any) => {
            this.time408.push(new Date(item.Time.$date));
          });
        }
        if (this.collection === 'SIF_409') {
          this.isActive401 = false;
          this.collection409 = response;
          this.collection409.forEach((item: any) => {
            this.time409.push(new Date(item.Time.$date));
          });
        }
        this.clearVariables();
        this.updateCollection(this.collectionData);
      });
  }

  updateCollection(dataCollect: any) {
    this.showNewCollections = [];
    for (let collect of dataCollect) {
      let tmp: SifocVariables = {
        MESPAEA_rVoltage: Number(collect.MESPAEA_rVoltage?.toFixed(3)),
        MESPAEA_rCurrent: Number(collect.MESPAEA_rCurrent?.toFixed(3)),
        MESPAEA_rPowerFactor: Number(collect.MESPAEA_rPowerFactor?.toFixed(3)),
        MESPAEA_rActivePower: Number(collect.MESPAEA_rActivePower),
        MESPAEA_udiEnergyConsumed: Number(collect.MESPAEA_udiEnergyConsumed),
        MESPAEA_rAir: Number(collect?.MESPAEA_rAir),
        MESPAEA_udiAirConsumed: Number(collect?.MESPAEA_udiAirConsumed),
        Time: new Date(collect.Time?.$date),
        Alarma: collect.Alarma,
        SIFOC_sif401_LEC: collect?.SIFOC_sif401_LEC,
        SIFOC_sif402_LEC: collect?.SIFOC_sif402_LEC,
        SIFOC_sif405_V1: collect?.SIFOC_sif405_V1,
        SIFOC_sif405_V2: collect?.SIFOC_sif405_V2,
        SIFOC_sif407_V1: collect?.SIFOC_sif407_V1,
        SIFOC_sif407_V2: collect?.SIFOC_sif407_V2,
        SIFOC_sif407_V3: collect?.SIFOC_sif407_V3,
        SIFOC_sif408_ROBOT: collect?.SIFOC_sif408_ROBOT,
        SIFOC_sif409_LEC: collect?.SIFOC_sif409_LEC,
        SetV: collect?.SetV,
        SetV_1: collect?.SetV_1,
        SetV_2: collect?.SetV_2,
      };
      this.showNewCollections.push(tmp);
    }

    this.dataSource = this.showNewCollections;
    this.lenghtWindow = Math.trunc(this.dataSource.length / 10);
    console.log(this.dataSource);
  }

  nextPage() {
    this.page += 10;
  }

  previousPage() {
    if (this.page > 0) {
      this.page -= 10;
    }
  }
  /**
   * Variables to show central tendences measures
   */
  getVariables(event: any) {
    console.log(event.target.value);
    this.value = event.target.value;
    if (String(this.value) === 'MESPAEA_rVoltage') {
      this.dataSource.forEach((element) =>
        this.MESPAEA_rVoltage.push(element.MESPAEA_rVoltage)
      );
      console.log(this.MESPAEA_rVoltage);
      this.average = this.getAverage(this.MESPAEA_rVoltage);
      this.median = this.getMedian(this.MESPAEA_rVoltage);
      this.mode = this.getModes(this.MESPAEA_rVoltage);
      this.variance = this.getVariance(this.MESPAEA_rVoltage);
      this.deviation = this.getStandardDeviation(this.MESPAEA_rVoltage);
    }
    if (String(this.value) === 'MESPAEA_rCurrent') {
      this.dataSource.forEach((element) =>
        this.MESPAEA_rCurrent.push(element.MESPAEA_rCurrent)
      );
      console.log(this.MESPAEA_rCurrent);
      this.average = this.getAverage(this.MESPAEA_rCurrent);
      this.median = this.getMedian(this.MESPAEA_rCurrent);
      this.mode = this.getModes(this.MESPAEA_rCurrent);
      this.variance = this.getVariance(this.MESPAEA_rCurrent);
      this.deviation = this.getStandardDeviation(this.MESPAEA_rCurrent);
    }
    if (String(this.value) === 'MESPAEA_rPowerFactor') {
      this.dataSource.forEach((element) =>
        this.MESPAEA_rPowerFactor.push(element.MESPAEA_rPowerFactor)
      );
      console.log(this.MESPAEA_rPowerFactor);
      this.average = this.getAverage(this.MESPAEA_rPowerFactor);
      this.median = this.getMedian(this.MESPAEA_rPowerFactor);
      this.mode = this.getModes(this.MESPAEA_rPowerFactor);
      this.variance = this.getVariance(this.MESPAEA_rPowerFactor);
      this.deviation = this.getStandardDeviation(this.MESPAEA_rPowerFactor);
    }
    if (String(this.value) === 'MESPAEA_rActivePower') {
      this.dataSource.forEach((element) =>
        this.MESPAEA_rActivePower.push(element.MESPAEA_rActivePower)
      );
      console.log(this.MESPAEA_rActivePower);
      this.average = this.getAverage(this.MESPAEA_rActivePower);
      this.median = this.getMedian(this.MESPAEA_rActivePower);
      this.mode = this.getModes(this.MESPAEA_rActivePower);
      this.variance = this.getVariance(this.MESPAEA_rActivePower);
      this.deviation = this.getStandardDeviation(this.MESPAEA_rActivePower);
    }
    if (String(this.value) === 'MESPAEA_udiEnergyConsumed') {
      this.dataSource.forEach((element) =>
        this.MESPAEA_udiEnergyConsumed.push(element.MESPAEA_udiEnergyConsumed)
      );
      console.log(this.MESPAEA_udiEnergyConsumed);
      this.average = this.getAverage(this.MESPAEA_udiEnergyConsumed);
      this.median = this.getMedian(this.MESPAEA_udiEnergyConsumed);
      this.mode = this.getModes(this.MESPAEA_udiEnergyConsumed);
      this.variance = this.getVariance(this.MESPAEA_udiEnergyConsumed);
      this.deviation = this.getStandardDeviation(
        this.MESPAEA_udiEnergyConsumed
      );
    }
    if (String(this.value) === 'MESPAEA_rAir') {
      this.dataSource.forEach((element) =>
        this.MESPAEA_rAir.push(
          element.MESPAEA_rAir != undefined ? element.MESPAEA_rAir : 0
        )
      );
      console.log(this.MESPAEA_rAir);
      this.average = this.getAverage(this.MESPAEA_rAir);
      this.median = this.getMedian(this.MESPAEA_rAir);
      this.mode = this.getModes(this.MESPAEA_rAir);
      this.variance = this.getVariance(this.MESPAEA_rAir);
      this.deviation = this.getStandardDeviation(this.MESPAEA_rAir);
    }
    if (String(this.value) === 'MESPAEA_udiAirConsumed') {
      this.dataSource.forEach((element) =>
        this.MESPAEA_udiAirConsumed.push(
          element.MESPAEA_udiAirConsumed != undefined
            ? element.MESPAEA_udiAirConsumed
            : 0
        )
      );
      console.log(this.MESPAEA_udiAirConsumed);
      this.average = this.getAverage(this.MESPAEA_udiAirConsumed);
      this.median = this.getMedian(this.MESPAEA_udiAirConsumed);
      this.mode = this.getModes(this.MESPAEA_udiAirConsumed);
      this.variance = this.getVariance(this.MESPAEA_udiAirConsumed);
      this.deviation = this.getStandardDeviation(this.MESPAEA_udiAirConsumed);
    }
  }

  getAverage(array: number[]): number {
    let total = 0;
    let count = 0;

    array.forEach(function (item) {
      total += item;
      count++;
    });

    return total / count;
  }

  getMedian(array: number[]): number {
    const sorted = array.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
  }

  getModes(array: number[]): string[] {
    let frequency: any = {}; // array of frequency.
    let maxFreq = 0; // holds the max frequency.
    let modes = [];

    for (var i in array) {
      frequency[array[i]] = (frequency[array[i]] || 0) + 1; // increment frequency.

      if (frequency[array[i]] > maxFreq) {
        // is this frequency > max so far ?
        maxFreq = frequency[array[i]]; // update max.
      }
    }

    for (var k in frequency) {
      if (frequency[k] == maxFreq) {
        modes.push(k);
      }
    }

    return modes;
  }

  getVariance(array: number[]): number {
    if (!array.length) {
      return 0;
    }
    const sum = array.reduce((acc, val) => acc + val);
    const { length: num } = array;
    const median = sum / num;
    let variance = 0;
    array.forEach((num) => {
      variance += (num - median) * (num - median);
    });
    variance /= num;
    return variance;
  }

  getStandardDeviation(array: number[]): number {
    const n = array.length;
    const mean = array.reduce((a, b) => a + b) / n;
    return Math.sqrt(
      array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
    );
  }

  clearVariables() {
    this.average = 0;
    this.median = 0;
    this.variance = 0;
    this.deviation = 0;
    this.mode = [];
    this.collection = '';
    this.value = '';
  }

  ngOnInit(): void {}

  deactivate(): string {
    return this.frecuencyIsChecked ? 'deactive-div' : '';
  }

  normalize(array: any) {
    const min = array?.reduce((n?: any, m?: any) => Math.min(n, m));
    console.log(min);
    const max = array.reduce((n: any, m: any) => Math.max(n, m));
    console.log(max);
    const delta = max - min;
    return array.map((value: any) => (value - min) / delta);
  }
  /**
   * Set Color to lines within graph and name
   */
  graphConfiguration(type: string) {
    if (type === 'MESPAEA_rVoltage') {
      this.graph.data[0].type = 'scatter';
      this.graph.data[0].mode = 'lines+points';
      this.graph.data[0].marker = { color: 'green' };
      this.graph.data[0].name = 'Voltage';
    }
    if (type === 'MESPAEA_rCurrent') {
      this.graph.data[1].type = 'scatter';
      this.graph.data[1].mode = 'lines+points';
      this.graph.data[1].marker = { color: 'blue' };
      this.graph.data[1].name = 'Current';
    }
    if (type === 'MESPAEA_rPowerFactor') {
      this.graph.data[2].type = 'scatter';
      this.graph.data[2].mode = 'lines+points';
      this.graph.data[2].marker = { color: 'orange' };
      this.graph.data[2].name = 'Power Factor';
    }
    if (type === 'MESPAEA_rActivePower') {
      this.graph.data[3].type = 'scatter';
      this.graph.data[3].mode = 'lines+points';
      this.graph.data[3].marker = { color: 'red' };
      this.graph.data[3].name = 'Active Power';
    }
    if (type === 'MESPAEA_udiEnergyConsumed') {
      this.graph.data[4].type = 'scatter';
      this.graph.data[4].mode = 'lines+points';
      this.graph.data[4].marker = { color: 'purple' };
      this.graph.data[4].name = 'Energy consumed';
    }
    if (type === 'MESPAEA_rAir') {
      this.graph.data[5].type = 'scatter';
      this.graph.data[5].mode = 'lines+points';
      this.graph.data[5].marker = { color: 'pink' };
      this.graph.data[5].name = 'Air';
    }
    if (type === 'MESPAEA_udiAirConsumed') {
      this.graph.data[6].type = 'scatter';
      this.graph.data[6].mode = 'lines+points';
      this.graph.data[6].marker = { color: 'cyan' };
      this.graph.data[6].name = 'Air consumed';
    }
  }

  selectGraph(event: any) {
    this.isChecked = event.target.checked;
    let variable = event.target.value;
    console.log(variable);

    if (variable === 'Alarma' && this.isChecked) {
      this.isCheckedAlarm = this.isChecked;

      if (this.collectionToShow === 'SIF_401') {
        console.log('pintar alarma sif1');
        this.collection401.forEach((item: any) => {
          if (item.Alarma) {
            this.alarm.push(1);
          } else {
            this.alarm.push(0);
          }
        });
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[12].x = this.time401;
        this.graph.data[12].y = this.alarm;
        this.graphConfiguration(variable);
      }
      if (this.collectionToShow === 'SIF_402') {
        console.log('pintar alarma sif2');
        this.collection402.forEach((item: any) => {
          if (item.Alarma) {
            this.alarm.push(1);
          } else {
            this.alarm.push(0);
          }
        });
        this.time401 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[12].x = this.time402;
        this.graph.data[12].y = this.alarm;
        this.graphConfiguration(variable);
      }
      if (this.collectionToShow === 'SIF_405') {
        console.log('pintar alarma sif5');
        this.collection405.forEach((item: any) => {
          if (item.Alarma) {
            this.alarm.push(1);
          } else {
            this.alarm.push(0);
          }
        });
        this.time401 = [];
        this.time402 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[12].x = this.time405;
        this.graph.data[12].y = this.alarm;
        this.graphConfiguration(variable);
      }
      if (this.collectionToShow === 'SIF_407') {
        console.log('pintar alarma sif7');
        this.collection407.forEach((item: any) => {
          if (item.Alarma) {
            this.alarm.push(1);
          } else {
            this.alarm.push(0);
          }
        });
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[12].x = this.time407;
        this.graph.data[12].y = this.alarm;
        this.graphConfiguration(variable);
      }
      if (this.collectionToShow === 'SIF_408') {
        console.log('pintar alarma sif8');
        this.collection408.forEach((item: any) => {
          if (item.Alarma) {
            this.alarm.push(1);
          } else {
            this.alarm.push(0);
          }
        });
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time409 = [];
        this.graph.data[12].x = this.time408;
        this.graph.data[12].y = this.alarm;
        this.graphConfiguration(variable);
      }
      if (this.collectionToShow === 'SIF_409') {
        console.log('pintar alarma sif9');
        this.collection409.forEach((item: any) => {
          if (item.Alarma) {
            this.alarm.push(1);
          } else {
            this.alarm.push(0);
          }
        });
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.graph.data[12].x = this.time409;
        this.graph.data[12].y = this.alarm;
        this.graphConfiguration(variable);
      }
    } else if (variable === 'Alarma' && !this.isChecked) {
      console.log('borrar alarm');
      this.graph.data[12].x = [];
      this.graph.data[12].y = [];
    }

    if (variable === 'MESPAEA_rVoltage' && this.isChecked) {
      this.isCheckedVol = this.isChecked;
      if (this.collectionToShow === 'SIF_401') {
        console.log('pintar voltaje sif1');
        this.collection401.forEach((element: any) =>
          this.rVoltage.push(Number(element.MESPAEA_rVoltage?.toFixed(4)))
        );
        console.log(this.time401.length);
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[0].x = this.time401;
        console.log(this.rVoltage);
        this.graph.data[0].y = this.normalize(this.rVoltage);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_402') {
        console.log('pintar voltaje sif2');
        this.collection402.forEach((element: any) =>
          this.rVoltage.push(Number(element.MESPAEA_rVoltage.toFixed(4)))
        );
        this.time401 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[0].x = this.time402;
        this.graph.data[0].y = this.normalize(this.rVoltage);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_405') {
        console.log('pintar voltaje sif5');
        this.collection405.forEach((element: any) =>
          this.rVoltage.push(Number(element.MESPAEA_rVoltage.toFixed(4)))
        );
        this.time401 = [];
        this.time402 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[0].x = this.time405;
        this.graph.data[0].y = this.normalize(this.rVoltage);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_407') {
        console.log('pintar voltaje sif7');
        this.collection407.forEach((element: any) =>
          this.rVoltage.push(Number(element.MESPAEA_rVoltage.toFixed(4)))
        );
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[0].x = this.time407;
        this.graph.data[0].y = this.normalize(this.rVoltage);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_408') {
        console.log('pintar voltaje sif8');
        this.collection408.forEach((element: any) =>
          this.rVoltage.push(Number(element.MESPAEA_rVoltage.toFixed(4)))
        );
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time409 = [];
        this.graph.data[0].x = this.time408;
        this.graph.data[0].y = this.normalize(this.rVoltage);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_409') {
        console.log('pintar voltaje sif9');
        this.collection409.forEach((element: any) =>
          this.rVoltage.push(Number(element.MESPAEA_rVoltage.toFixed(4)))
        );
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.graph.data[0].x = this.time409;
        this.graph.data[0].y = this.normalize(this.rVoltage);
        this.graphConfiguration(variable);
      }
    } else if (variable === 'MESPAEA_rVoltage' && !this.isChecked) {
      console.log('borrar voltaje');
      this.graph.data[0].x = [];
      this.graph.data[0].y = [];
    }

    if (variable === 'MESPAEA_rCurrent' && this.isChecked) {
      this.isCheckedCur = this.isChecked;

      if (this.collectionToShow === 'SIF_401') {
        console.log('pintar corriente sif1');
        this.collection401.forEach((element: any) =>
          this.rCurrent.push(Number(element.MESPAEA_rCurrent?.toFixed(4)))
        );
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[1].x = this.time401;
        this.graph.data[1].y = this.rCurrent;
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_402') {
        console.log('pintar corriente sif2');
        this.collection402.forEach((element: any) =>
          this.rCurrent.push(Number(element.MESPAEA_rCurrent.toFixed(4)))
        );
        this.time401 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[1].x = this.time402;
        this.graph.data[1].y = this.normalize(this.rCurrent);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_405') {
        console.log('pintar corriente sif5');
        this.collection405.forEach((element: any) =>
          this.rCurrent.push(Number(element.MESPAEA_rCurrent.toFixed(4)))
        );
        this.time401 = [];
        this.time402 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[1].x = this.time405;
        this.graph.data[1].y = this.rCurrent;
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_407') {
        console.log('pintar corriente sif7');
        this.collection407.forEach((element: any) =>
          this.rCurrent.push(Number(element.MESPAEA_rCurrent.toFixed(4)))
        );
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[1].x = this.time407;
        this.graph.data[1].y = this.rCurrent;
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_408') {
        console.log('pintar corriente sif8');
        this.collection408.forEach((element: any) =>
          this.rCurrent.push(Number(element.MESPAEA_rCurrent.toFixed(4)))
        );
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time409 = [];
        this.graph.data[1].x = this.time408;
        this.graph.data[1].y = this.normalize(this.rCurrent);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_409') {
        console.log('pintar corriente sif9');
        this.collection409.forEach((element: any) =>
          this.rCurrent.push(Number(element.MESPAEA_rCurrent.toFixed(4)))
        );
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.graph.data[1].x = this.time409;
        this.graph.data[1].y = this.rCurrent;
        this.graphConfiguration(variable);
      }
    } else if (variable === 'MESPAEA_rCurrent' && !this.isChecked) {
      console.log('borrar corriente');
      this.graph.data[1].x = [];
      this.graph.data[1].y = [];
    }

    if (variable === 'MESPAEA_rPowerFactor' && this.isChecked) {
      this.isCheckedPf = this.isChecked;

      if (this.collectionToShow === 'SIF_401') {
        console.log('pintar pw sif1');
        this.collection401.forEach((element: any) =>
          this.rPowerFactor.push(
            Number(element.MESPAEA_rPowerFactor?.toFixed(4))
          )
        );
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[2].x = this.time401;
        this.graph.data[2].y = this.normalize(this.rPowerFactor);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_402') {
        console.log('pintar pw sif2');
        this.collection402.forEach((element: any) =>
          this.rPowerFactor.push(
            Number(element.MESPAEA_rPowerFactor.toFixed(4))
          )
        );
        this.time401 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[2].x = this.time402;
        this.graph.data[2].y = this.normalize(this.rPowerFactor);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_405') {
        console.log('pintar pw sif5');
        this.collection405.forEach((element: any) =>
          this.rPowerFactor.push(
            Number(element.MESPAEA_rPowerFactor.toFixed(4))
          )
        );
        this.time401 = [];
        this.time402 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[2].x = this.time405;
        this.graph.data[2].y = this.normalize(this.rPowerFactor);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_407') {
        console.log('pintar pw sif7');
        this.collection407.forEach((element: any) =>
          this.rPowerFactor.push(
            Number(element.MESPAEA_rPowerFactor.toFixed(4))
          )
        );
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[2].x = this.time407;
        this.graph.data[2].y = this.normalize(this.rPowerFactor);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_408') {
        console.log('pintar pw sif8');
        this.collection408.forEach((element: any) =>
          this.rPowerFactor.push(
            Number(element.MESPAEA_rPowerFactor.toFixed(4))
          )
        );
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time409 = [];
        this.graph.data[2].x = this.time408;
        this.graph.data[2].y = this.normalize(this.rPowerFactor);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_409') {
        console.log('pintar pw sif9');
        this.collection409.forEach((element: any) =>
          this.rPowerFactor.push(
            Number(element.MESPAEA_rPowerFactor.toFixed(4))
          )
        );
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.graph.data[2].x = this.time409;
        this.graph.data[2].y = this.normalize(this.rPowerFactor);
        this.graphConfiguration(variable);
      }
    } else if (variable === 'MESPAEA_rPowerFactor' && !this.isChecked) {
      console.log('borrar pw');
      this.graph.data[2].x = [];
      this.graph.data[2].y = [];
    }

    if (variable === 'MESPAEA_rActivePower' && this.isChecked) {
      this.isCheckedAp = this.isChecked;

      if (this.collectionToShow === 'SIF_401') {
        console.log('pintar rp sif1');
        this.collection401.forEach((element: any) =>
          this.rActivePower.push(
            Number(element.MESPAEA_rActivePower?.toFixed(4))
          )
        );
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[3].x = this.time401;
        this.graph.data[3].y = this.normalize(this.rActivePower);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_402') {
        console.log('pintar rp sif2');
        this.collection402.forEach((element: any) =>
          this.rActivePower.push(
            Number(element.MESPAEA_rActivePower.toFixed(4))
          )
        );
        this.time401 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[3].x = this.time402;
        this.graph.data[3].y = this.normalize(this.rActivePower);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_405') {
        console.log('pintar rp sif5');
        this.collection405.forEach((element: any) =>
          this.rActivePower.push(
            Number(element.MESPAEA_rActivePower.toFixed(4))
          )
        );
        this.time401 = [];
        this.time402 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[3].x = this.time405;
        this.graph.data[3].y = this.normalize(this.rActivePower);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_407') {
        console.log('pintar rp sif7');
        this.collection407.forEach((element: any) =>
          this.rActivePower.push(
            Number(element.MESPAEA_rActivePower.toFixed(4))
          )
        );
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[3].x = this.time407;
        this.graph.data[3].y = this.normalize(this.rActivePower);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_408') {
        console.log('pintar rp sif8');
        this.collection408.forEach((element: any) =>
          this.rActivePower.push(
            Number(element.MESPAEA_rActivePower.toFixed(4))
          )
        );
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time409 = [];
        this.graph.data[3].x = this.time408;
        this.graph.data[3].y = this.normalize(this.rActivePower);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_409') {
        console.log('pintar rp sif9');
        this.collection409.forEach((element: any) =>
          this.rActivePower.push(
            Number(element.MESPAEA_rActivePower.toFixed(4))
          )
        );
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.graph.data[3].x = this.time409;
        this.graph.data[3].y = this.normalize(this.rActivePower);
        this.graphConfiguration(variable);
      }
    } else if (variable === 'MESPAEA_rActivePower' && !this.isChecked) {
      console.log('borrar rp');
      this.graph.data[3].x = [];
      this.graph.data[3].y = [];
    }

    if (variable === 'MESPAEA_udiEnergyConsumed' && this.isChecked) {
      this.isCheckedEne = this.isChecked;

      if (this.collectionToShow === 'SIF_401') {
        console.log('pintar ec sif1');
        this.collection401.forEach((element: any) =>
          this.udiEnergyConsumed.push(Number(element.MESPAEA_udiEnergyConsumed))
        );
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[4].x = this.time401;
        this.graph.data[4].y = this.normalize(this.udiEnergyConsumed);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_402') {
        console.log('pintar ec sif2');
        this.collection402.forEach((element: any) =>
          this.udiEnergyConsumed.push(Number(element.MESPAEA_udiEnergyConsumed))
        );
        this.time401 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[4].x = this.time402;
        this.graph.data[4].y = this.normalize(this.udiEnergyConsumed);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_405') {
        console.log('pintar ec sif5');
        this.collection405.forEach((element: any) =>
          this.udiEnergyConsumed.push(Number(element.MESPAEA_udiEnergyConsumed))
        );
        this.time401 = [];
        this.time402 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[4].x = this.time405;
        this.graph.data[4].y = this.normalize(this.udiEnergyConsumed);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_407') {
        console.log('pintar ec sif7');
        this.collection407.forEach((element: any) =>
          this.udiEnergyConsumed.push(Number(element.MESPAEA_udiEnergyConsumed))
        );
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[4].x = this.time407;
        this.graph.data[4].y = this.normalize(this.udiEnergyConsumed);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_408') {
        console.log('pintar ec sif8');
        this.collection408.forEach((element: any) =>
          this.udiEnergyConsumed.push(Number(element.MESPAEA_udiEnergyConsumed))
        );
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time409 = [];
        this.graph.data[4].x = this.time408;
        this.graph.data[4].y = this.normalize(this.udiEnergyConsumed);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_409') {
        console.log('pintar ec sif9');
        this.collection409.forEach((element: any) =>
          this.udiEnergyConsumed.push(Number(element.MESPAEA_udiEnergyConsumed))
        );
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.graph.data[4].x = this.time409;
        this.graph.data[4].y = this.normalize(this.udiEnergyConsumed);
        this.graphConfiguration(variable);
      }
    } else if (variable === 'MESPAEA_udiEnergyConsumed' && !this.isChecked) {
      console.log('borrar ec');
      this.graph.data[4].x = [];
      this.graph.data[4].y = [];
    }

    if (variable === 'MESPAEA_rAir' && this.isChecked) {
      this.isCheckedAir = this.isChecked;
      if (this.collectionToShow === 'SIF_401') {
        console.log('pintar rac sif1');
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[5].x = this.time401;
        this.graph.data[5].y = this.normalize(this.rAir);
        this.graphConfiguration(variable);
      }
      if (this.collectionToShow === 'SIF_402') {
        console.log('pintar rac sif2');
        this.time401 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[5].x = this.time402;
        this.graph.data[5].y = this.normalize(this.rAir);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_405') {
        console.log('pintar rac sif5');
        this.time401 = [];
        this.time402 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[5].x = this.time405;
        this.graph.data[5].y = this.normalize(this.rAir);
        this.graphConfiguration(variable);
      }
      if (this.collectionToShow === 'SIF_407') {
        console.log('pintar rac sif7');
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[5].x = this.time407;
        this.graph.data[5].y = this.normalize(this.rAir);
        this.graphConfiguration(variable);
      }
      if (this.collectionToShow === 'SIF_408') {
        console.log('pintar rac sif8');
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time409 = [];
        this.graph.data[5].x = this.time408;
        this.graph.data[5].y = this.normalize(this.rAir);
        this.graphConfiguration(variable);
      }
      if (this.collectionToShow === 'SIF_409') {
        console.log('pintar rac sif9');
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.graph.data[5].x = this.time409;
        this.graph.data[5].y = this.normalize(this.rAir);
        this.graphConfiguration(variable);
      }
    } else if (variable === 'MESPAEA_rAir' && !this.isChecked) {
      console.log('borrar rac');
      this.graph.data[5].x = [];
      this.graph.data[5].y = [];
    }

    if (variable === 'MESPAEA_udiAirConsumed' && this.isChecked) {
      this.isCheckedACo = this.isChecked;
      if (this.collectionToShow === 'SIF_401') {
        console.log('pintar ac sif1');
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[6].x = this.time401;
        this.graph.data[6].y = this.normalize(this.udiAirConsumed);
        this.graphConfiguration(variable);
      }
      if (this.collectionToShow === 'SIF_402') {
        console.log('pintar ac sif2');
        this.time401 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[6].x = this.time402;
        this.graph.data[6].y = this.normalize(this.udiAirConsumed);
        this.graphConfiguration(variable);
      }

      if (this.collectionToShow === 'SIF_405') {
        console.log('pintar ac sif5');
        this.time401 = [];
        this.time402 = [];
        this.time407 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[6].x = this.time405;
        this.graph.data[6].y = this.normalize(this.udiAirConsumed);
        this.graphConfiguration(variable);
      }
      if (this.collectionToShow === 'SIF_407') {
        console.log('pintar ac sif7');
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time408 = [];
        this.time409 = [];
        this.graph.data[6].x = this.time407;
        this.graph.data[6].y = this.normalize(this.udiAirConsumed);
        this.graphConfiguration(variable);
      }
      if (this.collectionToShow === 'SIF_408') {
        console.log('pintar ac sif8');
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time409 = [];
        this.graph.data[6].x = this.time408;
        this.graph.data[6].y = this.normalize(this.udiAirConsumed);
        this.graphConfiguration(variable);
      }
      if (this.collectionToShow === 'SIF_409') {
        console.log('pintar ac sif9');
        this.time401 = [];
        this.time402 = [];
        this.time405 = [];
        this.time407 = [];
        this.time408 = [];
        this.graph.data[6].x = this.time409;
        this.graph.data[6].y = this.normalize(this.udiAirConsumed);
        this.graphConfiguration(variable);
      }
    } else if (variable === 'MESPAEA_udiAirConsumed' && !this.isChecked) {
      console.log('borrar ac');
      this.graph.data[6].x = [];
      this.graph.data[6].y = [];
    }
  }

  selectGraphAux(event: any) {
    this.isChecked_ = event.target.checked;
    let variable = event.target.value;
    if (variable === 'SIFOC_sif401_LEC' && this.isChecked_) {
      this.isCheckedSIFOC_sif401_LEC = this.isChecked_;
      this.graph.data[7].x = this.time401;
      this.graph.data[7].y = this.normalize(this.SIFOC_sif401_LEC);
    } else if (variable === 'SIFOC_sif401_LEC' && !this.isChecked_) {
      console.log('borrar SIFOC_sif401_LEC');
      this.graph.data[7].x = [];
      this.graph.data[7].y = [];
    }

    if (variable === 'SetV_1' && this.isChecked_) {
      this.isCheckedSetV_1 = this.isChecked_;
      this.graph.data[8].x = this.time401;
      this.graph.data[8].y = this.normalize(this.SetV_1);
    } else if (variable === 'SetV_1' && !this.isChecked_) {
      console.log('borrar SetV_1');
      this.graph.data[8].x = [];
      this.graph.data[8].y = [];
    }

    if (variable === 'SetV_2' && this.isChecked_) {
      this.isCheckedSetV_2 = this.isChecked_;
      this.graph.data[9].x = this.time401;
      this.graph.data[9].y = this.normalize(this.SetV_2);
    } else if (variable === 'SetV_2' && !this.isChecked_) {
      console.log('borrar SetV_2');
      this.graph.data[9].x = [];
      this.graph.data[9].y = [];
    }
  }

  selectGraphAuxSif402(event: any) {
    this.isChecked_ = event.target.checked;
    let variable = event.target.value;
    if (variable === 'SIFOC_sif402_LEC' && this.isChecked_) {
      this.isCheckedSIFOC_sif402_LEC = this.isChecked_;
      this.graph.data[10].x = this.time402;
      this.graph.data[10].y = this.normalize(this.SIFOC_sif402_LEC);
    } else if (variable === 'SIFOC_sif402_LEC' && !this.isChecked_) {
      console.log('borrar SIFOC_sif402_LEC');
      this.graph.data[10].x = [];
      this.graph.data[10].y = [];
    }

    if (variable === 'SetV_1' && this.isChecked_) {
      this.isCheckedSetV_1 = this.isChecked_;
      this.graph.data[8].x = this.time402;
      this.graph.data[8].y = this.normalize(this.SetV_1);
    } else if (variable === 'SetV_1' && !this.isChecked_) {
      console.log('borrar SetV_1');
      this.graph.data[8].x = [];
      this.graph.data[8].y = [];
    }

    if (variable === 'SetV_2' && this.isChecked_) {
      this.isCheckedSetV_2 = this.isChecked_;
      this.graph.data[9].x = this.time402;
      this.graph.data[9].y = this.normalize(this.SetV_2);
    } else if (variable === 'SetV_2' && !this.isChecked_) {
      console.log('borrar SetV_2');
      this.graph.data[9].x = [];
      this.graph.data[9].y = [];
    }
  }

  selectGraphAuxSif405(event: any) {
    this.isChecked_ = event.target.checked;
    let variable = event.target.value;
    if (variable === 'SIFOC_sif405_V1' && this.isChecked_) {
      console.log('entra 405');
      this.isCheckedSIFOC_sif405_V1 = this.isChecked_;
      this.graph.data[13].x = this.time405;
      console.log(this.SIFOC_sif405_V1);
      this.graph.data[13].y = this.SIFOC_sif405_V1;
    } else if (variable === 'SIFOC_sif405_V1' && !this.isChecked_) {
      console.log('borrar SIFOC_sif405_V1');
      this.graph.data[13].x = [];
      this.graph.data[13].y = [];
    }

    if (variable === 'SIFOC_sif405_V2' && this.isChecked_) {
      this.isCheckedSIFOC_sif405_V2 = this.isChecked_;
      this.graph.data[14].x = this.time405;
      this.graph.data[14].y = this.SIFOC_sif405_V2;
    } else if (variable === 'SIFOC_sif405_V2' && !this.isChecked_) {
      console.log('borrar SIFOC_sif405_V2');
      this.graph.data[14].x = [];
      this.graph.data[14].y = [];
    }

    if (variable === 'SetV_1' && this.isChecked_) {
      console.log('entra setv1');
      this.isCheckedSetV_1 = this.isChecked_;
      this.graph.data[8].x = this.time405;
      console.log(this.SetV_1);
      this.graph.data[8].y = this.normalize(this.SetV_1);
    } else if (variable === 'SetV_1' && !this.isChecked_) {
      console.log('borrar SetV_1');
      this.graph.data[8].x = [];
      this.graph.data[8].y = [];
    }

    if (variable === 'SetV_2' && this.isChecked_) {
      console.log('entra setv2');
      this.isCheckedSetV_2 = this.isChecked_;
      this.graph.data[9].x = this.time405;
      console.log(this.SetV_2);
      this.graph.data[9].y = this.normalize(this.SetV_2);
    } else if (variable === 'SetV_2' && !this.isChecked_) {
      console.log('borrar SetV_2');
      this.graph.data[9].x = [];
      this.graph.data[9].y = [];
    }
  }
}

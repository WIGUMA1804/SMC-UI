import { Component, OnInit, ViewChild } from '@angular/core';
import { StatisticService } from '../services/basic-statistic.service';
import { SifocVariables, dataset } from '../../../interfaces/sifoc-interface';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

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

  constructor(private statisticService: StatisticService) {}

  getCollections(e: any) {
    console.log(e.target.value);
    this.collection = e.target.value;
    this.collectionToShow = e.target.value;
    this.statisticService.getData(this.collection).subscribe((response) => {
      this.count++;
      this.collectionData = response;
      if (this.collection === 'SIF_401') {
        this.collection401 = response;
      }
      if (this.collection === 'SIF_402') {
        this.collection402 = response;
      }
      if (this.collection === 'SIF_405') {
        this.collection405 = response;
      }
      if (this.collection === 'SIF_407') {
        this.collection407 = response;
      }
      if (this.collection === 'SIF_408') {
        this.collection408 = response;
      }
      if (this.collection === 'SIF_409') {
        this.collection409 = response;
      }
      this.clearVariables();
      this.clearGraphics();
      this.updateCollection(this.collectionData);
    });
  }

  updateCollection(dataCollect: any) {
    this.showNewCollections = [];
    for (let collect of dataCollect) {
      let tmp: SifocVariables = {
        MESPAEA_rVoltage: Number(collect.MESPAEA_rVoltage.toFixed(3)),
        MESPAEA_rCurrent: Number(collect.MESPAEA_rCurrent.toFixed(3)),
        MESPAEA_rPowerFactor: Number(collect.MESPAEA_rPowerFactor.toFixed(3)),
        MESPAEA_rActivePower: Number(collect.MESPAEA_rActivePower),
        MESPAEA_udiEnergyConsumed: Number(collect.MESPAEA_udiEnergyConsumed),
        MESPAEA_rAir: Number(collect?.MESPAEA_rAir),
        MESPAEA_udiAirConsumed: Number(collect?.MESPAEA_udiAirConsumed),
        Hora: collect.Hora,
        minutos: collect.minutos,
        Segundos: collect.Segundos,
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

  getVariables(event: any) {
    console.log(event.target.value);
    this.value = event.target.value;
    if (String(this.value) === 'MESPAEA_rVoltage') {
      this.dataSource.map((element) =>
        this.MESPAEA_rVoltage.push(element.MESPAEA_rVoltage)
      );
      console.log(this.MESPAEA_rVoltage);
      this.average = this.getAverage(this.MESPAEA_rVoltage);
      this.median = this.getMedian(this.MESPAEA_rVoltage);
      this.mode = this.getModes(this.MESPAEA_rVoltage);
      this.variance = this.getVariance(this.MESPAEA_rVoltage);
      this.deviation = this.getStandardDeviation(this.MESPAEA_rVoltage);
      this.plotHistogram(this.collectionToShow, this.value);
    }
    if (String(this.value) === 'MESPAEA_rCurrent') {
      this.dataSource.map((element) =>
        this.MESPAEA_rCurrent.push(element.MESPAEA_rCurrent)
      );
      console.log(this.MESPAEA_rCurrent);
      this.average = this.getAverage(this.MESPAEA_rCurrent);
      this.median = this.getMedian(this.MESPAEA_rCurrent);
      this.mode = this.getModes(this.MESPAEA_rCurrent);
      this.variance = this.getVariance(this.MESPAEA_rCurrent);
      this.deviation = this.getStandardDeviation(this.MESPAEA_rCurrent);
      this.plotHistogram(this.collectionToShow, this.value);
    }
    if (String(this.value) === 'MESPAEA_rPowerFactor') {
      this.dataSource.map((element) =>
        this.MESPAEA_rPowerFactor.push(element.MESPAEA_rPowerFactor)
      );
      console.log(this.MESPAEA_rPowerFactor);
      this.average = this.getAverage(this.MESPAEA_rPowerFactor);
      this.median = this.getMedian(this.MESPAEA_rPowerFactor);
      this.mode = this.getModes(this.MESPAEA_rPowerFactor);
      this.variance = this.getVariance(this.MESPAEA_rPowerFactor);
      this.deviation = this.getStandardDeviation(this.MESPAEA_rPowerFactor);
      this.plotHistogram(this.collectionToShow, this.value);
    }
    if (String(this.value) === 'MESPAEA_rActivePower') {
      this.dataSource.map((element) =>
        this.MESPAEA_rActivePower.push(element.MESPAEA_rActivePower)
      );
      console.log(this.MESPAEA_rActivePower);
      this.average = this.getAverage(this.MESPAEA_rActivePower);
      this.median = this.getMedian(this.MESPAEA_rActivePower);
      this.mode = this.getModes(this.MESPAEA_rActivePower);
      this.variance = this.getVariance(this.MESPAEA_rActivePower);
      this.deviation = this.getStandardDeviation(this.MESPAEA_rActivePower);
      this.plotHistogram(this.collectionToShow, this.value);
    }
    if (String(this.value) === 'MESPAEA_udiEnergyConsumed') {
      this.dataSource.map((element) =>
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
      this.plotHistogram(this.collectionToShow, this.value);
    }
    if (String(this.value) === 'MESPAEA_rAir') {
      this.dataSource.map((element) =>
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
      this.plotHistogram(this.collectionToShow, this.value);
    }
    if (String(this.value) === 'MESPAEA_udiAirConsumed') {
      this.dataSource.map((element) =>
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
      this.plotHistogram(this.collectionToShow, this.value);
    }
  }

  clearGraphics() {
    this.rVoltage = [];
    this.rCurrent = [];
    this.rPowerFactor = [];
    this.rActivePower = [];
    this.udiEnergyConsumed = [];
    this.rAir = [];
    this.udiAirConsumed = [];
    this.lineChartData[0].data = [];
    this.lineChartData[0].label = 'Consumption variables';
    this.changeColor('black', 'white');
  }

  plotHistogram(collection: string, variable: string) {
    if (collection === 'SIF_401') {
      this.clearGraphics();
      if (variable === 'MESPAEA_rVoltage') {
        this.collection401.map((element: any) =>
          this.rVoltage.push(Number(element.MESPAEA_rVoltage.toFixed(4)))
        );
        this.lineChartData[0].data = this.rVoltage.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rVoltage';
        this.changeColor('black', 'white');
      }

      if (variable === 'MESPAEA_rCurrent') {
        this.collection401.map((element: any) =>
          this.rCurrent.push(Number(element.MESPAEA_rCurrent.toFixed(4)))
        );
        this.lineChartData[0].data = this.rCurrent.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rCurrent';
        this.changeColor('black', 'white');
      }
      if (variable === 'MESPAEA_rPowerFactor') {
        this.collection401.map((element: any) =>
          this.rPowerFactor.push(
            Number(element.MESPAEA_rPowerFactor.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.rPowerFactor.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rPowerFactor';
        this.changeColor('black', 'white');
      }
      if (variable === 'MESPAEA_rActivePower') {
        this.collection401.map((element: any) =>
          this.rActivePower.push(
            Number(element.MESPAEA_rActivePower.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.rActivePower.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rActivePower';
        this.changeColor('black', 'white');
      }
      if (variable === 'MESPAEA_udiEnergyConsumed') {
        this.collection401.map((element: any) =>
          this.udiEnergyConsumed.push(
            Number(element.MESPAEA_udiEnergyConsumed.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.udiEnergyConsumed.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_udiEnergyConsumed';
        this.changeColor('black', 'white');
      }

      if (variable === 'MESPAEA_rAir') {
        this.collection401.map((element: any) =>
          this.rAir.push(Number(element.MESPAEA_rAir.toFixed(4)))
        );
        this.lineChartData[0].data = this.rAir.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rAir';
        this.changeColor('black', 'white');
      }

      if (variable === 'MESPAEA_udiAirConsumed') {
        this.collection401.map((element: any) =>
          this.udiAirConsumed.push(
            Number(element.MESPAEA_udiAirConsumed.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.udiAirConsumed.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_udiAirConsumed';
        this.changeColor('black', 'white');
      }
    }

    if (collection === 'SIF_402') {
      this.clearGraphics();
      if (variable === 'MESPAEA_rVoltage') {
        this.collection402.map((element: any) =>
          this.rVoltage.push(Number(element.MESPAEA_rVoltage.toFixed(4)))
        );
        this.lineChartData[0].data = this.rVoltage.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rVoltage';
        this.changeColor('green', 'white');
      }

      if (variable === 'MESPAEA_rCurrent') {
        this.collection402.map((element: any) =>
          this.rCurrent.push(Number(element.MESPAEA_rCurrent.toFixed(4)))
        );
        this.lineChartData[0].data = this.rCurrent.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rCurrent';
        this.changeColor('green', 'white');
      }
      if (variable === 'MESPAEA_rPowerFactor') {
        this.collection402.map((element: any) =>
          this.rPowerFactor.push(
            Number(element.MESPAEA_rPowerFactor.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.rPowerFactor.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rPowerFactor';
        this.changeColor('green', 'white');
      }
      if (variable === 'MESPAEA_rActivePower') {
        this.collection402.map((element: any) =>
          this.rActivePower.push(
            Number(element.MESPAEA_rActivePower.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.rActivePower.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rActivePower';
        this.changeColor('green', 'white');
      }
      if (variable === 'MESPAEA_udiEnergyConsumed') {
        this.collection402.map((element: any) =>
          this.udiEnergyConsumed.push(
            Number(element.MESPAEA_udiEnergyConsumed.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.udiEnergyConsumed.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_udiEnergyConsumed';
        this.changeColor('green', 'white');
      }
    }

    if (collection === 'SIF_405') {
      this.clearGraphics();
      if (variable === 'MESPAEA_rVoltage') {
        this.collection405.map((element: any) =>
          this.rVoltage.push(Number(element.MESPAEA_rVoltage.toFixed(4)))
        );
        this.lineChartData[0].data = this.rVoltage.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rVoltage';
        this.changeColor('blue', 'white');
      }

      if (variable === 'MESPAEA_rCurrent') {
        this.collection405.map((element: any) =>
          this.rCurrent.push(Number(element.MESPAEA_rCurrent.toFixed(4)))
        );
        this.lineChartData[0].data = this.rCurrent.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rCurrent';
        this.changeColor('blue', 'white');
      }
      if (variable === 'MESPAEA_rPowerFactor') {
        this.collection405.map((element: any) =>
          this.rPowerFactor.push(
            Number(element.MESPAEA_rPowerFactor.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.rPowerFactor.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rPowerFactor';
        this.changeColor('blue', 'white');
      }
      if (variable === 'MESPAEA_rActivePower') {
        this.collection405.map((element: any) =>
          this.rActivePower.push(
            Number(element.MESPAEA_rActivePower.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.rActivePower.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rActivePower';
        this.changeColor('blue', 'white');
      }
      if (variable === 'MESPAEA_udiEnergyConsumed') {
        this.collection405.map((element: any) =>
          this.udiEnergyConsumed.push(
            Number(element.MESPAEA_udiEnergyConsumed.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.udiEnergyConsumed.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_udiEnergyConsumed';
        this.changeColor('blue', 'white');
      }
    }

    if (collection === 'SIF_407') {
      this.clearGraphics();
      if (variable === 'MESPAEA_rVoltage') {
        this.collection407.map((element: any) =>
          this.rVoltage.push(Number(element.MESPAEA_rVoltage.toFixed(4)))
        );
        this.lineChartData[0].data = this.rVoltage.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rVoltage';
        this.changeColor('orange', 'white');
      }

      if (variable === 'MESPAEA_rCurrent') {
        this.collection407.map((element: any) =>
          this.rCurrent.push(Number(element.MESPAEA_rCurrent.toFixed(4)))
        );
        this.lineChartData[0].data = this.rCurrent.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rCurrent';
        this.changeColor('orange', 'white');
      }
      if (variable === 'MESPAEA_rPowerFactor') {
        this.collection407.map((element: any) =>
          this.rPowerFactor.push(
            Number(element.MESPAEA_rPowerFactor.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.rPowerFactor.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rPowerFactor';
        this.changeColor('orange', 'white');
      }
      if (variable === 'MESPAEA_rActivePower') {
        this.collection407.map((element: any) =>
          this.rActivePower.push(
            Number(element.MESPAEA_rActivePower.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.rActivePower.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rActivePower';
        this.changeColor('orange', 'white');
      }
      if (variable === 'MESPAEA_udiEnergyConsumed') {
        this.collection407.map((element: any) =>
          this.udiEnergyConsumed.push(
            Number(element.MESPAEA_udiEnergyConsumed.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.udiEnergyConsumed.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_udiEnergyConsumed';
        this.changeColor('orange', 'white');
      }
    }

    if (collection === 'SIF_408') {
      this.clearGraphics();
      if (variable === 'MESPAEA_rVoltage') {
        this.collection408.map((element: any) =>
          this.rVoltage.push(Number(element.MESPAEA_rVoltage.toFixed(4)))
        );
        this.lineChartData[0].data = this.rVoltage.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rVoltage';
        this.changeColor('red', 'white');
      }

      if (variable === 'MESPAEA_rCurrent') {
        this.collection408.map((element: any) =>
          this.rCurrent.push(Number(element.MESPAEA_rCurrent.toFixed(4)))
        );
        this.lineChartData[0].data = this.rCurrent.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rCurrent';
        this.changeColor('red', 'white');
      }
      if (variable === 'MESPAEA_rPowerFactor') {
        this.collection408.map((element: any) =>
          this.rPowerFactor.push(
            Number(element.MESPAEA_rPowerFactor.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.rPowerFactor.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rPowerFactor';
        this.changeColor('red', 'white');
      }
      if (variable === 'MESPAEA_rActivePower') {
        this.collection408.map((element: any) =>
          this.rActivePower.push(
            Number(element.MESPAEA_rActivePower.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.rActivePower.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rActivePower';
        this.changeColor('red', 'white');
      }
      if (variable === 'MESPAEA_udiEnergyConsumed') {
        this.collection408.map((element: any) =>
          this.udiEnergyConsumed.push(
            Number(element.MESPAEA_udiEnergyConsumed.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.udiEnergyConsumed.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_udiEnergyConsumed';
        this.changeColor('red', 'white');
      }
    }

    if (collection === 'SIF_409') {
      this.clearGraphics();
      if (variable === 'MESPAEA_rVoltage') {
        this.collection409.map((element: any) =>
          this.rVoltage.push(Number(element.MESPAEA_rVoltage.toFixed(4)))
        );
        this.lineChartData[0].data = this.rVoltage.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rVoltage';
        this.changeColor('purple', 'white');
      }

      if (variable === 'MESPAEA_rCurrent') {
        this.collection409.map((element: any) =>
          this.rCurrent.push(Number(element.MESPAEA_rCurrent.toFixed(4)))
        );
        this.lineChartData[0].data = this.rCurrent.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rCurrent';
        this.changeColor('purple', 'white');
      }
      if (variable === 'MESPAEA_rPowerFactor') {
        this.collection409.map((element: any) =>
          this.rPowerFactor.push(
            Number(element.MESPAEA_rPowerFactor.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.rPowerFactor.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rPowerFactor';
        this.changeColor('purple', 'white');
      }
      if (variable === 'MESPAEA_rActivePower') {
        this.collection409.map((element: any) =>
          this.rActivePower.push(
            Number(element.MESPAEA_rActivePower.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.rActivePower.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_rActivePower';
        this.changeColor('purple', 'white');
      }
      if (variable === 'MESPAEA_udiEnergyConsumed') {
        this.collection409.map((element: any) =>
          this.udiEnergyConsumed.push(
            Number(element.MESPAEA_udiEnergyConsumed.toFixed(4))
          )
        );
        this.lineChartData[0].data = this.udiEnergyConsumed.slice(0, 500);
        this.lineChartData[0].label = 'MESPAEA_udiEnergyConsumed';
        this.changeColor('purple', 'white');
      }
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

  ngOnInit(): void {
    this.changeColor('black', 'white');
  }

  getCollections_(event: any) {
    let vol_sifoc1: any = [];
    let vol_sifoc2: any = [];
    let vol_sifoc5: any = [];
    let vol_sifoc7: any = [];
    let vol_sifoc8: any = [];
    let vol_sifoc9: any = [];
    let time: any = [];
    console.log(event.target.value);
    let value = event.target.value;
    if (value === 'MESPAEA_rVoltage') {
      this.setCharData[0].data = [];
      this.setCharData[1].data = [];
      this.setCharData[2].data = [];
      this.setCharData[3].data = [];
      this.setCharData[4].data = [];
      this.setCharData[5].data = [];
      this.collection401.map((element: any) =>
        vol_sifoc1.push(element.MESPAEA_rVoltage)
      );
      this.collection402.map((element: any) =>
        vol_sifoc2.push(element.MESPAEA_rVoltage)
      );
      this.collection405.map((element: any) =>
        vol_sifoc5.push(element.MESPAEA_rVoltage)
      );
      this.collection407.map((element: any) =>
        vol_sifoc7.push(element.MESPAEA_rVoltage)
      );
      this.collection408.map((element: any) =>
        vol_sifoc8.push(element.MESPAEA_rVoltage)
      );
      this.collection409.map((element: any) =>
        vol_sifoc9.push(element.MESPAEA_rVoltage)
      );
      console.log(vol_sifoc1);
      this.setCharData[0].data = vol_sifoc1;
      this.setCharData[1].data = vol_sifoc2;
      this.setCharData[2].data = vol_sifoc5;
      this.setCharData[3].data = vol_sifoc7;
      this.setCharData[4].data = vol_sifoc8;
      this.setCharData[5].data = vol_sifoc9;
      this.chartLabels[0] = 'MESPAEA_rVoltage';
    }

    let curr_sifoc1: any = [];
    let curr_sifoc2: any = [];
    let curr_sifoc5: any = [];
    let curr_sifoc7: any = [];
    let curr_sifoc8: any = [];
    let curr_sifoc9: any = [];

    if (value === 'MESPAEA_rCurrent') {
      this.setCharData[0].data = [];
      this.setCharData[1].data = [];
      this.setCharData[2].data = [];
      this.setCharData[3].data = [];
      this.setCharData[4].data = [];
      this.setCharData[5].data = [];
      this.collection401.map((element: any) =>
        curr_sifoc1.push(element.MESPAEA_rCurrent)
      );
      this.collection402.map((element: any) =>
        curr_sifoc2.push(element.MESPAEA_rCurrent)
      );
      this.collection405.map((element: any) =>
        curr_sifoc5.push(element.MESPAEA_rCurrent)
      );
      this.collection407.map((element: any) =>
        curr_sifoc7.push(element.MESPAEA_rCurrent)
      );
      this.collection408.map((element: any) =>
        curr_sifoc8.push(element.MESPAEA_rCurrent)
      );
      this.collection409.map((element: any) =>
        curr_sifoc9.push(element.MESPAEA_rCurrent)
      );
      this.setCharData[0].data = curr_sifoc1;
      this.setCharData[1].data = curr_sifoc2;
      this.setCharData[2].data = curr_sifoc5;
      this.setCharData[3].data = curr_sifoc7;
      this.setCharData[4].data = curr_sifoc8;
      this.setCharData[5].data = curr_sifoc9;
      this.chartLabels[0] = 'MESPAEA_rCurrent';
    }

    let pwf_sifoc1: any = [];
    let pwf_sifoc2: any = [];
    let pwf_sifoc5: any = [];
    let pwf_sifoc7: any = [];
    let pwf_sifoc8: any = [];
    let pwf_sifoc9: any = [];

    if (value === 'MESPAEA_rPowerFactor') {
      this.setCharData[0].data = [];
      this.setCharData[1].data = [];
      this.setCharData[2].data = [];
      this.setCharData[3].data = [];
      this.setCharData[4].data = [];
      this.setCharData[5].data = [];
      this.collection401.map((element: any) =>
        pwf_sifoc1.push(element.MESPAEA_rPowerFactor)
      );
      this.collection402.map((element: any) =>
        pwf_sifoc2.push(element.MESPAEA_rPowerFactor)
      );
      this.collection405.map((element: any) =>
        pwf_sifoc5.push(element.MESPAEA_rPowerFactor)
      );
      this.collection407.map((element: any) =>
        pwf_sifoc7.push(element.MESPAEA_rPowerFactor)
      );
      this.collection408.map((element: any) =>
        pwf_sifoc8.push(element.MESPAEA_rPowerFactor)
      );
      this.collection409.map((element: any) =>
        pwf_sifoc9.push(element.MESPAEA_rPowerFactor)
      );
      this.setCharData[0].data = pwf_sifoc1;
      this.setCharData[1].data = pwf_sifoc2;
      this.setCharData[2].data = pwf_sifoc5;
      this.setCharData[3].data = pwf_sifoc7;
      this.setCharData[4].data = pwf_sifoc8;
      this.setCharData[5].data = pwf_sifoc9;
      this.chartLabels[0] = 'MESPAEA_rPowerFactor';
    }

    let act_pwr_sifoc1: any = [];
    let act_pwr_sifoc2: any = [];
    let act_pwr_sifoc5: any = [];
    let act_pwr_sifoc7: any = [];
    let act_pwr_sifoc8: any = [];
    let act_pwr_sifoc9: any = [];

    if (value === 'MESPAEA_rActivePower') {
      this.setCharData[0].data = [];
      this.setCharData[1].data = [];
      this.setCharData[2].data = [];
      this.setCharData[3].data = [];
      this.setCharData[4].data = [];
      this.setCharData[5].data = [];
      this.collection401.map((element: any) =>
        act_pwr_sifoc1.push(element.MESPAEA_rActivePower)
      );
      this.collection402.map((element: any) =>
        act_pwr_sifoc2.push(element.MESPAEA_rActivePower)
      );
      this.collection405.map((element: any) =>
        act_pwr_sifoc5.push(element.MESPAEA_rActivePower)
      );
      this.collection407.map((element: any) =>
        act_pwr_sifoc7.push(element.MESPAEA_rActivePower)
      );
      this.collection408.map((element: any) =>
        act_pwr_sifoc8.push(element.MESPAEA_rActivePower)
      );
      this.collection409.map((element: any) =>
        act_pwr_sifoc9.push(element.MESPAEA_rActivePower)
      );
      this.setCharData[0].data = act_pwr_sifoc1;
      this.setCharData[1].data = act_pwr_sifoc2;
      this.setCharData[2].data = act_pwr_sifoc5;
      this.setCharData[3].data = act_pwr_sifoc7;
      this.setCharData[4].data = act_pwr_sifoc8;
      this.setCharData[5].data = act_pwr_sifoc9;
      this.chartLabels[0] = 'MESPAEA_rActivePower';
    }

    let energy_sifoc1: any = [];
    let energy_sifoc2: any = [];
    let energy_sifoc5: any = [];
    let energy_sifoc7: any = [];
    let energy_sifoc8: any = [];
    let energy_sifoc9: any = [];

    if (value === 'MESPAEA_udiEnergyConsumed') {
      this.setCharData[0].data = [];
      this.setCharData[1].data = [];
      this.setCharData[2].data = [];
      this.setCharData[3].data = [];
      this.setCharData[4].data = [];
      this.setCharData[5].data = [];
      this.collection401.map((element: any) =>
        energy_sifoc1.push(element.MESPAEA_udiEnergyConsumed)
      );
      this.collection402.map((element: any) =>
        energy_sifoc2.push(element.MESPAEA_udiEnergyConsumed)
      );
      this.collection405.map((element: any) =>
        energy_sifoc5.push(element.MESPAEA_udiEnergyConsumed)
      );
      this.collection407.map((element: any) =>
        energy_sifoc7.push(element.MESPAEA_udiEnergyConsumed)
      );
      this.collection408.map((element: any) =>
        energy_sifoc8.push(element.MESPAEA_udiEnergyConsumed)
      );
      this.collection409.map((element: any) =>
        energy_sifoc9.push(element.MESPAEA_udiEnergyConsumed)
      );
      this.setCharData[0].data = energy_sifoc1;
      this.setCharData[1].data = energy_sifoc2;
      this.setCharData[2].data = energy_sifoc5;
      this.setCharData[3].data = energy_sifoc7;
      this.setCharData[4].data = energy_sifoc8;
      this.setCharData[5].data = energy_sifoc9;
      this.chartLabels[0] = 'MESPAEA_udiEnergyConsumed';
    }
  }

  public setCharData: ChartDataSets[] = [
    { data: [], label: 'SIF_401' },
    { data: [], label: 'SIF_402' },
    { data: [], label: 'SIF_405' },
    { data: [], label: 'SIF_407' },
    { data: [], label: 'SIF_408' },
    { data: [], label: 'SIF_409' },
  ];
  chartLabels: string[] = [];
  chartOptions = {
    responsive: true,
  };

  public lineData: ChartDataSets[] = [
    { data: [], label: 'SIF_401' },
    { data: [], label: 'SIF_402' },
    { data: [], label: 'SIF_405' },
    { data: [], label: 'SIF_407' },
    { data: [], label: 'SIF_408' },
    { data: [], label: 'SIF_409' },
  ];
  chartLabels_: string[] = [];


  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Consumption variables' },
  ];
  lineChartType: ChartType = 'line';
  lineChartLabels: Label[] = [
    '10:7:41',
    '10:7:44',
    '10:7:47',
    '10:7:50',
    '10:7:52',
    '10:7:55',
    '10:7:59',
    '10:8:2',
    '10:8:5',
    '10:8:9',
    '10:8:13',
    '10:8:16',
    '10:8:20',
    '10:8:23',
    '10:8:26',
    '10:8:30',
    '10:8:36',
    '10:8:33',
    '10:8:39',
    '10:8:43',
    '10:8:47',
    '10:8:50',
    '10:8:54',
    '10:8:57',
    '10:9:1',
    '10:9:4',
    '10:9:8',
    '10:9:11',
    '10:9:15',
    '10:9:18',
    '10:9:22',
    '10:9:26',
    '10:9:29',
    '10:9:32',
    '10:9:36',
    '10:9:39',
    '10:9:43',
    '10:9:46',
    '10:9:50',
    '10:9:54',
    '10:9:58',
    '10:10:2',
    '10:10:6',
    '10:10:9',
    '10:10:13',
    '10:10:16',
    '10:10:20',
    '10:10:24',
    '10:10:27',
    '10:10:31',
    '10:10:39',
    '10:10:35',
    '10:10:43',
    '10:10:50',
    '10:10:47',
    '10:10:53',
    '10:10:56',
    '10:11:0',
    '10:11:3',
    '10:11:6',
    '10:11:9',
    '10:11:17',
    '10:11:13',
    '10:11:20',
    '10:11:24',
    '10:11:27',
    '10:11:31',
    '10:11:35',
    '10:11:39',
    '10:11:42',
    '10:11:46',
    '10:11:49',
    '10:11:53',
    '10:11:56',
    '10:12:0',
    '10:12:3',
    '10:12:7',
    '10:12:13',
    '10:12:10',
    '10:12:17',
    '10:12:20',
    '10:12:24',
    '10:12:27',
    '10:12:30',
    '10:12:34',
    '10:12:37',
    '10:12:40',
    '10:12:44',
    '10:12:48',
    '10:12:52',
    '10:12:55',
    '10:12:59',
    '10:13:3',
    '10:13:7',
    '10:13:10',
    '10:13:14',
    '10:13:18',
    '10:13:22',
    '10:13:25',
    '10:13:29',
    '10:13:32',
    '10:13:35',
    '10:13:39',
    '10:13:43',
    '10:13:46',
    '10:13:49',
    '10:13:52',
    '10:13:59',
    '10:13:56',
    '10:14:3',
    '10:14:7',
    '10:14:9',
    '10:14:13',
    '10:14:16',
    '10:14:19',
    '10:14:25',
    '10:14:22',
    '10:14:29',
    '10:14:32',
    '10:14:36',
    '10:14:40',
    '10:14:44',
    '10:14:47',
    '10:14:51',
    '10:14:59',
    '10:14:55',
    '10:15:2',
    '10:15:6',
    '10:15:10',
    '10:15:13',
    '10:15:17',
    '10:15:21',
    '10:15:24',
    '10:15:28',
    '10:15:32',
    '10:15:35',
    '10:15:39',
    '10:15:42',
    '10:15:48',
    '10:15:45',
    '10:15:51',
    '10:15:54',
    '10:15:57',
    '10:16:1',
    '10:16:4',
    '10:16:7',
    '10:16:11',
    '10:16:14',
    '10:16:18',
    '10:16:25',
    '10:16:21',
    '10:16:28',
    '10:16:32',
    '10:16:35',
    '10:16:38',
    '10:16:42',
    '10:16:46',
    '10:16:50',
    '10:16:54',
    '10:16:58',
    '10:17:1',
    '10:17:8',
    '10:17:5',
    '10:17:11',
    '10:17:14',
    '10:17:18',
    '10:17:22',
    '10:17:25',
    '10:17:28',
    '10:17:31',
    '10:17:35',
    '10:17:39',
    '10:17:42',
    '10:17:46',
    '10:17:49',
    '10:17:53',
    '10:17:56',
    '10:18:0',
    '10:18:4',
    '10:18:7',
    '10:18:10',
    '10:18:14',
    '10:18:18',
    '10:18:21',
    '10:18:24',
    '10:18:28',
    '10:18:31',
    '10:18:35',
    '10:18:38',
    '10:18:42',
    '10:18:45',
    '10:18:49',
    '10:18:53',
    '10:18:56',
    '10:19:0',
    '10:19:3',
    '10:19:7',
    '10:19:10',
    '10:19:13',
    '10:19:17',
    '10:19:20',
    '10:19:24',
    '10:19:27',
    '10:19:31',
    '10:19:34',
    '10:19:38',
    '10:19:41',
    '10:19:45',
    '10:19:48',
    '10:19:52',
    '10:19:55',
    '10:19:59',
    '10:20:2',
    '10:20:6',
    '10:20:9',
    '10:20:13',
    '10:20:20',
    '10:20:16',
    '10:20:22',
    '10:20:26',
    '10:20:29',
    '10:20:32',
    '10:20:35',
    '10:20:39',
    '10:20:42',
    '10:20:49',
    '10:20:46',
    '10:20:52',
    '10:20:56',
    '10:20:59',
    '10:21:3',
    '10:21:7',
    '10:21:10',
    '10:21:13',
    '10:21:20',
    '10:21:16',
    '10:21:24',
    '10:21:27',
    '10:21:31',
    '10:21:35',
    '10:21:38',
    '10:21:42',
    '10:21:45',
    '10:21:49',
    '10:21:52',
    '10:21:56',
    '10:22:0',
    '10:22:3',
    '10:22:7',
    '10:22:11',
    '10:22:13',
    '10:22:16',
    '10:22:23',
    '10:22:19',
    '10:22:26',
    '10:22:29',
    '10:22:32',
    '10:22:36',
    '10:22:40',
    '10:22:48',
    '10:22:44',
    '10:22:55',
    '10:22:51',
    '10:22:58',
    '10:23:2',
    '10:23:5',
    '10:23:9',
    '10:23:12',
    '10:23:15',
    '10:23:19',
    '10:23:22',
    '10:23:25',
    '10:23:28',
    '10:23:32',
    '10:23:35',
    '10:23:39',
    '10:23:43',
    '10:23:46',
    '10:23:49',
    '10:23:54',
    '10:23:58',
    '10:24:2',
    '10:24:5',
    '10:24:8',
    '10:24:12',
    '10:24:15',
    '10:24:19',
    '10:24:22',
    '10:24:25',
    '10:24:28',
    '10:24:31',
    '10:24:34',
    '10:24:38',
    '10:24:42',
    '10:24:45',
    '10:24:49',
    '10:24:53',
    '10:24:56',
    '10:25:0',
    '10:25:7',
    '10:25:4',
    '10:25:11',
    '10:25:14',
    '10:25:18',
    '10:25:21',
    '10:25:25',
    '10:25:28',
    '10:25:32',
    '10:25:36',
    '10:25:39',
    '10:25:42',
    '10:25:46',
    '10:25:50',
    '10:25:54',
    '10:25:57',
    '10:26:0',
    '10:26:4',
    '10:26:7',
    '10:26:11',
    '10:26:14',
    '10:26:18',
    '10:26:21',
    '10:26:25',
    '10:26:28',
    '10:26:32',
    '10:26:35',
    '10:26:39',
    '10:26:43',
    '10:26:47',
    '10:26:50',
    '10:26:54',
    '10:26:57',
    '10:27:0',
    '10:27:4',
    '10:27:7',
    '10:27:10',
    '10:27:14',
    '10:27:18',
    '10:27:21',
    '10:27:24',
    '10:27:27',
    '10:27:31',
    '10:27:34',
    '10:27:37',
    '10:27:41',
    '10:27:45',
    '10:27:48',
    '10:27:52',
    '10:27:55',
    '10:27:59',
    '10:28:2',
    '10:28:6',
    '10:28:9',
    '10:28:12',
    '10:28:16',
    '10:28:19',
    '10:28:23',
    '10:28:26',
    '10:28:30',
    '10:28:33',
    '10:28:37',
    '10:28:41',
    '10:28:45',
    '10:28:52',
    '10:28:48',
    '10:28:54',
    '10:28:58',
    '10:29:1',
    '10:29:5',
    '10:29:9',
    '10:29:12',
    '10:29:16',
    '10:29:19',
    '10:29:23',
    '10:29:27',
    '10:29:30',
    '10:29:34',
    '10:29:38',
    '10:29:42',
    '10:29:45',
    '10:29:48',
    '10:29:53',
    '10:29:56',
    '10:30:0',
    '10:30:7',
    '10:30:3',
    '10:30:14',
    '10:30:10',
    '10:30:17',
    '10:30:21',
    '10:30:24',
    '10:30:27',
    '10:30:31',
    '10:30:34',
    '10:30:37',
    '10:30:40',
    '10:30:43',
    '10:30:46',
    '10:30:50',
    '10:30:53',
    '10:30:56',
    '10:31:0',
    '10:31:4',
    '10:31:8',
    '10:31:11',
    '10:31:14',
    '10:31:18',
    '10:31:21',
    '10:31:25',
    '10:31:28',
    '10:31:31',
    '10:31:35',
    '10:31:39',
    '10:31:42',
    '10:31:45',
    '10:31:49',
    '10:31:52',
    '10:31:56',
    '10:31:59',
    '10:32:3',
    '10:32:6',
    '10:32:10',
    '10:32:14',
    '10:32:17',
    '10:32:21',
    '10:32:24',
    '10:32:28',
    '10:32:31',
    '10:32:34',
    '10:32:37',
    '10:32:40',
    '10:32:44',
    '10:32:47',
    '10:32:51',
    '10:32:55',
    '10:32:59',
    '10:33:2',
    '10:33:6',
    '10:33:10',
    '10:33:13',
    '10:33:17',
    '10:33:20',
    '10:33:24',
    '10:33:27',
    '10:33:31',
    '10:33:34',
    '10:33:38',
    '10:33:41',
    '10:33:45',
    '10:33:48',
    '10:33:51',
    '10:33:55',
    '10:33:59',
    '10:35:31',
    '10:35:34',
    '10:35:36',
    '10:35:39',
    '10:35:42',
    '10:35:45',
    '10:35:48',
    '10:35:55',
    '10:35:51',
    '10:35:58',
    '10:36:1',
    '10:36:5',
    '10:36:8',
    '10:36:11',
    '10:36:14',
    '10:36:17',
    '10:36:21',
    '10:36:25',
    '10:36:29',
    '10:36:33',
    '10:36:36',
    '10:36:40',
    '10:36:47',
    '10:36:43',
    '10:36:50',
    '10:36:53',
    '10:36:56',
    '10:37:0',
    '10:37:3',
    '10:37:7',
    '10:37:11',
    '10:37:14',
    '10:37:18',
    '10:37:21',
    '10:37:25',
    '10:37:28',
    '10:37:32',
    '10:37:35',
    '10:37:38',
    '10:37:42',
    '10:37:45',
    '10:37:48',
    '10:37:51',
    '10:37:54',
    '10:38:0',
    '10:37:58',
    '10:38:4',
  ];
  lineChartOptions = {
    responsive: true,
  };

  changeColor(border: string, color: string) {
    let lineChartColors: Color[] = [
      {
        borderColor: border,
        backgroundColor: color,
      },
    ];

    this.lineChartColors[0].borderColor = lineChartColors[0].borderColor;
    this.lineChartColors[0].backgroundColor =
      lineChartColors[0].backgroundColor;
  }

  lineChartColors: Color[] = [
    {
      borderColor: '',
      backgroundColor: '',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];

  checkChangedHistogram(event: any) {
    console.log(event.target.value)
    this.histogramIsChecked = true;
    this.frecuencyIsChecked = false;
  }

  checkChangedFrecuency(event: any) {
    console.log(event.target.value)
    this.frecuencyIsChecked = true;
    this.histogramIsChecked = false;
  }

  deactivate(): string {
    return  this.frecuencyIsChecked? 'deactive-div': '';
  }
}

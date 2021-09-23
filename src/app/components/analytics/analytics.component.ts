import { Component, OnInit } from '@angular/core';
import { dataPlot } from '../../interfaces/sifoc-interface';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit {
  collections = [
    'SIF_401',
    'SIF_402',
    'SIF_405',
    'SIF_407',
    'SIF_408',
    'SIF_409',
  ];

  displayedColumns: string[] = [
    'MESPAEA_rVoltage',
    'MESPAEA_rCurrent',
    'MESPAEA_rPowerFactor',
    'MESPAEA_rActivePower',
    'MESPAEA_udiEnergyConsumed',
  ];

  public graph: dataPlot = {
    data: [
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
    ],
    layout: { width: 1500, height: 400, title: 'Regression result' },
  };

  constructor() {}

  ngOnInit(): void {
  }

  getCollections(e: any) {
    console.log(e.target.value);
  }
}

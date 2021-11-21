import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { dataPlot, IRegression } from '../../interfaces/sifoc-interface';
import { StatisticService } from '../services/basic-statistic.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit {
  displayedInputs: string[] = [
    'MESPAEA_rActivePower_401',
    'MESPAEA_rActivePower_402',
    'MESPAEA_rActivePower_405',
    'MESPAEA_rActivePower_407',
    'MESPAEA_rActivePower_408',
    'MESPAEA_rActivePower_409',
    'MESPAEA_rCurrent_401',
    'MESPAEA_rCurrent_402',
    'MESPAEA_rCurrent_405',
    'MESPAEA_rCurrent_407',
    'MESPAEA_rCurrent_408',
    'MESPAEA_rCurrent_409',
    'MESPAEA_rPowerFactor_401',
    'MESPAEA_rPowerFactor_402',
    'MESPAEA_rPowerFactor_405',
    'MESPAEA_rPowerFactor_407',
    'MESPAEA_rPowerFactor_408',
    'MESPAEA_rPowerFactor_409',
    'MESPAEA_rVoltage_401',
    'MESPAEA_rVoltage_402',
    'MESPAEA_rVoltage_405',
    'MESPAEA_rVoltage_407',
    'MESPAEA_rVoltage_408',
    'MESPAEA_rVoltage_409',
    'MESPAEA_rAir_401',
    'SIFOC_sif401_LEC',
    'SIFOC_sif402_LEC',
    'SIFOC_sif405_V1',
    'SIFOC_sif405_V2',
    'SIFOC_sif407_V1',
    'SIFOC_sif407_V2',
    'SIFOC_sif407_V3',
    'SIFOC_sif408_ROBOT',
    'SIFOC_sif409_LEC',
    'SetV_1_401',
    'SetV_1_402',
    'SetV_1_405',
    'SetV_1_407',
    'SetV_1_408',
    'SetV_2_401',
    'SetV_2_402',
    'SetV_2_405',
    'SetV_2_407',
    'SetV_2_408',
    'SetV_409',
  ];

  displayedOutputs: string[] = [
    'MESPAEA_udiAirConsumed_401',
    'MESPAEA_udiEnergyConsumed_401',
    'MESPAEA_udiEnergyConsumed_402',
    'MESPAEA_udiEnergyConsumed_405',
    'MESPAEA_udiEnergyConsumed_407',
    'MESPAEA_udiEnergyConsumed_408',
    'MESPAEA_udiEnergyConsumed_409',
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

  inputs = ['Tiempo'];
  outputSelected = '';
  inputSelected = '';
  regression: IRegression[] = [];
  regressionResponse = [];
  coeff = [];
  pvals = [];
  conf_lower = [];
  conf_higher = [];
  response: IRegression[] = [];
  loading = false;

  constructor(private statisticService: StatisticService) {}

  ngOnInit(): void {}

  getInput(e: any) {
    this.inputSelected = e.target.value;
    console.log(this.inputSelected);
  }

  getOutput(e: any) {
    this.outputSelected = e.target.value;
    console.log(this.outputSelected);
  }

  addInput() {
    this.inputs.push(this.inputSelected);
    console.log(this.inputs);
  }

  launchRegression() {
    console.log(this.inputs, this.outputSelected);
    this.getRegression();
  }

  removeInput() {
    let index = this.inputs.indexOf(this.inputSelected);
    console.log(index);
    if (index !== -1) this.inputs.splice(index, 1);
  }

  getRegression() {
    this.loading = true;
    const entries = {
      inputs: this.inputs,
      output: this.outputSelected,
    };
    this.statisticService
      .getRegression(entries)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((resp: IRegression[]) => {
        this.regression = resp;
        console.log(this.regression);
        this.regressionResponse = this.json2array(this.regression);
        this.coeff = this.regressionResponse[0];
        this.pvals = this.regressionResponse[1];
        this.conf_lower = this.regressionResponse[2];
        this.conf_higher = this.regressionResponse[3];
      });
  }

  json2array(json: any) {
    let result: any = [];
    let keys = Object.keys(json);
    keys.forEach(function (key) {
      result.push(json[key]);
    });
    return result;
  }
}

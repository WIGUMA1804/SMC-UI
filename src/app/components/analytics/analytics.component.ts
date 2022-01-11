import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {
  dataCore,
  dataPlot,
  IRegression,
} from '../../interfaces/sifoc-interface';
import { StatisticService } from '../services/basic-statistic.service';
import {
  INeuronal,
  IKeyValuesNeuronal,
} from '../../interfaces/sifoc-interface';

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
  ];

  dataCoreResiduos: dataCore[] = [
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
  ];

  public graph: dataPlot = {
    data: this.dataCore,
    layout: {
      width: 900,
      height: 550,
      title: 'Prediction v.s Real',
    },
  };

  public graphResiduos: dataPlot = {
    data: this.dataCoreResiduos,
    layout: {
      width: 900,
      height: 550,
      title: 'Residuos',
    },
  };

  inputsReg = ['Tiempo'];
  inputsNeu: string[] = [];
  keyValuesNeuronal: IKeyValuesNeuronal[] = [];
  inputsToShow = ['Const', 'Tiempo'];
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
  ytrain = [];
  predictionTrain = [];
  residuos = [];
  indices: number[] = [];
  regressionTemplate = true;
  neuronalTemplate = false;
  regressionLabel = 'regression';
  neuronalLabel = 'neuronal';
  r2_score: number = 0;
  mean_squared: number = 0;
  model_score: number = 0;
  model_params = {};
  finalArrayNeuronal: any[] = [];
  aux: any[] = [];
  activeSend = false;
  result = '';
  isPredict = false;

  constructor(private statisticService: StatisticService) {}

  ngOnInit(): void {
    this.setIndices();
  }

  getInput(e: any) {
    this.inputSelected = e.target.value;
    console.log(this.inputSelected);
  }

  getOutput(e: any) {
    this.outputSelected = e.target.value;
    console.log(this.outputSelected);
  }

  addInput() {
    if (this.regressionTemplate) {
      this.inputsReg.push(this.inputSelected);
    } else {
      this.inputsNeu.push(this.inputSelected);
      const keyNeu = { name: this.inputSelected, value: 0 };
      this.keyValuesNeuronal.push(keyNeu);
    }
    this.inputsToShow.push(this.inputSelected);
  }

  launchRegression() {
    if (this.regressionTemplate) {
      console.log('regresion');
      console.log(this.inputsReg, this.outputSelected);
      this.getRegression();
    }

    if (this.neuronalTemplate) {
      console.log('neuronal');
      this.isPredict =  false;
      console.log(this.inputsNeu, this.outputSelected);
      this.getNeuronal();
    }
  }

  removeInput() {
    if (this.regressionTemplate) {
      let index = this.inputsReg.indexOf(this.inputSelected);
      console.log(index);
      if (index !== -1) this.inputsReg.splice(index, 1);
    } else {
      let index = this.inputsNeu.indexOf(this.inputSelected);
      console.log(index);
      if (index !== -1) this.inputsNeu.splice(index, 1);
    }
  }

  clearData() {
    this.graph.data[0].x = [];
    this.graph.data[0].y = [];

    this.graph.data[1].x = [];
    this.graph.data[1].y = [];
  }

  getRegression() {
    this.clearData();
    this.loading = true;
    const entries = {
      inputs: this.inputsReg,
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
        this.ytrain = this.regressionResponse[4];
        this.predictionTrain = this.regressionResponse[5];

        this.predictionTrain = this.json2array(this.regressionResponse[5]);
        this.residuos = this.json2array(this.regressionResponse[6]);

        this.graph.data[0].x = this.ytrain;
        this.graph.data[0].y = this.ytrain;

        this.graph.data[1].x = this.ytrain;
        this.graph.data[1].y = this.predictionTrain;

        this.graphResiduos.data[0].x = this.indices;
        this.graphResiduos.data[0].y = this.residuos;

        this.graphConf();
        console.log(this.ytrain);
        console.log(this.residuos);
        console.log(this.predictionTrain);
        console.log(this.ytrain.length);
        console.log(this.predictionTrain.length);
      });
  }

  getNeuronal() {
    this.loading = true;
    const entries = {
      inputs: this.inputsNeu,
      output: this.outputSelected,
    };
    this.statisticService
      .getNeuronal(entries)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((resp: INeuronal) => {
        console.log(resp);
        this.isPredict = true
        this.r2_score = resp.r2_score;
        this.mean_squared = resp.mean_squared;
        this.model_score = resp.model_score;
        this.model_params = JSON.stringify(resp.model_params);
        console.log(
          this.r2_score,
          this.mean_squared,
          this.model_score,
          this.model_params
        );
      });
  }

  setIndices() {
    for (var i = 1; i <= 965; i++) {
      this.indices.push(i);
    }
  }

  graphConf() {
    this.graph.data[0].type = 'scatter';
    this.graph.data[0].mode = 'lines+points';
    this.graph.data[0].marker = { color: 'red' };
    this.graph.data[0].name = 'Real';

    this.graph.data[1].type = 'scatter';
    this.graph.data[1].mode = 'markers';
    this.graph.data[1].marker = { color: 'blue' };
    this.graph.data[1].name = 'Prediction';

    this.graphResiduos.data[0].type = 'scatter';
    this.graphResiduos.data[0].mode = 'markers';
    this.graphResiduos.data[0].marker = { color: 'green' };
    this.graphResiduos.data[0].name = 'Residuos';
  }

  json2array(json: any) {
    let result: any = [];
    let keys = Object.keys(json);
    keys.forEach(function (key) {
      result.push(json[key]);
    });
    return result;
  }

  normalize(array: any) {
    const min = array?.reduce((n?: any, m?: any) => Math.min(n, m));
    console.log(min);
    const max = array.reduce((n: any, m: any) => Math.max(n, m));
    console.log(max);
    const delta = max - min;
    return array.map((value: any) => (value - min) / delta);
  }

  onClickRegression() {
    console.log('regression');
    this.regressionTemplate = true;
    this.neuronalTemplate = false;
  }

  onClickNeuronal() {
    console.log('neuronal');
    this.regressionTemplate = false;
    this.neuronalTemplate = true;
  }

  sendPredict() {
    console.log(this.keyValuesNeuronal);
    console.log(this.finalArrayNeuronal);
    console.log(this.aux);

    const entries = {
      vector: this.aux,
    };

    this.statisticService.getPrediction(entries).subscribe((resp) => {
      console.log(resp);
      this.result = JSON.stringify(resp);
    });
  }

  addElementsPredict() {
    let auxArray: number[] = [];
    this.keyValuesNeuronal.forEach((item) => {
      auxArray.push(item.value);
    });
    this.aux.push(auxArray);
    this.keyValuesNeuronal.forEach((item) => (item.value = 0));
    this.activeSend = this.aux.length >= 2 ? true : false;
  }
}

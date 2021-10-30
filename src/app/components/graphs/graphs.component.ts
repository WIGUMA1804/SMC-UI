import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../services/basic-statistic.service';
import { finalize } from 'rxjs/operators';
import {
  dataPlot,
  ISuperset,
  dataCore,
} from '../../interfaces/sifoc-interface';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
})
export class GraphsComponent implements OnInit {
  loading = false;

  displayedColumnsSif401: string[] = [
    'SetV_1',
    'SetV_2',
    'SIFOC_sif401_LEC',
    'MESPAEA_udiEnergyConsumed',
    'MESPAEA_rAir',
    'MESPAEA_udiAirConsumed',
    'Alarm',
  ];

  displayedColumnsSif402: string[] = [
    'SetV_1',
    'SetV_2',
    'SIFOC_sif402_LEC',
    'MESPAEA_udiEnergyConsumed',
    'Alarm',
  ];

  displayedColumnsSif405: string[] = [
    'SetV_1',
    'SetV_2',
    'SIFOC_sif405_V1',
    'SIFOC_sif405_V2',
    'MESPAEA_udiEnergyConsumed',
    'Alarm',
  ];

  displayedColumnsSif407: string[] = [
    'SetV_1',
    'SetV_2',
    'SIFOC_sif407_V1',
    'SIFOC_sif407_V2',
    'SIFOC_sif407_V3',
    'MESPAEA_udiEnergyConsumed',
    'Alarm',
  ];

  displayedColumnsSif408: string[] = [
    'SetV_1',
    'SetV_2',
    'SIFOC_sif408_ROBOT',
    'MESPAEA_udiEnergyConsumed',
    'Alarm',
  ];

  displayedColumnsSif409: string[] = [
    'SetV',
    'SIFOC_sif409_LEC',
    'MESPAEA_udiEnergyConsumed',
    'Alarm',
  ];

  variablesSelectedSif401: string[] = [];
  variablesSelectedSif402: string[] = [];
  variablesSelectedSif405: string[] = [];
  variablesSelectedSif407: string[] = [];
  variablesSelectedSif408: string[] = [];
  variablesSelectedSif409: string[] = [];

  superset: ISuperset = {};
  Alarma401: number[] = [];
  Alarma402: number[] = [];
  Alarma405: number[] = [];
  Alarma407: number[] = [];
  Alarma408: number[] = [];
  Alarma409: number[] = [];
  MESPAEA_rActivePower_401: number[] = [];
  MESPAEA_rActivePower_402: number[] = [];
  MESPAEA_rActivePower_405: number[] = [];
  MESPAEA_rActivePower_407: number[] = [];
  MESPAEA_rActivePower_408: number[] = [];
  MESPAEA_rActivePower_409: number[] = [];
  MESPAEA_rCurrent_401: number[] = [];
  MESPAEA_rCurrent_402: number[] = [];
  MESPAEA_rCurrent_405: number[] = [];
  MESPAEA_rCurrent_407: number[] = [];
  MESPAEA_rCurrent_408: number[] = [];
  MESPAEA_rCurrent_409: number[] = [];
  MESPAEA_rPowerFactor_401: number[] = [];
  MESPAEA_rPowerFactor_402: number[] = [];
  MESPAEA_rPowerFactor_405: number[] = [];
  MESPAEA_rPowerFactor_407: number[] = [];
  MESPAEA_rPowerFactor_408: number[] = [];
  MESPAEA_rPowerFactor_409: number[] = [];
  MESPAEA_rVoltage_401: number[] = [];
  MESPAEA_rVoltage_402: number[] = [];
  MESPAEA_rVoltage_405: number[] = [];
  MESPAEA_rVoltage_407: number[] = [];
  MESPAEA_rVoltage_408: number[] = [];
  MESPAEA_rVoltage_409: number[] = [];
  MESPAEA_rAir_401: number[] = [];
  MESPAEA_udiAirConsumed_401: number[] = [];
  MESPAEA_udiEnergyConsumed_401: number[] = [];
  MESPAEA_udiEnergyConsumed_402: number[] = [];
  MESPAEA_udiEnergyConsumed_405: number[] = [];
  MESPAEA_udiEnergyConsumed_407: number[] = [];
  MESPAEA_udiEnergyConsumed_408: number[] = [];
  MESPAEA_udiEnergyConsumed_409: number[] = [];
  SIFOC_sif401_LEC: number[] = [];
  SIFOC_sif402_LEC: number[] = [];
  SIFOC_sif405_V1: number[] = [];
  SIFOC_sif405_V2: number[] = [];
  SIFOC_sif407_V1: number[] = [];
  SIFOC_sif407_V2: number[] = [];
  SIFOC_sif407_V3: number[] = [];
  SIFOC_sif408_ROBOT: number[] = [];
  SIFOC_sif409_LEC: number[] = [];
  SetV_1_401: number[] = [];
  SetV_1_402: number[] = [];
  SetV_1_405: number[] = [];
  SetV_1_407: number[] = [];
  SetV_1_408: number[] = [];
  SetV_2_401: number[] = [];
  SetV_2_402: number[] = [];
  SetV_2_405: number[] = [];
  SetV_2_407: number[] = [];
  SetV_2_408: number[] = [];
  SetV_409: number[] = [];
  tiempo: number[] = [];
  time: any[] = [];
  setLists: dataCore[] = [
    /**
     * Alarms
     */
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
    /**
     * Set_v1
     */
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
    /**
     * Set_v
     */
    {
      x: [],
      y: [],
      type: '',
      mode: '',
      marker: {},
    },
    /**
     * Set_v2
     */
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
    /**
     * Sifoc_LEC
     */
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
    /**
     * Energy consumed
     */
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
    /**
     * Sifoc
     */
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
  public graph: dataPlot = {
    data: this.setLists,
    layout: {
      width: 2150,
      height: 800,
      title: 'Consumption Variables Relation.',
    },
  };

  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.getSuperset().then((resp: any) => {
      this.dummiesAlarm(resp);
      this.configureTime(resp);
      this.setV1(resp);
      this.setV2(resp);
      this.sifocLec(resp);
      this.energyConsumed(resp);
      this.sifocVn(resp);
    });
  }

  normalize(array: any) {
    const min = array?.reduce((n?: any, m?: any) => Math.min(n, m));
    const max = array.reduce((n: any, m: any) => Math.max(n, m));
    const delta = max - min;
    return array.map((value: any) => (value - min) / delta);
  }

  isInArray(array: any, valueSelected: string) {
    let count = 0;
    if (array.length === 0) {
      array.push(valueSelected);
    }
    if (array.length > 0) {
      array.forEach((item: any) => {
        item === valueSelected ? count++ : 0;
      });
      if (count === 0) {
        array.push(valueSelected);
      }
    }
  }

  getSuperset() {
    return new Promise((resolved) => {
      this.loading = true;
      this.statisticService
        .getSuperSet()
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((response: any) => {
          resolved((this.superset = { ...response }));
          console.log(this.superset);
        });
    });
  }

  dummiesAlarm(array: ISuperset) {
    this.Alarma401 = array.Alarma_401 ? array.Alarma_401 : [];

    array.Alarma_402?.forEach((item) => {
      if (item) {
        this.Alarma402.push(1);
      } else {
        this.Alarma402.push(0);
      }
    });

    array.Alarma_405?.forEach((item) => {
      if (item) {
        this.Alarma405.push(1);
      } else {
        this.Alarma405.push(0);
      }
    });

    array.Alarma_407?.forEach((item) => {
      if (item) {
        this.Alarma407.push(1);
      } else {
        this.Alarma407.push(0);
      }
    });

    array.Alarma_408?.forEach((item) => {
      if (item) {
        this.Alarma408.push(1);
      } else {
        this.Alarma408.push(0);
      }
    });

    array.Alarma_409?.forEach((item) => {
      if (item) {
        this.Alarma409.push(1);
      } else {
        this.Alarma409.push(0);
      }
    });
  }

  configureTime(array: ISuperset) {
    array.Time?.forEach((item: any) => {
      this.time.push(item);
      // this.time.push(new Date(item.$date));
    });
    // this.time.sort();

    array.Tiempo?.forEach((item: any) => {
      this.tiempo.push(item);
    });
  }

  setV1(array: ISuperset) {
    this.SetV_1_401 = array.SetV_1_401 ? array.SetV_1_401 : [];
    this.SetV_1_401 = this.normalize(this.SetV_1_401);

    this.SetV_1_402 = array.SetV_1_402 ? array.SetV_1_402 : [];
    this.SetV_1_402 = this.normalize(this.SetV_1_402);

    this.SetV_1_405 = array.SetV_1_405 ? array.SetV_1_405 : [];
    this.SetV_1_405 = this.normalize(this.SetV_1_405);

    this.SetV_1_407 = array.SetV_1_407 ? array.SetV_1_407 : [];
    this.SetV_1_407 = this.normalize(this.SetV_1_407);

    this.SetV_1_408 = array.SetV_1_408 ? array.SetV_1_408 : [];
    this.SetV_1_408 = this.normalize(this.SetV_1_408);

    this.SetV_409 = array.SetV_409 ? array.SetV_409 : [];
    this.SetV_409 = this.normalize(this.SetV_409);
  }

  setV2(array: ISuperset) {
    this.SetV_2_401 = array.SetV_2_401 ? array.SetV_2_401 : [];
    this.SetV_2_401 = this.normalize(this.SetV_2_401);

    this.SetV_2_402 = array.SetV_2_402 ? array.SetV_2_402 : [];
    this.SetV_2_402 = this.normalize(this.SetV_2_402);

    this.SetV_2_405 = array.SetV_2_405 ? array.SetV_2_405 : [];
    this.SetV_2_405 = this.normalize(this.SetV_2_405);

    this.SetV_2_407 = array.SetV_2_407 ? array.SetV_2_407 : [];
    this.SetV_2_407 = this.normalize(this.SetV_2_407);

    this.SetV_2_408 = array.SetV_2_408 ? array.SetV_2_408 : [];
    this.SetV_2_408 = this.normalize(this.SetV_2_408);
  }

  sifocLec(array: ISuperset) {
    this.SIFOC_sif401_LEC = array.SIFOC_sif401_LEC
      ? array.SIFOC_sif401_LEC
      : [];
    this.SIFOC_sif401_LEC = this.normalize(this.SIFOC_sif401_LEC);

    this.SIFOC_sif402_LEC = array.SIFOC_sif402_LEC
      ? array.SIFOC_sif402_LEC
      : [];
    this.SIFOC_sif402_LEC = this.normalize(this.SIFOC_sif402_LEC);

    this.SIFOC_sif409_LEC = array.SIFOC_sif409_LEC
      ? array.SIFOC_sif409_LEC
      : [];
    this.SIFOC_sif409_LEC = this.normalize(this.SIFOC_sif409_LEC);
  }

  sifocVn(array: ISuperset) {
    array.SIFOC_sif405_V1?.forEach((item) => {
      if (item) {
        this.SIFOC_sif405_V1.push(1);
      } else {
        this.SIFOC_sif405_V1.push(0);
      }
    });

    array.SIFOC_sif405_V2?.forEach((item) => {
      if (item) {
        this.SIFOC_sif405_V2.push(1);
      } else {
        this.SIFOC_sif405_V2.push(0);
      }
    });

    array.SIFOC_sif407_V1?.forEach((item) => {
      if (item) {
        this.SIFOC_sif407_V1.push(1);
      } else {
        this.SIFOC_sif407_V1.push(0);
      }
    });

    array.SIFOC_sif407_V2?.forEach((item) => {
      if (item) {
        this.SIFOC_sif407_V2.push(1);
      } else {
        this.SIFOC_sif407_V2.push(0);
      }
    });

    array.SIFOC_sif407_V3?.forEach((item) => {
      if (item) {
        this.SIFOC_sif407_V3.push(1);
      } else {
        this.SIFOC_sif407_V3.push(0);
      }
    });

    this.SIFOC_sif408_ROBOT = array.SIFOC_sif408_ROBOT
      ? array.SIFOC_sif408_ROBOT
      : [];
    this.SIFOC_sif408_ROBOT = this.normalize(this.SIFOC_sif408_ROBOT);
  }

  energyConsumed(array: ISuperset) {
    this.MESPAEA_udiEnergyConsumed_401 = array.MESPAEA_rCurrent_401
      ? array.MESPAEA_rCurrent_401
      : [];

    this.MESPAEA_udiEnergyConsumed_402 = array.MESPAEA_rCurrent_402
      ? array.MESPAEA_rCurrent_402
      : [];
    this.MESPAEA_udiEnergyConsumed_402 = this.normalize(
      this.MESPAEA_udiEnergyConsumed_402
    );

    this.MESPAEA_udiEnergyConsumed_405 = array.MESPAEA_rCurrent_405
      ? array.MESPAEA_rCurrent_405
      : [];

    this.MESPAEA_udiEnergyConsumed_407 = array.MESPAEA_rCurrent_407
      ? array.MESPAEA_rCurrent_407
      : [];

    this.MESPAEA_udiEnergyConsumed_408 = array.MESPAEA_rCurrent_408
      ? array.MESPAEA_rCurrent_408
      : [];
    this.MESPAEA_udiEnergyConsumed_408 = this.normalize(
      this.MESPAEA_udiEnergyConsumed_408
    );

    this.MESPAEA_udiEnergyConsumed_409 = array.MESPAEA_rCurrent_409
      ? array.MESPAEA_rCurrent_409
      : [];

    this.MESPAEA_rAir_401 = array.MESPAEA_rAir_401
      ? array.MESPAEA_rAir_401
      : [];
    this.MESPAEA_rAir_401 = this.normalize(this.MESPAEA_rAir_401);

    this.MESPAEA_udiAirConsumed_401 = array.MESPAEA_udiAirConsumed_401
      ? array.MESPAEA_udiAirConsumed_401
      : [];
  }

  graphConfiguration(type: number) {
    /**
     * SIF_401
     */
    if (type === 0) {
      this.graph.data[0].type = 'scatter';
      this.graph.data[0].mode = 'lines+points';
      this.graph.data[0].marker = { color: 'blue' };
      this.graph.data[0].name = 'Alarm401';
    }
    if (type === 6) {
      this.graph.data[6].type = 'scatter';
      this.graph.data[6].mode = 'lines+points';
      this.graph.data[6].marker = { color: '#FAD7A0' };
      this.graph.data[6].name = 'Set_v1_401';
    }
    if (type === 12) {
      this.graph.data[12].type = 'scatter';
      this.graph.data[12].mode = 'lines+points';
      this.graph.data[12].marker = { color: '#E74C3C' };
      this.graph.data[12].name = 'Set_v2_401';
    }
    if (type === 17) {
      this.graph.data[17].type = 'scatter';
      this.graph.data[17].mode = 'lines+points';
      this.graph.data[17].marker = { color: '#E74C3C' };
      this.graph.data[17].name = 'Sifoc_LEC_401';
    }
    if (type === 20) {
      this.graph.data[20].type = 'scatter';
      this.graph.data[20].mode = 'lines+points';
      this.graph.data[20].marker = { color: '#ff1d6e' };
      this.graph.data[20].name = 'MESPAEA_udiEnergyConsumed_401';
    }
    if (type === 26) {
      this.graph.data[26].type = 'scatter';
      this.graph.data[26].mode = 'lines+points';
      this.graph.data[26].marker = { color: '#5affda' };
      this.graph.data[26].name = 'MESPAEA_rAir_401';
    }
    if (type === 27) {
      this.graph.data[27].type = 'scatter';
      this.graph.data[27].mode = 'lines+points';
      this.graph.data[27].marker = { color: '#6fceff' };
      this.graph.data[27].name = 'MESPAEA_udiAirConsumed_401';
    }
    /**
     * SIF_402
     */
    if (type === 1) {
      this.graph.data[1].type = 'scatter';
      this.graph.data[1].mode = 'lines+points';
      this.graph.data[1].marker = { color: 'red' };
      this.graph.data[1].name = 'Alarm402';
    }
    if (type === 7) {
      this.graph.data[7].type = 'scatter';
      this.graph.data[7].mode = 'lines+points';
      this.graph.data[7].marker = { color: '#AED6F1' };
      this.graph.data[7].name = 'Set_v1_402';
    }
    if (type === 13) {
      this.graph.data[13].type = 'scatter';
      this.graph.data[13].mode = 'lines+points';
      this.graph.data[13].marker = { color: '#BFC9CA' };
      this.graph.data[13].name = 'Set_v2_402';
    }
    if (type === 18) {
      this.graph.data[18].type = 'scatter';
      this.graph.data[18].mode = 'lines+points';
      this.graph.data[18].marker = { color: '#BFC9CA' };
      this.graph.data[18].name = 'Sifoc_LEC_402';
    }
    if (type === 21) {
      this.graph.data[21].type = 'scatter';
      this.graph.data[21].mode = 'lines+points';
      this.graph.data[21].marker = { color: '#BFC9CA' };
      this.graph.data[21].name = 'MESPAEA_udiEnergyConsumed_402';
    }
    /**
     * SIF_405
     */
    if (type === 2) {
      this.graph.data[2].type = 'scatter';
      this.graph.data[2].mode = 'lines+points';
      this.graph.data[2].marker = { color: 'gray' };
      this.graph.data[2].name = 'Alarm405';
    }
    if (type === 8) {
      this.graph.data[8].type = 'scatter';
      this.graph.data[8].mode = 'lines+points';
      this.graph.data[8].marker = { color: '#7B241C' };
      this.graph.data[8].name = 'Set_v1_405';
    }
    if (type === 14) {
      this.graph.data[14].type = 'scatter';
      this.graph.data[14].mode = 'lines+points';
      this.graph.data[14].marker = { color: '#C39BD3' };
      this.graph.data[14].name = 'Set_v2_405';
    }
    if (type === 22) {
      this.graph.data[22].type = 'scatter';
      this.graph.data[22].mode = 'lines+points';
      this.graph.data[22].marker = { color: '#C39BD3' };
      this.graph.data[22].name = 'MESPAEA_udiEnergyConsumed_405';
    }
    if (type === 28) {
      this.graph.data[28].type = 'scatter';
      this.graph.data[28].mode = 'lines+points';
      this.graph.data[28].marker = { color: '#a7ff9d' };
      this.graph.data[28].name = 'SIFOC_sif405_V1';
    }
    if (type === 29) {
      this.graph.data[29].type = 'scatter';
      this.graph.data[29].mode = 'lines+points';
      this.graph.data[29].marker = { color: '#ff03fb' };
      this.graph.data[29].name = 'SIFOC_sif405_V2';
    }
    /**
     * SIF_407
     */
    if (type === 3) {
      this.graph.data[3].type = 'scatter';
      this.graph.data[3].mode = 'lines+points';
      this.graph.data[3].marker = { color: 'orange' };
      this.graph.data[3].name = 'Alarm407';
    }
    if (type === 9) {
      this.graph.data[9].type = 'scatter';
      this.graph.data[9].mode = 'lines+points';
      this.graph.data[9].marker = { color: '#48C9B0' };
      this.graph.data[9].name = 'Set_v1_407';
    }
    if (type === 15) {
      this.graph.data[15].type = 'scatter';
      this.graph.data[15].mode = 'lines+points';
      this.graph.data[15].marker = { color: '#D4AC0D' };
      this.graph.data[15].name = 'Set_v2_407';
    }
    if (type === 23) {
      this.graph.data[23].type = 'scatter';
      this.graph.data[23].mode = 'lines+points';
      this.graph.data[23].marker = { color: '#D4AC0D' };
      this.graph.data[23].name = 'MESPAEA_udiEnergyConsumed_407';
    }
    if (type === 30) {
      this.graph.data[30].type = 'scatter';
      this.graph.data[30].mode = 'lines+points';
      this.graph.data[30].marker = { color: '#D4AC0D' };
      this.graph.data[30].name = 'SIFOC_sif407_V1';
    }
    if (type === 31) {
      this.graph.data[31].type = 'scatter';
      this.graph.data[31].mode = 'lines+points';
      this.graph.data[31].marker = { color: '#fdff6f' };
      this.graph.data[31].name = 'SIFOC_sif407_V2';
    }
    if (type === 32) {
      this.graph.data[32].type = 'scatter';
      this.graph.data[32].mode = 'lines+points';
      this.graph.data[32].marker = { color: '#ffafa4' };
      this.graph.data[32].name = 'SIFOC_sif407_V3';
    }
    /**
     * SIF_408
     */
    if (type === 4) {
      this.graph.data[4].type = 'scatter';
      this.graph.data[4].mode = 'lines+points';
      this.graph.data[4].marker = { color: 'pink' };
      this.graph.data[4].name = 'Alarm408';
    }
    if (type === 10) {
      this.graph.data[10].type = 'scatter';
      this.graph.data[10].mode = 'lines+points';
      this.graph.data[10].marker = { color: '#9B59B6' };
      this.graph.data[10].name = 'Set_v1_408';
    }
    if (type === 16) {
      this.graph.data[16].type = 'scatter';
      this.graph.data[16].mode = 'lines+points';
      this.graph.data[16].marker = { color: '#196F3D' };
      this.graph.data[16].name = 'Set_v2_407';
    }
    if (type === 24) {
      this.graph.data[24].type = 'scatter';
      this.graph.data[24].mode = 'lines+points';
      this.graph.data[24].marker = { color: '#85C1E9' };
      this.graph.data[24].name = 'MESPAEA_udiEnergyConsumed_408';
    }
    if (type === 33) {
      this.graph.data[33].type = 'scatter';
      this.graph.data[33].mode = 'lines+points';
      this.graph.data[33].marker = { color: '#85C1E9' };
      this.graph.data[33].name = 'SIFOC_sif408_ROBOT';
    }
    /**
     * SIF_409
     */
    if (type === 5) {
      this.graph.data[5].type = 'scatter';
      this.graph.data[5].mode = 'lines+points';
      this.graph.data[5].marker = { color: 'purple' };
      this.graph.data[5].name = 'Alarm409';
    }
    if (type === 11) {
      this.graph.data[11].type = 'scatter';
      this.graph.data[11].mode = 'lines+points';
      this.graph.data[11].marker = { color: '#2980B9' };
      this.graph.data[11].name = 'SetV_409';
    }
    if (type === 19) {
      this.graph.data[19].type = 'scatter';
      this.graph.data[19].mode = 'lines+points';
      this.graph.data[19].marker = { color: '#27AE60' };
      this.graph.data[19].name = 'Sifoc_LEC_409';
    }
    if (type === 25) {
      this.graph.data[25].type = 'scatter';
      this.graph.data[25].mode = 'lines+points';
      this.graph.data[25].marker = { color: '#27AE60' };
      this.graph.data[25].name = 'MESPAEA_udiEnergyConsumed_409';
    }
  }

  /**
   * Set data in the collections
   */
  getVariablesSif401(event: any) {
    const valueSelected = event.target.value;
    console.log(valueSelected);
    if (valueSelected === 'Alarm') {
      this.isInArray(this.variablesSelectedSif401, valueSelected);
      this.graph.data[0].x = this.time;
      this.graph.data[0].y = this.Alarma401;
      this.graphConfiguration(0);
    }
    if (valueSelected === 'SetV_1') {
      this.isInArray(this.variablesSelectedSif401, valueSelected);
      this.graph.data[6].x = this.time;
      this.graph.data[6].y = this.SetV_1_401;
      this.graphConfiguration(6);
    }
    if (valueSelected === 'SetV_2') {
      this.isInArray(this.variablesSelectedSif401, valueSelected);
      this.graph.data[12].x = this.time;
      this.graph.data[12].y = this.SetV_2_401;
      this.graphConfiguration(12);
    }
    if (valueSelected === 'SIFOC_sif401_LEC') {
      this.isInArray(this.variablesSelectedSif401, valueSelected);
      this.graph.data[17].x = this.time;
      this.graph.data[17].y = this.SIFOC_sif401_LEC;
      this.graphConfiguration(17);
    }
    if (valueSelected === 'MESPAEA_udiEnergyConsumed') {
      this.isInArray(this.variablesSelectedSif401, valueSelected);
      this.graph.data[20].x = this.time;
      this.graph.data[20].y = this.MESPAEA_udiEnergyConsumed_401;
      this.graphConfiguration(20);
    }
    if (valueSelected === 'MESPAEA_rAir') {
      this.isInArray(this.variablesSelectedSif401, valueSelected);
      this.graph.data[26].x = this.time;
      this.graph.data[26].y = this.MESPAEA_rAir_401;
      this.graphConfiguration(26);
    }
    if (valueSelected === 'MESPAEA_udiAirConsumed') {
      this.isInArray(this.variablesSelectedSif401, valueSelected);
      this.graph.data[27].x = this.time;
      this.graph.data[27].y = this.MESPAEA_udiAirConsumed_401;
      this.graphConfiguration(27);
    }
  }
  getVariablesSif402(event: any) {
    const valueSelected = event.target.value;
    console.log(valueSelected);
    if (valueSelected === 'Alarm') {
      this.isInArray(this.variablesSelectedSif402, valueSelected);
      this.graph.data[1].x = this.time;
      this.graph.data[1].y = this.Alarma402;
      this.graphConfiguration(1);
    }
    if (valueSelected === 'SetV_1') {
      this.isInArray(this.variablesSelectedSif402, valueSelected);
      this.graph.data[7].x = this.time;
      this.graph.data[7].y = this.SetV_1_402;
      this.graphConfiguration(7);
    }
    if (valueSelected === 'SetV_2') {
      this.isInArray(this.variablesSelectedSif402, valueSelected);
      this.graph.data[13].x = this.time;
      this.graph.data[13].y = this.SetV_2_402;
      this.graphConfiguration(13);
    }
    if (valueSelected === 'SIFOC_sif402_LEC') {
      this.isInArray(this.variablesSelectedSif402, valueSelected);
      this.graph.data[18].x = this.time;
      this.graph.data[18].y = this.SIFOC_sif402_LEC;
      this.graphConfiguration(18);
    }
    if (valueSelected === 'MESPAEA_udiEnergyConsumed') {
      this.isInArray(this.variablesSelectedSif402, valueSelected);
      this.graph.data[21].x = this.time;
      this.graph.data[21].y = this.MESPAEA_udiEnergyConsumed_402;
      this.graphConfiguration(21);
    }
  }
  getVariablesSif405(event: any) {
    const valueSelected = event.target.value;
    console.log(valueSelected);
    if (valueSelected === 'Alarm') {
      this.isInArray(this.variablesSelectedSif405, valueSelected);
      this.graph.data[2].x = this.time;
      this.graph.data[2].y = this.Alarma405;
      this.graphConfiguration(2);
    }
    if (valueSelected === 'SetV_1') {
      this.isInArray(this.variablesSelectedSif405, valueSelected);
      this.graph.data[8].x = this.time;
      this.graph.data[8].y = this.SetV_1_405;
      this.graphConfiguration(8);
    }
    if (valueSelected === 'SetV_2') {
      this.isInArray(this.variablesSelectedSif405, valueSelected);
      this.graph.data[14].x = this.time;
      this.graph.data[14].y = this.SetV_2_405;
      this.graphConfiguration(14);
    }
    if (valueSelected === 'MESPAEA_udiEnergyConsumed') {
      this.isInArray(this.variablesSelectedSif405, valueSelected);
      this.graph.data[22].x = this.time;
      this.graph.data[22].y = this.MESPAEA_udiEnergyConsumed_405;
      this.graphConfiguration(22);
    }
    if (valueSelected === 'SIFOC_sif405_V1') {
      this.isInArray(this.variablesSelectedSif405, valueSelected);
      this.graph.data[28].x = this.time;
      this.graph.data[28].y = this.SIFOC_sif405_V1;
      this.graphConfiguration(28);
    }
    if (valueSelected === 'SIFOC_sif405_V2') {
      this.isInArray(this.variablesSelectedSif405, valueSelected);
      this.graph.data[29].x = this.time;
      this.graph.data[29].y = this.SIFOC_sif405_V2;
      this.graphConfiguration(29);
    }
  }
  getVariablesSif407(event: any) {
    const valueSelected = event.target.value;
    console.log(valueSelected);
    if (valueSelected === 'Alarm') {
      this.isInArray(this.variablesSelectedSif407, valueSelected);
      this.graph.data[3].x = this.time;
      this.graph.data[3].y = this.Alarma407;
      this.graphConfiguration(3);
    }
    if (valueSelected === 'SetV_1') {
      this.isInArray(this.variablesSelectedSif407, valueSelected);
      this.graph.data[9].x = this.time;
      this.graph.data[9].y = this.SetV_1_407;
      this.graphConfiguration(9);
    }
    if (valueSelected === 'SetV_2') {
      this.isInArray(this.variablesSelectedSif407, valueSelected);
      this.graph.data[15].x = this.time;
      this.graph.data[15].y = this.SetV_2_407;
      this.graphConfiguration(15);
    }
    if (valueSelected === 'MESPAEA_udiEnergyConsumed') {
      this.isInArray(this.variablesSelectedSif407, valueSelected);
      this.graph.data[23].x = this.time;
      this.graph.data[23].y = this.MESPAEA_udiEnergyConsumed_407;
      this.graphConfiguration(23);
    }
    if (valueSelected === 'SIFOC_sif407_V1') {
      this.isInArray(this.variablesSelectedSif407, valueSelected);
      this.graph.data[30].x = this.time;
      this.graph.data[30].y = this.SIFOC_sif407_V1;
      this.graphConfiguration(30);
    }
    if (valueSelected === 'SIFOC_sif407_V2') {
      this.isInArray(this.variablesSelectedSif407, valueSelected);
      this.graph.data[31].x = this.time;
      this.graph.data[31].y = this.SIFOC_sif407_V2;
      this.graphConfiguration(31);
    }
    if (valueSelected === 'SIFOC_sif407_V3') {
      this.isInArray(this.variablesSelectedSif407, valueSelected);
      this.graph.data[32].x = this.time;
      this.graph.data[32].y = this.SIFOC_sif407_V3;
      this.graphConfiguration(32);
    }
  }
  getVariablesSif408(event: any) {
    const valueSelected = event.target.value;
    console.log(valueSelected);
    if (valueSelected === 'Alarm') {
      this.isInArray(this.variablesSelectedSif408, valueSelected);
      this.graph.data[4].x = this.time;
      this.graph.data[4].y = this.Alarma408;
      this.graphConfiguration(4);
    }
    if (valueSelected === 'SetV_1') {
      this.isInArray(this.variablesSelectedSif408, valueSelected);
      this.graph.data[10].x = this.time;
      this.graph.data[10].y = this.SetV_1_408;
      this.graphConfiguration(10);
    }
    if (valueSelected === 'SetV_2') {
      this.isInArray(this.variablesSelectedSif408, valueSelected);
      this.graph.data[16].x = this.time;
      this.graph.data[16].y = this.SetV_2_408;
      this.graphConfiguration(16);
    }
    if (valueSelected === 'MESPAEA_udiEnergyConsumed') {
      this.isInArray(this.variablesSelectedSif408, valueSelected);
      this.graph.data[24].x = this.time;
      this.graph.data[24].y = this.MESPAEA_udiEnergyConsumed_408;
      this.graphConfiguration(24);
    }
    if (valueSelected === 'SIFOC_sif408_ROBOT') {
      this.isInArray(this.variablesSelectedSif408, valueSelected);
      this.graph.data[33].x = this.time;
      this.graph.data[33].y = this.SIFOC_sif408_ROBOT;
      this.graphConfiguration(33);
    }
  }
  getVariablesSif409(event: any) {
    const valueSelected = event.target.value;
    console.log(valueSelected);
    if (valueSelected === 'Alarm') {
      this.isInArray(this.variablesSelectedSif409, valueSelected);
      this.graph.data[5].x = this.time;
      this.graph.data[5].y = this.Alarma409;
      this.graphConfiguration(5);
    }
    if (valueSelected === 'SetV') {
      this.isInArray(this.variablesSelectedSif409, valueSelected);
      this.graph.data[11].x = this.time;
      this.graph.data[11].y = this.SetV_409;
      this.graphConfiguration(11);
    }
    if (valueSelected === 'SIFOC_sif409_LEC') {
      this.isInArray(this.variablesSelectedSif409, valueSelected);
      this.graph.data[19].x = this.time;
      this.graph.data[19].y = this.SIFOC_sif409_LEC;
      this.graphConfiguration(19);
    }
    if (valueSelected === 'MESPAEA_udiEnergyConsumed') {
      this.isInArray(this.variablesSelectedSif409, valueSelected);
      this.graph.data[25].x = this.time;
      this.graph.data[25].y = this.MESPAEA_udiEnergyConsumed_409;
      this.graphConfiguration(25);
    }
  }

  /**
   * Remove data collections
   */
  cleanVariablesSif401() {
    this.graph.data[0].x = [];
    this.graph.data[0].y = [];
    this.graph.data[6].x = [];
    this.graph.data[6].y = [];
    this.graph.data[12].x = [];
    this.graph.data[12].y = [];
    this.graph.data[17].x = [];
    this.graph.data[17].y = [];
    this.graph.data[20].x = [];
    this.graph.data[20].y = [];
    this.graph.data[26].x = [];
    this.graph.data[26].y = [];
    this.graph.data[27].x = [];
    this.graph.data[27].y = [];
    this.variablesSelectedSif401 = [];
  }
  cleanVariablesSif402() {
    this.graph.data[1].x = [];
    this.graph.data[1].y = [];
    this.graph.data[7].x = [];
    this.graph.data[7].y = [];
    this.graph.data[13].x = [];
    this.graph.data[13].y = [];
    this.graph.data[18].x = [];
    this.graph.data[18].y = [];
    this.graph.data[21].x = [];
    this.graph.data[21].y = [];
    this.variablesSelectedSif402 = [];
  }
  cleanVariablesSif405() {
    this.graph.data[2].x = [];
    this.graph.data[2].y = [];
    this.graph.data[8].x = [];
    this.graph.data[8].y = [];
    this.graph.data[14].x = [];
    this.graph.data[14].y = [];
    this.graph.data[22].x = [];
    this.graph.data[22].y = [];
    this.graph.data[28].x = [];
    this.graph.data[28].y = [];
    this.graph.data[29].x = [];
    this.graph.data[29].y = [];
    this.variablesSelectedSif405 = [];
  }
  cleanVariablesSif407() {
    this.graph.data[3].x = [];
    this.graph.data[3].y = [];
    this.graph.data[9].x = [];
    this.graph.data[9].y = [];
    this.graph.data[15].x = [];
    this.graph.data[15].y = [];
    this.graph.data[23].x = [];
    this.graph.data[23].y = [];
    this.graph.data[30].x = [];
    this.graph.data[30].y = [];
    this.graph.data[31].x = [];
    this.graph.data[31].y = [];
    this.graph.data[32].x = [];
    this.graph.data[32].y = [];
    this.variablesSelectedSif407 = [];
  }
  cleanVariablesSif408() {
    this.graph.data[4].x = [];
    this.graph.data[4].y = [];
    this.graph.data[10].x = [];
    this.graph.data[10].y = [];
    this.graph.data[16].x = [];
    this.graph.data[16].y = [];
    this.graph.data[24].x = [];
    this.graph.data[24].y = [];
    this.graph.data[33].x = [];
    this.graph.data[33].y = [];
    this.variablesSelectedSif408 = [];
  }
  cleanVariablesSif409() {
    this.graph.data[5].x = [];
    this.graph.data[5].y = [];
    this.graph.data[11].x = [];
    this.graph.data[11].y = [];
    this.graph.data[19].x = [];
    this.graph.data[19].y = [];
    this.graph.data[25].x = [];
    this.graph.data[25].y = [];
    this.variablesSelectedSif409 = [];
  }
}

export interface SifocVariables {
  MESPAEA_rActivePower: number;
  MESPAEA_rAir?: number;
  MESPAEA_rCurrent: number;
  MESPAEA_rPowerFactor: number;
  MESPAEA_rVoltage: number;
  MESPAEA_udiAirConsumed?: number;
  MESPAEA_udiEnergyConsumed: number;
  Time: Date;
  Alarma: boolean;
  SIFOC_sif401_LEC?: number;
  SIFOC_sif402_LEC?: number;
  SIFOC_sif405_V1?: number;
  SIFOC_sif405_V2?: number;
  SIFOC_sif407_V1?: number;
  SIFOC_sif407_V2?: number;
  SIFOC_sif407_V3?: number;
  SIFOC_sif408_ROBOT?: number;
  SIFOC_sif409_LEC?: number;
  SetV?: number;
  SetV_1?: number;
  SetV_2?: number;
}

export interface dataset {
  data: number[];
  label: string;
}

export interface dataCore {
  x: Date[] | number[];
  y: number[];
  type: string;
  name?: string;
  mode?: string;
  marker?: {};
  title?: string;
}

export interface dataPlot {
  data: dataCore[];
  layout: {
    width: number;
    height: number;
    title: string;
  };
}

export interface Ihora {
  Hora: number;
  minutos: number;
  Segundos: number;
}

export interface ISuperset {
  Alarma_401?: number[];
  Alarma_402?: number[];
  Alarma_405?: number[];
  Alarma_407?: number[];
  Alarma_408?: number[];
  Alarma_409?: number[];
  MESPAEA_rActivePower_401?: number[];
  MESPAEA_rActivePower_402?: number[];
  MESPAEA_rActivePower_405?: number[];
  MESPAEA_rActivePower_407?: number[];
  MESPAEA_rActivePower_408?: number[];
  MESPAEA_rActivePower_409?: number[];
  MESPAEA_rCurrent_401?: number[];
  MESPAEA_rCurrent_402?: number[];
  MESPAEA_rCurrent_405?: number[];
  MESPAEA_rCurrent_407?: number[];
  MESPAEA_rCurrent_408?: number[];
  MESPAEA_rCurrent_409?: number[];
  MESPAEA_rPowerFactor_401?: number[];
  MESPAEA_rPowerFactor_402?: number[];
  MESPAEA_rPowerFactor_405?: number[];
  MESPAEA_rPowerFactor_407?: number[];
  MESPAEA_rPowerFactor_408?: number[];
  MESPAEA_rPowerFactor_409?: number[];
  MESPAEA_rVoltage_401?: number[];
  MESPAEA_rVoltage_402?: number[];
  MESPAEA_rVoltage_405?: number[];
  MESPAEA_rVoltage_407?: number[];
  MESPAEA_rVoltage_408?: number[];
  MESPAEA_rVoltage_409?: number[];
  MESPAEA_rAir_401?: number[];
  MESPAEA_udiAirConsumed_401?: number[];
  MESPAEA_udiEnergyConsumed_401?: number[];
  MESPAEA_udiEnergyConsumed_402?: number[];
  MESPAEA_udiEnergyConsumed_405?: number[];
  MESPAEA_udiEnergyConsumed_407?: number[];
  MESPAEA_udiEnergyConsumed_408?: number[];
  MESPAEA_udiEnergyConsumed_409?: number[];
  SIFOC_sif401_LEC?: number[];
  SIFOC_sif402_LEC?: number[];
  SIFOC_sif405_V1?: number[];
  SIFOC_sif405_V2?: number[];
  SIFOC_sif407_V1?: number[];
  SIFOC_sif407_V2?: number[];
  SIFOC_sif407_V3?: number[];
  SIFOC_sif408_ROBOT?: number[];
  SIFOC_sif409_LEC?: number[];
  SetV_1_401?: number[];
  SetV_1_402?: number[];
  SetV_1_405?: number[];
  SetV_1_407?: number[];
  SetV_1_408?: number[];
  SetV_2_401?: number[];
  SetV_2_402?: number[];
  SetV_2_405?: number[];
  SetV_2_407?: number[];
  SetV_2_408?: number[];
  SetV_409?: number[];
  Time?: [];
  Time_y?: [];
  Time_x?: [];
  Tiempo?: number[];
}

export interface IRegression {
  coeff?: number[];
  pvals?: number[];
  conf_lower?: number[];
  conf_higher?: number[];
}

export interface INeuronal {
  r2_score: number;
  mean_squared: number;
  model_score: number;
  model_params: {};
  expected_y?: number[];
  predicted_y?: number[];
}

export interface IKeyValuesNeuronal {
  name: string;
  value: number;
}

export interface IUserNeuronal {
  data: IKeyValuesNeuronal[];
}

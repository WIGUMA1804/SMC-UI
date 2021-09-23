export interface SifocVariables {
  MESPAEA_rActivePower: number;
  MESPAEA_rAir?: number;
  MESPAEA_rCurrent: number;
  MESPAEA_rPowerFactor: number;
  MESPAEA_rVoltage: number;
  MESPAEA_udiAirConsumed?: number;
  MESPAEA_udiEnergyConsumed: number;
  Hora: number;
  minutos: number;
  Segundos: number;
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
  x: string[];
  y: number[];
  type: string;
  name?: string;
  mode?: string;
  marker?: {};
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
